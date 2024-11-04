import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovie } from "../http/queries";
import { MovieData } from "../models/MoviesModels";
import { RootStackFilmsNavigation } from "../navigation/routes";
import { useRoute, RouteProp } from "@react-navigation/native";
import ButtonBackFilms from "../components/ButtonBackFilms";

type FilmsScreenRouteProp = RouteProp<RootStackFilmsNavigation, "FilmDetails">;

export default function FilmDetailsScreen() {
  const route = useRoute<FilmsScreenRouteProp>();
  const filmId = route.params.filmId;
  const previousScreen = route.params.previousScreen;
  const { data, isLoading, isError, error }: UseQueryResult<MovieData> =
    useQuery({
      queryKey: ["movie", filmId],
      queryFn: () => fetchMovie(filmId),
    });
  let content: JSX.Element | null = null;

  if (isLoading) {
    content = (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    content = (
      <View>
        <Text>Error: {(error as Error).message}</Text>
      </View>
    );
  }

  if (data) {
    content = (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
          }}
          resizeMode="cover"
          style={styles.poster}
        >
          <View style={styles.backButtonContainer}>
            <ButtonBackFilms targetScreen={previousScreen} />
          </View>
        </ImageBackground>

        <Text style={styles.title}>{data.title}</Text>
      </View>
    );
  }
  return <>{content}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  backButtonContainer: {
    paddingTop: 50,
    paddingLeft: 20,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
