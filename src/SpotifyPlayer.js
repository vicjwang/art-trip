import React from 'react';
import { shuffleArray } from './Utils.js'


const SPOTIFY_API_DOMAIN = "https://api.spotify.com"
const GET_USER_PATH = "/v1/me"
const GET_PLAYLISTS_PATH = "/v1/me/playlists"
const PUT_PLAY_PATH = "/v1/me/player/play"


class SpotifyPlaylistSelect extends React.Component {
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
			<div>
				<p>Select playlist:</p>

				<select name="playlist" onChange={ this.props.handlePlaylistSelect } multiple>
					{ this.state.playlists && this.state.playlists.map((playlist, i) => (
						<option value={ playlist.href }>{ playlist.name }</option>
					)) }

				</select>
			</div>
		)
	}
}

class SpotifyPlayerControl extends React.Component {
	constructor(props) {
		super(props)
		this.fetchTrackURIsFromPlaylist = this.fetchTrackURIsFromPlaylist.bind(this)
		this.playTracks = this.playTracks.bind(this)
	}

	fetchTrackURIsFromPlaylist() {
		fetch(this.props.playlistURI, {
			method: "get",
			headers: new Headers({
				"Authorization": "Bearer " + this.props.accessToken
			})
		})
		.then(results => { return results.json(); })
		.then(data => {
			var tracks = data.tracks.items
			var shuffledTracks = shuffleArray(tracks)
			var trackURIs = []
			shuffledTracks.map((item, i) => {
				trackURIs.push(item.track.uri)
			})
			this.playTracks(trackURIs)
		})
	}

	playTracks(trackURIs) {
		var body = {
			uris: trackURIs
		}
		fetch(SPOTIFY_API_DOMAIN + PUT_PLAY_PATH, {
			method: "put",
			body: JSON.stringify(body),
			headers: new Headers({
				"Authorization": "Bearer " + this.props.accessToken
			})
		})
		.then(results => { return results.json() })
		.then(data => {
		})

	}

	render() {

		if (this.props.isPlaying && this.props.playlistURI) {
			var trackURIs = this.fetchTrackURIsFromPlaylist()
		}

		return (
			<div className="spotify-control">
				control!
			</div>
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
		}
	}

	handlePlaylistSelect(e) {
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
			<div className="spotify-player">
				<SpotifyPlaylistSelect accessToken={ this.props.accessToken } user_id={ this.user_id } handlePlaylistSelect={ this.handlePlaylistSelect }/>

				{ this.state.playlistURI }
				<SpotifyPlayerControl playlistURI={ this.state.playlistURI } isPlaying= { this.props.isPlaying } accessToken={ this.props.accessToken }/>
			</div>
		)
	}
}

export default SpotifyPlayer
