import React from 'react';
import CurrentDate from '../CurrentDate/CurrentDate';
import AboutTask from '../InfoToolTip/AboutTask';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';

export default function TodoApp() {
  return (
    <div className='todo-app'>
      <CurrentDate />
      <TaskForm />
      <TaskList />
      <AboutTask />
    </div>
  );
}
