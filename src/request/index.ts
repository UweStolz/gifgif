const apiKey = 'IT2EfZQf0HqGmKIlg0Ts9p7akXdKSBl7';

export default async function getTrendingGifsList(): Promise<Giphy.Response> {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`);
  const { data } = await response.json();
  const gifsList: Giphy.Response = data;
  return gifsList;
}
