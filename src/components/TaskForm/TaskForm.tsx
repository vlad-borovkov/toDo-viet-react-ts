import React from 'react';

export default function TaskForm() {
  return (
    <form className='task-form'>
      <input className='task-form__input' />{' '}
      <button className='task-form__button'>+</button>
    </form>
  );
}
