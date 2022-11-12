import React from 'react';
import TaskLineDone from '../TaskLine/TaskLineDone';
import { Typography } from '@mui/material/';
import FlipMove from 'react-flip-move';

const TaskListDone = (props) => {
  const {
    doneTasks,
    handleOpenAboutTask,
    handleDeleteClick,
    onUpdateDeleteTask,
  } = props;

  React.useEffect(() => {}, [onUpdateDeleteTask]);

  return (
    <div className='task-list-done'>
      {doneTasks.length >= 1 && (
        <Typography variant='subtitle2' component='p'>
          Завершённые задачи
        </Typography>
      )}
      <FlipMove
        enterAnimation='accordionVertical'
        leaveAnimation='accordionVertical'
      >
        {doneTasks.map((item) => (
          <TaskLineDone
            key={item.id}
            taskItem={item}
            handleOpenAboutTask={handleOpenAboutTask}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default TaskListDone;
