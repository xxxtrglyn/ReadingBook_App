import axios from "axios";
import React, { useContext } from "react";
import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { AuthContext } from "../../store/auth-context";

function NotifyItem({ noti, onPress }) {
  const authCtx = useContext(AuthContext);
  const dateNotify = new Date(noti.createdAt);
  const month = dateNotify.getMonth();
  const day = dateNotify.getDate();
  const year = dateNotify.getFullYear();
  const hour = dateNotify.getHours();
  const minute = dateNotify.getMinutes();
  const second = dateNotify.getSeconds();
  const dateNotifyTransform = month + "-" + day + "-" + year;
  const fullHour = hour + ":" + minute + ":" + second;
  const fullDate = fullHour + " " + dateNotifyTransform;
  async function readNotiHandler() {
    try {
      await axios.put(
        "http://10.0.2.2:3000/api/notifications/read",
        { notificationId: noti._id },
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
  function pressHandler() {
    onPress();
    if (!noti.isSeen) {
      readNotiHandler();
    }
  }
  return (
    <View
      style={
        noti.isSeen
          ? [styles.outerContainer]
          : [styles.outerContainer, { backgroundColor: "#22c1c3" }]
      }
    >
      <Pressable
        android_ripple={{ color: "#ECE9E6" }}
        style={styles.innerContainer}
        onPress={pressHandler}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://i.redd.it/bjpcjr0sigk41.jpg" }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.text}>{noti.message}</Text>
          <Text style={styles.textGreen}>{fullDate}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default NotifyItem;

const styles = StyleSheet.create({
  outerContainer: {
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#fdbb2d",
  },
  innerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  imageContainer: {
    height: 75,
    width: 75,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 200,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  textGreen: {
    color: "#f5426c",
    fontSize: 15,
    fontWeight: "bold",
  },
});
