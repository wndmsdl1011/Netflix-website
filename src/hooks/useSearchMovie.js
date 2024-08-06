import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovies = ({ keyword }) => {
    return keyword 
    ? api.get(`/search/movie?query=${keyword}`) 
    : api.get(`/movie/popular`)
}
export const useSearchMoviesQuery = ({keyword}) => {
    return useQuery({
        queryKey: ['movie-search', keyword],
        queryFn: () => fetchSearchMovies({ keyword }),
        select: (result) => result.data
    })
}