import React from 'react';

interface TProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: Boolean;
  closeInfoTip: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const InfoTooltip: React.FC<TProps> = (props) => {
  const { isOpen, closeInfoTip, children } = props;

  return (
    <div className={`popup ${isOpen ? 'popup_on' : ''}`}>
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
