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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import UserAccountScreen from "./screens/UserAccountScreen";
import store from "./store";
import Home from "./assets/icons/home.svg";
import Account from "./assets/icons/account.svg";
import HeaderAccount from "./components/HeaderAccount";
import FilmDetailsScreen from "./screens/FilmDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1b2045" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#1b2045" },
      }}
    >
      <Stack.Screen
        name="userInfo"
        component={UserAccountScreen}
        options={{
          header: () => <HeaderAccount />,
        }}
      />
    </Stack.Navigator>
  );
}

function FilmsNavigation() {
  return (
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
        name="FilmDetails"
        component={FilmDetailsScreen}
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
  );
}

function appNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#0c0e1f",
            borderTopWidth: 0,
            paddingTop: 20,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={FilmsNavigation}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#edf1f3" : "#8D8A8A",
                  marginTop: 10,
                }}
              >
                Movies
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Home
                width={28}
                height={28}
                fill={focused ? "#edf1f3" : "#8D8A8A"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountNavigation}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#edf1f3" : "#8D8A8A",
                  marginTop: 10,
                }}
              >
                Account
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Account
                width={32}
                height={32}
                fill={focused ? "#edf1f3" : "#8D8A8A"}
              />
            ),
          }}
        />
      </Tab.Navigator>
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
      const userId = await AsyncStorage.getItem("userId");
      if (token) {
        dispatch(authStoreActions.signIn({ token, userId }));
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
