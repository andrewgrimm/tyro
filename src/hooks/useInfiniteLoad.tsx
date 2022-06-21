import React, { useEffect, useState } from 'react';
import { useInView } from 'react-cool-inview';
import { searchMovies } from '../requests/omdbapiRequests';

interface props {
  searchText: string,
}

const useInfiniteLoad = ({ searchText }:props) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<any>(null);

  const loadNext = () => {
    if (hasNext) {
      searchMovies(searchText, page.toString()).then((response: any) => {
        setHasNext(response?.data?.Response === 'True');
        const newItems = response?.data?.Search || [];
        setItems((prev: any[]) => [...prev, ...newItems]);
        setPage((prev: number) => prev + 1);
      }).catch((e: any)=> {
        setError('Oops, something broke');
      });
    }
  };

  useEffect(() => {
    setHasNext(true);
    setPage(1);
    setError(null);
    setItems([]);
  }, [searchText]);

  const { observe } = useInView({
    onEnter: loadNext,
  });

  return {
    error,
    hasNext,
    items,
    loadMoreRef: observe,
  };
};

export default useInfiniteLoad;
