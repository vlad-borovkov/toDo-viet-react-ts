import React, { forwardRef } from 'react';

const TaskLineDone = forwardRef((props, ref) => {
  const { taskItem, handleOpenAboutTask, handleDeleteClick, handleDoneTask } =
    props;

  const handleInfoClick = () => {
    handleOpenAboutTask(taskItem);
  };

  const handleDeleteTask = () => {
    handleDeleteClick(taskItem);
  };

  return (
    <div className='task-line' ref={ref}>
      <div className='task__wrap'>
        <div className='task__name'>{taskItem.content}</div>
      </div>
      <div className='task__wrap'>
        <button
          className='task-button__info'
          onClick={handleInfoClick}
        ></button>
        <button
          className='task__delete-btn'
          type='submit'
          onClick={handleDeleteTask}
        ></button>
      </div>
    </div>
  );
});

export default TaskLineDone;
