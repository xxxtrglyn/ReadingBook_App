import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import IconButton from "../../components/account/IconButton";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function InfoScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [info, setInfo] = useState({});
  function logoutHandler() {
    authCtx.logout();
  }
  function navigateToUpdateProfile() {
    navigation.navigate("update");
  }
  function navigateToChangePassword() {
    navigation.navigate("changepwd");
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const storedInfo = await AsyncStorage.getItem("userInfo");
        if (storedInfo !== null) {
          const userInfo = JSON.parse(storedInfo);
          setInfo(userInfo);
        }
      } catch (err) {
        console.log("error occur", err);
      }
    }
    const unsubscribe = navigation.addListener("focus", () => {
      getProfile();
    });
    getProfile();
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.sceen}>
      <ImageBackground
        style={styles.topPart}
        resizeMode="cover"
        source={{
          uri: "https://www.anphatpc.com.vn/media/news/0812_wp4676582-4k-pc-wallpapers.jpg",
        }}
      >
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: info.avatar,
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{info.fullName}</Text>
      </ImageBackground>
      <LinearGradient colors={["#C04848", "#480048"]} style={styles.bottomPart}>
        <View style={styles.info}>
          <Text style={styles.name}>Infomation</Text>
          <IconButton icon="mail-outline">{info.email}</IconButton>
          <IconButton icon="call-outline">0379931731</IconButton>
        </View>
        <View style={styles.setting}>
          <Text style={styles.name}>Setting</Text>
          <IconButton icon="journal-outline" onPress={navigateToUpdateProfile}>
            Update Profile
          </IconButton>
          <IconButton icon="key-outline" onPress={navigateToChangePassword}>
            Change Password
          </IconButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            textStyle={{ color: "white" }}
            borderStyle={{ borderColor: "white" }}
            onPress={logoutHandler}
          >
            Logout
          </PrimaryButton>
        </View>
      </LinearGradient>
    </View>
  );
}

export default InfoScreen;

const styles = StyleSheet.create({
  sceen: {
    flex: 1,
    alignItems: "center",
    // paddingVertical: 20,
    // paddingHorizontal: 10,
  },
  topPart: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomPart: {
    flex: 3,
    width: "100%",
    backgroundColor: "black",
  },
  wallpaper: {
    flex: 1,
    width: "100%",
  },
  avatarWrapper: {
    width: 77,
    height: 77,
    borderRadius: 300,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
    marginTop: 50,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    textTransform: "capitalize",
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 7,
    marginBottom: 7,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginLeft: 30,
    paddingVertical: 5,
  },
  setting: {
    flex: 1,
    borderTopWidth: 7,
    borderTopColor: "white",
    justifyContent: "center",
    paddingLeft: 20,
  },
  info: {
    flex: 1,
    borderTopWidth: 7,
    borderTopColor: "white",
    justifyContent: "center",
    paddingLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 7,
    borderTopColor: "white",
  },
});
