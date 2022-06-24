import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NotifyItem from "../../components/notification/NotifyItem";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import IconButton from "../../components/account/IconButton";
import PrimaryButton from "../../components/ui/PrimaryButton";

function NotiScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [isAllFilter, setIsAllFilter] = useState(true);
  function toggleFilter() {
    setIsAllFilter((prev) => !prev);
  }
  function filterAllHandler() {
    toggleFilter();
  }
  function toDetailPage(book) {
    navigation.navigate("DetailScreen", book);
  }
  async function readAllHandler() {
    setNotifications((prevNotis) =>
      prevNotis.map((noti) => {
        if (!noti.isSeen) {
          return { ...noti, isSeen: true };
        }
        return noti;
      })
    );
    try {
      await axios.put(
        "http://reading-book-api.herokuapp.com/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: authCtx.token,
          },
        }
      );
    } catch (err) {
      console.log("errors occurs", err);
    }
  }
  useEffect(() => {
    if (!authCtx.isAuthenticated) {
      setNotifications([]);
    }
  }, [authCtx.isAuthenticated]);
  useEffect(() => {
    async function getNotifications() {
      try {
        const res = await axios.get(
          "http://reading-book-api.herokuapp.com/api/notifications",
          {
            headers: {
              Authorization: authCtx.token,
            },
          }
        );
        setNotifications(res.data.reverse());
      } catch (err) {
        console.log("errors occurs", err);
      }
    }

    const unsubscribe = navigation.addListener("focus", () => {
      if (authCtx.isAuthenticated) {
        getNotifications();
      }
    });
    if (authCtx.isAuthenticated) {
      getNotifications();
    }
    return unsubscribe;
  }, [navigation, authCtx.token]);

  const filterData = isAllFilter
    ? notifications
    : notifications.filter((item) => item.isSeen === false);

  return (
    <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
      <View style={styles.seenAll}>
        <IconButton icon="checkmark-done-outline" onPress={readAllHandler}>
          Mark all as read
        </IconButton>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          textStyle={isAllFilter ? [{ color: "#93F9B9" }] : []}
          borderStyle={isAllFilter ? [{ borderColor: "#93F9B9" }] : []}
          onPress={filterAllHandler.bind(this, true)}
        >
          All
        </PrimaryButton>
        <PrimaryButton
          textStyle={!isAllFilter ? [{ color: "#93F9B9" }] : []}
          borderStyle={!isAllFilter ? [{ borderColor: "#93F9B9" }] : []}
          onPress={filterAllHandler.bind(this, false)}
        >
          Unread
        </PrimaryButton>
      </View>
      <FlatList
        data={filterData}
        renderItem={(itemData) => {
          return (
            <NotifyItem
              noti={itemData.item}
              onPress={toDetailPage.bind(this, itemData.item.book)}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.notiList}
      />
    </LinearGradient>
  );
}

export default NotiScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  seenAll: {
    position: "absolute",
    width: 200,
    height: 70,
    right: 30,
    top: 40,
  },
  notiList: {
    flex: 1,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 80,
    marginLeft: 20,
  },
});
