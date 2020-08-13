import React, { Component } from 'react';
import LinkRenderer from './LinkRenderer';
import { ObjectTypes } from '../helpers/ViewPortConst';
import Registry from '../registry/Registry';
import './LinkManager.css';

class LinkManager extends Component {
  constructor(props) {
    super(props);
    this.prepareData = this.prepareData.bind(this);

    this.renderSelected = this.renderSelected.bind(this);
    this.links = { selected: null, nonSelected: this.props.links };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.links !== this.props.links || nextProps.selection !== this.props.selection) {
      console.log('LinkManager Updating');
      this.prepareData(nextProps);
      return true;
    }
    if (nextProps.transform !== this.props.transform) {
      return true;
    }
    return false;
  }

  prepareData(props) {
    if (props.selection.item != this.props.selection.item) this.links = this.separateSelectedLinks(props.selection, props.links);
  }

  separateSelectedLinks(selection, links) {
    let result = { selected: [], nonSelected: [] };
    let selectedItem = selection.item;

    if (selection.type == ObjectTypes.TYPE_LINK) {
      if (selectedItem.end == '*') {
        result.selected.push(selectedItem);
        result.nonSelected = this.links.nonSelected;
        return result;
      }

      let index = links.indexOf(selectedItem);
      let clonelinks = [...links];
      if (index > -1) clonelinks.splice(index, 1);
      result.nonSelected = clonelinks;
      result.selected.push(selectedItem);
      return result;
    } else {
      if (!links) return result;
      let selectedId = selectedItem ? selectedItem.id : null;
      if (!selectedId) {
        result.nonSelected = links;
        return result;
      }
      ///Look if event its link with the selected item or parent
      for (let i = 0; i < links.length; i++) {
        if (this.isSelected(links[i].start, selectedId) || this.isSelected(links[i].end, selectedId)) {
          result.selected.push(links[i]);
        } else {
          result.nonSelected.push(links[i]);
        }
      }
      return result;
    }
  }

  isSelected(id, selected) {
    if (id === selected) return true;
    if (!id) return false;
    let item = Registry.get(id);
    return this.isSelected(item.parent, selected);
  }

  renderSelected() {
    if (this.props.selection.item) {
      console.log('Render Selected');
      return <LinkRenderer selection={this.props.selection} links={this.links.selected} />;
    }
  }

  render() {
    console.log(`matrix(${this.props.transform})`);
    return (
      <svg
        id="LinkManager"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        <g transform={`matrix(${this.props.transform})`}>
          <LinkRenderer selection={this.props.selection} links={this.links.nonSelected} />
          {this.renderSelected()}
        </g>
      </svg>
    );
  }
}
export default LinkManager;
