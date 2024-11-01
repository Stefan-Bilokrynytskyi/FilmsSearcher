import { Pressable, View, Text, StyleSheet } from "react-native";
import Arrow from "../assets/icons/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";

const ErrorModal = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Oops, something went wrong...</Text>
      <View style={styles.button}>
        <Pressable
          style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
          onPress={() => navigation.goBack()}
          android_ripple={{ color: "#ffbf4a" }}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#414987",
    borderRadius: 15,
  },
  caption: {
    color: "#edf1f3",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f9a826",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#edf1f3",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default ErrorModal;
