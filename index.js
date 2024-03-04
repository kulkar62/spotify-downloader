import express from "express";
import bodyParser from "body-parser";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { handlePlaylistData } from "./getSpotifyPlaylist.js";
import { exec } from "child_process";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  const indexPath = join(__dirname, "index.html");
  res.sendFile(indexPath);
});

app.post("/data-setup", async (req, res) => {
  const spotifyLink = req.body.userInput;
  const songDataLength = await handlePlaylistData(spotifyLink);

  res.json({ songDataLength: songDataLength });
});

app.post("/download-song", async (req, res) => {
  await runPythonCode("downloadSong.py");
  res.json({ dummyres: "dummy" });
});

app.post("/download-zip", async (req, res) => {
  await runPythonCode("createZip.py");
  const zipFilePath = join(__dirname, "Playlist.zip");
  res.setHeader("Content-Disposition", "attachment; filename=Playlist.zip");
  res.download(zipFilePath, "Playlist.zip");
});

app.post("/clean", async (req, res) => {
  await runPythonCode("clean.py");
});

function runPythonCode(filename) {
  return new Promise((resolve, reject) => {
    exec(`python3 ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error:", error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
