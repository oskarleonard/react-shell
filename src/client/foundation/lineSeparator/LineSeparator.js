import React from 'react';

function LineSeparator({ height, borderBottom, boxShadow }) {
  return (
    <div>
      <div
        className="line-separator"
        style={{
          height,
          boxShadow,
          borderBottom,
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      />
    </div>
  );
}

export default LineSeparator;
