import fetch from 'node-fetch';
import { arrayBufferToBase64 } from '../util/imageHelper';

const apiKey = 'IT2EfZQf0HqGmKIlg0Ts9p7akXdKSBl7';

interface gifResult {
  originalUrl: string|null;
  listSize: number;
}

export async function getGifAsBuffer(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const base64Image = arrayBufferToBase64(arrayBuffer);
  return base64Image;
}

export async function getTrendingGif(index?: number): Promise<gifResult> {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`);
  let gifObject;
  let originalUrl: string|null = null;
  const responseJson = await response.json();
  const { data } = responseJson;
  const listSize: number = Object.keys(data).length;

  if (typeof index === 'number') {
    gifObject = data[index];
    originalUrl = gifObject.images.original.url;
  }
  const gifRequestResult: gifResult = { originalUrl, listSize };

  return gifRequestResult;
}
