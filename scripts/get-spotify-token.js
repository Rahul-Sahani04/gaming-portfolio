const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("--- Spotify Refresh Token Generator ---\n");
  
  console.log("1. Go to https://developer.spotify.com/dashboard");
  console.log("2. Create an app (or use an existing one).");
  console.log("3. In the app settings, add 'http://localhost:3000' to Redirect URIs.");
  console.log("4. Copy the Client ID and Client Secret.\n");

  const client_id = await question("Enter Client ID: ");
  const client_secret = await question("Enter Client Secret: ");

  const scopes = "user-read-currently-playing user-read-recently-played";
  const redirect_uri = "https://www.rsahani.space/callback";

  const url =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    client_id +
    "&scope=" +
    encodeURIComponent(scopes) +
    "&redirect_uri=" +
    encodeURIComponent(redirect_uri);

  console.log("\n--- Action Required ---");
  console.log("Visit this URL in your browser:");
  console.log(url);
  console.log("\nAfter logging in, you will be redirected to localhost.");
  console.log("Copy the 'code' parameter from the URL (everything after ?code=).");

  const code = await question("\nEnter the code: ");

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("\nError:", data.error_description || data.error);
    } else {
      console.log("\n--- Success! ---");
      console.log("Add these to your .env.local file:\n");
      console.log(`SPOTIFY_CLIENT_ID=${client_id}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${client_secret}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    }
  } catch (error) {
    console.error("Failed to fetch token:", error);
  }

  rl.close();
}

main();
