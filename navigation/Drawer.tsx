import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import ChangeName from '../screens/ChangeName';
import Main from '../screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalInfoPolicy from '../screens/PersonalInfoPolicy';
import { useNavigation } from '@react-navigation/native';

const DrawerNavigator = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.removeItem('jwtToken');
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'SameLogin' }] });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="로그아웃" onPress={logout} />
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
