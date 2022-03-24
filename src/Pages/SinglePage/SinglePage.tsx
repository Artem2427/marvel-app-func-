import React, { useState, useEffect, FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import AppBanner from '../../Components/appBanner/AppBanner';
import ErrorMessage from '../../Components/errorMessage';
import Spinner from '../../Components/Spinner';

import useMarvelServices from '../../Services/MarvelServices';
import { ComponentIs, Processing } from '../../Utils/enum';
import setContent from '../../Utils/setContent';

interface SinglePageProps {
  Component: any;
  dataType: ComponentIs;
}

type QuizParams = {
  id: string;
};

const SinglePage: FC<SinglePageProps> = ({ Component, dataType }) => {
  const { id } = useParams<QuizParams>();
  const [data, setData] = useState<null | CharacterDto | ComicsDto>(null);
  const { getComics, getCharacter, clearError, setProcess, process } =
    useMarvelServices();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComics(Number(id))
          .then(onDataLoaded)
          .then(() => setProcess(Processing.confirmed));
        break;
      case 'character':
        getCharacter(Number(id))
          .then(onDataLoaded)
          .then(() => setProcess(Processing.confirmed));
    }
  };

  const onDataLoaded = (data: CharacterDto | ComicsDto) => {
    setData(data);
  };

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error || !data) ? (
  //   <Component data={data} />
  // ) : null;

  return (
    <>
      <AppBanner />
      {/* {errorMessage}
      {spinner}
      {content} */}
      {setContent(process, <Component data={data} />)}
    </>
  );
};

export default SinglePage;
