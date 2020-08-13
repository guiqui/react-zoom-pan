import React, { Component } from 'react';
import Consts, { ObjectTypes } from '../helpers/ViewPortConst';
import SpacialHelper from '../helpers/SpacialHelper';
import './RubberBand.css';

class RubberBand extends Component {
  constructor(props) {
    super(props);
    this.calculateCoordinates = this.calculateCoordinates.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.selectedItem ||
      nextProps.viewport.viewportTr !== this.props.viewport.viewportTr ||
      nextProps.viewport.selectedTr !== this.props.viewport.viewportTr ||
      nextProps.viewport.parentTr !== this.props.viewport.viewportTr
    );
  }

  calculateCoordinates() {
    let box = SpacialHelper.calculateRubberBandPosition(
      this.props.viewport.selection.matrix,
      this.props.viewport.selection.box,
      this.props.viewport.viewportMtx,
      null
    );
    return { x: box.x, y: box.y, w: box.w, h: box.h, transform: box.transform };
  }

  render() {
    let coordinates = this.calculateCoordinates();
    const { selection } = this.props;
    if (!selection) return null;

    return (
      <svg
        id="Rubberband"
        className="rubberBand-Container"
        width="100%"
        height="100%"
        onMouseDown={(event) => {
          this.props.doRubberMouseDown(event, Consts.MODE_RUBER_BAND_MOVE);
        }}
      >
        <g transform={`matrix(${coordinates.transform})`}>
          <rect
            ref="ruberBandRect"
            className="rubberBand"
            x={coordinates.x}
            y={coordinates.y}
            width={coordinates.w}
            height={coordinates.h}
          />

          <rect
            ref="ruberBandTopLeft"
            className="rubberBandHandle"
            x={coordinates.x - Consts.RUBBER_BAND_HANDLE_SIZE}
            y={coordinates.y - Consts.RUBBER_BAND_HANDLE_SIZE}
            width={Consts.RUBBER_BAND_HANDLE_SIZE}
            height={Consts.RUBBER_BAND_HANDLE_SIZE}
            onMouseDown={(event) => {
              this.props.doRubberMouseDown(event, Consts.MODE_RUBER_BAND_RESIZE_UL);
            }}
          />
          <rect
            ref="ruberBandTopRight"
            className="rubberBandHandle"
            x={coordinates.x + coordinates.w}
            y={coordinates.y - Consts.RUBBER_BAND_HANDLE_SIZE}
            width={Consts.RUBBER_BAND_HANDLE_SIZE}
            height={Consts.RUBBER_BAND_HANDLE_SIZE}
            onMouseDown={(event) => {
              this.props.doRubberMouseDown(event, Consts.MODE_RUBER_BAND_RESIZE_UR);
            }}
          />
          <rect
            ref="ruberBandBottomLeft"
            className="rubberBandHandle"
            x={coordinates.x - Consts.RUBBER_BAND_HANDLE_SIZE}
            y={coordinates.y + coordinates.h}
            width={Consts.RUBBER_BAND_HANDLE_SIZE}
            height={Consts.RUBBER_BAND_HANDLE_SIZE}
            onMouseDown={(event) => {
              this.props.doRubberMouseDown(event, Consts.MODE_RUBER_BAND_RESIZE_DL);
            }}
          />
          <rect
            ref="ruberBandBottomRight"
            className="rubberBandHandle"
            x={coordinates.x + coordinates.w}
            y={coordinates.y + coordinates.h}
            width={Consts.RUBBER_BAND_HANDLE_SIZE}
            height={Consts.RUBBER_BAND_HANDLE_SIZE}
            onMouseDown={(event) => {
              this.props.doRubberMouseDown(event, Consts.MODE_RUBER_BAND_RESIZE_DR);
            }}
          />
          <rect
            ref="ruberBandBottomLeft"
            className="rubberBandHandle"
            x={coordinates.x + coordinates.w / 2 - Consts.RUBBER_BAND_HANDLE_SIZE}
            y={coordinates.y + coordinates.h / 2}
            width={Consts.RUBBER_BAND_HANDLE_SIZE}
            height={Consts.RUBBER_BAND_HANDLE_SIZE}
            onMouseDown={(event) => {
              this.props.doRubberMouseDown(event, Consts.MODE_RUBER_BAND_ROTATE);
            }}
          />
        </g>
      </svg>
    );
  }
}

export default RubberBand;
