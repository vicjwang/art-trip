import React from 'react'


class MainDisplay extends React.Component {
	constructor(props) {
		super(props);
    this.handleNext = this.handleNext.bind(this)

		this.state = {
			artworks: this.props.artworks,
            currentIndex: this.props.currentIndex
		}
	}


  handleNext(e) {
    this.setState({
      currentIndex: this.state.currentIndex + 1
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentIndex: this.props.currentIndex
    })
  }

	render() {
        var currentArtwork = this.state.artworks[this.state.currentIndex]
		return (
			<div className="main-display">
				<img src={ currentArtwork.ThumbnailURL } />
				<br />
				{ this.state.currentIndex < this.props.artworks.length - 1 &&
					<button onClick={ this.handleNext }>Next</button>
				}

			</div>
		)
	}
}



export default MainDisplay

