import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen/CategoryScreen";
import LibraryScreen from "./screens/LibraryScreen";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import SignInScreen from "./screens/AccountScreen/SignInScreen";
import SignUpScreen from "./screens/AccountScreen/SignUpScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Ionicons size={20} name="home-outline" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Category"
            component={CategoryScreen}
            options={{
              tabBarIcon: () => <Ionicons size={20} name="book-outline" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{
              tabBarIcon: () => <Ionicons size={20} name="library-outline" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: () => <Ionicons size={20} name="person-outline" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              tabBarIcon: () => <Ionicons size={20} name="person-outline" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              tabBarIcon: () => <Ionicons size={20} name="person-outline" />,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
