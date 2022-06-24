import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import LabelIcon from "../../components/ui/LabelIcon";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Title from "../../components/ui/Title";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/auth-context";

function UpdateProfileScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const authCtx = useContext(AuthContext);

  function fullnameInputHandler(enteredText) {
    setFullname(enteredText);
  }

  async function submitHandler() {
    const fullnameIsValid = fullname.trim().length > 0;
    const usernameIsValid =
      username.trim().length > 0 && username.includes("@");
    console.log(usernameIsValid);

    if (!fullnameIsValid || !usernameIsValid) {
      Alert.alert("Input isn't valid", "Please check again", [
        { text: "Sorry", style: "destructive" },
      ]);
      return;
    }

    const user = {
      avatar: avatar,
      fullName: fullname,
    };
    const baseURL = "https://reading-book-api.herokuapp.com/api";
    try {
      const res = await axios.put(`${baseURL}/users/user/profile`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authCtx.token,
        },
      });
      const newUser = { avatar: avatar, fullName: fullname, email: username };
      AsyncStorage.setItem("userInfo", JSON.stringify(newUser));
      Alert.alert("Update successfully", "", [{ text: "OK", style: "cancel" }]);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error occurs", "err", [{ text: "OK" }]);
    }
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const storedInfo = await AsyncStorage.getItem("userInfo");
        if (storedInfo !== null) {
          const userInfo = JSON.parse(storedInfo);
          setFullname(userInfo.fullName);
          setUsername(userInfo.email);
          setAvatar(userInfo.avatar);
        }
      } catch (err) {
        console.log("error occur", err);
      }
    }
    getProfile();
  }, []);

  return (
    <>
      {username !== "" && (
        <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
          <Title>Update profile</Title>
          {!!avatar && (
            <Image style={styles.imageContainer} source={{ uri: avatar }} />
          )}
          <View style={styles.inputContainer}>
            <LabelIcon icon="happy-outline">Fullname</LabelIcon>
            <TextInput
              style={styles.inputText}
              value={fullname}
              onChangeText={fullnameInputHandler}
            />
            <LabelIcon icon="person-outline">Email</LabelIcon>
            <Text style={styles.inputText}>{username}</Text>
          </View>

          <PrimaryButton onPress={submitHandler}>Update</PrimaryButton>
        </LinearGradient>
      )}
    </>
  );
}

export default UpdateProfileScreen;

const deviceWidth = Dimensions.get("window").height;
const imageSize = deviceWidth > 650 ? 150 : 100;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: 200,
    marginBottom: 30,
    flex: 0,
  },

  inputText: {
    fontSize: 15,
    borderBottomWidth: 2,
    width: "100%",
    paddingVertical: 4,
    textDecorationLine: "none",
    marginBottom: 10,
    borderBottomColor: "white",
    color: "white",
  },

  inputContainer: {
    width: "100%",
  },
});
