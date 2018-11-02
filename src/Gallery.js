import React from 'react'
import { Carousel } from 'react-bootstrap'
import artworks from './artworks.csv';
import * as d3 from 'd3';


class Gallery extends React.Component {

    loadArtworks() {
        console.log(artworks);
        d3.csv(artworks).then(function(data) {
            console.log(data[0]);
        });
    }

    constructor(props) {
      super(props);
      this.loadArtworks();
    }

    render() {
      return (
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="http://www.moma.org/media/W1siZiIsIjU5NDA1Il0sWyJwIiwiY29udmVydCIsIi1yZXNpemUgMzAweDMwMFx1MDAzZSJdXQ.jpg?sha=137b8455b1ec6167"/>
          </Carousel.Item>
        </Carousel>
      );
    }
}


export default Gallery;
