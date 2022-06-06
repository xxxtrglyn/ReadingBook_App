import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function LabelIcon({ children, icon }) {
  return (
    <View style={styles.container}>
      <Ionicons color="white" size={17} name={icon} />
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
}

export default LabelIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  labelText: {
    fontSize: 16,
    letterSpacing: 1,
    marginLeft: 30,
    color: "white",
  },
});
