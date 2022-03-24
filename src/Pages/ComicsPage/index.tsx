import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import AppBanner from '../../Components/appBanner/AppBanner';
import ComicsList from '../../Components/comicsList/ComicsList';

const ComicsPage: FC = () => {
  return (
    <div>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </div>
  );
};

export default ComicsPage;
