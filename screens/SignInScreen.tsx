import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackAuthNavigation } from "../navigation/routes";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signInFirebase } from "../http/queries";
import { useDispatch } from "react-redux";
import { authStoreActions } from "../store/authStore";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackAuthNavigation,
  "SignIn"
>;
interface inputValidation {
  value: boolean;
  message: string;
}

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorSignIn, setErrorSignIn] = useState<inputValidation>({
    value: false,
    message: "",
  });
  const dispatch = useDispatch();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
    }): Promise<{ status: number; token: string; userId: string }> => {
      const result = await signInFirebase(data.email, data.password);
      return result;
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        dispatch(
          authStoreActions.signIn({ token: data.token, userId: data.userId })
        );
      }
    },
    onError: (error) => {
      setErrorSignIn({ value: true, message: error.message });
    },
  });

  const handleSignIn = () => {
    if (email === "" || password === "") {
      setErrorSignIn({
        value: true,
        message: "Please fill in all the fields",
      });
      return;
    }
    setErrorSignIn({ value: false, message: "" });
    mutate({ email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.caption}>Sign in</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Pressable
          android_ripple={{ color: "#ffbf4a" }}
          style={({ pressed }) => [
            styles.buttonSignIn,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
        {errorSignIn.value && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorSignInText}>{errorSignIn.message}</Text>
          </View>
        )}
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
  errorContainer: {
    padding: 15,
    backgroundColor: "#f71e49",
    borderRadius: 15,
    marginTop: 10,
  },
  errorSignInText: {
    color: "#edf1f3",
    fontSize: 16,
    fontWeight: "bold",
  },
});
