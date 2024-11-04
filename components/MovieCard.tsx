import { StyleSheet, Text, View, Image } from "react-native";
import { MovieCardData } from "../models/MoviesModels";
import Star from "../assets/icons/star.svg";
import { useNavigation } from "@react-navigation/native";

const MovieCard: React.FC<{ movie: MovieCardData }> = ({ movie }) => {
  return (
    <>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.ratingContainer}>
        <Star width={20} height={20} />
        <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
        <Text style={styles.releaseDate}>
          {movie.release_date.slice(0, 4)}, HDRip
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
    color: "#FFA500",
    marginLeft: 5,
  },
  releaseDate: {
    fontSize: 16,
    color: "#8D8A8A",
    marginLeft: 5,
  },
  star: {
    width: 20,
    height: 20,
  },
});

export default MovieCard;
