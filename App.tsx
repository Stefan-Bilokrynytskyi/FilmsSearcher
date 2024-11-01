import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FilmsScreen from "./screens/FilmsScreen";
import SignInScreen from "./screens/SignInScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { queryClient } from "./http/http";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderAuthentification from "./components/HeaderAuthentification";
import ErrorScreen from "./screens/ErrorScreen";
import HeaderDefault from "./components/HeaderDefault";
import VerifyEmailScreen from "./screens/VerifyEmailScreen";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { authStoreActions, authStoreState } from "./store/authStore";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1b2045" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#1b2045" },
        }}
      >
        <Stack.Screen
          name="Films"
          component={FilmsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ErrorScreen"
          component={ErrorScreen}
          options={{
            header: () => <HeaderDefault />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function authNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1b2045" },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "#1b2045" },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            header: () => <HeaderAuthentification />,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            header: () => <HeaderAuthentification />,
          }}
        />

        <Stack.Screen
          name="ErrorScreen"
          component={ErrorScreen}
          options={{
            header: () => <HeaderDefault />,
          }}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmailScreen}
          options={{
            header: () => <HeaderDefault />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Navigation() {
  const authStore: authStoreState = useSelector(
    (state: { authStore: authStoreState }) => state.authStore
  );
  return authStore.isAuthenticated ? appNavigation() : authNavigation();
}

function Root() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(authStoreActions.signIn({ token }));
      }
      setIsAuthenticating(false);
    };
    checkAuth();
  }, []);

  if (isAuthenticating) {
    return <Text>Loading...</Text>;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StatusBar style="light" />
        <Root />
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
