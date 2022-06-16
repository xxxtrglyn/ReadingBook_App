import React from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import Title from "../ui/Title";

function ListBook({ title }) {
  return (
    <View style={styles.outterContainer}>
      <Title>{title}</Title>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row" }}
        horizontal={true}
      >
        <Image
          style={styles.bookContainer}
          source={{ uri: "https://pbs.twimg.com/media/DyFoRcFUwAMEg3t.jpg" }}
        />
        <Image
          style={styles.bookContainer}
          source={{ uri: "https://pbs.twimg.com/media/DyFoRcFUwAMEg3t.jpg" }}
        />
        <Image
          style={styles.bookContainer}
          source={{ uri: "https://pbs.twimg.com/media/DyFoRcFUwAMEg3t.jpg" }}
        />
        <Image
          style={styles.bookContainer}
          source={{ uri: "https://pbs.twimg.com/media/DyFoRcFUwAMEg3t.jpg" }}
        />
        <Image
          style={styles.bookContainer}
          source={{ uri: "https://pbs.twimg.com/media/DyFoRcFUwAMEg3t.jpg" }}
        />
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
