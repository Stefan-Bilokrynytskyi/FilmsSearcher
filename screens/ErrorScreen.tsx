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

type ErrorScreenNavigationProp = StackNavigationProp<
  RootStackAuthNavigation,
  "ErrorScreen"
>;

export default function ErrorScreen() {
  const navigation = useNavigation<ErrorScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ErrorModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    alignItems: "center",
  },
});
