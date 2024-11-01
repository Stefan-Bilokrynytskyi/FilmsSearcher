import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Arrow from "../assets/icons/arrow-left.svg";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/routes";

interface ButtonBackProps {
  targetScreen: keyof RootStackParamList;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ targetScreen }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
      onPress={() => navigation.navigate(targetScreen)}
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
