import React, { forwardRef } from 'react';
import TTaskItem from './../../utils/TaskItemType';

interface TTaskLineDone {
  taskItem: TTaskItem;
  handleOpenAboutTask: (taskItem: TTaskItem) => void;
  handleDeleteClick: (taskItem: TTaskItem) => void;
}

const TaskLineDone = React.forwardRef<HTMLDivElement, TTaskLineDone>(
  (props, ref) => {
    const { taskItem, handleOpenAboutTask, handleDeleteClick } = props;

    const handleInfoClick = (e: React.MouseEvent) => {
      handleOpenAboutTask(taskItem);
    };

    const handleDeleteTask = (e: React.MouseEvent) => {
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
  }
);

export default TaskLineDone;
