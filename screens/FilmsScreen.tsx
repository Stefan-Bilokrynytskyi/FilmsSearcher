import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovies } from "../http/queries";
import { MovieCardData } from "../models/MoviesModels";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useSelector } from "react-redux";
import { authStoreState } from "../store/authStore";

export default function FilmsScreen() {
  const [page, setPage] = useState<number>(1);
  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ movies: MovieCardData[]; totalPages: number }> = useQuery(
    {
      queryKey: ["movies", page],
      queryFn: () =>
        fetchMovies(
          `discover/movie?language=en-US&vote_count.gte=200&page=${page}`
        ),
    }
  );
  let content: JSX.Element | null = null;

  if (isLoading) {
    content = (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    console.log(error);
    content = (
      <View>
        <Text>Error: {(error as Error).message}</Text>
      </View>
    );
  }

  if (data) {
    content = (
      <View style={styles.container}>
        <FlatList
          data={data.movies}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          style={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={<Text style={styles.title}>MOVIES</Text>}
        />
      </View>
    );
  }
  return <>{content}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 15,
  },
});
