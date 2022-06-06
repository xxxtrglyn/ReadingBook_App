import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function Book(props) {
  return (
    <View style={styles.bookContainer}>
      <Image
        style={styles.bookCover}
        source={{
          uri: props.book.coverImageURL,
        }}
      />
      <View style={styles.titleWrapper}>
        <Text style={styles.bookTitle}>{props.book.bookName}</Text>
      </View>
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
