
export default function blobToImage(blob: Blob): string {
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
}
