import React from 'react';

const ButtonStart = ({ level = 1, color = '#4BE072', onClick = () => {} }) => (
  <div
    style={{
      width: '150px',
      height: '50px',
      marginBottom: '2px',
      fontSize: '32px',
      fontStyle: 'italic',
      textAlign: 'center',
      lineHeight: '50px',
      cursor: 'pointer',
      backgroundColor: color,
      color: '#21222C'
    }}
    onClick={onClick}
  >
    {level === 1 ? "EASY" : level === 2 ? "MEDIUM" : "HARD"}
  </div>
);

export default ButtonStart;
