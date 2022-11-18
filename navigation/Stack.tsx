import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetectPest from '../screens/DetectPest';
import Login from '../screens/Login/Login';
import CropCategory from '../screens/CropCategory';
import LocationCategory from '../screens/LocationCategory';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
      <NativeStack.Screen name="DetectPest" component={DetectPest} />
      <NativeStack.Screen
        name="LocationCategory"
        component={LocationCategory}
        options={{ contentStyle: { backgroundColor: '#F7FBF9' } }}
      />
      <NativeStack.Screen
        name="CropCategory"
        component={CropCategory}
        options={{ contentStyle: { backgroundColor: '#F7FBF9' } }}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
