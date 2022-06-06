import React from "react";
import { Text, StyleSheet } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "bold",
    padding: 12,
    margin: 12,
    fontSize: 20,
    color: "white",
    flex: 0,
  },
});
