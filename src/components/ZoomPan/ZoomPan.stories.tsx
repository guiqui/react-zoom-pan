import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomPan from './ZoomPan';

storiesOf('ZoomPan', module).add('Default', () => (
  <div style={{ width: 1000, height: 500, backgroundColor: 'grey' }}>
    <ZoomPan>
      <ZoomPan>
        <div x={50} y={300} h={200} w={400}>
          <img
            className="el-img"
            draggable="false"
            src="https://www.asturiaspicosdeeuropa.com/uploads/zbvsytypcoyp4rybdfua.jpg"
          />
        </div>
        <div className="el-norm-container-login" x={500} y={30} h={150} w={350}>
          {' '}
          <div>
            <label>User:</label>
            <input type="text" />
          </div>
          <div>
            <label>Password:</label>
            <input type="text" />
          </div>
          <button> Login!</button>
        </div>
        <div
          className="el-norm-container el-norm-container2"
          x={500}
          y={150}
          h={100}
          w={350}
        >
          <button> Click Me!</button>
        </div>
        <div
          className="el-norm-container el-norm-container-text"
          x={50}
          y={30}
          h={200}
          w={400}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </div>
        <div
          className="el-norm-container el-norm-container-text"
          x={500}
          y={300}
          h={200}
          w={350}
        >
          The Picos de Europa ("Peaks of Europe", also the Picos) are a mountain
          range extending for about 20 km (12 mi), forming part of the
          Cantabrian Mountains in northern Spain. The range is situated in the
          Autonomous Communities of Asturias, Cantabria and Castile and León.
          The highest peak is Torre de Cerredo, at an elevation of 2650 m (8,690
          ft). A widely accepted origin for the name is that they were the first
          sight of Europe for ships arriving from the Americas.[1] The name can
          be traced to Lucio Marineo Sículo, who mentions the Rupes Europae in
          1530. Ambrosio Morales, chronist of Felipe II of Spain, mentions the
          Montañas de Europa in 1572.[citation needed] Prudencio de Sandoval
          calls them the Peñas o Sierras de Europa in 1601.[2]
        </div>
      </ZoomPan>
    </ZoomPan>
  </div>
));
