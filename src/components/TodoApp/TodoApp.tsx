import React from 'react';
import CurrentDate from '../CurrentDate/CurrentDate';
import AboutTask from '../InfoToolTip/AboutTask';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import { todoistAPI } from '../../utils/TodoistAPI';
import OkPush from '../OkPush/OkPush';
import FailPush from '../FailPush/FailPush';

export default function TodoApp() {
  const [errorMessage, setErrorMessage] = React.useState({});
  //стейты для зависимости получения обновлённого массива тасков
  const [onUpdateAboutTask, setOnUpdateAboutTask] = React.useState(false);
  const [onUpdateAddTask, setOnUpdateAddTask] = React.useState(false);
  const [onUpdateDeleteTask, setOnUpdateDeleteTask] = React.useState(false);
  const [onUpdateCloseTask, setOnUpdateCloseTask] = React.useState(false);
  // состояния для запуска спинера
  const [isFetchingUpd, setIsFetchingUpd] = React.useState(false);
  const [isFetchingAdd, setIsFetchingAdd] = React.useState(false);
  const [isFetchingDelete, setIsFetchingDelete] = React.useState(false);
  const [isFetchingAllTask, setIsFetchingAllTask] = React.useState(false);
  // состояния и функции для запуска пуша
  const [isOkPushOpen, setIsOkPushOpen] = React.useState(false);
  const okPush = () => {
    setIsOkPushOpen(true);
    setTimeout(() => setIsOkPushOpen(false), 2000);
  };
  const [isFailPushOpen, setIsFailPushOpen] = React.useState(false);
  const failPush = () => {
    setIsFailPushOpen(true);
    setTimeout(() => setIsFailPushOpen(false), 2000);
  };

  // получаем все активные задачи при маунте и при обновлении value задачи
  const [activeTasks, setActiveTasks] = React.useState([]);
  React.useEffect(() => {
    setIsFetchingAllTask(true);
    todoistAPI
      .getActiveTasks()
      .then((data) => {
        setActiveTasks(data);
        setIsFetchingAllTask(false);
      })
      .catch((error) => setErrorMessage(error));
  }, [onUpdateAboutTask, onUpdateDeleteTask, onUpdateAddTask]);

  // обновляем values задачи
  const handleChangeTask = (newDataTask, taskId) => {
    setIsFetchingUpd(true);
    todoistAPI
      .changeTaskDataById(
        {
          content: newDataTask.taskTitle,
          description: newDataTask.taskAbout,
        },
        taskId
      )
      .then((data) => {
        setOnUpdateAboutTask(!onUpdateAboutTask);
        setTaskItem(data);
        setIsFetchingUpd(false);
      })
      .catch((error) => console.log(error));
  };
  // состояние popups
  const [isOpenAboutTask, setIsOpenAboutTask] = React.useState(false);
  const handleCloseInfoTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenAboutTask(!isOpenAboutTask);
  };

  const [taskItem, setTaskItem] = React.useState({});
  const handleOpenAboutTask = (taskItem) => {
    todoistAPI
      .getTaskById(taskItem.id)
      .then((data) => {
        setTaskItem(data);
        setIsOpenAboutTask(!isOpenAboutTask);
      })
      .catch((error) => console.log(error));
  };

  const handleAddNewTask = (newTaskValue) => {
    setIsFetchingAdd(true);
    todoistAPI
      .addNewTask({ content: newTaskValue.newTask })
      .then((data) => {
        if (data.id) {
          setOnUpdateAddTask(!onUpdateAddTask);
          setIsFetchingAdd(false);
          okPush();
        }
      })
      .catch((error) => {
        failPush();
        console.log(error);
      });
  };
  // удаление из активных тасков
  const handleDeleteTask = (taskId) => {
    setIsFetchingDelete(true);

    todoistAPI
      .deleteTask(taskId)
      .then(() => {
        setOnUpdateDeleteTask(!onUpdateDeleteTask);
        setIsFetchingDelete(false);
      })
      .catch((error) => console.log(error));
  };

  // делаем запрос на завершение, находим завершённую таску, вытаскиваем из активного массива и переносим в массив завершённых таск
  const [doneTasksArr, setDoneTasksArr] = React.useState([]);
  const handleDoneTask = (taskData) => {
    const currentIndexItem = activeTasks.indexOf(taskData);

    todoistAPI
      .closeTask(taskData.id)
      .then(() => {
        const newDoneTaskArr = activeTasks.splice(currentIndexItem, 1);
        setDoneTasksArr(doneTasksArr.concat([...newDoneTaskArr]));
        setOnUpdateCloseTask(!onUpdateCloseTask);
      })
      .catch((error) => console.log(error));
  };
  //удаление завершённых тасков
  const handleDeleteDoneClick = (taskData) => {
    const currentIndexItem = doneTasksArr.indexOf(taskData);
    console.log(currentIndexItem);
    doneTasksArr.splice(currentIndexItem, 1);

    setDoneTasksArr([...doneTasksArr]);
  };

  return (
    <div className='todo-app'>
      <OkPush isOkPushOpen={isOkPushOpen} />
      <FailPush isFailPushOpen={isFailPushOpen} />
      <CurrentDate />
      <TaskForm
        handleAddNewTask={handleAddNewTask}
        isFetchingAdd={isFetchingAdd}
        isFetchingDelete={isFetchingDelete}
        isFetchingAllTask={isFetchingAllTask}
      />
      <TaskList
        activeTasks={activeTasks}
        handleOpenAboutTask={handleOpenAboutTask}
        handleDeleteClick={handleDeleteTask}
        handleDeleteDoneClick={handleDeleteDoneClick}
        handleDoneTask={handleDoneTask}
        doneTasks={doneTasksArr}
        onUpdateDeleteTask={onUpdateDeleteTask}
        setActiveTasks={setActiveTasks}
      />

      <AboutTask
        taskItem={taskItem}
        isOpen={isOpenAboutTask}
        onClose={handleCloseInfoTip}
        handleChangeTask={handleChangeTask}
        isFetchingUpd={isFetchingUpd}
      />
    </div>
  );
}
