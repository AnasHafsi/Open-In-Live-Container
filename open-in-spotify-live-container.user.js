// ==UserScript==
// @name         Open in Spotify Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://open.spotify.com/*
// @downloadURL  https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-spotify-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-spotify-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main
// ==/UserScript==

// need to encode the string to base64 for live container link to work
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function openInSpotify() {
  if (window.self !== window.top) return; // iframe

  const currentPath = window.location.pathname;

  // Match patterns like /track/ID, /album/ID, /playlist/ID, etc.
  const match = currentPath.match(/^\/(track|album|playlist|artist|show|episode|user)\/([^/?]+)/);

  if (match) {
    const [, type, id] = match;
    // Convert to Spotify URI format: spotify:track:ID
    const spotifyUri = `spotify:${type}:${id}`;

    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64(spotifyUri);
  }
}

openInSpotify();
