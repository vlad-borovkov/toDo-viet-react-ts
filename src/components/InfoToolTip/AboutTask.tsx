import React from 'react';
import InfoTooltip from './InfoTooltip';

export default function AboutTask(props) {
  const { isOpen, onClose, taskItem } = props;

  return (
    <InfoTooltip
      name='about-task'
      onClose='about-task-close'
      isOpen={isOpen}
      closeInfoTip={onClose}
    >
      <form className='about-task__wrap'>
        <div className='about-task-button__wrap'>
          <button className='about-task__edit'></button>
          <button type='submit' className='about-task__submit'></button>
        </div>
        <input
          type='text'
          className='about-task__input'
          defaultValue={taskItem.content}
          readOnly
        />
        <textarea
          className='about-task__text'
          defaultValue={taskItem.description}
          readOnly
        />
        <p className='about-task__date'>{taskItem.created_at}</p>
      </form>
      <p className='popup__event-message'>{props.message}</p>
    </InfoTooltip>
  );
}
