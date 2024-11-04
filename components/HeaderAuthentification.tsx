import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonBackAuth from "./ButtonBackAuth";
import Logo from "./Logo";

const HeaderAuthentification = () => {
  return (
    <View style={styles.headerContainer}>
      <ButtonBackAuth targetScreen="Welcome" />
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
    width: 32,
  },
});

export default HeaderAuthentification;
