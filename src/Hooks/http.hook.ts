import { useCallback, useState } from 'react';
import { Processing } from '../Utils/enum';

export const useHttp = () => {
  const [process, setProcess] = useState<Processing>(Processing.waiting);

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-type': 'application/json' }
    ) => {
      setProcess(Processing.loading);

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        setProcess(Processing.error);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setProcess(Processing.loading);
  }, []);

  return { clearError, process, setProcess, request };
};
