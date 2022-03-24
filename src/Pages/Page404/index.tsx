import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../Components/errorMessage';

import './page404.scss';

const Page404 = () => {
  return (
    <div>
      <Helmet>
        <meta name="description" content="Error not found page" />
        <title>404 Error</title>
      </Helmet>
      <ErrorMessage />
      <p className="text__info">Page doesn't exist</p>
      <Link className="link__back" to="/">
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
