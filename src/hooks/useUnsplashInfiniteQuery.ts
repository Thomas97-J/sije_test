import { useInfiniteQuery } from "@tanstack/react-query";
import getRandomUnsplashPhoto from "../APIs/getRandomUnsplashPhoto";

export const useUnsplashInfiniteQuery = () => {
  function handleGetPhoto({ pageParam = 1 }: { pageParam: number }) {
    return getRandomUnsplashPhoto({ pageParam });
  }

  return useInfiniteQuery({
    queryKey: ["unsplashPhotos"],
    queryFn: handleGetPhoto,
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    staleTime: Infinity,
  });
};
