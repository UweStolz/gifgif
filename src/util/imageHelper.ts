export function base64ToGif(base64Image: string) {
  const image = new Image();
  image.src = `data:image/gif;base64,${base64Image}`;
  return image.src;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Image = window.btoa(binary);
  return base64Image;
}
