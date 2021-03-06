import React, { Component } from 'react';
import './App.css'
import allArtworks from './artworks.csv'
import * as d3 from 'd3'
import MainDisplay from './MainDisplay.js'
import PreviewDisplay from './PreviewDisplay.js'
import RadioSelect from './RadioSelect.js'
import SpotifyLogin from './SpotifyLogin.js'
import SpotifyPlayer from './SpotifyPlayer.js'


const options = [
  { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
      ];

const galleryLengthOptions = [
  { value: 1, label: "1", name: "gallery-length" },
  { value: 3, label: "3", name: "gallery-length" },
  { value: 5, label: "5", name: "gallery-length" },
];


function getAccessTokenFromURL(url) {
	if (url.hash) {
		return url.hash.split("access_token=")[1].split("&")[0]
	} else {
		return null
	}

}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.handleStart = this.handleStart.bind(this)

		this.mainDisplayRef = React.createRef()

    this.state = {
      artists: [],
      artworks: [],
      data: null,
      isLoading: true,
      isFullscreen: false,
      currentIndex: 0,
			spotifyAccessToken: getAccessTokenFromURL(new URL(window.location.href)),
			isPlaying: false
    };
  }

  componentDidMount() {
    // Load artworks from artworks.csv
    var th = this;
    d3.csv(allArtworks).then(function(data) {
      var artists = d3.nest()
        .key(function(d) { return d.Artist }).sortKeys(d3.ascending)
        .entries(data).map(x => ({ label: x.key, value: x.key }));

      th.setState({
        data: data.filter(row => row.ThumbnailURL !== ""),
        artists: options,
        artworks: [{ URL: "http://www.moma.org/media/W1siZiIsIjU5NDA1Il0sWyJwIiwiY29udmVydCIsIi1yZXNpemUgMzAweDMwMFx1MDAzZSJdXQ.jpg?sha=137b8455b1ec6167" }],
        isLoading: false,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)

    var string = data.get("search");
    var length = data.get("gallery-length");

    var artworks = this.state.data.filter(row => row.Artist && row.Artist.toLowerCase().includes(string));
    this.setState({ artworks: artworks.slice(0, length) });
  }

  handleRandom(e) {
    const data = new FormData(e.target)

    var string = data.get("search");
    var length = data.get("gallery-length");

    var artworks = this.state.data
    if (string) {
      artworks = artworks.filter(row => row.Artist && row.Artist.toLowerCase().includes(string));
    }

    // Shuffle
    var i = artworks.length, tmp, r;
    while (0 !== i) {
      r = Math.floor(Math.random() * i);
      i -= 1;

      tmp = artworks[i]
      artworks[i] = artworks[r]
      artworks[r] = tmp
    }

    this.setState({ artworks: artworks.slice(0, length) });
  }

  handleStart(e) {
    this.setState({ isFullscreen: true, currentIndex: 0, isPlaying: true })
  }

  render() {

    var isFullscreen = this.state.isFullscreen

    if (isFullscreen) {
      this.mainDisplayRef.current.webkitRequestFullscreen()
    }

    return (
			<div className="app-container App">

        <h1>Art Trip</h1>
				<div className="inputs-container">

					// Set music
					{ this.state.spotifyAccessToken ?
						<SpotifyPlayer accessToken={ this.state.spotifyAccessToken } isPlaying={ this.state.isPlaying }/>
						:
						<SpotifyLogin /> }
					<br />

					// Set parameters
					<form onSubmit={ this.handleSubmit }>
						<RadioSelect label="How many songs?" options={ galleryLengthOptions } selectedValue="3" />
						<input name="search" type="text" placeholder="Search artist" />
						<button type="submit">Find</button>
						<button onClick={ this.handleRandom }>Random</button>
					</form>
					<br />
					<button onClick={ this.handleStart }>Start!</button>

				</div>
				<h3>{ this.state.isLoading ? "Loading.." : "" }</h3>
				<div className="main-display-container" ref={ this.mainDisplayRef }>
					{ isFullscreen &&
							<MainDisplay artworks={ this.state.artworks }/>
					}
				</div>
				<div className="preview-display-container">
					{ !isFullscreen &&
							<PreviewDisplay artworks={ this.state.artworks }/>
					}
				</div>
			</div>
    );
  }
}

export default App;
