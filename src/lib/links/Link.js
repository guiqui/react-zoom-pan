import React, { Component } from 'react';
// import {ConnectorSides} from 'store/domain/ObjectDefinition'
// import DrawComander from 'store/comander/DrawComander'

const CASE_VERTICAL = 111;
const CASE_MIXED_H_V = 112;
const CASE_MIXED_V_H = 113;
const CASE_HORIZONTAL = 114;

const SIDE_VERTICAL = 111;
const SIDE_HORIZONTAL = 112;

class Link extends Component {
  constructor(props) {
    super(props);
    this.calculatePath = this.calculatePath.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.linkCoordinates = this.linkCoordinates.bind(this);
  }

  calculatePath(coodinate) {
    return `M${this.props.start.x} ${this.props.start.y}  ${coodinate.cpt1.x} ${coodinate.cpt1.y} ${coodinate.cpt2.x} ${coodinate.cpt2.y} ${this.props.end.x} ${this.props.end.y}`;
  }

  linkCoordinates() {
    let cpt1 = { x: 0, y: 0 };
    let cpt2 = { x: 0, y: 0 };
    let middle = 0;
    middle = this.props.start.x + (this.props.end.x - this.props.start.x) / 2;
    cpt1 = { x: middle, y: this.props.start.y };
    cpt2 = { x: middle, y: this.props.end.y };
    return { cpt1: cpt1, cpt2: cpt2 };
  }
  getMessageCoord(coor) {
    let middle = 0;

    //Solo en y por ahora
    if (coor.cpt1.y == coor.cpt2.y) {
      return coor.cpt1.y;
    }
    if (coor.cpt1.y < coor.cpt2.y) {
      middle = (coor.cpt2.y - coor.cpt1.y) / 2;
      return coor.cpt1.y + middle;
    } else {
      middle = (coor.cpt1.y - coor.cpt2.y) / 2;
      return coor.cpt2.y + middle;
    }
  }
  onMouseDown(e) {
    //   DrawComander.cmp_selectItem(this.props.item)
  }

  render() {
    let stroke = this.props.selected ? '#ee63f3' : this.props.color; //'#7ED321'
    let middleCoor = this.linkCoordinates();
    let messageCoorY = this.getMessageCoord(middleCoor);
    return (
      <g pointerEvents={this.props.creating ? 'none' : 'all'}>
        <path
          d={this.calculatePath(middleCoor)}
          stroke={stroke}
          strokeLinejoin="round"
          fill="transparent"
          strokeWidth="2"
          onMouseDown={this.onMouseDown}
        />
        {/* <rect x={middleCoor.cpt1.x-50} y={messageCoorY-10} width='100' height='20' stroke={stroke}  fill='white' strokeWidth="2" rx="10" ry="10" onMouseDown={this.onMouseDown}/>   
            <text x={middleCoor.cpt1.x} y={messageCoorY+3} style={{"textAnchor":"middle"}} fontSize="11" fill='black'  xmlSpace="preserve">{this.props.item.label}</text> */}
        <circle cx={this.props.start.x} cy={this.props.start.y} r="4" fill="white" stroke={stroke} strokeWidth="2" />
        <circle cx={this.props.end.x} cy={this.props.end.y} r="4" fill="white" stroke={stroke} strokeWidth="2" />
      </g>
    );
  }
}

export default Link;
