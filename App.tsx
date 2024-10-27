import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FilmsScreen from "./screens/FilmsScreen";
import { queryClient } from "./http/http";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <FilmsScreen />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
