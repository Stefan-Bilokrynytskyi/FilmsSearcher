import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/routes";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../components/Logo";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  return (
    <LinearGradient colors={["#1b2045", "#0f151c"]} style={styles.container}>
      <ImageBackground
        source={require("../assets/movies-background.jpg")}
        resizeMode="cover"
        style={styles.backgroundContainer}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Logo />

          <Pressable
            android_ripple={{ color: "#ffbf4a" }}
            style={({ pressed }) => [
              styles.buttonSignIn,
              pressed ? styles.buttonPressed : null,
            ]}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>Are you ready to watch?</Text>

            <Text style={styles.infoText}>
              Discover the stories everyone is talking about. You can
              unsubscribe at any time.
            </Text>
          </View>
          <View style={styles.signUpOfferContainer}>
            <Text style={styles.signUpOfferText}>
              Create an account if you are not registered yet.
            </Text>

            <Pressable
              style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonSignUpText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonSignIn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#FFA500",
    borderRadius: 5,
  },
  buttonText: {
    color: "#edf1f3",
    fontWeight: "bold",
    fontSize: 20,
  },
  backgroundContainer: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    opacity: 0.18,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 100,
  },
  captionContainer: {
    alignItems: "center",
  },
  captionText: {
    fontSize: 46,
    color: "#edf1f3",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 24,
    color: "#edf1f3",
    textAlign: "center",
  },
  signUpOfferContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(15, 21, 28, 0.8)",
    borderColor: "#FFA500",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  signUpOfferText: {
    fontSize: 24,
    color: "#edf1f3",
    textAlign: "center",
    marginBottom: 5,
  },
  buttonSignUpText: {
    color: "#FFA500",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "#FFA500",
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
