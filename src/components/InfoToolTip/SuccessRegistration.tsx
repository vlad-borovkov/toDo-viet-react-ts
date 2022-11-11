import React from 'react';
import InfoTooltip from './InfoTooltip';
import SuccessDownloadPath from './../../images/Success.svg';

const SuccessRegistration = (props) => {
  return (
    <InfoTooltip
      name='success-registration'
      onClose='fail-registration-close'
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
    >
      <img
        className='popup__image-event'
        src={SuccessDownloadPath}
        alt={props.type}
      />
      <p className='popup__event-message'>{props.message}</p>
    </InfoTooltip>
  );
};

export default SuccessRegistration;
