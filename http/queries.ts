import $api from "./http";
import { MovieCardData, MovieData } from "../models/MoviesModels";
import axios from "axios";
import { FIREBASE_API_KEY } from "@env";
import { signUpErrors, signInErrors } from "../ErrorMessages/ErrorMessages";
import { countries } from "../configurationData/countries";

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

export const fetchMovie = async (id: string): Promise<MovieData> => {
  try {
    const res = await $api.get(`movie/${id}?append_to_response=credits,videos`);
    const {
      genres,
      origin_country,
      original_title,
      overview,
      poster_path,
      release_date,
      title,
      vote_average,
      runtime,
      popularity,
      credits,
      revenue,
      videos,
    } = res.data;
    console.log(id);
    const sortedActors = credits.cast
      .sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          b.popularity - a.popularity
      )
      .slice(0, 8)
      .map((actor: { name: string }) => actor.name);

    const trailer: string =
      videos.results.length > 0
        ? videos.results.find(
            (video: { type: string; official: boolean }) =>
              video.type === "Trailer" && video.official
          )?.key || videos.results[0].key
        : "";

    const hours: number = Math.floor(runtime / 60);
    const minutes: number = runtime % 60;
    const runtimeConverted: string = `${
      hours ? `${hours} hour${hours > 1 ? "s" : ""}` : ""
    } ${minutes ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}`;
    return {
      genres: genres.map((genre: { id: number; name: string }) => genre.name),
      country:
        countries.find((country) => country.linkName === origin_country[0])
          ?.name || "",
      actors: sortedActors,
      director: credits.crew.find(
        (crewman: { job: string }) => crewman.job === "Director"
      ).name,
      runtime: runtimeConverted,
      overview,
      popularity,
      original_title,
      revenue,
      poster_path,
      release_date,
      title,
      trailer,
      vote_average,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const signUpFirebase = async (
  email: string,
  username: string,
  password: string
): Promise<{ status: number }> => {
  try {
    console.log("fsdfsd");
    const userData = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        FIREBASE_API_KEY,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const idToken = userData.data.idToken;
    const userId = userData.data.localId;

    await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
        FIREBASE_API_KEY,
      {
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
      }
    );

    const res = await axios.put(
      `https://moviess-9bed7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${idToken}`,
      { username, email }
    );

    return { status: res.status };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error.message;
      const errorObj = signUpErrors.find(
        (error) => error.message === errorMessage
      );
      throw new Error(errorObj?.explanation || "An error occurred");
    } else {
      console.log(error);
      throw new Error(error.message || "An error occurred");
    }
  }
};

export const signInFirebase = async (
  email: string,
  password: string
): Promise<{ status: number; token: string; userId: string }> => {
  try {
    const userData = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        FIREBASE_API_KEY,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const isUserVerified = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
        FIREBASE_API_KEY,
      {
        idToken: userData.data.idToken,
      }
    );
    if (!isUserVerified.data.users[0].emailVerified) {
      throw new Error("User email is not verified.");
    }

    return {
      status: userData.status,
      token: userData.data.idToken,
      userId: userData.data.localId,
    };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log(error.response.data.error.message);
      const errorMessage = error.response.data.error.message;
      const errorObj = signInErrors.find(
        (error) => error.message === errorMessage
      );
      throw new Error(errorObj?.explanation || "An error occurred");
    } else {
      console.log(error);
      throw new Error(error.message || "An error occurred");
    }
  }
};

export const getUserInfo = async (
  token: string,
  userId: string
): Promise<{ username: string }> => {
  try {
    const res = await axios.get(
      `https://moviess-9bed7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`
    );
    return { username: res.data.username };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
