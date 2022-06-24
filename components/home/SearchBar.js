import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SearchBar({ value, onSave }) {
  function changeTextHandler(enteredText) {
    onSave(enteredText);
  }
  return (
    <View style={styles.OutterContainer}>
      <Ionicons name="search-outline" color="white" size={22} />
      <TextInput
        style={styles.inputText}
        value={value}
        onChangeText={changeTextHandler}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  OutterContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
    height: 40,
    backgroundColor: "#414345",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  inputText: {
    textDecorationLine: "none",
    color: "white",
    fontSize: 18,
    marginLeft: 10,
    width: "90%",
  },
});
