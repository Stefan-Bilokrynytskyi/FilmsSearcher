import $api from "./http";
import { MovieCardData } from "../models/MoviesModels";

export const fetchMovies = async (
  url: string
): Promise<{ movies: MovieCardData[]; totalPages: number }> => {
  try {
    const res = await $api.get(url);
    return { movies: res.data.results, totalPages: res.data.total_pages };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
