import React from 'react'


class MainDisplay extends React.Component {
	constructor(props) {
		super(props);
    this.handleNext = this.handleNext.bind(this)

		this.state = {
			currentIndex: 0,
			artworks: this.props.artworks
		}
	}


  handleNext(e) {
    this.setState({
      currentIndex: this.state.currentIndex + 1
    })
  }


	render() {
		return (
			<div className="main-display">
				<img src={ this.state.artworks[this.state.currentIndex].ThumbnailURL } />
				<br />
				{ this.state.currentIndex < this.props.artworks.length - 1 &&
					<button onClick={ this.handleNext }>Next</button>
				}

			</div>
		)
	}
}



export default MainDisplay

