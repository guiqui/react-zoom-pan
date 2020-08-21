import React, { Component } from 'react';
import Flow from 'libs/Flow';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
  }
  onSelectItem = (item) => {
    this.setState({ selectedItem: item });
  };
  onChange = (item, position) => {
    item.transform = position.transform;
    // item.w = position.w;
    // item.h = position.h;
  };
  onAddLink = (item) => {
    let newLinks = [...this.state.links, item];
    this.setState({ links: newLinks });
  };

  render() {
    return (
      <div className="app-container">
        <div className="title-container">
          <h2 style={{ flex: 1 }}>React Zoom Pan Demo </h2>
          <a href="http://uxxu.io">
            <img style={{ width: 120, margin: 10 }} draggable="false" src="https://uxxu.io/images/logo.png" />
          </a>
        </div>
        <div className="flow-container">
          <Flow>
            <div className="viewport-element" x={50} y={50} h={100} w={200}>
              <input type="text" />
            </div>
            <div className="viewport-element" x={400} y={300} w={700} h={200}>
              <img
                draggable="false"
                src="https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349"
              />
            </div>
            <div className="viewport-element" x={100} y={300} w={200} h={200}>
              <img
                draggable="false"
                style={{ width: '100%', height: '100%' }}
                src="https://s.gravatar.com/avatar/e2e674b507196e6b07241b3a5d2ac166?size=496&default=retro"
              />
            </div>
            <div className="viewport-element container1" x={800} y={50} w={200} h={50}>
              container
            </div>
            <div className="viewport-element" x={400} y={600} w={100} h={200}>
              <div>1</div>
              <div>2</div>
            </div>
            <div className="viewport-element" x={400} y={50} h={150} w={200}>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <button>Do it!</button>
            </div>
          </Flow>
        </div>
      </div>
    );
  }
}

export default App;
