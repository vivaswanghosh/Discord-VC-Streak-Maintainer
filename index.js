const { Client, GatewayIntentBits } = require("discord.js");
const { 
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
    entersState,
    VoiceConnectionStatus
} = require("@discordjs/voice");
const path = require("path");

// ----------------------------
// CONFIG (use env vars)
// ----------------------------
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID || "1177224083335819335";
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID || "1177224083335819341";
const PLAY_EVERY_MINUTES = parseInt(process.env.PLAY_EVERY_MINUTES) || 2;
// ----------------------------

if (!TOKEN) {
    console.error("FATAL: TOKEN environment variable not set. Set TOKEN in Railway/Heroku/etc.");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

let connection;
let player;

// Play silent audio to keep bot alive
function playSilentSound() {
    try {
        const resource = createAudioResource(path.join(__dirname, "silent.wav"));
        player.play(resource);
        console.log("[BOT] Played silent audio to stay alive.");
    } catch (err) {
        console.error("Audio error:", err);
    }
}

// Function to join voice channel
async function connectToVC() {
    try {
        console.log("[BOT] Connecting to VC...");

        connection = joinVoiceChannel({
            channelId: VOICE_CHANNEL_ID,
            guildId: GUILD_ID,
            adapterCreator: client.guilds.cache.get(GUILD_ID).voiceAdapterCreator
        });

        player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        });

        connection.subscribe(player);

        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        console.log("[BOT] Successfully connected to VC!");

        setInterval(playSilentSound, PLAY_EVERY_MINUTES * 60 * 1000);

        playSilentSound();

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            console.log("[BOT] Disconnected! Reconnecting...");
            connectToVC();
        });

    } catch (err) {
        console.error("VC Connection Error:", err);
        setTimeout(connectToVC, 5000);
    }
}

client.on("ready", () => {
    console.log(`[BOT] Logged in as ${client.user.tag}`);
    connectToVC();
});

client.login(TOKEN);
