import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

function ChapterItem({ chapter, index }) {
  return (
    <View style={styles.outerrButtonContainer}>
      <Pressable
        android_ripple={{ color: "#ECE9E6" }}
        style={styles.innerButtonContainer}
      >
        <Text style={styles.text}>
          <Text style={styles.textBold}>Chapter {index + 1}:</Text>{" "}
          {chapter.title}
        </Text>
      </Pressable>
    </View>
  );
}

export default ChapterItem;

const styles = StyleSheet.create({
  outerrButtonContainer: {
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    height: 27,
    borderRadius: 8,
    width: "100%",
    overflow: "hidden",
    marginVertical: 5,
  },
  innerButtonContainer: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: "100%",
  },
  text: {
    color: "white",
  },
  textBold: {
    fontWeight: "bold",
    color: "white",
    width: 50,
  },
});
