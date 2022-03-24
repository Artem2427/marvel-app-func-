export const notFoundImage = (text: string) => {
  const arr = text.split('/');
  let isCorrect = true;

  if (arr[arr.length - 1] === 'image_not_available.jpg') {
    isCorrect = false;
  }

  return isCorrect;
};
