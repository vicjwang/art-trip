import React from 'react';


class Artwork extends React.Component {

    constructor(props) {
      super(props);
      this.model = props.model;
    }
    render() {
      return (
//        <img src={this.props.model.url} alt='Artwork'/>
        <p>hello</p>
      );
    }
}


export default Artwork;
