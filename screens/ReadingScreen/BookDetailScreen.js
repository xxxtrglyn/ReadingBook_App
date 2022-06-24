import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import ChapterItem from "../../components/detailbook/ChapterItem";
import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
function BookDetailScreen({ navigation }) {
  const route = useRoute();
  const authCtx = useContext(AuthContext);
  const [book, setBook] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);

  function toggleFollow() {
    setIsFollowed((prevState) => !prevState);
  }

  async function followHandler() {
    try {
      await axios.post(
        "http://reading-book-api.herokuapp.com/api/follow",
        { bookId: book._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authCtx.token,
          },
        }
      );
      Alert.alert("Added to your library");
      toggleFollow();
    } catch (err) {
      console.log("errors occurs", err);
    }
  }

  async function unfollowHandler() {
    try {
      await axios.delete(
        `http://reading-book-api.herokuapp.com/api/unfollow/book/${book._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authCtx.token,
          },
        }
      );
      Alert.alert("Delete from your library");
      toggleFollow();
    } catch (err) {
      console.log("errors occurs", err);
    }
  }
  useEffect(() => {
    async function getABook() {
      var res;
      try {
        if (authCtx.isAuthenticated) {
          res = await axios.get(
            `http://reading-book-api.herokuapp.com/api/books/book/${route.params._id}`,
            {
              headers: {
                Authorization: authCtx.token,
              },
            }
          );
        } else {
          res = await axios.get(
            `http://reading-book-api.herokuapp.com/api/books/book/${route.params._id}`
          );
        }
        if (res.data.isFollowed) {
          setIsFollowed(true);
        }
        setBook(res.data);
      } catch (err) {
        console.log("error occurs", err);
      }
    }
    getABook();
  }, []);
  return (
    <>
      <LinearGradient
        style={{ flex: 1, justifyContent: "center" }}
        colors={["#C04848", "#480048"]}
      >
        {!book._id && <ActivityIndicator size="large" />}
        {book._id && (
          <ScrollView
            style={styles.screen}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            nestedScrollEnabled
          >
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
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled
              >
                <Text style={styles.text}>"{book.description}"</Text>
              </ScrollView>
            </View>

            <View style={styles.infoContainer}>
              <Card>
                <Text style={styles.infoText}>
                  #{book.category.categoryName}
                </Text>
              </Card>
              <Card>
                <View style={styles.iconContainer}>
                  <Text style={styles.infoText}>{book.avrStarNumber} </Text>
                  <Ionicons size={15} color="yellow" name="star" />
                </View>
              </Card>
              <Card>
                <Text style={styles.infoText}>
                  {book.followTotal} followers
                </Text>
              </Card>
            </View>
            {!isFollowed ? (
              <PrimaryButton
                onPress={followHandler}
                textStyle={styles.followTextStyle}
                borderStyle={styles.followBorderStyle}
              >
                Add to library
              </PrimaryButton>
            ) : (
              <PrimaryButton
                onPress={unfollowHandler}
                textStyle={styles.unfollowTextStyle}
                borderStyle={styles.unfollowBorderStyle}
              >
                Unfollow
              </PrimaryButton>
            )}

            <FlatList
              nestedScrollEnabled={true}
              style={styles.chapterContainer}
              data={book.chapters}
              renderItem={(itemData) => (
                <ChapterItem chapter={itemData.item} index={itemData.index} />
              )}
              keyExtractor={(chapter) => chapter._id}
            />
          </ScrollView>
        )}
      </LinearGradient>
    </>
  );
}

export default BookDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bookContainer: {
    width: 141,
    height: 200,
    alignItems: "center",
    marginTop: 80,
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
    maxHeight: 250,
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
  followTextStyle: {
    color: "#93F9B9",
  },
  followBorderStyle: {
    borderColor: "#93F9B9",
  },
  unfollowTextStyle: {
    color: "red",
  },
  unfollowBorderStyle: {
    borderColor: "red",
  },
});
