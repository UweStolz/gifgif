import fetch from 'node-fetch';

const apiKey = 'IT2EfZQf0HqGmKIlg0Ts9p7akXdKSBl7';

interface gifResult {
  originalUrl: string|null;
  listSize: number;
}

export default async function getTrendingGif(index?: number): Promise<gifResult> {
  const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`);
  let gifObject;
  let originalUrl: string|null = null;
  const responseJson = await res.json();
  const { data } = responseJson;
  const listSize: number = Object.keys(data).length;

  if (typeof index === 'number') {
    gifObject = data[index];
    originalUrl = gifObject.images.original.url;
  }
  const gifRequestResult: gifResult = { originalUrl, listSize };

  return gifRequestResult;
}
