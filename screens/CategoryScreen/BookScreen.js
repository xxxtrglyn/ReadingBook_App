import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Book from "../../components/ui/Book";

function BookScreen({ route }) {
  let cate = {};
  let categoryIsValid = false;
  if (route.params !== undefined) {
    cate = route.params;
    categoryIsValid = true;
  }
  const [book, setBook] = useState([]);

  useEffect(() => {
    let url = "http://reading-book-api.herokuapp.com/api/books";
    async function getBookInCategory() {
      if (categoryIsValid || route.name === "ALL") {
        try {
          if (route.name !== "ALL") {
            url = `${url}/category/${cate._id}`;
          }
          const res = await axios.get(url);
          const data = route.name === "ALL" ? res.data.books : res.data;
          const transformBook = data.filter((book) => {
            if (book.category === null || book.author === null) {
              return false;
            }
            return true;
          });
          setBook(transformBook);
        } catch (err) {
          console.log("error occurs", err);
          Alert.alert("Server error", "Error from loading data from server", [
            { text: "OK", style: "destructive" },
          ]);
        }
      }
    }
    getBookInCategory();
  }, [categoryIsValid]);
  return (
    <>
      <LinearGradient
        colors={["#C04848", "#480048"]}
        style={styles.wrapperScreen}
      >
        {book.length === 0 && <ActivityIndicator size="large" />}
        {book.length > 0 && (
          <FlatList
            contentContainerStyle={{ alignItems: "center", paddingTop: 70 }}
            style={styles.screen}
            data={book}
            renderItem={(itemData) => <Book book={itemData.item} />}
            keyExtractor={(item) => item._id}
            numColumns={3}
          />
        )}
      </LinearGradient>
    </>
  );
}

export default BookScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapperScreen: {
    flex: 1,
    justifyContent: "center",
  },
});
