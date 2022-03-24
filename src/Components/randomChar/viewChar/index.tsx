import React, { Component } from 'react';
import { notFoundImage } from '../../../Utils/common';

interface ViewCharProps {
  char: CharacterDto;
}

class ViewChar extends Component<ViewCharProps> {
  cutDescription = (text: string | null) => {
    let res = text;

    if (text && text.length > 210) {
      res = text.slice(0, 210);

      return `${res}...`;
    }

    if (res !== '') return res;

    return `This character no description!`;
  };

  render() {
    const { name, description, thumbnail, homepage, wiki } = this.props.char;

    return (
      <div className="randomchar__block">
        <img
          src={thumbnail ? thumbnail : ''}
          alt="Random character"
          className="randomchar__img"
          style={{
            objectFit: `${!notFoundImage(thumbnail) ? 'unset' : 'cover'}`,
          }}
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">
            {this.cutDescription(description)}
          </p>
          <div className="randomchar__btns">
            <a href={homepage ? homepage : ''} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki ? wiki : ''} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewChar;
