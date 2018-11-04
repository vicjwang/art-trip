import React, { Component } from 'react'; import logo from './logo.svg';
import './App.css';
import allArtworks from './artworks.csv';
import * as d3 from 'd3';
import Gallery from './Gallery.js';
import RadioSelect from './RadioSelect.js';


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

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.state = {
      artists: [],
      artworks: [],
      data: null,
      isLoading: true,
      isFullscreen: false,
    };
  }

  componentDidMount() {
    // Load artworks from artworks.csv
    var th = this;
    d3.csv(allArtworks).then(function(data) {
      var artists = d3.nest()
        .key(function(d) { return d.Artist }).sortKeys(d3.ascending)
    //    .rollup(function(leaves) { return leaves.length; })
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

    // Toggle hide

    // Fullscreen
    
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
    this.setState({ isFullscreen: true })
  }

  render() {
    return (
      <div className="App">
        <h1>Art Trip</h1>
        <form onSubmit={ this.handleSubmit }>
          <RadioSelect label="How many?" options={ galleryLengthOptions } selectedValue="3" />
          <input name="search" type="text" placeholder="Search artist" />
          <button type="submit">Find</button>
          <button onClick={ this.handleRandom }>Random</button>
        </form>
        <button onClick={ this.handleStart }>Start!</button>
        <h3>{ this.state.isLoading ? "Loading.." : "" }</h3>
        <Gallery artworks={ this.state.artworks } isFullscreen={ this.state.isFullscreen } currentIndex={0}/>
      </div>
    );
  }
}

export default App;
