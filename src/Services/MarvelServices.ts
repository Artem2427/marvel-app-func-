import { useHttp } from '../Hooks/http.hook';

const useMarvelServices = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=a332168c1dffa1017ac8afc590df57ed';
  const _baseOffset = 210;

  const { request, clearError, process, setProcess } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id: number) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  const getComics = async (id: number) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };

  const getCharacterByName = async (name: string): Promise<CharacterDto[]> => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    return res.data.results.map(_transformCharacter);
  };

  const _transformCharacter = (res: CharacterInfoTransform): CharacterDto => {
    return {
      id: res.id,
      name: res.name,
      description: res.description,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
    };
  };

  const _transformComics = (comics: ComicsInfoTransform): ComicsDto => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : 'not available',
    };
  };

  return {
    process,
    setProcess,
    getCharacter,
    getAllCharacters,
    getCharacterByName,
    clearError,
    getAllComics,
    getComics,
  };
};

export default useMarvelServices;
