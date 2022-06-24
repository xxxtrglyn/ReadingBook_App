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

function ChangePasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfpassword] = useState();

  const authCtx = useContext(AuthContext);

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
    if (password !== cfpassword) {
      Alert.alert("Your confirm password is wrong", "Please check again", [
        { text: "Sorry", style: "destructive" },
      ]);
      return;
    }

    const user = {
      oldPassword: username,
      newPassword: password,
    };
    const baseURL = "http://10.0.2.2:3001/api";
    try {
      const res = await axios.put(`${baseURL}/users/change-password`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authCtx.token,
        },
      });
      Alert.alert("Change password successfully", "", [
        { text: "OK", style: "cancel" },
      ]);
      setUsername("");
      setPassword("");
      setCfpassword("");
      navigation.goBack();
    } catch (err) {
      console.log(err.response.data.message);
      Alert.alert("Error occurs", err.response.data.message, [{ text: "OK" }]);
    }
  }

  return (
    <LinearGradient colors={["#C04848", "#480048"]} style={styles.screen}>
      <Title>change password</Title>
      <Image
        style={styles.imageContainer}
        source={require("../../assets/images/signupimage.jpg")}
      />
      <View style={styles.inputContainer}>
        <LabelIcon icon="lock-closed-outline">Old Password</LabelIcon>
        <TextInput
          style={styles.inputText}
          value={username}
          onChangeText={usernameInputHandler}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <LabelIcon icon="lock-closed-outline">New Password</LabelIcon>
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

      <PrimaryButton onPress={submitHandler}>Change</PrimaryButton>
    </LinearGradient>
  );
}

export default ChangePasswordScreen;

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
