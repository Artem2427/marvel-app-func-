import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet';

import CharInfo from '../../Components/charInfo/CharInfo';
import CharList from '../../Components/charList/CharList';
import CharSearchForm from '../../Components/charSearchForm/CharSearchForm';
import ErrorBoundary from '../../Components/errorBoundary/ErrorBoundary';
import RandomChar from '../../Components/randomChar/RandomChar';
import decoration from '../../Resources/img/vision.png';

const MainPage: FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onCharSelected = (id: number) => {
    setSelectedId(id);
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <title>Marvel Information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>

        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedId} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
