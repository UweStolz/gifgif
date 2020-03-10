import blobToImage from '@/util/imageHelper';

it('Transforms a blob to an image URL', () => {
  const source = 'https://someAdress.webp';
  const objectUrl = 'blob:http://someData';
  window.URL.createObjectURL = jest.fn().mockImplementationOnce(() => objectUrl);
  window.document.querySelector = jest.fn().mockImplementationOnce(() => {
    const img = document.createElement('img');
    img.src = source;
    return img;
  });
  const testBlob = new Blob();
  const image = blobToImage(testBlob);
  expect(window.document.querySelector).toHaveReturned();
  expect(image).toBe(objectUrl);
});
