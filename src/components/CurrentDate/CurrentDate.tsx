import React from 'react';

export default function CurrentDate() {
  const today = new Date();

  return (
    <div className='current-date'>
      <div className='current-date__day'>
        {today.toLocaleTimeString('en-US')}
      </div>
      <div className='current-date__time'>{today.toLocaleDateString()}</div>
    </div>
  );
}
