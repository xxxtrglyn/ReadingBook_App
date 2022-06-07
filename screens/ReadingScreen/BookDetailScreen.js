import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import ChapterItem from "../../components/detailbook/ChapterItem";
import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";

function BookDetailScreen() {
  const [book, setBook] = useState({});
  useEffect(() => {
    async function getABook() {
      try {
        const res = await axios.get(
          "http://10.0.2.2:3000/api/books/book/6282053daf31daa83b74c194"
        );
        setBook(res.data);
      } catch (err) {
        console.log("error occurs", err);
      }
    }
    getABook();
  });
  return (
    <>
      {book._id !== undefined && (
        <LinearGradient style={styles.screen} colors={["#C04848", "#480048"]}>
          <View style={styles.bookContainer}>
            <Image
              style={styles.bookCover}
              source={{
                uri: book.coverImageURL,
              }}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{book.bookName}</Text>
          </View>
          <View style={styles.description}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text style={styles.text}>"{book.description}"</Text>
            </ScrollView>
          </View>

          <View style={styles.infoContainer}>
            <Card>
              <Text style={styles.infoText}>#{book.category.categoryName}</Text>
            </Card>
            <Card>
              <View style={styles.iconContainer}>
                <Text style={styles.infoText}>{book.avrStarNumber} </Text>
                <Ionicons size={15} color="yellow" name="star" />
              </View>
            </Card>
            <Card>
              <Text style={styles.infoText}>1000 follower</Text>
            </Card>
          </View>
          <PrimaryButton>Add to library</PrimaryButton>

          <FlatList
            style={styles.chapterContainer}
            data={book.chapters}
            renderItem={(itemData) => (
              <ChapterItem chapter={itemData.item} index={itemData.index} />
            )}
            keyExtractor={(chapter) => chapter._id}
          />
        </LinearGradient>
      )}
    </>
  );
}

export default BookDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  bookContainer: {
    width: 141,
    height: 200,
    alignItems: "center",
    marginTop: 30,
  },
  bookCover: {
    width: 141,
    height: 200,
    flex: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  titleContainer: {
    height: 50,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontSize: 22,
    padding: 5,
    fontWeight: "bold",
  },
  chapterContainer: {
    flex: 1,
    marginVertical: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#FFE47A",
  },
  text: {
    fontSize: 15,
    color: "white",
    fontStyle: "italic",
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 120,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
