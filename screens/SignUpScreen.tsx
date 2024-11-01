import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackAuthNavigation } from "../navigation/routes";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/inputValidation";
import { useMutation } from "@tanstack/react-query";
import { signUpFirebase } from "../http/queries";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackAuthNavigation,
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
  const [errorSignUp, setErrorSignUp] = useState<inputValidation>({
    value: false,
    message: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: {
      email: string;
      username: string;
      password: string;
    }): Promise<{ status: number }> => {
      const result = await signUpFirebase(
        data.email,
        data.username,
        data.password
      );
      return result;
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log("User created successfully");
        navigation.navigate("VerifyEmail");
      }
    },
    onError: (error) => {
      setErrorSignUp({ value: true, message: error.message });
    },
  });

  if (isError) {
    console.log(error.message);
  }

  const handleSignUp = () => {
    const isNameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isNameValid.value && isEmailValid.value && isPasswordValid.value) {
      mutate({ email, username, password });
    } else {
      setNameValid(isNameValid);
      setEmailValid(isEmailValid);
      setPasswordValid(isPasswordValid);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.caption}>Create account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            style={[styles.input, !nameValid.value && styles.errorInput]}
            onChangeText={(text) => setUsername(text)}
            onBlur={() => setNameValid(validateUsername(username))}
            onFocus={() => setNameValid({ value: true, message: "" })}
            value={username}
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
            value={email}
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
            value={password}
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
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
        {errorSignUp.value && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorSignUpText}>{errorSignUp.message}</Text>
          </View>
        )}
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
    </TouchableWithoutFeedback>
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
  errorContainer: {
    padding: 15,
    backgroundColor: "#f71e49",
    borderRadius: 15,
    marginTop: 10,
  },
  errorSignUpText: {
    color: "#edf1f3",
    fontSize: 16,
    fontWeight: "bold",
  },
});
