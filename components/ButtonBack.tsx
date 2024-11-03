import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Arrow from "../assets/icons/arrow-left.svg";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackAuthNavigation } from "../navigation/routes";

interface ButtonBackProps {
  targetScreen: keyof RootStackAuthNavigation;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ targetScreen }) => {
  const navigation = useNavigation<NavigationProp<RootStackAuthNavigation>>();
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
