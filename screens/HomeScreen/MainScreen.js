import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../../components/ui/Title";
import SearchBar from "../../components/home/SearchBar";
import ListBook from "../../components/home/ListBook";
import axios from "axios";
import SearchItem from "../../components/home/SearchItem";

function MainScreen() {
  const [searchContent, setSearchContent] = useState("");
  const [searchBook, setSearchBook] = useState([]);
  const [ratingBooks, setRatingBooks] = useState([]);
  const [viewBooks, setViewBooks] = useState([]);
  const [followsBooks, setFollowsBooks] = useState([]);
  function saveSearchContentHandler(enteredText) {
    if (enteredText.length === 0) {
      setSearchBook([]);
    }
    setSearchContent(enteredText);
  }
  function closeSearchEngineHandler() {
    setSearchBook([]);
  }
  useEffect(() => {
    async function getRatingBooks() {
      try {
        const res = await axios.get(
          "http://reading-book-api.herokuapp.com/api/books?pageSize=10&pageNumber=1&sort=desc&typeSort=avrStarNumber"
        );
        setRatingBooks(res.data.books);
      } catch (err) {
        console.log("some err");
      }
    }
    async function getViewBooks() {
      try {
        const res = await axios.get(
          "http://reading-book-api.herokuapp.com/api/books?pageSize=10&pageNumber=1&sort=desc&typeSort=viewNumber"
        );
        setViewBooks(res.data.books);
      } catch (err) {
        console.log("some err");
      }
    }
    async function getFollowsBooks() {
      try {
        const res = await axios.get(
          "http://reading-book-api.herokuapp.com/api/books?pageSize=10&pageNumber=1&sort=desc&typeSort=followTotal"
        );
        setFollowsBooks(res.data.books);
      } catch (err) {
        console.log("some err");
      }
    }
    getRatingBooks();
    getViewBooks();
    getFollowsBooks();
  }, []);

  useEffect(() => {
    if (searchContent.length > 0) {
      const searchEngine = setTimeout(async () => {
        try {
          const res = await axios.get(
            `http://reading-book-api.herokuapp.com/api/books?pageSize=50&pageNumber=1&keyword=${searchContent}`
          );
          setSearchBook(res.data.books);
        } catch (err) {
          console.log("error occurs", err);
        }
      }, 500);
      return () => {
        clearTimeout(searchEngine);
      };
    }
  }, [searchContent]);

  return (
    <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
      <View style={styles.topPart}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80",
          }}
          style={styles.imageContainer}
        >
          <Title>Reading Book</Title>
        </ImageBackground>
        <SearchBar
          value={searchContent}
          onSave={saveSearchContentHandler}
          onClose={closeSearchEngineHandler}
        />
      </View>

      <ScrollView
        style={styles.bottomPart}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {searchContent.length > 0 && (
          <ScrollView
            nestedScrollEnabled={true}
            style={styles.searchGuess}
            contentContainerStyle={{ flex: 1 }}
          >
            {searchBook.map((item) => (
              <SearchItem key={item._id} book={item} />
            ))}
          </ScrollView>
        )}
        <ListBook title="Trending" books={viewBooks} />
        <ListBook title="Best rating" books={ratingBooks} />
        <ListBook title="Most followers" books={followsBooks} />
      </ScrollView>
    </LinearGradient>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topPart: {
    alignItems: "center",
    height: 225,
  },
  imageContainer: {
    height: 200,
    width: "100%",
    borderColor: "white",
    margin: 4,
    overflow: "hidden",
    opacity: 0.75,
    position: "absolute",
  },
  searchGuess: {
    width: "80%",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    top: 20,
    zIndex: 99,
    maxHeight: 300,
    alignSelf: "center",
  },
  bottomPart: {
    flex: 1,
  },
});
