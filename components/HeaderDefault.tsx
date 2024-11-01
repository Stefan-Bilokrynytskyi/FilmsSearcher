import React from "react";
import { View, StyleSheet } from "react-native";
import Logo from "./Logo";

const HeaderDefault = () => {
  return (
    <View style={styles.headerContainer}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1b2045",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
});

export default HeaderDefault;
