import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetectPest from "../screens/DetectPest";
import Login from "../screens/Login/Login";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="DetectPest" component={DetectPest} />
      <NativeStack.Screen name="Login" component={Login} />
    </NativeStack.Navigator>
  );
};

export default Stack;
