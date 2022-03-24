import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useMarvelServices from '../../Services/MarvelServices';
import ErrorMessage from '../errorMessage';
import Spinner from '../Spinner';
import './singleComic.scss';

const SingleComic = () => {
  const [comics, setComics] = useState<ComicsDto>();

  const { comicId } = useParams();

  const { getComics, clearError } = useMarvelServices();

  // const spinner = loading ? <Spinner /> : null;
  // const errorMessage = error && !loading ? <ErrorMessage /> : null;

  const updateComic = () => {
    clearError();
    getComics(Number(comicId)).then((res) => setComics(res));
  };

  useEffect(() => {
    updateComic();
  }, [comicId]);

  return (
    <div className="single-comic">
      {/* {spinner}
      {errorMessage} */}
      {comics && (
        <>
          <img
            src={comics.thumbnail}
            alt="x-men"
            className="single-comic__img"
          />
          <div className="single-comic__info">
            <h2 className="single-comic__name">{comics.title}</h2>
            <p className="single-comic__descr">{comics.description}</p>
            <p className="single-comic__descr">{comics.pageCount}</p>
            <p className="single-comic__descr">Language: {comics.language}</p>
            <div className="single-comic__price">{comics.price}</div>
          </div>
          <Link to="/comics" className="single-comic__back">
            Back to all
          </Link>
        </>
      )}
    </div>
  );
};

export default SingleComic;
