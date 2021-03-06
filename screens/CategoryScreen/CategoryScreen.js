import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryDrawer from "./CategoryDrawer";
import BookDetailScreen from "../ReadingScreen/BookDetailScreen";
import ReadingScreen from "../ReadingScreen/ReadingScreen";

const Stack = createNativeStackNavigator();
function CategoryScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryStack"
        component={CategoryDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={BookDetailScreen}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
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

export default CategoryScreen;
