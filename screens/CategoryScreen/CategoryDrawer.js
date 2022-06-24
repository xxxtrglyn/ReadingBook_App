import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import axios from "axios";
import BookScreen from "./BookScreen";

const Drawer = createDrawerNavigator();

function CategoryDrawer() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    console.log("This running again");
    async function getCategory() {
      try {
        const res = await axios.get("http://10.0.2.2:3002/api/categories", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const transformCate = res.data.filter((cate) => {
          if (cate.categoryName === null) {
            return false;
          }
          return true;
        });
        setCategories(transformCate);
      } catch (err) {
        console.log("error occurs", err);
        Alert.alert("Server error", "Error from loading data from server", [
          { text: "Ok", style: "destructive" },
        ]);
      }
    }
    getCategory();
  }, []);

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="ALL"
        component={BookScreen}
        options={{
          headerTintColor: "white",
          headerTransparent: true,
        }}
      />
      {categories.map((screen) => (
        <Drawer.Screen
          name={screen.categoryName.toUpperCase()}
          component={BookScreen}
          key={screen._id}
          initialParams={screen}
          options={{
            headerTintColor: "white",
            headerTransparent: true,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default CategoryDrawer;
