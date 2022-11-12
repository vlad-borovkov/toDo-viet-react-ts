import React, { forwardRef } from 'react';
import { Reorder } from 'framer-motion';

const TaskLine = forwardRef((props, ref) => {
  const { taskItem, handleOpenAboutTask, handleDeleteClick, handleDoneTask } =
    props;

  const [isTaskDone, setTaskIsDone] = React.useState(false);

  const handleStatusClick = () => {
    setTaskIsDone(!isTaskDone);
    handleDoneTask(taskItem);
  };

  const handleInfoClick = () => {
    handleOpenAboutTask(taskItem);
  };

  const handleDeleteTask = () => {
    handleDeleteClick(taskItem.id);
  };

  return (
    <div className='task-line' ref={ref}>
      <div className='task__wrap'>
        <div className='task__name'>{taskItem.content}</div>
      </div>
      <div className='task__wrap'>
        <button
          className={
            isTaskDone ? `task-button__status_done` : `task-button__status_pend`
          }
          onClick={handleStatusClick}
        ></button>
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

export default TaskLine;
