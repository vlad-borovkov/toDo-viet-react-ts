import React from 'react';
import { useForm } from 'react-hook-form';
import SpinnerForm from '../Spinner/SpinnerForm';
import { Input, Button } from '@mui/material';

export default function TaskForm(props) {
  const {
    handleAddNewTask,
    isFetchingAdd,
    isFetchingDelete,
    isFetchingAllTask,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const handleSubmitForm = (data) => {
    handleAddNewTask(data);
    reset();
  };

  return (
    <form
      id='add-new-task'
      className='task-form'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Input
        sx={{ width: '80%' }}
        placeholder='Введите задачу'
        {...register('newTask', {
          required: 'Внести задачу обязательно',
          maxLength: {
            value: 32,
            message: 'Длина задачи максимум 32 символа!',
          },
        })}
      />
      <Button
        variant='contained'
        color='success'
        type='submit'
        form='add-new-task'
      >
        +
      </Button>
      {(isFetchingAllTask || isFetchingDelete || isFetchingAdd) && (
        <SpinnerForm />
      )}
      <p className='form__error-message'>{errors?.newTask?.message}</p>
    </form>
  );
}
