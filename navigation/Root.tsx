import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Stack from './Stack';
import { Octicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Login from '../screens/Login/Login';
import DetectPestResult from '../screens/DetectPestResult';
import Drawer from './Drawer';

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
      <Nav.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
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
