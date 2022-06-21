import React, { useEffect, useState } from 'react';
import {
  Alert,
  CardImg,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
} from 'reactstrap';

import { getMovieDetails } from 'requests/omdbapiRequests';
import { MovieDetail } from '../types/types';

interface props {
  selectedID: string | null,
  closeModal: () => void,
}

const DetailsModal = ({ selectedID, closeModal }: props) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | any>(null);

  const clearModal = () => {
    setMovie(null);
    closeModal();
  };

  useEffect(() => {
    if (selectedID !== null) {
      getMovieDetails(selectedID)
        .then((response: any) => setMovie(response.data))
        .catch((e: any) => setError(e));
    }
  }, [selectedID]);

  return (
    <Modal size="lg" isOpen={!!selectedID}>
      <ModalHeader toggle={() => clearModal()}>
        {movie && `${movie?.Title} - ${movie?.Year}`}
      </ModalHeader>
      <ModalBody>
        {movie && (
        <Row>
          <Col>
            <Row className="mb-3">
              <Col>
                {movie?.Plot}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                {`Cast: ${movie?.Actors}`}
              </Col>
            </Row>
            <Row>
              <Col>
                {`IMDB Rating: ${movie?.imdbRating}`}
              </Col>
            </Row>
          </Col>
          <Col xl="3" xs="4">
            {movie?.Poster?.includes('https://')
              && <CardImg top width="100%" src={movie?.Poster} alt="movie poster" />}
          </Col>
        </Row>
        )}
        {error && (
          <Alert
            color="warning"
          >
            Oops! something has broken
          </Alert>
        )}
      </ModalBody>
    </Modal>
  );
};
export default DetailsModal;
