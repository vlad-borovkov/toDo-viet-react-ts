import React from 'react';
import CurrentDate from '../CurrentDate/CurrentDate';
import AboutTask from '../InfoToolTip/AboutTask';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import { todoistAPI } from '../../utils/TodoistAPI';
import OkPush from '../OkPush/OkPush';
import FailPush from '../FailPush/FailPush';

import TTaskItem from './../../utils/TaskItemType';

type TNewDataTask = {
  taskTitle: String;
  taskAbout: String;
  content: String;
  description: String;
};

type TNewTask = {
  newTask: String;
};

type TUpdatedTask = {
  taskTitle: String;
  taskAbout: String;
};

const TodoApp = () => {
  //стейты для зависимости получения обновлённого массива тасков
  const [onUpdateAboutTask, setOnUpdateAboutTask] =
    React.useState<Boolean>(false);
  const [onUpdateAddTask, setOnUpdateAddTask] = React.useState<Boolean>(false);
  const [onUpdateDeleteTask, setOnUpdateDeleteTask] =
    React.useState<Boolean>(false);
  const [onUpdateCloseTask, setOnUpdateCloseTask] =
    React.useState<Boolean>(false);
  // состояния для запуска спинера
  const [isFetchingUpd, setIsFetchingUpd] = React.useState<Boolean>(false);
  const [isFetchingAdd, setIsFetchingAdd] = React.useState<Boolean>(false);
  const [isFetchingDelete, setIsFetchingDelete] =
    React.useState<Boolean>(false);
  const [isFetchingAllTask, setIsFetchingAllTask] =
    React.useState<Boolean>(false);
  // состояния и функции для запуска пуша
  const [isOkPushOpen, setIsOkPushOpen] = React.useState<Boolean>(false);
  const okPush = (): void => {
    setIsOkPushOpen(true);
    setTimeout((): void => setIsOkPushOpen(false), 2000);
  };
  const [isFailPushOpen, setIsFailPushOpen] = React.useState<Boolean>(false);
  const failPush = (): void => {
    setIsFailPushOpen(true);
    setTimeout((): void => setIsFailPushOpen(false), 2000);
  };
  // состояние popup about-task
  const [isOpenAboutTask, setIsOpenAboutTask] = React.useState<Boolean>(false);
  const handleCloseInfoTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenAboutTask(!isOpenAboutTask);
  };

  // получаем все активные задачи при маунте и при обновлении value задачи
  const [activeTasks, setActiveTasks] = React.useState<TTaskItem[]>([]);
  React.useEffect(() => {
    setIsFetchingAllTask(true);
    todoistAPI
      .getActiveTasks()
      .then((data: TTaskItem[]) => {
        setActiveTasks(data);
        setIsFetchingAllTask(false);
      })
      .catch((error) => {
        failPush();
        console.log(error);
      });
  }, [onUpdateAboutTask, onUpdateDeleteTask, onUpdateAddTask]);

  // изменение одной таски с API по ID
  const handleChangeTask = (newDataTask: TUpdatedTask, taskId: String) => {
    setIsFetchingUpd(true);
    todoistAPI
      .changeTaskDataById(
        {
          content: newDataTask.taskTitle,
          description: newDataTask.taskAbout,
        },
        taskId
      )
      .then((data: TTaskItem) => {
        setOnUpdateAboutTask(!onUpdateAboutTask);
        setTaskItem(data);
        setIsFetchingUpd(false);
      })
      .catch((error) => {
        failPush();
        console.log(error);
      });
  };

  // запрос одной таски с API по ID
  const [taskItem, setTaskItem] = React.useState<TTaskItem>(Object);
  const handleOpenAboutTask = (taskItem: TTaskItem) => {
    todoistAPI
      .getTaskById(taskItem.id)
      .then((data: TTaskItem) => {
        setTaskItem(data);
        setIsOpenAboutTask(!isOpenAboutTask);
      })
      .catch((error) => {
        failPush();
        console.log(error);
      });
  };
  // добавление таски
  const handleAddNewTask = (newTaskValue: TNewTask): void => {
    setIsFetchingAdd(true);
    todoistAPI
      .addNewTask({ content: newTaskValue.newTask })
      .then((data: TTaskItem) => {
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

  // удаление таски
  const handleDeleteTask = (taskId: String) => {
    setIsFetchingDelete(true);

    todoistAPI
      .deleteTask(taskId)
      .then(() => {
        setOnUpdateDeleteTask(!onUpdateDeleteTask);
        setIsFetchingDelete(false);
      })
      .catch((error) => {
        failPush();
        console.log(error);
      });
  };

  // обновляем статус таски и переносим в массив завершённых тасков. API не даёт массив завершённых, пришлось танцевать с бубном самому.
  const [doneTasksArr, setDoneTasksArr] = React.useState<TTaskItem[]>([]);

  const handleDoneTask = (taskData: TTaskItem) => {
    const currentIndexItem = activeTasks.indexOf(taskData);

    todoistAPI
      .closeTask(taskData.id)
      .then(() => {
        const newDoneTaskArr = activeTasks.splice(currentIndexItem, 1);
        setDoneTasksArr(doneTasksArr.concat([...newDoneTaskArr]));
        setOnUpdateCloseTask(!onUpdateCloseTask);
      })
      .catch((error) => {
        failPush();
        console.log(error);
      });
  };

  //удаление завершённых тасков
  const handleDeleteDoneClick = (taskData: TTaskItem) => {
    const currentIndexItem = doneTasksArr.indexOf(taskData);

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
};
export default TodoApp;
