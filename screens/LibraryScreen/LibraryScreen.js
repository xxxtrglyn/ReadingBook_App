import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FollowedBookScreen from "./FollowedBookScreen";
import BookDetailScreen from "../ReadingScreen/BookDetailScreen";
import ReadingScreen from "../ReadingScreen/ReadingScreen";

const Stack = createNativeStackNavigator();

function LibraryScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FollowBook"
        component={FollowedBookScreen}
        options={{
          headerTitle: "Library",
          headerTintColor: "white",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={BookDetailScreen}
        options={{
          headerTintColor: "white",
          headerTitle: "",
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

export default LibraryScreen;
