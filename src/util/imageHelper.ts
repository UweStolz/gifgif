
export function imageToBase64Image(imageElement: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  canvas.getContext('2d')?.drawImage(imageElement, 0, 0);
  const dataURL = canvas.toDataURL('image/webp');
  return dataURL;
}

export function base64ImageToGif(base64Image: string) {
  const image = new Image();
  image.src = `data:image/webp;base64,${base64Image}`;
  return image.src;
}
