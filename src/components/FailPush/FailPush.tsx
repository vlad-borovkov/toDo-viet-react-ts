import React from 'react';

interface OkPushProps {
  isFailPushOpen: Boolean;
}

export default function OkPush(props: OkPushProps) {
  const { isFailPushOpen } = props;

  return (
    <div className={isFailPushOpen ? `ok-push` : 'ok-push_off'}>
      Ошибка получения данных
    </div>
  );
}
