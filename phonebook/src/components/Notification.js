import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    padding: 30,
    marginBottom: 10,
    background: 'lightgrey',
    color: 'red',
  };
  return <div style={style}>{message}</div>;
};

export default Notification;
