import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Arrow from "../assets/icons/arrow-left.svg";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackFilmsNavigation } from "../navigation/routes";

interface ButtonBackProps {
  targetScreen: keyof RootStackFilmsNavigation;
  params?: RootStackFilmsNavigation[keyof RootStackFilmsNavigation];
}

const ButtonBackFilms: React.FC<ButtonBackProps> = ({
  targetScreen,
  params,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackFilmsNavigation>>();

  const handlePress = () => {
    console.log("targetScreen212312", targetScreen);
    if (params && targetScreen === "FilmDetails") {
      navigation.navigate(
        "FilmDetails",
        params as {
          filmId: string;
          previousScreen: keyof RootStackFilmsNavigation;
        }
      );
    } else if (targetScreen === "Films" || targetScreen === "ErrorScreen") {
      console.log("targetScreen2121");
      navigation.navigate(targetScreen);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={handlePress}
    >
      <Arrow width={32} height={32} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(17, 20, 41, 0.5)",
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    // margin: 20,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default ButtonBackFilms;
