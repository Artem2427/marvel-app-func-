import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { notFoundImage } from '../../../Utils/common';

interface ViewInfoProps {
  char: CharacterDto | null;
}

const ViewInfo: FC<ViewInfoProps> = ({ char }) => {
  const getTenComics = (list: ComicsItem[]) => {
    const copyList = [...list];

    return copyList.slice(0, 10);
  };

  const { name, description, thumbnail, homepage, wiki, comics } = char!;

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{
            objectFit: `${!notFoundImage(thumbnail) ? 'unset' : 'cover'}`,
          }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description ? description : 'This character no description!'}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character!'}
        {getTenComics(comics).map((item, index) => {
          const divideUrl = item.resourceURI.split('/');
          return (
            <Link to={`/comics/${divideUrl[divideUrl.length - 1]}`} key={index}>
              <li className="char__comics-item">{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default ViewInfo;
