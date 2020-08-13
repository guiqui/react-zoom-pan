import React from 'react';
import ViewPort from './Flow';
import { shallow } from 'enzyme';
import ContainerData from 'store/domain/vo/ContainerData';
let root = new ContainerData('root', null, -1, '1, 0, 0, 1, 0, 0', [], null);
const drawingData = { selectedItem: null, root: root };

it('renders correctly', () => {
  const tree = shallow(<ViewPort drawingData={drawingData} />);
  expect(tree).toMatchSnapshot();
});
