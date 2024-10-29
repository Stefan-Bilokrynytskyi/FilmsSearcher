import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FilmsScreen from "./screens/FilmsScreen";
import SignInScreen from "./screens/SignInScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ButtonBack from "./components/ButtonBack";
import { queryClient } from "./http/http";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logo from "./components/Logo";
import HeaderAuthentification from "./components/HeaderAuthentification";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
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
              header: () => <HeaderAuthentification />, // Используем кастомный заголовок
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              header: () => <HeaderAuthentification />, // Используем кастомный заголовок
            }}
          />
          <Stack.Screen
            name="Films"
            component={FilmsScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
