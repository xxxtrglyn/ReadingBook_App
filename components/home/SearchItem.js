import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function SearchItem({ book }) {
  const navigation = useNavigation();
  function navigateToDetail() {
    navigation.navigate("DetailScreen", book);
  }
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={styles.innerContainer}
        android_ripple={{ color: "#c0c0aa" }}
        onPress={navigateToDetail}
      >
        <Text>{book.bookName}</Text>
      </Pressable>
    </View>
  );
}

export default SearchItem;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: 40,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
