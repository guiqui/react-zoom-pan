import React, { PureComponent } from 'react';
export default class BackGround extends PureComponent {
  render() {
    return (
      <svg x="0" y="0" width="100%" height="100%">
        <g>
          <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="silver" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </g>
      </svg>
    );
  }
}
