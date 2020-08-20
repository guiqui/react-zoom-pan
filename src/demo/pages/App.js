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
          <h1>Getting Started Demo</h1>
        </div>
        <div className="flow-container">
          <Flow>
            <div className="viewport-element" x={50} y={50} h={100} w={200}>
              <input type="text" />
            </div>
            <div className="viewport-element" w={100} h={200}>
              <img
                draggable="false"
                src="https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349"
              />
            </div>
            <div className="viewport-element" w={100} h={200}>
              guillermo2
            </div>
            <div className="viewport-element" w={100} h={200}>
              guillermo2
            </div>
            <div className="viewport-element" w={100} h={200}>
              <div>1</div>
              <div>2</div>
            </div>
            <div className="viewport-element" x={50} y={50} h={100} w={200}>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <button>Hi</button>
            </div>
          </Flow>
        </div>
      </div>
    );
  }
}

export default App;
