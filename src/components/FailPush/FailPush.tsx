import React from 'react';

interface TOkPushProps {
  isFailPushOpen: Boolean;
}

const OkPush: React.FC<TOkPushProps> = (props) => {
  const { isFailPushOpen } = props;

  return (
    <div className={isFailPushOpen ? `ok-push` : 'ok-push_off'}>
      Ошибка получения данных
    </div>
  );
};

export default OkPush;
