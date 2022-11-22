import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

export default function App() {
  const [jwtToken, setJwtToken] = useState('');
  AsyncStorage.getItem('jwtToken', (_, result) => {
    setJwtToken(result);
  });

  return (
    <NavigationContainer>
      <Root jwtToken={jwtToken} />
    </NavigationContainer>
  );
}
