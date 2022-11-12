import React from 'react';
import TaskLine from '../TaskLine/TaskLine';
import TaskListDone from '../TaskListDone/TaskListDone';
import FlipMove from 'react-flip-move';

export default function TaskList(props) {
  const {
    activeTasks,
    handleOpenAboutTask,
    handleDeleteClick,
    handleDeleteDoneClick,
    handleDoneTask,
    doneTasks,
    onUpdateDeleteTask,
  } = props;
  // добавить спинер
  return (
    <div className='task-list'>
      <FlipMove
        enterAnimation='accordionVertical'
        leaveAnimation='accordionVertical'
      >
        {activeTasks.map((item) => (
          <TaskLine
            key={item.id}
            taskItem={item}
            handleOpenAboutTask={handleOpenAboutTask}
            handleDeleteClick={handleDeleteClick}
            handleDoneTask={handleDoneTask}
          />
        ))}
      </FlipMove>

      <TaskListDone
        doneTasks={doneTasks}
        handleOpenAboutTask={handleOpenAboutTask}
        handleDeleteClick={handleDeleteDoneClick}
        onUpdateDeleteTask={onUpdateDeleteTask}
      />
    </div>
  );
}
