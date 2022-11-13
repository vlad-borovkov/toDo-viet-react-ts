import React, { forwardRef } from 'react';
import TTaskItem from './../../utils/TaskItemType';

interface TTaskLine {
  taskItem: TTaskItem;
  handleOpenAboutTask: (taskItem: TTaskItem) => void;
  handleDeleteClick: (taskId: String) => void;
  handleDoneTask: (taskItem: TTaskItem) => void;
}

const TaskLine = React.forwardRef<HTMLDivElement, TTaskLine>((props, ref) => {
  const { taskItem, handleOpenAboutTask, handleDeleteClick, handleDoneTask } =
    props;

  const [isTaskDone, setTaskIsDone] = React.useState(false);

  const handleStatusClick = (e: React.MouseEvent) => {
    setTaskIsDone(!isTaskDone);
    handleDoneTask(taskItem);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    handleOpenAboutTask(taskItem);
  };

  const handleDeleteTask = (e: React.MouseEvent) => {
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
