import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BackBotton = styled.TouchableOpacity<{ statusbarHeight: number }>`
  position: absolute;
  left: 10px;
  top: ${(props) => props.statusbarHeight}px;
  z-index: 100;
  margin-left: 10px;
  margin-bottom: 15px;
  border: 2px solid #000;
  border-radius: 25px;
  background-color: #fff;
`;
const Map = () => {
  const { height: PHONE_HEIGHT } = Dimensions.get('window');
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
  const navigation = useNavigation();
  const goToMain = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Drawer' }] });
  };
  return (
    <>
      <BackBotton onPress={goToMain} statusbarHeight={STATUSBAR_HEIGHT}>
        <Ionicons name="chevron-back-outline" size={40} color="#000" />
      </BackBotton>
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
    </>
  );
};

export default Map;
