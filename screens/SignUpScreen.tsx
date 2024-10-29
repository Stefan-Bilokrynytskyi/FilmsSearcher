import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/routes";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/inputValidation";
import { useState } from "react";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

interface inputValidation {
  value: boolean;
  message: string;
}

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameValid, setNameValid] = useState<inputValidation>({
    value: true,
    message: "",
  });
  const [emailValid, setEmailValid] = useState<inputValidation>({
    value: true,
    message: "",
  });
  const [passwordValid, setPasswordValid] = useState<inputValidation>({
    value: true,
    message: "",
  });
  console.log(nameValid);
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Create account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={[styles.input, !nameValid.value && styles.errorInput]}
          onChangeText={(text) => setUsername(text)}
          onBlur={() => setNameValid(validateUsername(username))}
          onFocus={() => setNameValid({ value: true, message: "" })}
        />
        {!nameValid.value && (
          <Text style={styles.errorText}>{nameValid.message}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={[styles.input, !emailValid.value && styles.errorInput]}
          onChangeText={(text) => setEmail(text)}
          onBlur={() => setEmailValid(validateEmail(email))}
          onFocus={() => setEmailValid({ value: true, message: "" })}
        />
        {!emailValid.value && (
          <Text style={styles.errorText}>{emailValid.message}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={[styles.input, !passwordValid.value && styles.errorInput]}
          onChangeText={(text) => setPassword(text)}
          onBlur={() => setPasswordValid(validatePassword(password))}
          onFocus={() => setPasswordValid({ value: true, message: "" })}
          secureTextEntry
        />
        {!passwordValid.value && (
          <Text style={styles.errorText}>{passwordValid.message}</Text>
        )}
      </View>

      <Pressable
        android_ripple={{ color: "#ffbf4a" }}
        style={({ pressed }) => [
          styles.buttonSignIn,
          pressed ? styles.buttonPressed : null,
        ]}

        // onPress={() => navigation.navigate("Films")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      <View style={styles.signUpContainer}>
        <Text style={styles.buttonText}>Have an account?</Text>
        <Pressable
          style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
          onPress={() => navigation.replace("SignIn")}
        >
          <Text style={styles.buttonSignUpText}> Sign in</Text>
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
  inputContainer: {
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
  errorText: {
    color: "red",
    fontSize: 16,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});
