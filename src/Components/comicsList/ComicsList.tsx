import './comicsList.scss';
import useMarvelServices from '../../Services/MarvelServices';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import ErrorMessage from '../errorMessage';
import { Link } from 'react-router-dom';
import { Processing } from '../../Utils/enum';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState<ComicsDto[]>([]);
  const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [onCharEnded, setOnCharEnded] = useState<boolean>(false);

  const { getAllComics, setProcess, process } = useMarvelServices();

  const onRequest = (offset: number, initial: boolean) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess(Processing.confirmed));
  };

  const onComicsListLoaded = (newComiscList: ComicsDto[]) => {
    let ended = false;

    if (newComiscList.length < 8) {
      ended = true;
    }
    setComicsList((charlist) => [...charlist, ...newComiscList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setOnCharEnded(ended);
  };

  const renderComicsList = () => {
    return (
      <ul className="comics__grid">
        {comicsList &&
          comicsList.map((comics: ComicsDto, index: number) => (
            <li className="comics__item" key={index}>
              <Link to={`/comics/${comics.id}`}>
                <img
                  src={comics.thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{comics.title}</div>
                <div className="comics__item-price">{comics.price}</div>
              </Link>
            </li>
          ))}
      </ul>
    );
  };

  const setContent = (process: Processing) => {
    switch (process) {
      case 'waiting':
        return <Spinner />;
      case 'loading':
        return newItemLoading ? renderComicsList() : <Spinner />;
      case 'confirmed':
        return renderComicsList();
      case 'error':
        return <ErrorMessage />;
    }
  };

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {/* {spinner}
      {errorMessage} */}
      {setContent(process)}
      <ul className="comics__grid">
        {comicsList &&
          comicsList.map((comics: ComicsDto, index: number) => (
            <li className="comics__item" key={index}>
              <Link to={`/comics/${comics.id}`}>
                <img
                  src={comics.thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{comics.title}</div>
                <div className="comics__item-price">{comics.price}</div>
              </Link>
            </li>
          ))}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: onCharEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset, false)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
