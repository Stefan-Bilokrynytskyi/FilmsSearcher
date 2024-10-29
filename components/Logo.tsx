import { Text, StyleSheet } from "react-native";

const HeaderTitle = () => {
  return (
    <Text style={styles.title}>
      MOVIE<Text style={styles.titleSS}>SS</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#edf1f3",
  },
  titleSS: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#FFA500",
  },
});

export default HeaderTitle;
