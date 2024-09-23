async function getRandomUnsplashPhoto({
  pageParam = 1,
}: {
  pageParam: number;
}) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=30&page=${pageParam}`,
    {
      headers: {
        Authorization: `Client-ID nDFWOr9Xat0hMmTn7kDclnTW-LJBqGnpDKA3JtVRPvA`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  const data = await response.json();
  return data;
}
export default getRandomUnsplashPhoto;
