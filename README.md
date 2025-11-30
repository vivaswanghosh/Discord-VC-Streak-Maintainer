# Discord VC Streak Bot

A simple Discord bot that joins a voice channel and plays a short silent audio periodically to avoid being disconnected. Designed for keeping long voice-channel presence (streaks).

## Files
- `index.js` - main bot code (uses env vars)
- `package.json` - dependencies
- `silent.wav` - 1-second silent audio
- `.env.example` - example environment file

## Setup (GitHub → Railway)
1. Push this repo to GitHub.
2. Create a Railway project and connect this GitHub repo.
3. Set Railway environment variables:
   - `TOKEN` - your Discord bot token (keep this secret)
   - `GUILD_ID` - your server id (default included)
   - `VOICE_CHANNEL_ID` - your voice channel id (default included)
   - `PLAY_EVERY_MINUTES` - how often to play silent audio (minutes)
4. Deploy. Railway will run `npm install` and `npm start`.

## Important Security Notice
**Never share your bot token publicly.** If you accidentally paste it anywhere (Discord, chats, or this conversation), immediately go to the Discord Developer Portal → Bot → Reset Token.

