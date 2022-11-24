import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { Dimensions, Platform, StatusBar } from 'react-native';

const Map = () => {
  const { height: PHONE_HEIGHT } = Dimensions.get('window');
  return (
      <MapView
        style={{ height: PHONE_HEIGHT }}
        userInterfaceStyle="light"
        showsUserLocation={true}
        rotateEnabled={false}
        pitchEnabled={false}
        initialRegion={{
          latitude: 37.587378,
          longitude: 127.09763,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      ></MapView>
  );
};

export default Map;
