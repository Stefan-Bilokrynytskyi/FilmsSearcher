import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/routes";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Sign in</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />
      <Pressable
        android_ripple={{ color: "#ffbf4a" }}
        style={({ pressed }) => [
          styles.buttonSignIn,
          pressed ? styles.buttonPressed : null,
        ]}

        // onPress={() => navigation.navigate("Films")}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <View style={styles.signUpContainer}>
        <Text style={styles.buttonText}>Not registered?</Text>
        <Pressable
          style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
          onPress={() => navigation.replace("SignUp")}
        >
          <Text style={styles.buttonSignUpText}> Create an account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#edf1f3",
    borderRadius: 10,
    fontSize: 20,
  },
  caption: {
    color: "#edf1f3",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonText: {
    color: "#edf1f3",
    fontSize: 20,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonSignUpText: {
    color: "#f9a826",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonSignIn: {
    backgroundColor: "#f9a826",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
