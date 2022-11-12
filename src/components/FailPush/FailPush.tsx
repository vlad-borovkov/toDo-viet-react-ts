import React from 'react';

export default function OkPush(props) {
  const { isFailPushOpen } = props;

  return (
    <div className={isFailPushOpen ? `ok-push` : 'ok-push_off'}>
      Ошибка получения данных
    </div>
  );
}
