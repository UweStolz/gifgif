
export default function arrayBufferToImage(arrayBufferView: ArrayBuffer): string {
  const blob = new Blob([arrayBufferView], { type: 'image/webp' });
  const objectURL = URL.createObjectURL(blob);
  let imageSource = document.querySelector('img')?.src;
  imageSource = objectURL;
  return imageSource;
}
