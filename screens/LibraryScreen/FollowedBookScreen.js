import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Book from "../../components/ui/Book";
import { AuthContext } from "../../store/auth-context";

function FollowedBookScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (!authCtx.isAuthenticated) {
      setBooks([]);
    }
  }, [authCtx.isAuthenticated]);

  useEffect(() => {
    setIsLoading(true);
    async function getBooks() {
      try {
        const res = await axios.get(
          "http://10.0.2.2:3003/api/users/user/followed-books",
          {
            headers: {
              Authorization: authCtx.token,
            },
          }
        );
        setBooks(res.data);
      } catch (err) {
        console.log("error occur", err);
      }
    }
    setIsLoading(false);
    const unsubscribe = navigation.addListener("focus", () => {
      if (authCtx.isAuthenticated) {
        getBooks();
      }
    });
    if (authCtx.isAuthenticated) {
      getBooks();
    }
    return unsubscribe;
  }, [navigation, authCtx.token]);
  return (
    <LinearGradient
      colors={["#C04848", "#480048"]}
      style={styles.wrapperScreen}
    >
      {isLoading && <ActivityIndicator size="large" />}
      {books.length > 0 && (
        <FlatList
          contentContainerStyle={{ alignItems: "center", paddingTop: 70 }}
          style={styles.screen}
          data={books}
          renderItem={(itemData) => <Book book={itemData.item} />}
          keyExtractor={(item) => item._id}
          numColumns={3}
        />
      )}
    </LinearGradient>
  );
}

export default FollowedBookScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 10,
  },
  wrapperScreen: {
    flex: 1,
    justifyContent: "center",
  },
});
