import React, { FC, useEffect, useState } from 'react';

import useMarvelServices from '../../Services/MarvelServices';
import mjolnir from '../../Resources/img/mjolnir.png';
import ViewChar from './viewChar';

import setContent from '../../Utils/setContent';
import { Processing } from '../../Utils/enum';

import './randomChar.scss';

interface StateProps {
  char?: CharacterDto;
  loading: boolean;
  error: boolean;
}

const RandomChar: FC = () => {
  const [char, setChar] = useState<CharacterDto>({
    id: 0,
    name: '',
    description: null,
    thumbnail: '',
    homepage: '',
    wiki: '',
    comics: [],
  });

  const { getCharacter, clearError, setProcess, process } = useMarvelServices();

  const onCharLoaded = (character: CharacterDto) => {
    setChar(character);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess(Processing.confirmed));
  };

  useEffect(() => {
    updateChar();

    const timerId = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="randomchar">
      {setContent(process, <ViewChar char={char} />)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};
export default RandomChar;
