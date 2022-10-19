import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetectPest from "./DetectPest";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="DetectPest" component={DetectPest} />
    </NativeStack.Navigator>
  );
};

export default Stack;
