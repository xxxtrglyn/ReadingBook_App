import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ children, icon, onPress }) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ color: "white" }}
    >
      <Ionicons size={25} color="white" name={icon} />
      <Text style={styles.labelText}>{children}</Text>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  labelText: {
    fontSize: 18,
    letterSpacing: 1,
    marginLeft: 30,
    color: "white",
  },
});
