import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { Movie } from '../types/types';

interface props {
  movies: Movie[],
  selectMovie: (s: string) => void,
}

const MovieTiles = ({ movies, selectMovie }: props) => (
  <Container>
    <Row>
      {(movies.map((movie) => (
        <Col xl={2} lg={3} ms={4} sm={6} xs={12} key={`${movie.imdbID}1`}>
          <Card className="fadeInOnLoad">
            <CardBody>
              {movie.Poster.includes('https://')
                && <CardImg top width="100%" src={movie.Poster} alt="movie poster" />}
            </CardBody>
            <CardFooter onClick={() => selectMovie(movie.imdbID)}>
              <Row>
                {movie.Title}
              </Row>
              <Row>
                {movie.Year}
              </Row>
            </CardFooter>
          </Card>
        </Col>
      )))}
    </Row>
  </Container>
);

export default MovieTiles;
