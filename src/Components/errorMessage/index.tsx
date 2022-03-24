import React, { FC } from 'react';

import image from './error.gif';

import './errorMessage.scss';

const ErrorMessage: FC = () => {
  return (
    <div>
      <img src={image} alt="error" className="error" />
    </div>
  );
};

export default ErrorMessage;
