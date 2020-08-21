# react-zoom-pan

[![npm](https://img.shields.io/npm/v/react-zoom-pan.svg?style=flat-square)](http://npm.im/react-zoom-pan)
[![MIT License](https://img.shields.io/npm/l/react-list.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://travis-ci.org/guiqui/react-zoom-pan.svg?branch=master)](https://travis-ci.org/guiqui/react-timeline)
[![codecov](https://codecov.io/gh/guiqui/react-zoom-pan/branch/master/graph/badge.svg)](https://codecov.io/gh/guiqui/react-zoom-pan)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9149e301e65b44cebf2e7b49316aee10)](https://www.codacy.com/app/gquiman/react-zoom-pan?utm_source=github.com&utm_medium=referral&utm_content=guiqui/react-zoom-pan&utm_campaign=Badge_Grade)
<img src="https://opencollective.com/react-zoom-pan/tiers/backer/badge.svg?label=backer&color=brightgreen" />

A react component that enables you to add pan,zoom,resize and rotation functionality to your application

![screencast](https://guiqui.github.io/react-zoom-pan/demo.gif)

## About

With React-zoom-pan is a container component that has g zoom and pan functionality as well as adding resize,move,and rotatation capabilities to any child element .

The component is capable of:

- Can handle thousands of elements .
- Pan Viewport
- Move elements
- Resize elements.
- Rotate elements.
- Zoom.
- Wheel zoom.
- Fully customisable elements.

To watch a demo take a look at [video](https://youtu.be/ASGD1FXOafw) that shows how to use the component.

To play with a live [demo](https://guiqui.github.io/react-zoom-pan/index.html) .

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/react-zoom-pan/)]

## Installation

```javascript
npm install react-zoom-pan
```

## Getting started

Using this component is really easy,
An example of data definition:

```javascript
import React, { Component } from 'react';
import Flow from 'libs/Flow';

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

**Links** :is also an array of objects that contains links between task. Each one of the object that are part of the array need to have the following compulsory fields:

| Property |     value     | Descriptions                       |
| -------- | :-----------: | :--------------------------------- |
| id       | String/Number | An unique identifier for the class |
| start    | String/Number | The id of the start task           |
| end      | String/Number | The id of the end task             |

An example of data definition:

```javascript
let links = [
  { id: 1, start: 1, end: 2 },
  { id: 2, start: 1, end: 3 }
];
```

Once the data is define we just need to declare the component and populate it with both data providers.

```javascript

<TimeLine  data={data} links={links}/>);
```

Here is the demo code:

[![Edit 1y2on87jj](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y2on87jj)

## Handling Inserts,Updates and Deletes

The react-zoom-pan was build to be use under a Flux architecture, this means that the component should not be managing the state of the application, is up the store and only the store to modify the state of the application. What our component does is to give you callbacks to know when the component is asking for a change.

The TimeLine component is responsible for two things:

- Updating task:Changing name ,start and end date
- Creating Links

Adding,Deleting Task or links can be manage with logic outside the component.
For this reason the react-zoom-pan component provides the following callbacks:

| name         |          params          |                                                                                                                                           Descriptions |
| ------------ | :----------------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------: |
| onCreateLink |       link:Object        |                                                      This callback is trigger when the component is notifying the creating of a link between two tasks |
| onUpdateTask | task:Object,props:Object | This callback is trigger when the component is notifying the updating of a Task, Sen the task we want to changes, and the properties we want to change |
| onSelectItem |       item:Object        |                                                                         This callback is trigger when an item is selected this can be a task or a link |

Here is a simple demo of how to handle updates task and link creation:

[![Edit 3rl69y5ylq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3rl69y5ylq)

- When you drag a task or resize an update will be triggered.
- You can create a task by clicking in the black dot at the end of a task and drag and drop it to the beginning of another task.A demo of how it works can be seen [here](https://youtu.be/ASGD1FXOafw)

Here is a full crud example: This demo illustrate how to do a simple application

[![Edit 3x8nl16p65](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3x8nl16p65)

Here is a fully working Redux demo

[![Edit 613vkoq8nr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/613vkoq8nr)

## Paging

Paging is manage using the event onHorizonChange.The timeline component preload a certain date range of data, once the user start scrolling when the timeline realise that needs data for a new range, it trigger the onHorizonChange event.
This method then can be use to support serverside paging or client filtering.

| name            |     params     |                                                                                               Descriptions |
| --------------- | :------------: | ---------------------------------------------------------------------------------------------------------: |
| onHorizonChange | start,end:Date | This callback is trigger when the component is notifying that needs to load data for a new range of dates. |

Here is a demo app that shows how to use onHorizonChange, to only display the relvant data for a period:

[![Edit n09l7m400j](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n09l7m400j)

## Customisation

To customise the look and feel the react-zoom-pan component provides a configuration object that can be pass as a property.
Here is the structure of the config object :

```javascript
{
	header:{ //Targert the time header containing the information month/day of the week, day and time.
		month:{//Tartget the month elements
			dateFormat:'MMM YYYY',//The format used to diplay the month information
			style:{backgroundColor:"#333333"} //The style applied to the month elements
		},
		dayOfWeek:{//Tartget elements displaying the day of week info
			style:{backgroundColor:"chocolate"}, //The style applied to the day of week elements
			selectedStyle:{backgroundColor:"#b13525"}//The style applied to the day of week elements when is selected
		},
		dayTime:{//Tartget elements displaying the day number or time
			style:{background:"grey",fontSize:9},//the style tp be applied
			selectedStyle:{backgroundColor:"#b13525",fontWeight:  'bold'}//the style tp be applied  when selected
		}
	},
	taskList:{//the right side task list
		title:{//The title od the task list
			label:"Projects",//The caption to display as title
			style:{backgroundColor:  '#333333',borderBottom:  'solid 1px silver',
				   color:  'white',textAlign:  'center'}//The style to be applied to the title
		},
		task:{// The items inside the list diplaying the task
			style:{backgroundColor:  '#fbf9f9'}// the style to be applied
		},
		verticalSeparator:{//the vertical seperator use to resize he width of the task list
			style:{backgroundColor:  '#333333',},//the style
			grip:{//the four square grip inside the vertical separator
				style:{backgroundColor:  '#cfcfcd'}//the style to be applied
			}
		}
	},
	dataViewPort:{//The are where we display the task
		rows:{//the row constainting a task
			style:{backgroundColor:"#fbf9f9",borderBottom:'solid 0.5px #cfcfcd'}
			},
		task:{the task itself
			showLabel:false,//If the task display the a lable
			style:{position:  'absolute',borderRadius:14,color:  'white',
				   textAlign:'center',backgroundColor:'grey'},
			 selectedStyle:{}//the style tp be applied  when selected
		}
	},
	links:{//The link between two task
		color:'black',
		selectedColor:'#ff00fa'
	}
}
```

Once the object is defined we just need to pass the config object to the timeline config property.

```javascript
<TimeLine  data={data} links={links}/>);
```

This diagram shows the different elements of timeline component and where are they place:

![configMap](https://guiqui.github.io/react-zoom-pan/ConfigMap.png)

Here is a demo:

[![Edit 2w93lvmqv0](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2w93lvmqv0)

## Other properties

| Property | value  |                                                    Descriptions |
| -------- | :----: | --------------------------------------------------------------: |
| mode     | string | set the zoom level.The possible values are:"month","week","day" |  |
