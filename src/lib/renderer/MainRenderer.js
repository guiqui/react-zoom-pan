import React, { Component } from 'react';

class MainRenderer extends Component {
  constructor(props) {
    super(props);
    this.cache = null;
  }

  render() {
    const { transform, children } = this.props;
    return (
      <div
        style={{
          transform: `matrix(${transform})`,
          position: 'absolute'
        }}
      >
        {children}
      </div>
    );
  }
}

export default MainRenderer;
