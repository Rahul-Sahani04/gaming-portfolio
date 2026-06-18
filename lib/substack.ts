export type SubstackPost = {
    source: "substack";
    title: string;
    description: string;
    date: string;
    url: string;
    tags: string[];
};

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;|&#8221;/g, '"')
        .replace(/&#8230;/g, "…")
        .trim();
}

function extractCdata(xml: string, tag: string): string {
    const match = xml.match(new RegExp(`<${tag}><\\!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
    return match?.[1]?.trim() ?? "";
}

function extractPlain(xml: string, tag: string): string {
    const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
    return match?.[1]?.trim() ?? "";
}

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
    try {
        const res = await fetch("https://rsahani.substack.com/feed", {
            next: { revalidate: 3600 },
            headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-rss/1.0)" },
        });

        if (!res.ok) return [];

        const xml = await res.text();
        const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

        const posts: SubstackPost[] = itemBlocks
            .map((item): SubstackPost | null => {
                const title = extractCdata(item, "title") || extractPlain(item, "title");
                const description = stripHtml(
                    extractCdata(item, "description") || extractPlain(item, "description")
                );
                const url =
                    extractPlain(item, "link") ||
                    extractCdata(item, "guid") ||
                    extractPlain(item, "guid");
                const pubDate = extractPlain(item, "pubDate");

                // Skip placeholder posts
                if (!title || title.toLowerCase() === "coming soon") return null;
                if (!url || !pubDate) return null;

                const date = new Date(pubDate).toISOString();

                return {
                    source: "substack" as const,
                    title,
                    description: description.slice(0, 280),
                    date,
                    url,
                    tags: [],
                };
            })
            .filter((p): p is SubstackPost => p !== null);

        return posts;
    } catch {
        return [];
    }
}
