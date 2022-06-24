import axios from "axios";
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import LabelIcon from "../../components/ui/LabelIcon";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Title from "../../components/ui/Title";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignUpScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfpassword] = useState();

  const authCtx = useContext(AuthContext);

  function fullnameInputHandler(enteredText) {
    setFullname(enteredText);
  }

  function usernameInputHandler(enteredText) {
    setUsername(enteredText);
  }

  function passwordInputHandler(enteredText) {
    setPassword(enteredText);
  }

  function cfpasswordInputHandler(enteredText) {
    setCfpassword(enteredText);
  }

  async function submitHandler() {
    const fullnameIsValid = fullname.trim().length > 0;
    const usernameIsValid =
      username.trim().length > 0 && username.includes("@");
    console.log(usernameIsValid);
    const passwordIsValid = password.trim().length > 0;

    if (!fullnameIsValid || !usernameIsValid || !passwordIsValid) {
      Alert.alert("Input isn't valid", "Please check again", [
        { text: "Sorry", style: "destructive" },
      ]);
      return;
    }

    if (password !== cfpassword) {
      Alert.alert("Your confirm password is wrong", "Please check again", [
        { text: "Sorry", style: "destructive" },
      ]);
      return;
    }

    const user = {
      email: username,
      password: password,
      fullName: fullname,
    };
    const baseURL = "http://10.0.2.2:3003/api";
    try {
      const res = await axios.post(`${baseURL}/auth/sign_up`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      AsyncStorage.setItem("userInfo", JSON.stringify(res.data));
      authCtx.authenticate(res.data.token);
      Alert.alert("Sign up successfully", "", [
        { text: "OK", style: "cancel" },
      ]);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error occurs", "Some err", [{ text: "OK" }]);
    }
  }

  return (
    <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
      <Title>Sign Up</Title>
      <Image
        style={styles.imageContainer}
        source={require("../../assets/images/signupimage.jpg")}
      />
      <View style={styles.inputContainer}>
        <LabelIcon icon="happy-outline">Fullname</LabelIcon>
        <TextInput
          style={styles.inputText}
          value={fullname}
          onChangeText={fullnameInputHandler}
        />
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
        <LabelIcon icon="key-outline">Confirm Password</LabelIcon>
        <TextInput
          style={styles.inputText}
          value={cfpassword}
          secureTextEntry={true}
          onChangeText={cfpasswordInputHandler}
        />
      </View>

      <PrimaryButton onPress={submitHandler}>Sign up</PrimaryButton>
    </LinearGradient>
  );
}

export default SignUpScreen;

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
