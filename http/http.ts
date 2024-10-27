import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { REACT_APP_API_TOKEN } from "@env";

export const API_URL: string = `https://api.themoviedb.org/3/`;

export const queryClient = new QueryClient();

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
  },
});

export default $api;
