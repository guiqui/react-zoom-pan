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
            <div h={100} w={200}>
              guillermo
            </div>
            <div w={100} h={200}>
              guillermo2
            </div>
            <div w={100} h={200}>
              guillermo2
            </div>
            <div w={100} h={200}>
              guillermo2
            </div>
          </Flow>
        </div>
      </div>
    );
  }
}

export default App;
