import { Pressable, StyleSheet } from "react-native";
import Arrow from "../assets/icons/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";

const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
      onPress={() => navigation.goBack()}
    >
      <Arrow width={32} height={32} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
});

export default ButtonBack;
