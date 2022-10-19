import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import Stack from "./Stack";
import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderLeftLogo = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #48a346;
`;
const HeaderRightBtnsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const HeaderRightBtn = styled.TouchableOpacity`
  margin-left: 18px;
`;
const Nav = createNativeStackNavigator();

const Root = () => {
  const navigation = useNavigation();
  const goToSearch = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "DetectPest",
    });
  };
  const HeaderRightBtns = () => (
    <HeaderRightBtnsContainer>
      <HeaderRightBtn onPress={goToSearch}>
        <Octicons name="search" color="#98A1BD" size={25} />
      </HeaderRightBtn>
      <HeaderRightBtn>
        <Octicons name="bell" color="#98A1BD" size={25} />
      </HeaderRightBtn>
      <HeaderRightBtn>
        <Octicons name="three-bars" color="#98A1BD" size={25} />
      </HeaderRightBtn>
    </HeaderRightBtnsContainer>
  );
  return (
    <Nav.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#d8dbe2",
        },
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#d8dbe2",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Nav.Screen
        name=" "
        component={Main}
        options={{
          headerLeft: () => <HeaderLeftLogo>SE. SCO</HeaderLeftLogo>,
          headerRight: () => <HeaderRightBtns />,
        }}
      />
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
};

export default Root;
