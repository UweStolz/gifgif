import blobToImage from '@/util/imageHelper';

it('Transforms a blob to an image URL', () => {
  const objectUrl = 'blob:http://someData';
  window.URL.createObjectURL = jest.fn().mockImplementationOnce(() => objectUrl);
  const testBlob = new Blob(undefined, { type: 'image/webp' });
  const image = blobToImage(testBlob);
  expect(image).toBe(objectUrl);
});
