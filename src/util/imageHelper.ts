
export default function blobToImage(blob: Blob): string {
  const objectURL = URL.createObjectURL(blob);
  let imageSource = document.querySelector('img')?.src;
  imageSource = objectURL;
  return imageSource;
}
