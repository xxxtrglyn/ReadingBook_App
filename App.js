import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen/CategoryScreen";
import LibraryScreen from "./screens/LibraryScreen/LibraryScreen";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationScreen from "./screens/NotificationScreen/NotificationScreen";

const Tab = createBottomTabNavigator();

function Navigation() {
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
            name="Notifications"
            component={NotificationScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons size={20} name="notifications-outline" />
              ),
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
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
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
