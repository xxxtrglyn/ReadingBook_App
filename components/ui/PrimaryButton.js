import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress, textStyle, borderStyle }) {
  return (
    <View style={[styles.buttonOuterContainer, borderStyle]}>
      <Pressable
        android_ripple={{ color: "#dfede3" }}
        style={styles.buttonInnerContainer}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderWidth: 2,
    flex: 0,
    borderColor: "white",
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
