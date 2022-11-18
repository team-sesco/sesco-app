import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Stack from './Stack';
import { Octicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Login from '../screens/Login/Login';
import DetectPestResult from '../screens/DetectPestResult';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Root = ({ jwtToken }) => {
  const HeaderRightBtns = () => (
    <HeaderRightBtnsContainer>
      <HeaderRightBtn>
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
          backgroundColor: '#F7FBF9',
        },
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#F7FBF9',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      {!jwtToken ? (
        <Nav.Screen name="Login" component={Login} options={{ headerShown: false }} />
      ) : null}
      <Nav.Screen
        name="Main"
        component={Main}
        options={{
          headerLeft: () => <HeaderLeftLogo>SE. SCO</HeaderLeftLogo>,
          headerRight: () => <HeaderRightBtns />,
          headerTitleStyle: { color: '#F7FBF9' },
        }}
      />
      <Nav.Screen name="Stack" component={Stack} options={{ headerShown: false }} />
      <Nav.Screen
        name="DetectPestResult"
        component={DetectPestResult}
        options={{ headerShown: false }}
      />
      <Nav.Screen name="SameLogin" component={Login} options={{ headerShown: false }} />
    </Nav.Navigator>
  );
};

export default Root;
