import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

const CurrentLocationButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  right: 10px;
  bottom: 10px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

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

  const getUserLocationIfGranted = async () => {
    setIsReady(false);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const {
        coords: { longitude, latitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 3 });

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
          if (!json.documents[0].region_1depth_name) {
            mapRef.current.animateToRegion({
              latitude: 37.5518018,
              longitude: 127.0736345,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            Alert.alert('지원하지 않는 지역입니다!');
            setIsReady(true);
            return;
          }
          setDetailLocation(json.documents[0]);
          setUserLocation(json.documents[0].address_name);
        })
        .then(() => {
          setUserLongitude(longitude);
          setUserLatitude(latitude);
        });

      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    setIsReady(true);
  };

  useEffect(() => {
    getUserLocationIfGranted();
  }, []);

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
        if (!json.documents[0].region_1depth_name) {
          mapRef.current.animateToRegion({
            latitude: 37.5518018,
            longitude: 127.0736345,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          Alert.alert('지원하지 않는 지역입니다!');
          setIsReady(true);
          return;
        }
        setDetailLocation(json.documents[0]);
        setUserLocation(json.documents[0].address_name);
      })
      .then(() => {
        setUserLongitude(longitude);
        setUserLatitude(latitude);
        mapRef.current.animateToRegion(
          {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500
        );
      })
      .then(() => {
        setIsReady(true);
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
      <ShowContainer style={{ backgroundColor: userLocation ? '#3B9660' : '#eef1f8' }}>
        <ShowTextWrapper>
          {!userLocation ? (
            <Ionicons
              name="location-outline"
              size={20}
              color={'rgba(0,0,0,0.5)'}
              style={{ marginRight: 5 }}
            />
          ) : null}
          <ShowText isUserLocation={!!userLocation}>
            {!!userLocation ? userLocation : '내 위치'}
          </ShowText>
        </ShowTextWrapper>
      </ShowContainer>
      <MapViewBottomContainer>
        <MapViewContainer>
          <CurrentLocationButton onPress={findMyCurrentLocation}>
            <MaterialCommunityIcons
              name="target"
              size={30}
              color="#3B9660"
              style={{ padding: 3 }}
            />
          </CurrentLocationButton>
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
            onRegionChangeComplete={async (region) => {
              await fetch(
                `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${region.longitude}&y=${region.latitude}`,
                {
                  headers: {
                    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                  },
                }
              )
                .then((res) => res.json())
                .then((json) => {
                  if (!json.documents[0].region_1depth_name) {
                    mapRef.current.animateToRegion({
                      latitude: 37.5518018,
                      longitude: 127.0736345,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    });
                    Alert.alert('지원하지 않는 지역입니다!');
                    return;
                  }
                  setUserLatitude(userRegion.latitude);
                  setUserLongitude(userRegion.longitude);
                  setDetailLocation(json.documents[0]);
                  setUserLocation(json.documents[0].address_name);
                });
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
