import React, { Component } from 'react';
import './App.css';
import ImageViewer from './ImageViewer/ImageViewer';

class App extends Component {
  render() {
    const BASE_URL = 'https://bonobos-prod-s3.imgix.net/products/';
    // Yay! Composability!
    return (
      <div className="App">
        <ImageViewer
          imageSrc={`${BASE_URL}18158/original/SHIRT_ShortSleeve_ZebraRun_JetBlack_hero1.jpg`}
          imageWidth={300}
          imageHeight={300}
        />

        <ImageViewer
          imageSrc={`${BASE_URL}12465/original/PANT_WashedChinos_TheKhakis_hero1.jpg`}
          imageWidth={250}
          imageHeight={250}
        />
      </div>
    );
  }
}

export default App;
