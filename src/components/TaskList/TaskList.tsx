import React from 'react';
import TaskLine from '../TaskLine/TaskLine';

export default function TaskList() {
  return (
    <div className='task-list'>
      <TaskLine />
      <TaskLine />
      <TaskLine />
    </div>
  );
}
