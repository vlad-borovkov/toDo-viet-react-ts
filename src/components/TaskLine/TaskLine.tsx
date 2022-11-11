import React from 'react';

export default function TaskLine() {
  const [isTaskDone, setTaskIsDone] = React.useState(false);

  const handleStatusClick = () => {
    setTaskIsDone(!isTaskDone);
  };

  return (
    <div className='task-line'>
      <div className='task__wrap'>
        <div className='task-button__wrap'>
          <button className='task-button__change-range'></button>
        </div>
        <div className='task-about__wrap'>
          <div className='task__name'>Dinner</div>
          <p className='task__time'>Today at 8:00 PM</p>
        </div>
      </div>
      <div className='task__wrap'>
        <button
          className={
            isTaskDone ? `task-button__status_done` : `task-button__status_pend`
          }
          onClick={handleStatusClick}
        ></button>
        <button className='task-button__info'></button>
        <button className='task__delete-btn' type='submit'></button>
      </div>
    </div>
  );
}
