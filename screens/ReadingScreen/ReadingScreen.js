import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../../components/ui/Title";

function transformData(data) {
  let returnData = "";
  returnData += data;
  returnData = returnData.replace(/&nbsp;/g, " ");
  returnData = returnData.replace(/<i>/g, "");
  while (returnData.includes("</i>")) {
    returnData = returnData.replace("</i>", "");
  }
  returnData = returnData.replace(/<p>/g, "");
  const arr = returnData.split("</p>");
  return arr;
}

function ReadingScreen({ navigation, route }) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    async function getContent() {
      try {
        const res = await axios.get(route.params.chapter);
        const data = transformData(res.data);
        setContent(data);
      } catch (err) {
        console.log("error occur", err);
      }
    }
    getContent();
  }, []);
  return (
    <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
      <Title>{route.params.title}</Title>
      {content.length === 0 && <ActivityIndicator size="large" />}
      {content.length > 0 && (
        <FlatList
          data={content}
          renderItem={(itemData) => (
            <Text style={styles.text}>{itemData.item}</Text>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => "key" + index}
        />
      )}
    </LinearGradient>
  );
}

export default ReadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 14,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
