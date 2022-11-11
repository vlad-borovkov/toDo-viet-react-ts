import React from 'react';

const InfoTooltip = (props) => {
  const { isOpen, closeInfoTip, children } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_on' : ''}`}>
      {console.log(isOpen)}
      <button
        className='popup__close-icone'
        type='button'
        onClick={closeInfoTip}
      ></button>
      <div className='popup__container-disclamer'>{children}</div>
    </div>
  );
};
export default InfoTooltip;
