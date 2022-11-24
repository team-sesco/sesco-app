import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stack from './Stack';
import Login from '../screens/Login/Login';
import DetectPestResult from '../screens/DetectPestResult';
import Drawer from './Drawer';
import Map from '../screens/Map';

const Nav = createNativeStackNavigator();

const Root = ({ jwtToken }) => {
  return (
    <Nav.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#F7FBF9',
        },
        headerShown: false,
      }}
    >
      {!jwtToken ? <Nav.Screen name="Login" component={Login} /> : null}
      <Nav.Screen name="Drawer" component={Drawer} />
      <Nav.Screen name="Map" component={Map} />
      <Nav.Screen name="Stack" component={Stack} />
      <Nav.Screen name="DetectPestResult" component={DetectPestResult} />
      <Nav.Screen name="SameLogin" component={Login} />
    </Nav.Navigator>
  );
};

export default Root;
