import react, { useState, useEffect, useRef, FC, useMemo } from 'react';
import useMarvelServices from '../../Services/MarvelServices';
import ErrorMessage from '../errorMessage';
import Spinner from '../Spinner';
import { notFoundImage } from '../../Utils/common';

import setContent from '../../Utils/setContent';
import { Processing } from '../../Utils/enum';

import './charList.scss';

interface CharListProps {
  onCharSelected: (id: number) => void;
}

interface StateProps {
  charList: CharacterDto[];
  loading: boolean;
  error: boolean;
  newItemLoading: boolean;
  offset: number;
  onCharEnded: boolean;
}

const CharList: FC<CharListProps> = ({ onCharSelected }) => {
  const [charList, setCharList] = useState<CharacterDto[]>([]);
  const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(210);
  const [onCharEnded, setOnCharEnded] = useState<boolean>(false);

  const { getAllCharacters, setProcess, process } = useMarvelServices();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset: number, initial: boolean) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess(Processing.confirmed));
  };

  const onCharListLoaded = (newCharList: CharacterDto[]) => {
    let ended = false;

    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setOnCharEnded((onCharEnded) => ended);
  };

  const itemRefs: react.MutableRefObject<HTMLElement[]> = useRef([]);

  const focusOnItem = (id: number) => {
    itemRefs.current.forEach((item: HTMLElement) =>
      item.classList.remove('char__item_selected')
    );

    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  const listCharacters = (data: CharacterDto[]) => {
    return (
      <ul className="char__grid">
        {data.map((item: CharacterDto, i) => (
          <li
            tabIndex={0}
            ref={(el) => (itemRefs.current[i] = el!)}
            className={`char__item `}
            key={item.id}
            onClick={() => {
              onCharSelected(item.id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                onCharSelected(item.id);
                focusOnItem(i);
              }
            }}
          >
            <img
              src={item.thumbnail}
              alt="abyss"
              style={{
                objectFit: `${
                  !notFoundImage(item.thumbnail) ? 'unset' : 'cover'
                }`,
              }}
            />
            <div className="char__name">{item.name}</div>
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
        return newItemLoading ? listCharacters(charList) : <Spinner />;
      case 'confirmed':
        return listCharacters(charList);
      case 'error':
        return <ErrorMessage />;
    }
  };

  const elements = useMemo(() => {
    return setContent(process);
  }, [process]);

  return (
    <div className="char__list">
      {elements}
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

export default CharList;
