'use client';
import React from 'react';

type SpinnerProps = {
    size?: string,
    color?: string
}

const Spinner = ({size = '20px' , color = 'white'}: SpinnerProps) => {
  return (
    <>
      <div
        style={{
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: size,
          width: size,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      ></div>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default Spinner;
