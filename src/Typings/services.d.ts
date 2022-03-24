declare type Key = {
  [key: string]: string;
};

declare interface CharacterInfoTransform {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  urls: Urls[];
  comics: {
    items: ComicsItem[];
  };
}

declare interface ComicsInfoTransform {
  id: number;
  title: string;
  description: string | null;
  pageCount: number;
  thumbnail: Thumbnail;
  textObjects: {
    type: string;
    language: string | null;
    text: string;
  };
  prices: Prices[];
}

declare interface ComicsDto {
  id: number;
  title: string;
  description: string;
  pageCount: string;
  thumbnail: string;
  language: string;
  price: string;
}

declare interface CharacterDto {
  id: number;
  name: string;
  description: null | string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  comics: ComicsItem[];
}

interface Prices {
  type: string;
  price: number;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface Urls {
  url: string;
}

declare interface ComicsItem {
  resourceURI: string;
  name: string;
}
