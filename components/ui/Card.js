import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Card({ children }) {
  return <View style={styles.wrapper}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 3,
    borderColor: "#FFE47A",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 10,
    margin: 4,
  },
});
