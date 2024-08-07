import React, { useState, useEffect } from 'react';
import { useSearchMoviesQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

// 경로 2가지
// 1. nav바에서 클릭해서 온 경우 -> popularMovies 보여주기
// 2. keyword를 입력해서 온 경우 -> keyword와 관련된 영화들을 보여줌

// 1. 페이지네이션 설치
// 2. page state 만들기
// 3. 페이지네이션 클릭할 때마다 page 바꿔주기
// 4. page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get('q'); // navigate(`/movies?q=${keyword}`) / applayout페이지에서 이렇게 설정해놔서 url쿼리가 값이 q인 것을 가져옴

  useEffect(() => {
    if (keyword) {
      setPage(1); // 검색어가 변경되면 페이지를 1로 설정
    }
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchMoviesQuery({ keyword, page });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1); // 페이지네이션에서 페이지는 0부터 시작하므로 1을 더해줌
  };

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
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
          필터
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data.total_pages || 1} // pageCount 기본값 설정
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1} // 현재 페이지를 0 기반 인덱스로 맞춤
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
