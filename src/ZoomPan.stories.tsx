import React from 'react';
import { storiesOf } from '@storybook/react';
import { ZoomPan } from './ZoomPan';

storiesOf('ZoomPan', module).add('Default', () => (
  <div style={{ width:'100%', height: 500, backgroundColor: 'grey' }}>
    <ZoomPan>
      <div>ddd</div>
      <div>ddd2</div>
    </ZoomPan>
  </div>
));
