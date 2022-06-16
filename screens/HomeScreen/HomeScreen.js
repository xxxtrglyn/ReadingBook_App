import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./MainScreen";
import BookDetailScreen from "../ReadingScreen/BookDetailScreen";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
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
    </Stack.Navigator>
  );
}

export default HomeScreen;
