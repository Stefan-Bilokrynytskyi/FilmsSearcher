import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonBack from "./ButtonBack";
import Logo from "./Logo";

const HeaderAuthentification = () => {
  return (
    <View style={styles.headerContainer}>
      <ButtonBack />
      <Logo />
      <View style={styles.rightContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1b2045",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  rightContainer: {
    width: 32, // Ширина кнопки назад для симметрии
  },
});

export default HeaderAuthentification;
