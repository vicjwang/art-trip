
import React from 'react';



const SPOTIFY_CLIENT_ID = "ec562898e50449318ecad1960c7fd91d"
const REDIRECT_URI = window.location.href
const SCOPES = [
	"streaming",
	"user-read-birthdate",
	"user-read-email",
	"user-modify-playback-state",
	"user-read-private",
	"playlist-read-private",
	"playlist-read-collaborative",
	"user-modify-playback-state",
    "user-read-currently-playing"
]

class SpotifyLogin extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const href = "https://accounts.spotify.com/authorize?client_id="
								+ SPOTIFY_CLIENT_ID
								+ "&redirect_uri=" + encodeURIComponent(REDIRECT_URI)
								+ "&scope=" + encodeURIComponent(SCOPES.join(" "))
								+ "&response_type=token&state=123"
		return (
			<div className="spotify-login">
				<a href={href}>Connect to Spotify</a>
			</div>
		)
	}
}

export default SpotifyLogin
