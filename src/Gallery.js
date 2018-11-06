import React from 'react'
import ReactDOM from 'react-dom'
import { Carousel } from 'react-bootstrap'

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.previewRef = React.createRef()
    this.frameRef = React.createRef()
    this.handleNext = this.handleNext.bind(this)
    this.state = {
      currentIndex: 0,
    }
  }

  handleNext(e) {
    this.setState({
      currentIndex: this.state.currentIndex + 1
    })
  }

  render() {
    var isFullscreen = this.props.isFullscreen;
    if (isFullscreen) {
      this.frameRef.current.webkitRequestFullscreen()
    }
    return (
      <div>
        <div class="frame" ref={ this.frameRef }>
          { isFullscreen &&
          <img src={ this.props.artworks[this.state.currentIndex].ThumbnailURL } />
          }
          <br />
          { isFullscreen && this.state.currentIndex < this.props.artworks.length - 1 &&
            <button onClick={ this.handleNext }>Next</button>
          }
        </div>
        <div class="preview" ref={ this.previewRef }>
          { this.props.artworks.map((artwork, i) => (
            <div key={i}>
              <h2>{ artwork.Title }</h2>
              <h3>{ artwork.Artist }</h3>
              <img src={ artwork.ThumbnailURL } />
            </div>
         )) }
        </div>
      </div>
    );
  }
}


export default Gallery;
