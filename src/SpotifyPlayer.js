import React from 'react';
import { shuffleArray } from './Utils.js'


const SPOTIFY_API_DOMAIN = "https://api.spotify.com"
const GET_USER_PATH = "/v1/me"
const GET_PLAYLISTS_PATH = "/v1/me/playlists"


class SpotifyPlaylist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			playlists: null
		}
	}

	componentDidMount() {
		// Get playlists
		fetch(SPOTIFY_API_DOMAIN + GET_PLAYLISTS_PATH, {
			method: "get",
			headers: new Headers({
				"Authorization": "Bearer " + this.props.accessToken
			})
		})
		.then(results => { return results.json(); })
		.then(data => {
			this.setState({
				playlists: data.items
			})

		})
	}

	render() {
		return (
			<p>
				<p>Select playlist:</p>

				<select name="playlist" onChange={ this.props.handlePlaylistSelect } multiple>
					{ this.state.playlists && this.state.playlists.map((playlist, i) => (
						<option value={ playlist.href }>{ playlist.name }</option>
					)) }

				</select>
			</p>
		)
	}
}

class SpotifyControl extends React.Component {
	constructor(props) {
		super(props)
		this.fetchSongsFromPlaylist = this.fetchSongsFromPlaylist.bind(this)
		this.playSongs = this.playSongs.bind(this)
		this.state = {
			isPlaying: this.props.isPlaying,
			playlistURI: this.props.playlistURI
		}
	}

	fetchSongsFromPlaylist() {
		fetch(this.state.playlistURI, {
			method: "get",
			headers: new Headers({
				"Authorization": "Bearer " + this.props.accessToken
			})
		})
		.then(results => { return results.json(); })
		.then(data => {
			console.log("fetching songs from playlist")
			console.log(data)
		})
	}

	playSongs(songs) {
		console.log("play!")
	}

	render() {

		console.log("spotify control render")
		console.log(this.state.isPlaying)
		console.log(this.state.playlistURI)

		if (this.state.isPlaying && this.state.playlistURI) {
			var songs = this.fetchSongsFromPlaylist()
			var shuffledSongs = shuffleArray(songs)
			this.playSongs(songs)
		}

		return (
			<p>
				control!
			</p>
		)
	}

}

class SpotifyPlayer extends React.Component {
	constructor(props) {
		super(props)
//		this.findDevice()
		this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this)
		this.state = {
			spotify_user_id: null,
			playlistURI: null,
			isPlaying: this.props.isPlaying
		}
	}

	handlePlaylistSelect(e) {
		console.log("select")
		console.log(e.target.value)
		this.setState({
			playlistURI: e.target.value
		})
	}

	componentDidMount() {
		// Get user id
		fetch(SPOTIFY_API_DOMAIN + GET_USER_PATH, {
			method: "get",
			headers: new Headers({
				"Authorization": "Bearer " + this.props.accessToken
			})
		})
		.then(results => { return results.json(); })
		.then(data => {
			console.log(data)
			this.setState({
				"user_id": data.id
			})
		})
	}

	findDevice() {
//		fetch

	}

	render() {
		return (
			<p>
				<SpotifyPlaylist accessToken={ this.props.accessToken } user_id={ this.user_id } handlePlaylistSelect={ this.handlePlaylistSelect }/>

				{ this.state.playlistURI }
				<SpotifyControl playlistURI={ this.state.playlistURI } isPlaying= { this.state.isPlaying } />
			</p>
		)
	}
}

export default SpotifyPlayer
