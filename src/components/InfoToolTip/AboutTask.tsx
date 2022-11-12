import React, { FC } from 'react';
import InfoTooltip from './InfoTooltip';
import { useForm } from 'react-hook-form';
import SpinnerAbout from '../Spinner/SpinnerAbout';
import { Input } from '@mui/material';
import TTaskItem from './../../utils/TaskItemType';

interface TProps {
  isOpen: Boolean;
  onClose: (e: React.MouseEvent) => void;
  taskItem: TTaskItem;
  handleChangeTask: (data: Object, string: String) => void;
  isFetchingUpd: Boolean;
}

const AboutTask: React.FC<TProps> = (props) => {
  const { isOpen, onClose, taskItem, handleChangeTask, isFetchingUpd } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const [isEditClick, setEditClick] = React.useState(false);
  const handleEditClick = () => {
    setEditClick(!isEditClick);
  };

  const handleSubmitAbout = (data: Object) => {
    handleChangeTask(data, taskItem.id);
  };

  // подписываемся на изменение стейта с игнорированием выполнения при рендеринге
  const didMount = React.useRef(false);
  React.useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else if (!isFetchingUpd) {
      handleEditClick();
    } else {
      return;
    }
  }, [isFetchingUpd]);

  return (
    <InfoTooltip isOpen={isOpen} closeInfoTip={onClose}>
      <form
        id='task-about'
        className='about-task__wrap'
        onSubmit={handleSubmit(handleSubmitAbout)}
      >
        {isFetchingUpd && <SpinnerAbout />}
        <div className='about-task-button__wrap'>
          {taskItem.is_completed === false && (
            <button
              className='about-task__edit'
              onClick={handleEditClick}
              type='button'
            ></button>
          )}
          {isEditClick && (
            <button
              type='submit'
              form='task-about'
              className='about-task__submit'
            ></button>
          )}
        </div>
        {isEditClick ? (
          <Input
            {...register('taskTitle', {
              required: 'Введите задачу или удалите',
              minLength: {
                value: 1,
                message: 'Слишком короткая задача',
              },
              maxLength: {
                value: 32,
                message: 'Введено более 32 символов',
              },
            })}
            type='text'
            className='about-task__input'
            defaultValue={taskItem.content}
          />
        ) : (
          <p className='about-task__input'>{taskItem.content}</p>
        )}
        {isEditClick && (
          <p className='popup__error-message'>{errors?.taskTitle?.message}</p>
        )}
        {isEditClick ? (
          <textarea
            {...register('taskAbout', {})}
            className='about-task__text'
            defaultValue={taskItem.description}
          />
        ) : (
          <p className='about-task__text'>{taskItem.description}</p>
        )}
        <div className='about-wrap__info-status'>
          <p className='about-task__date'>{taskItem.created_at}</p>
          <p className='about-task__status'>
            {taskItem.is_completed ? 'Завершённая' : 'Активная'}
          </p>
        </div>
      </form>
    </InfoTooltip>
  );
};

export default AboutTask;
