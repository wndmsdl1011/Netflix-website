import React from "react";
import { useSearchMoviesQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from  "../../common/MovieCard/MovieCard"

// 경로 2가지
// 1. nav바에서 클릭해서 온 경우 -> popularMovies 보여주기
// 2. keyword를 입력해서 온 경우 ->  keyword와 관련된 영화들을 보여줌.

// 1. 페이지네이션 설치
// 2. page state 만들기
// 3. 페이지네이션 클릭할때마다 page 바꿔주기
// 4. page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMoviesQuery({ keyword });
  console.log("ddd", data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {""}
          필터{""}
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results?.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
