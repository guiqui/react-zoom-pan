import React, { Component } from 'react';
import Link from './Link';
import Registry from '../registry/Registry';
import Matrix from '../helpers/Matrix';

class LinkRenderer extends Component {
  constructor(props) {
    super(props);
    this.renderLink = this.renderLink.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.links !== nextProps.links || this.props.selection !== nextProps.selection;
  }
  getCoordinates(link) {
    let start = Registry.get(link.start);
    debugger;
    let outputIndex = start.outputs
      ? start.outputs
          .map((x) => {
            return x.id;
          })
          .indexOf(link.output)
      : 0;
    let startTr =
      start == this.props.selection.item && this.props.selection.matrix ? this.props.selection.matrix : new Matrix(start.transform);
    let stCoor = {
      x: startTr.trx + start.w - 10,
      y: startTr.try + outputIndex * 20 + 27
    };
    let endTr = null;
    let enCoor = null;
    if (link.end === '*') {
      endTr = this.props.selection.matrix;
      enCoor = { x: endTr.trx, y: endTr.try };
      console.log(enCoor);
    } else {
      debugger;
      let end = Registry.get(link.end);
      endTr = end == this.props.selection.item && this.props.selection.matrix ? this.props.selection.matrix : new Matrix(end.transform);
      let inputIndex = end.inputs ? end.inputs.indexOf(link.input) : 0;
      enCoor = { x: endTr.trx + 9, y: endTr.try + 27 };
    }

    return { start: stCoor, end: enCoor };
  }

  renderLink() {
    let result = null;

    if (this.props.links) {
      result = this.props.links.map((item, index) => {
        let coordinates = this.getCoordinates(item);
        return (
          <Link
            key={index}
            start={coordinates.start}
            end={coordinates.end}
            creating={item.end == '*'}
            item={item}
            selected={item == this.props.selection.item}
            color={'black'}
          />
        );
      });
    }
    return result;
  }

  render() {
    return <g>{this.renderLink()}</g>;
  }
}

export default LinkRenderer;
