import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackAuthNavigation } from "../navigation/routes";
import ErrorModal from "../components/ErrorModal";

type VerifyEmailScreenNavigationProp = StackNavigationProp<
  RootStackAuthNavigation,
  "VerifyEmail"
>;

export default function VerifyEmailScreen() {
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Verification email sent. Please, verify your email for successfull sign
        in!
      </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    alignItems: "center",
    paddingHorizontal: 20,
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
    fontSize: 32,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  message: {
    color: "#edf1f3",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
