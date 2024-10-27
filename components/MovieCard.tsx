import { StyleSheet, Text, View, Image } from "react-native";
import { MovieCardData } from "../models/MoviesModels";

const MovieCard: React.FC<{ movie: MovieCardData }> = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{movie.vote_average}</Text>
        <Text style={styles.releaseDate}>{movie.release_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 8,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  star: {
    width: 20,
    height: 20,
  },
});

export default MovieCard;
