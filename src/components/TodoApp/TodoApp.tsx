import React from 'react';
import CurrentDate from '../CurrentDate/CurrentDate';
import AboutTask from '../InfoToolTip/AboutTask';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import { todoistAPI } from '../../utils/TodoistAPI';

export default function TodoApp() {
  const [errorMessage, setErrorMessage] = React.useState({});

  // получаем все активные задачи
  const [activeTasks, setActiveTasks] = React.useState(
    JSON.parse(localStorage.getItem('activeTasks')) || []
  );
  React.useEffect(() => {
    todoistAPI
      .getActiveTasks()
      .then((data) => {
        const activeTasks = localStorage.setItem(
          'activeTasks',
          JSON.stringify(data)
        );
      })
      .catch((error) => setErrorMessage(error));
  });

  const [isOpenAboutTask, setIsOpenAboutTask] = React.useState(false);
  const handleCloseInfoTip = () => {
    setIsOpenAboutTask(!isOpenAboutTask);
  };

  const [taskItem, setTaskItem] = React.useState({});
  const handleOpenAboutTask = (taskItem) => {
    setTaskItem(taskItem);
    setIsOpenAboutTask(!isOpenAboutTask);
  };

  return (
    <div className='todo-app'>
      <CurrentDate />
      <TaskForm />
      <TaskList
        activeTasks={activeTasks}
        handleOpenAboutTask={handleOpenAboutTask}
      />
      <AboutTask
        taskItem={taskItem}
        isOpen={isOpenAboutTask}
        onClose={handleCloseInfoTip}
      />
    </div>
  );
}
