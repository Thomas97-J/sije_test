import { useInfiniteQuery } from "@tanstack/react-query";
import getRandomUnsplashPhoto from "../APIs/getRandomUnsplashPhoto";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export const useUnsplashInfiniteQuery = () => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["unsplashPhotos"],
    queryFn: handleGetPhoto,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  function handleGetPhoto({ pageParam = 1 }: { pageParam: number }) {
    return getRandomUnsplashPhoto({ pageParam });
  }

  return {
    ref,
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
