export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  genres: GenreResponse;
}
