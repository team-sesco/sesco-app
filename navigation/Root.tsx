import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stack from './Stack';
import Login from '../screens/Login/Login';
import DetectPestResult from '../screens/DetectPestResult';
import Drawer from './Drawer';
import Map from '../screens/Map';
import ChangeName from '../screens/ChangeName';
import BookMark from '../screens/BookMark';
import AlreadyDetectPestResult from '../screens/AlreadyDetectPestResult';
import MyDetection from '../screens/MyDetection';

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
      <Nav.Screen name="MyDetection" component={MyDetection} />
      <Nav.Screen name="DetectPestResult" component={DetectPestResult} />
      <Nav.Screen name="AlreadyDetectPestResult" component={AlreadyDetectPestResult} />
      <Nav.Screen name="BookMark" component={BookMark} />
      <Nav.Screen name="ChangeName" component={ChangeName} />
      <Nav.Screen name="SameLogin" component={Login} />
    </Nav.Navigator>
  );
};

export default Root;
