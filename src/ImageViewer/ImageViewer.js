import React, { Component, PropTypes } from 'react';
import './ImageViewer.css';

class ImageViewer extends Component {

  state = {
    scale: 1,
    update: true,
    panEnabled: false,
    position: {
      x: (this.props.viewportWidth / 2) - (this.props.imageWidth / 2),
      y: (this.props.viewportHeight / 2) - (this.props.imageHeight / 2),
    },
  };

  handleZoomIn = () => this.setState({
    scale: 3,
    panEnabled: true,
  });

  handleZoomOut = () => this.setState({
    scale: 1,
    panEnabled: false,
    position: {
      x: (this.props.viewportWidth / 2) - (this.props.imageWidth / 2),
      y: (this.props.viewportHeight / 2) - (this.props.imageHeight / 2),
    }
  });

  handlePan = (ev) => {
    ev.preventDefault();
    if (this.state.panEnabled) {
      const { clientX, clientY } = ev;
      this.setState({
        startX: clientX - this.state.position.x,
        startY: clientY,
      });

      const { imageWidth: originalImageWidth, imageHeight: originalImageHeight } = this.props;

      document.onmousemove = (e) => {
        const imageProps = this.image.getBoundingClientRect();
        const viewportProps = this.viewport.getBoundingClientRect();
        const { startX, startY, scale } = this.state;
        let axisX = e.clientX - startX;
        let axisY = e.clientY - startY;
        const scaledWidthAdustment = (imageProps.width/scale);
        const scaledHeightAdjustment = (imageProps.height/scale);

        if (viewportProps.right >= imageProps.right) {
          axisX = Math.max(viewportProps.width - scaledWidthAdustment - originalImageWidth, axisX);
        }

        if (viewportProps.left <= imageProps.left) {
          axisX = Math.min(scaledWidthAdustment, axisX);
        }

        if (viewportProps.top <= imageProps.top) {
          axisY = Math.min(scaledHeightAdjustment, axisY);
        }

        this.setState({
          cursor: 'move',
          position: {
            x: Math.max(viewportProps.width - scaledWidthAdustment - originalImageWidth, axisX),
            y: Math.max(viewportProps.height - scaledHeightAdjustment - originalImageHeight, axisY),
           },
         });
      }
    }
  }

  handlePanStop = (e) => {
    document.onmousemove = function() {};
    this.setState({
      cursor: 'default',
    });
  }

  render() {
    const { cursor, position, scale } = this.state;
    const { viewportWidth, viewportHeight, imageWidth, imageHeight } = this.props;
    return (
      <section
        className="ImageViewer"
      >
        <div
          className="ImageViewer-viewport"
          ref={(ref) => this.viewport = ref}
          style={{ width: viewportWidth, height: viewportHeight }}
        >
          <img
            onMouseDown={this.handlePan}
            onMouseUp={this.handlePanStop}
            src={`${this.props.imageSrc}?height=${imageWidth}&=${imageHeight}`}
            className="ImageViewer-image"
            ref={(ref) => this.image = ref}
            alt="Bonobos"
            style={{
              cursor: cursor,
              height: imageHeight,
              left: position.x,
              top: position.y,
              width: imageWidth,
              transform: `scale(${scale})`,
            }}
          />
        </div>
        <div>
          <button onClick={this.handleZoomIn}>
            Zoom In
          </button>
          <button onClick={this.handleZoomOut}>
            Zoom Out
          </button>
        </div>
      </section>
    );
  }
}

ImageViewer.propTypes = {
  imageSrc: PropTypes.string,
};

ImageViewer.defaultProps = {
  imageWidth: 500,
  imageHeight: 500,
  viewportWidth: 500,
  viewportHeight: 500,
};

export default ImageViewer;
