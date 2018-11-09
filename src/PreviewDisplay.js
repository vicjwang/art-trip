import React from 'react'

class PreviewDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="preview-display">
				{ this.props.artworks.map((artwork, i) => (
					<div key={i}>
						<h2>{ artwork.Title }</h2>
						<h3>{ artwork.Artist }</h3>
						<img src={ artwork.ThumbnailURL } />
					</div>
				 )) }
      </div>
    );
  }
}


export default PreviewDisplay;
