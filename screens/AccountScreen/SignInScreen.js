import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import LabelIcon from "../../components/ui/LabelIcon";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Title from "../../components/ui/Title";
import { AuthContext } from "../../store/auth-context";
import SignUpScreen from "./SignUpScreen";

function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  function navigateToSignUpScreen() {
    navigation.navigate("signup");
  }
  function usernameInputHandler(enteredText) {
    setUsername(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  async function submitHandler() {
    const usernameIsValid =
      username.trim().length > 0 && username.includes("@");
    const passwordIsValid = password.trim().length > 0;

    if (!usernameIsValid || !passwordIsValid) {
      Alert.alert("Input isn't valid", "Please check again", [
        { text: "Sorry", style: "destructive" },
      ]);
      return;
    }

    const user = {
      email: username,
      password: password,
    };
    const baseURL = "http://10.0.2.2:3000/api";
    try {
      const res = await axios.post(`${baseURL}/auth/sign_in`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      AsyncStorage.setItem("userInfo", JSON.stringify(res.data));
      authCtx.authenticate(res.data.token);
    } catch (err) {
      console.log(err);
      Alert.alert("Error occurs", "Some err", [{ text: "OK" }]);
    }
  }

  return (
    <>
      <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
        <Title>Sign in</Title>
        <Image
          style={styles.imageContainer}
          source={require("../../assets/images/signupimage.jpg")}
        />
        <View style={styles.inputContainer}>
          <LabelIcon icon="person-outline">Email</LabelIcon>
          <TextInput
            style={styles.inputText}
            value={username}
            onChangeText={usernameInputHandler}
            autoCapitalize="none"
          />
          <LabelIcon icon="lock-closed-outline">Password</LabelIcon>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            value={password}
            onChangeText={passwordInputHandler}
          />
        </View>
        <Text style={styles.text}>
          Don't have an account?{" "}
          <Text style={{ color: "yellow" }} onPress={navigateToSignUpScreen}>
            Sign Up
          </Text>
        </Text>
        <PrimaryButton onPress={submitHandler}>Sign in</PrimaryButton>
      </LinearGradient>
    </>
  );
}

export default SignInScreen;

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
    borderBottomColor: "white",
    width: "100%",
    paddingVertical: 4,
    textDecorationLine: "none",
    marginBottom: 10,
    color: "white",
  },

  inputContainer: {
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
