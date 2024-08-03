import axios from "axios";

const API_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjRlZWUzN2JhNzMxMDc5ODBkNzQ1NjI3YWJhNWRmMSIsIm5iZiI6MTcyMjY3MTg0MS4xMTM0NzEsInN1YiI6IjY2YWJjNDU3MjU1NzA2NGVjNTBiMjNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xRi6qejmZ0ZWl9LxcGzloImSJCkB4zbK_Lw2q0AR6VQ`

//process.env.REACT_API_KEY;

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
})

// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
}, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
}, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
});

export default api;