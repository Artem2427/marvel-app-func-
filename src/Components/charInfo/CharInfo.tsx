import { FC, useEffect, useState } from 'react';
import useMarvelServices from '../../Services/MarvelServices';
import ViewInfo from './viewInfo/viewInfo';

import setContent from '../../Utils/setContent';
import { Processing } from '../../Utils/enum';

import './charInfo.scss';

interface CharInfoProps {
  charId: number | null;
}

const CharInfo: FC<CharInfoProps> = ({ charId }) => {
  const [char, setChar] = useState<CharacterDto | null>(null);

  const { clearError, getCharacter, setProcess, process } = useMarvelServices();

  const updateChar = () => {
    if (!charId) {
      return;
    }
    clearError();
    if (charId) {
      getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess(Processing.confirmed));
    }
  };

  const onCharLoaded = (character: CharacterDto) => {
    setChar(character);
  };

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [charId]);

  return (
    <div className="char__info">
      {setContent(process, <ViewInfo char={char} />)}
    </div>
  );
};

export default CharInfo;
