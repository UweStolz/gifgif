const giphyApiKey = 'IT2EfZQf0HqGmKIlg0Ts9p7akXdKSBl7';
const tenorApiKey = 'O4K19202U3YT';

export async function getTrendingGifsListFromGiphy(): Promise<Giphy.Response> {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}`);
  const { data } = await response.json();
  const gifsList: Giphy.Response = data;
  return gifsList;
}

export async function getTrendingGifsListFromTenor(): Promise<any[]> {
  const response = await fetch(`https://api.tenor.com/v1/trending?key=${tenorApiKey}&?media_filter=minimal&?limit=50`);
  const { results } = await response.json();
  const gifsList: Tenor.Response = results;
  return gifsList;
}
