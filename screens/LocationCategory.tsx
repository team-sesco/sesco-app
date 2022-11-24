import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import carrotGIF from '../assets/carrot.gif';
import { Alert } from 'react-native';
import { KAKAO_REST_API_KEY } from '../environment/env';
import MapView, { Marker } from 'react-native-maps';

const LoadingBackground = styled.View<{ isLoading: boolean }>`
  position: absolute;
  z-index: 10;
  display: ${(props) => (props.isLoading ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;
const LoadingGIF = styled.Image`
  width: 120px;
  height: 120px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  width: 90%;
  margin: 50px auto 20px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-left: 5px;
`;

const ShowContainer = styled.View`
  width: 90%;
  height: 50px;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid rgba(9, 9, 9, 0.05);
`;
const ShowTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ShowText = styled.Text<{ isUserLocation: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => (props.isUserLocation ? '600' : '400')};
  color: ${(props) => (props.isUserLocation ? 'white' : 'rgba(0,0,0,0.5)')};
`;

const MapViewBottomContainer = styled.View`
  width: 100%;
  flex: 1;
`;

const MapViewContainer = styled.View`
  width: 90%;
  flex: 1;
  margin: 0 auto;
`;

  position: absolute;
const BottomContainer = styled.View<{ isUserLocation: boolean }>`
  width: 100%;
  height: 120px;
  bottom: -20px;
  background-color: #fff;
  border: 1px solid ${(props) => (props.isUserLocation ? '#3B966050' : '#eee')};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;
const BottomNextButton = styled.TouchableOpacity<{ isUserLocation: boolean }>`
  width: 90%;
  height: 50px;
  margin: 20px auto;
  background-color: ${(props) => (props.isUserLocation ? '#3B9660' : '#D8DBE290')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const BottomNextText = styled.Text<{ isUserLocation: boolean }>`
  color: #fff;
  font-size: 17px;
  font-weight: ${(props) => (props.isUserLocation ? '600' : '400')};
`;

const LocationCategory = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [userLongitude, setUserLongitude] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [detailLocation, setDetailLocation] = useState({});
  const [userRegion, setUserRegion] = useState({});

  const findMyCurrentLocation = async () => {
    setIsReady(false);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('위치 접근 오류', '설정에 들어가서 위치 접근을 허용해주세요!');
      setIsReady(true);
      return;
    }
    const {
      coords: { longitude, latitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 3 });

    if (longitude < 123 || longitude > 133) {
      Alert.alert('지원하지 않는 지역입니다!');
      setIsReady(true);
      return;
    }
    await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setDetailLocation(json.documents[0]);
        setUserLocation(json.documents[0].address_name);
      })
      .then(() => setIsReady(true))
      .then(() => {
        setUserLongitude(longitude);
        setUserLatitude(latitude);
      });
  };
  const onSubmit = () => {
    const realDetailLocation = { ...detailLocation };
    realDetailLocation.x = userLongitude;
    realDetailLocation.y = userLatitude;
    navigation.navigate('DetectPest', {
      realDetailLocation,
    });
  };

  return (
    <>
      <LoadingBackground isLoading={!isReady}>
        <LoadingGIF source={carrotGIF} />
      </LoadingBackground>
      <TitleWrapper>
        <Ionicons name="location-outline" size={24} color="#3B9660" />
        <Title>위치 선택</Title>
      </TitleWrapper>
      <ChoiceButton
        onPress={() => {
          // 현재 위치 찾기 버튼이 눌러져있었다면
          if (isCurrentLocationClick) {
            setIsCurrentLocationClick(false);
            setIsAnyClick(false);
          } else {
            // 아무 것도 안 눌러져 있었다면
            setIsCurrentLocationClick(true);
            setIsSearchLocationClick(false);
            setIsAnyClick(true);
            findMyCurrentLocation();
          }
        }}
        style={
          isCurrentLocationClick
            ? { backgroundColor: '#3B9660' }
            : { backgroundColor: '#eef1f8' }
        }
      >
        <ChoiceTextWrapper>
          {isCurrentLocationClick ? null : (
            <Ionicons
              name="location-outline"
              size={20}
              color={'rgba(0,0,0,0.5)'}
              style={{ marginRight: 5 }}
            />
          )}
          <ChoiceText isClick={isCurrentLocationClick}>
            {isCurrentLocationClick ? userLocation : '현재 위치 찾기'}
          </ChoiceText>
        </ChoiceTextWrapper>
      </ChoiceButton>

      <ChoiceButton
        onPress={() => {
          // 검색해서 위치 찾기 버튼이 눌러져있었다면
          if (isSearchLocationClick) {
            setIsSearchLocationClick(false);
            setIsAnyClick(false);
          } else {
            // 아무 것도 안 눌러져 있었다면
            setIsSearchLocationClick(true);
            setIsCurrentLocationClick(false);
            setIsAnyClick(true);
            findSearchLocation();
          }
        }}
        style={
          isSearchLocationClick
            ? { backgroundColor: '#3B9660' }
            : { backgroundColor: '#eef1f8' }
        }
      >
        <ChoiceTextWrapper>
          {isSearchLocationClick ? null : (
            <Ionicons
              name="search-outline"
              size={20}
              color={'#000'}
              style={{ marginRight: 5 }}
      </ShowContainer>
      <MapViewBottomContainer>
        <MapViewContainer>
            />
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            userInterfaceStyle="light"
            showsUserLocation={true}
            rotateEnabled={false}
            pitchEnabled={false}
            onRegionChange={(region) => {
              setUserRegion(region);
            }}
            initialRegion={{
              latitude: 37.5518018,
              longitude: 127.0736345,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={userRegion} image={require('../assets/location5.png')} />
          </MapView>
        </MapViewContainer>
        <BottomContainer isUserLocation={!!userLocation}>
          <BottomNextButton
            isUserLocation={!!userLocation}
            disabled={!userLocation}
            onPress={onSubmit}
          >
            <BottomNextText isUserLocation={!!userLocation}>확인</BottomNextText>
          </BottomNextButton>
        </BottomContainer>
      </MapViewBottomContainer>
    </>
  );
};

export default LocationCategory;
