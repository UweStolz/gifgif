const giphyApiKey = 'IT2EfZQf0HqGmKIlg0Ts9p7akXdKSBl7';
const tenorApiKey = 'O4K19202U3YT';

export async function getBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}

export async function getSearchGifsFromGiphy(searchQuery: string, rating?: string): Promise<Giphy.Response> {
  const query = rating
    ? `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${giphyApiKey}&rating=${rating}`
    : `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${giphyApiKey}`;
  const response = await fetch(query);
  const { data } = await response.json();
  const randomGifObject: Giphy.Response = data;
  return randomGifObject;
}

export async function getTranslateGifFromGiphy(query: string, weirdness: number): Promise<Giphy.GIFObject> {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${query}&weirdness=${weirdness}`);
  const { data } = await response.json();
  const randomGifObject: Giphy.GIFObject = data;
  return randomGifObject;
}

export async function getRandomGifFromGiphy(): Promise<Giphy.GIFObject> {
  const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`);
  const { data } = await response.json();
  const randomGifObject: Giphy.GIFObject = data;
  return randomGifObject;
}

export async function getTrendingGifsListFromGiphy(): Promise<Giphy.Response> {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}`);
  const { data } = await response.json();
  const gifsList: Giphy.Response = data;
  return gifsList;
}

export async function getTrendingSearchTermsFromTenor() {
  const response = await fetch(`https://api.tenor.com/v1/trending_terms?key=${tenorApiKey}&locale=en_US&limit=50`);
  const { results } = await response.json();
  const gifsList: string[] = results;
  return gifsList;
}

export async function getTrendingGifsListFromTenor(): Promise<any[]> {
  const response = await fetch(`https://api.tenor.com/v1/trending?key=${tenorApiKey}&media_filter=minimal`);
  const { results } = await response.json();
  const gifsList: Tenor.Response = results;
  return gifsList;
}
