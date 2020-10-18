# react-zoom-pan

[![npm](https://img.shields.io/npm/v/react-zoom-pan.svg?style=flat-square)](http://npm.im/react-zoom-pan)
[![MIT License](https://img.shields.io/npm/l/react-list.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://travis-ci.org/guiqui/react-zoom-pan.svg?branch=master)](https://travis-ci.org/guiqui/react-zoom-pan)
[![codecov](https://codecov.io/gh/guiqui/react-zoom-pan/branch/master/graph/badge.svg)](https://codecov.io/gh/guiqui/react-zoom-pan)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9149e301e65b44cebf2e7b49316aee10)](https://www.codacy.com/app/gquiman/react-zoom-pan?utm_source=github.com&utm_medium=referral&utm_content=guiqui/react-zoom-pan&utm_campaign=Badge_Grade)
[![downloads](https://img.shields.io/npm/dt/react-zoom-pan.svg?maxAge=2592000)](https://www.npmjs.com/package/react-zoom-pan)

A react component that enables you to add pan,zoom,resize and rotation functionality to your application

![screencast](https://guiqui.github.io/react-zoom-pan/presentation.gif)

## About

React-zoom-pan is a container component that has zoom and pan functionality as well as adding resize,move,and rotation capabilities to any child element .

The component is capable of:

- Can handle thousands of elements .
- Pan Viewport
- Move elements
- Resize elements.
- Rotate elements.
- Zoom.
- Wheel zoom.
- Fully customisable elements.


## demo

To play with a live [demo](https://guiqui.github.io/react-zoom-pan/index.html) .

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/react-zoom-pan/)]

## Installation

```javascript
npm install react-zoom-pan
```

## Getting started

Using this component is really easy,
Import the ZoomPan component,add the ZoomPan to your render method and add whatever other component inside the ZoomPan container.
And that's all. Now all the components inside the container can be move,resize and rotate, you also can use your mouse wheel to zoom and pan.

```javascript
import React, { Component } from 'react';
import ZoomPan from 'react-zoom-pan';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-container">
        <div className="flow-container">
          <ZoomPan>
            <div x={800} y={50} w={200} h={50}>
              container 1
            </div>
            <div x={100} y={250} w={200} h={50}>
              container 2
            </div>
          </ZoomPan>
        </div>
      </div>
    );
  }
}
```

<!-- Here is the demo code:

[![Edit 1y2on87jj](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/smoosh-leftpad-3g27o?fontsize=14&hidenavigation=1&theme=dark) -->

## Element Configuration

To set the dimensions like (x,y) positions or (width,height) on the children documents you can set the following properties:

| name |                                     Descriptions |
| ---- | -----------------------------------------------: |
| y    | The y coordinate of the top point of the element |
| w    |                         The width of the element |
| h    |                        The height of the element |

## Events

| Property     | params |                                                    Descriptions |
| ------------ | :----: | --------------------------------------------------------------: |
| onSelectItem | string | triggered when an element is selected |
| onChange     | string | triggered when an element change |
| onAddItem    | string | triggered when an element is added |
