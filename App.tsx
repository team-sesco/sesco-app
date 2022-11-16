import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import Login from "./screens/Login/Login";

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}