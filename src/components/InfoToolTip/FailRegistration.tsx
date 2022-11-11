import React from 'react';
import InfoTooltip from './InfoTooltip';
import FailRegistration from './../../images/Fail.svg';

const FailRegistrationPopup = (props) => {
  return (
    <InfoTooltip
      name='fail-registration'
      onClose='fail-registration-close'
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
    >
      <img
        className='popup__image-event'
        src={FailRegistration}
        alt={props.type}
      />
      <p className='popup__event-message'>{props.message}!</p>
    </InfoTooltip>
  );
};

export default FailRegistrationPopup;
