import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import InfoScreen from "./InfoScreen";
import SignInScreen from "./SignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./SignUpScreen";
import UpdateProfileScreen from "./UpdateProfileScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";

const Stack = createNativeStackNavigator();

function AccountScreen() {
  const authCtx = useContext(AuthContext);
  const screen = authCtx.isAuthenticated ? InfoScreen : SignInScreen;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="rootscreen"
        component={screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="update"
        component={UpdateProfileScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="changepwd"
        component={ChangePasswordScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

export default AccountScreen;
