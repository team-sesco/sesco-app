import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChangeName from '../screens/ChangeName';
import Main from '../screens/Main';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      useLegacyImplementation={true}
      screenOptions={{ headerShown: false }}
    >
      <DrawerNavigator.Screen name="Main" component={Main} />
      <DrawerNavigator.Screen name="ChangeName" component={ChangeName} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
