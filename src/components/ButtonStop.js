import React from 'react';

const ButtonStop = ({ onClick = () => {} }) => (
  <div
    style={{
      position: 'absolute',
      top: 10,
      left: 10,
      right: 0,
      bottom: 0,
      width: '100px',
      height: '30px',
      //margin: 'auto',
      fontSize: '14px',
      fontStyle: 'italic',
      textAlign: 'center',
      borderRadius: '10px',
      lineHeight: '30px',
      cursor: 'pointer',
      backgroundColor: '#4BE072',
      color: '#21222C'
    }}
    onClick={onClick}
  >
    END
  </div>
);

export default ButtonStop;
