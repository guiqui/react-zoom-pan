import React from 'react';
import RubberBand from './rubberBand/RubberBand';
import Consts, { ObjectTypes } from './helpers/ViewPortConst';
import SpacialHelper from './helpers/SpacialHelper';
import ZoomPanHelper from './helpers/ZoomPanHelper';
import Matrix from './helpers/Matrix';
import { ViewPortElement } from './renderer/HOCElement';
import './ZoomPan.css';
export interface ICoor {
  x: number;
  y: number;
}

export interface IZoomPanProps {
  viewportMtx?: any;
  children?: any;
  selectedItem?: any;
  onSelectItem?: Function;
  onChange?: Function;
  onAddItem?: Function;
}

export interface IZoomPanState {
  dragging?: boolean;
  viewportMtx: Matrix;
  viewportTr?: string;
  selection: any;
  box?: any;
}

export class ZoomPan extends React.Component<IZoomPanProps, IZoomPanState> {
  selection: any = null;
  zoomPanHelper: ZoomPanHelper;
  draggingPositionX: number = 0;
  draggingPositionY: number = 0;
  mode = Consts.MODE_GLOBAL_PAN;

  constructor(props) {
    super(props);

    //Init Controllers
    this.zoomPanHelper = new ZoomPanHelper();

    //Initialization of state
    this.state = {
      dragging: false,
      viewportMtx: new Matrix(this.props.viewportMtx),
      viewportTr: '1,0,0,1,0,0',
      selection: this.getSelectedObjInfo(null),
    };
    this.draggingPositionX = 0;
    this.draggingPositionY = 0;
    this.mode = Consts.MODE_GLOBAL_PAN;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dragging !== this.state.dragging) {
      this.addRemoveMouseListener(nextState, this.state);
    }
    if (nextProps.selectedItem !== this.props.selectedItem) {
      //force state to be new selection
      nextState.selection = this.getSelectedObjInfo(nextProps.selectedItem);
    }

    return true;
  }

  addRemoveMouseListener = (newState, oldState) => {
    if (newState.dragging && !oldState.dragging) {
      document.addEventListener('mousemove', this.doMouseMove);
      document.addEventListener('mouseup', this.doMouseUp);
    } else if (!newState.dragging && oldState.dragging) {
      document.removeEventListener('mousemove', this.doMouseMove);
      document.removeEventListener('mouseup', this.doMouseUp);
    }
  };

  getSelectedObjInfo = (item) => {
    let matrix = item ? new Matrix(item.transform) : new Matrix();
    let box = item
      ? { id: item.id, x: 0, y: 0, w: item.w, h: item.h }
      : { id: '', x: 0, y: 0, w: 0, h: 0 };
    let type = item ? this.getObjType(item) : ObjectTypes.TYPE_ITEM;
    return {
      id: item ? item.id : -1,
      item: item,
      matrix: matrix,
      transform: matrix.matrixToText(),
      box: box,
      type: type,
    };
  };

  ///////////////////
  /// MOUSE EVENT ///
  ///////////////////

  //When we click anywhere that is not an Object or the rubberband
  doGlobalMouseDown = (e) => {
    if (e.button === 0) {
      this.setDraggingPosition(e);
      this.setState({ dragging: true });
      this.mode = Consts.MODE_GLOBAL_PAN;
    }
  };

  doObjectMouseDown = (e, parent, item) => {
    e.stopPropagation();
    this.setDraggingPosition(e);
    this.setState({ dragging: true });
    if (this.props.onSelectItem) this.props.onSelectItem(parent, item);
    this.selection = item;
    //this.updateSelectedInfo(parent, item);
    let selection = this.getSelectedObjInfo(item);
    this.setState({ dragging: true, selection: selection });
    this.mode = Consts.MODE_RUBER_BAND_MOVE;
  };

  doRubberMouseDown = (e, mode, item) => {
    e.stopPropagation();
    this.setDraggingPosition(e);
    this.setState({ dragging: true });
    this.mode = mode;
  };

  ///////////////////////
  /// MOUSE EVENTS  ////
  /////////////////////

  doMouseMove = (e) => {
    if (this.state.dragging) {
      console.log('Moving');
      e.stopPropagation();
      const coor: ICoor = this.adjustCoor(e.clientX, e.clientY);
      let x = coor.x;
      let y = coor.y;

      let deltaX = this.draggingPositionX - x;
      let deltaY = this.draggingPositionY - y;

      switch (this.mode) {
        case Consts.MODE_GLOBAL_PAN:
          this.pan(deltaX, deltaY);
          break;
        case Consts.MODE_RUBER_BAND_MOVE:
          this.updateSelectedItem(
            SpacialHelper.moveObject(deltaX, deltaY, this.state)
          );
          break;
        case Consts.MODE_RUBER_BAND_ROTATE:
          this.updateSelectedItem(
            SpacialHelper.rotateObject(
              x,
              y,
              this.draggingPositionX,
              this.draggingPositionY,
              this.state
            )
          );
          break;

        case Consts.MODE_RUBER_BAND_RESIZE_UL:
        case Consts.MODE_RUBER_BAND_RESIZE_UR:
        case Consts.MODE_RUBER_BAND_RESIZE_DL:
        case Consts.MODE_RUBER_BAND_RESIZE_DR:
          let newState = SpacialHelper.resizeObject(
            deltaX,
            deltaY,
            this.mode,
            this.state
          );
          this.updateSelectedItem(newState);
          break;
      }

      this.setDraggingPosition(e);
    }
  };

  doMouseUp = (e) => {
    this.setState({ dragging: false });
    if (this.state.selection.type == ObjectTypes.TYPE_LINK) {
      if (this.props.onSelectItem) this.props.onSelectItem(null, null);
    }
    if (this.props.selectedItem && this.props.onChange)
      this.props.onChange(this.props.selectedItem, {
        transform: this.state.selection.matrix.matrixToText(),
        w: this.state.selection.box.w,
        h: this.state.selection.box.h,
      });
  };

  doMouseWheel = (e) => {
    e.preventDefault();
    const coor: ICoor = this.adjustCoor(e.clientX, e.clientY);
    let cx = coor.x;
    let cy = coor.y;
    let scale = e.deltaY > 0 ? 1.05 : 0.95;
    this.zoom(scale, cx, cy);
  };

  private adjustCoor(x: number, y: number): ICoor {
    const container: any = this.refs.container;
    const newX = x - container.offsetLeft;
    const newY = y - container.offsetTop;
    return { x: newX, y: newY };
  }

  ownEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ////////////////////////////
  //   DRAG & DROP EVENTS  //
  //////////////////////////

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e) => {
    // let objType = parseInt(e.dataTransfer.getData('objtype'));
    // if (
    //   objType == ObjectTypes.TYPE_PAGE ||
    //   objType == ObjectTypes.TYPE_ACTION ||
    //   objType == ObjectTypes.TYPE_REDUCER
    // ) {
    //   const adcoor: ICoor = this.adjustCoor(e.clientX, e.clientY);
    //   let x = adcoor.x;
    //   let y = adcoor.y;
    //   let coor = SpacialHelper.coordinatesGlobalToLocal(
    //     x,
    //     y,
    //     this.state.viewportMtx,
    //     null
    //   );
    //   let matrix = `1, 0, 0, 1, ${coor.x}, ${coor.y}`;
    //   this.addItem(e, null, matrix);
    // }
  };

  addItem = (e, parent, matrix) => {
    let type = parseInt(e.dataTransfer.getData('type'));
    let subtype = e.dataTransfer.getData('subtype');
    let objType = parseInt(e.dataTransfer.getData('objtype'));
    let name = e.dataTransfer.getData('name');
    let data = {
      name: name,
      type: type,
      objType: objType,
      subtype: subtype,
      transform: matrix,
    };
    const { onAddItem } = this.props;

    onAddItem && onAddItem(data, parent);
  };

  updateSelectedItem = (newState) => {
    let matrix = newState.matrix;
    // newState.box?newState.box.id=this.state.box.id:null;
    let box = newState.box ? newState.box : this.state.selection.box;
    let selection = { ...this.state.selection };
    selection.matrix = matrix;
    selection.transform = matrix.matrixToText();
    selection.box = box;
    this.setState({ box: box, selection: selection });
  };

  //////////////////////////
  // VIEW PORT ZOOM & PAN //
  /////////////////////////

  pan = (dx, dy) => {
    this.zoomPanHelper.pan(dx, dy, this.state.viewportMtx);
    this.applyMatrix();
  };

  zoom = (scale, cx, cy) => {
    this.zoomPanHelper.zoom(scale, cx, cy, this.state.viewportMtx);
    this.applyMatrix();
  };

  applyMatrix = () => {
    let newMatrix = this.state.viewportMtx.matrixToText();
    this.setState({
      viewportTr: newMatrix,
    });
  };

  /////////////////////////
  //       HELPERS       //
  /////////////////////////
  getObjType(item) {
    if (
      item.hasOwnProperty('start') &&
      item.hasOwnProperty('output') &&
      item.hasOwnProperty('end') &&
      item.hasOwnProperty('input')
    ) {
      return ObjectTypes.TYPE_LINK;
    }
    return ObjectTypes.TYPE_ITEM;
  }

  setDraggingPosition = (e) => {
    const container: any = this.refs.container;
    this.draggingPositionX = e.clientX - container.offsetLeft;
    this.draggingPositionY = e.clientY - container.offsetTop;
  };

  renderChildren = () => {
    let selection = this.state.selection;
    const { children } = this.props;
    if (children == null) return null;
    console.log(children);
    debugger;
    const result = children.map((item, i) => {
      console.log(item.id);
      console.log(`s:${selection.id}  id:${i} `);
      const transform = selection.id == i ? selection.transform : null;
      const box = selection.id == i ? selection.box : null;
      console.log(box);
      return (
        <ViewPortElement
          id={i}
          key={i}
          transform={transform}
          box={box}
          doObjectMouseDown={this.doObjectMouseDown}
        >
          {item}
        </ViewPortElement>
      );
    });
    return result;
  };

  render() {
    const { viewportTr } = this.state;

    return (
      <div
        ref="container"
        className="zoom-pan-container"
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        tabIndex={0}
      >
        <div
          id="viewport"
          ref="mainSvg"
          style={{ position: 'relative', userSelect: 'none', height: '100%' }}
          onMouseDown={this.doGlobalMouseDown}
          onWheel={this.doMouseWheel}
        >
          <div
            style={{
              transform: `matrix(${viewportTr})`,
              position: 'absolute',
            }}
          >
            {this.renderChildren()}
          </div>
          <RubberBand
            selection={this.selection}
            viewport={this.state}
            doRubberMouseDown={this.doRubberMouseDown}
          />
        </div>
      </div>
    );
  }
}
