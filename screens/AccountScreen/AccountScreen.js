import React from "react";
import { Text, StyleSheet, View, Image, ImageBackground } from "react-native";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import IconButton from "../../components/account/IconButton";

function AccountScreen() {
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
              uri: "https://static.wikia.nocookie.net/hyouka/images/9/98/Houtarou_Oreki.jpg/revision/latest/top-crop/width/360/height/450?cb=20200301040149",
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Trương văn luyn</Text>
      </ImageBackground>
      <LinearGradient colors={["#C04848", "#480048"]} style={styles.bottomPart}>
        <View style={styles.info}>
          <Text style={styles.name}>Infomation</Text>
          <IconButton icon="mail-outline">xxxtrglyn@gmail.com</IconButton>
          <IconButton icon="call-outline">0379931731</IconButton>
        </View>
        <View style={styles.setting}>
          <Text style={styles.name}>Setting</Text>
          <IconButton icon="journal-outline">Update Profile</IconButton>
          <IconButton icon="key-outline">Change Password</IconButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            textStyle={{ color: "white" }}
            borderStyle={{ borderColor: "white" }}
          >
            Logout
          </PrimaryButton>
        </View>
      </LinearGradient>
    </View>
  );
}

export default AccountScreen;

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
    width: 110,
    height: 110,
    borderRadius: 200,
    overflow: "hidden",
    margin: 10,
    borderWidth: 2,
    borderColor: "white",
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
    paddingVertical: 10,
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
    borderTopWidth: 10,
    borderTopColor: "white",
    justifyContent: "center",
    paddingLeft: 20,
  },
  info: {
    flex: 1,
    borderTopWidth: 10,
    borderTopColor: "white",
    justifyContent: "center",
    paddingLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 10,
    borderTopColor: "white",
  },
});
