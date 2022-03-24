import { ReactNode } from 'react';
import ErrorMessage from '../Components/errorMessage';
import Skeleton from '../Components/skeleton/Skeleton';
import Spinner from '../Components/Spinner';

import { Processing } from './enum';

const setContent = (process: Processing, Component: ReactNode) => {
  switch (process) {
    case 'waiting':
      return <Skeleton />;
    case 'loading':
      return <Spinner />;
    case 'confirmed':
      return Component;
    case 'error':
      return <ErrorMessage />;
  }
};

export default setContent;
