import React from 'react';

interface TCurrentDate {}

const CurrentDate: React.FC<TCurrentDate> = () => {
  const today = new Date();

  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  return (
    <div className='current-date'>
      <div className='current-date__day'>
        {today.toLocaleTimeString('en-US')}
      </div>
      <div className='current-date__time'>{today.toLocaleDateString()}</div>
    </div>
  );
};
export default CurrentDate;
