import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Book(props) {
  const navigator = useNavigation();
  function moveToDetailHandler() {
    navigator.navigate("DetailScreen", props.book);
  }
  return (
    <View style={styles.bookContainer}>
      <Pressable
        style={{ flex: 1 }}
        android_ripple={{ color: "white" }}
        onPress={moveToDetailHandler}
      >
        <Image
          style={styles.bookCover}
          source={{
            uri: props.book.coverImageURL,
          }}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.bookTitle}>{props.book.bookName}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Book;

const styles = StyleSheet.create({
  bookContainer: {
    width: 120,
    height: 195,
    alignItems: "center",
    margin: 5,
  },
  bookCover: {
    width: 120,
    height: 170,
    flex: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  titleWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  bookTitle: {
    fontSize: 10,
    textAlign: "center",
    color: "white",
  },
});
