import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Title from "../ui/Title";
import Book from "../ui/Book";

function ListBook({ title, books }) {
  return (
    <View style={styles.outterContainer}>
      <Title>{title}</Title>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row" }}
        horizontal={true}
      >
        {books.length > 0 &&
          books.map((book) => <Book key={book._id} book={book} />)}
      </ScrollView>
    </View>
  );
}

export default ListBook;

const styles = StyleSheet.create({
  outterContainer: {
    paddingVertical: 10,
  },
  bookContainer: {
    width: 141,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 10,
  },
});
