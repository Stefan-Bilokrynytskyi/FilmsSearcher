import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovies } from "../http/queries";
import { MovieCardData } from "../models/MoviesModels";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackFilmsNavigation } from "../navigation/routes";
import { useNavigation } from "@react-navigation/native";

type FilmsScreenNavigationProp = StackNavigationProp<
  RootStackFilmsNavigation,
  "Films"
>;

const FilmsScreen = () => {
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
  const navigation = useNavigation<FilmsScreenNavigationProp>();
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
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate("FilmDetails", {
                  filmId: item.id.toString(),
                  previousScreen: "Films",
                })
              }
            >
              <MovieCard movie={item} />
            </Pressable>
          )}
          style={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={<Text style={styles.title}>MOVIES</Text>}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.45)"]}
          style={styles.gradientOverlay}
          pointerEvents="none"
        />
      </View>
    );
  }
  return <>{content}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    position: "relative",
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
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "25%",
  },
  card: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default FilmsScreen;
