import React, { useState } from 'react';
import { Alert } from 'reactstrap';

import './css/index.css';
import DetailsModal from 'components/DetailsModal';
import useInfiniteLoad from 'hooks/useInfiniteLoad';
import Navigation from 'components/Navigation';
import MovieTiles from './components/MovieTiles';

const app = () => {
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const [searchText, setSearchText] = useState((new Date()).getFullYear().toString());
  const closeModal = () => setSelectedID(null);

  const {
    error,
    hasNext,
    items,
    loadMoreRef,
  } = useInfiniteLoad({ searchText });

  return (
    <main>
      <Navigation search={setSearchText} />
      {error && <Alert color="warning">Oops! something has broken</Alert>}
      <DetailsModal selectedID={selectedID} closeModal={closeModal} />
      <MovieTiles movies={items} selectMovie={setSelectedID} />
      {hasNext && <div ref={loadMoreRef} data-testid="intersectionObserver" />}
    </main>
  );
};

export default app;
