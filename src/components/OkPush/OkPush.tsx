import React from 'react';

export default function OkPush(props) {
  const { isOkPushOpen } = props;

  return (
    <div className={isOkPushOpen ? `ok-push` : 'ok-push_off'}>
      OkPushMessage
    </div>
  );
}
