import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotiScreen from "./NotiScreen";
import BookDetailScreen from "../ReadingScreen/BookDetailScreen";
import ReadingScreen from "../ReadingScreen/ReadingScreen";

const Stack = createNativeStackNavigator();

function NotificationScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotiScreen"
        component={NotiScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={BookDetailScreen}
        options={{
          headerTitle: "",
          headerTintColor: "white",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

export default NotificationScreen;
