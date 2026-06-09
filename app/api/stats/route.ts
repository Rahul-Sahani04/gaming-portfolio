import { NextResponse } from 'next/server';

// Revalidate this endpoint every 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
    try {
        const githubUsername = process.env.GITHUB_USERNAME || 'Rahul-Sahani04';
        const steamApiKey = process.env.STEAM_API_KEY;
        const steamId = process.env.STEAM_ID;

        const githubHeaders = process.env.GITHUB_TOKEN ? {
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        } : undefined;

        // Fetch GitHub User Data
        const githubUserRes = await fetch(`https://api.github.com/users/${githubUsername}`, {
            headers: githubHeaders,
            next: { revalidate: 3600 }
        });
        const githubUser = githubUserRes.ok ? await githubUserRes.json() : null;

        // Fetch GitHub Repos to calculate language usage
        const githubReposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
            headers: githubHeaders,
            next: { revalidate: 3600 }
        });
        const githubRepos = githubReposRes.ok ? await githubReposRes.json() : [];

        // Calculate Top 5 Languages
        const languageCounts: Record<string, number> = {};
        let totalReposWithLang = 0;
        
        if (Array.isArray(githubRepos)) {
            githubRepos.forEach((repo: any) => {
                if (repo.language) {
                    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                    totalReposWithLang++;
                }
            });
        }

        const topLanguages = Object.entries(languageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({
                name: name.toUpperCase(),
                level: Math.round((count / totalReposWithLang) * 100)
            }));

        // Fill with placeholders if GitHub doesn't return languages
        if (topLanguages.length === 0) {
            topLanguages.push(
                { name: "FRONTEND", level: 98 },
                { name: "BACKEND", level: 85 },
                { name: "DESIGN", level: 80 }
            );
        }

        let steamStats = {
            gamesOwned: 0,
            playtime2Weeks: 0,
            recentGame: "NONE",
            topRecentGames: [] as { name: string, playtimeHours: number, maxPlaytime: number }[]
        };

        if (steamApiKey && steamId) {
            try {
                // Owned Games
                const ownedGamesRes = await fetch(
                    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&include_appinfo=true&format=json`,
                    { next: { revalidate: 3600 } }
                );
                if (ownedGamesRes.ok) {
                    const ownedGamesData = await ownedGamesRes.json();
                    steamStats.gamesOwned = ownedGamesData.response?.game_count || 0;
                    
                    const games = ownedGamesData.response?.games || [];
                    if (games.length > 0) {
                        // Sort by playtime_forever descending
                        games.sort((a: any, b: any) => (b.playtime_forever || 0) - (a.playtime_forever || 0));
                        
                        // Extract top 3 most played games of all time
                        const maxPlaytime = Math.max(...games.slice(0, 3).map((g: any) => g.playtime_forever || 1));
                        steamStats.topRecentGames = games.slice(0, 3).map((g: any) => ({
                            name: g.name.toUpperCase(),
                            playtimeHours: Math.round((g.playtime_forever || 0) / 60),
                            maxPlaytime: Math.max(Math.round(maxPlaytime / 60), 1)
                        }));
                    }
                }

                // Recently Played (for EXP and CLASS fallback)
                const recentGamesRes = await fetch(
                    `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json`,
                    { next: { revalidate: 3600 } }
                );
                if (recentGamesRes.ok) {
                    const recentGamesData = await recentGamesRes.json();
                    const games = recentGamesData.response?.games || [];
                    if (games.length > 0) {
                        // Total playtime in last 2 weeks (in minutes) converted to hours
                        const totalMinutes = games.reduce((acc: number, game: any) => acc + (game.playtime_2weeks || 0), 0);
                        steamStats.playtime2Weeks = Math.round(totalMinutes / 60);
                        steamStats.recentGame = games[0].name.toUpperCase();
                    }
                }
            } catch (err) {
                console.error("Failed to fetch steam data", err);
            }
        }

        return NextResponse.json({
            github: {
                repos: githubUser?.public_repos || 0,
                followers: githubUser?.followers || 0,
                topLanguages
            },
            steam: steamStats
        });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
