import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "client_credentials",
      },
      auth: {
        username: clientID,
        password: clientSecret,
      },
    }
  );

  return response.data.access_token;
};

const getPlaylistID = (link) => {
  const parts = link.split("/");
  if (parts[3] != "playlist") return null;
  else return parts[4].substring(0, 22);
};

const getPlaylistData = async (playlistID, accessToken) => {
  const apiUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(apiUrl, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist data:", error.message);
    throw error;
  }
};

const handlePlaylistData = async (link) => {
  const playlistID = getPlaylistID(link);
  const token = await getAccessToken();
  let songData = [];
  let dataLength = 0;

  const stream = fs.createWriteStream("songData.txt", { flags: "a" });

  if (playlistID && token) {
    const playlistData = await getPlaylistData(playlistID, token);
    const tracks = playlistData.items;
    tracks.forEach(function (song) {
      const line = `${song.track.artists[0].name}\n${song.track.name}\n`;
      stream.write(line);
      dataLength++;
    });
    stream.end();
    return dataLength;
  } else {
    return null;
  }
};

export { handlePlaylistData };
