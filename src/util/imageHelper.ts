
export default function imageToBase64Image(imageElement: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  // eslint-disable-next-line no-unused-expressions
  canvas.getContext('2d')?.drawImage(imageElement, 0, 0);
  const dataURL = canvas.toDataURL('image/webp');
  return dataURL;
}
