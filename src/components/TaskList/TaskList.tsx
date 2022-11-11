import React from 'react';
import TaskLine from '../TaskLine/TaskLine';

export default function TaskList(props) {
  const { activeTasks, handleOpenAboutTask } = props;
  // добавить спинер
  return (
    <div className='task-list'>
      {activeTasks.map((item) => (
        <TaskLine
          key={item.id}
          taskItem={item}
          handleOpenAboutTask={handleOpenAboutTask}
        />
      ))}
    </div>
  );
}
