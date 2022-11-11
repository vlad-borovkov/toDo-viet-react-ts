import React from 'react';
import InfoTooltip from './InfoTooltip';

export default function AboutTask(props) {
  const isOpen = true;
  return (
    <InfoTooltip
      name='about-task'
      onClose='about-task-close'
      isOpen={isOpen}
      closeAllPopups={props.onClose}
    >
      <form className='about-task__wrap'>
        <div>
          <button className='about-task__edit'>Edite</button>
          <button type='submit' className='about-task__edit'>
            Submite
          </button>
        </div>
        <p className='about-task__date'>12/05/22</p>
        <input type='text' className='about-task__input' />
        <textarea className='about-task__text' />
      </form>
      <p className='popup__event-message'>{props.message}</p>
    </InfoTooltip>
  );
}
