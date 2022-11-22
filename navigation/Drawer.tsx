import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import ChangeName from '../screens/ChangeName';
import Main from '../screens/Main';
import PersonalInfoPolicy from '../screens/PersonalInfoPolicy';

const DrawerNavigator = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      useLegacyImplementation={true}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#F7FBF9',
          width: '80%',
        },
      }}
    >
      <DrawerNavigator.Screen
        name="Main"
        component={Main}
        options={{ drawerLabel: '홈' }}
      />
      <DrawerNavigator.Screen name="ChangeName" component={ChangeName} />
      <DrawerNavigator.Screen
        name="PersonalInfoPolicy"
        component={PersonalInfoPolicy}
        options={{ drawerLabel: '개인정보처리방침' }}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
