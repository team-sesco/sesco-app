import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert, Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { KAKAO_REST_API_KEY } from '../environment/env';
import { BASE_URI } from '../api/api';

const Container = styled.View`
  flex: 1;
`;

const BackBotton = styled.TouchableOpacity<{ statusbarHeight: number }>`
  position: absolute;
  left: 10px;
  top: ${(props) => props.statusbarHeight + 10}px;
  z-index: 10;
  margin-left: 10px;
  margin-bottom: 15px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const CurrentLocationButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 11;
  right: 30px;
  bottom: 50px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const LocationContainer = styled.View``;
const LocationBubble = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  border-color: #ccc;
  border-width: 0.5px;
  padding: 15px;
`;
const LocationText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;
const LocationImage = styled.Image`
  width: 120px;
  height: 80px;
`;
const Arrow = styled.View`
  background-color: transparent;
  border-color: transparent;
  border-top-color: #fff;
  border-width: 16px;
  align-self: center;
  margin-top: -32px;
`;
const ArrowBorder = styled.View`
  background-color: transparent;
  border-color: transparent;
  border-top-color: #007a87;
  border-width: 16px;
  align-self: center;
  margin-top: -0.5px;
`;

const Map = ({
  route: {
    params: { jwtToken, userName },
  },
}) => {
  const mapRef = useRef(null);
  const { height: PHONE_HEIGHT } = Dimensions.get('window');
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
  const navigation = useNavigation();
  const [userRegion, setUserRegion] = useState({});
  const [userLongitude, setUserLongitude] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [neighborResult, setNeighborResult] = useState([]);

  const goToMain = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Drawer' }] });
  };

  const getUserLocationIfGranted = async () => {
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
            return;
          }
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
  };

  useEffect(() => {
    getUserLocationIfGranted();
  }, []);

  const findMyCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('위치 접근 오류', '설정에 들어가서 위치 접근을 허용해주세요!');
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
          return;
        }
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
      });
  };

  const goToDetectResult = async (detectionId) => {
    const response = await fetch(`${BASE_URI}/api/v1/detection/${detectionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      navigation.navigate('AlreadyDetectPestResult', {
        response,
        userName,
      });

      return;
    }
    Alert.alert('잠시 후 다시 시도해주세요!');
  };

  return (
    <Container>
      <BackBotton onPress={goToMain} statusbarHeight={STATUSBAR_HEIGHT}>
        <Ionicons name="chevron-back-outline" size={40} color="#000" />
      </BackBotton>
      <MapView
        ref={mapRef}
        style={{ height: PHONE_HEIGHT }}
        userInterfaceStyle="light"
        showsUserLocation={true}
        rotateEnabled={false}
        pitchEnabled={false}
        zoomEnabled={false}
        zoomTapEnabled={false}
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
            .then(async (json) => {
              if (!json.documents[0].region_1depth_name) {
                mapRef.current.animateToRegion({
                  latitude: 37.5518018,
                  longitude: 127.0736345,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                });
                Alert.alert('지원하지 않는 지역입니다!');
                return;
              } else {
                await fetch(`${BASE_URI}/api/v1/detection/map`, {
                  method: 'POST',
                  body: JSON.stringify({
                    location: json.documents[0],
                  }),
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                  },
                })
                  .then((res) => res.json())
                  .then((json) => setNeighborResult(json.result));
              }
            });
        }}
        initialRegion={{
          latitude: 37.5518018,
          longitude: 127.0636345,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {neighborResult.length !== 0
          ? neighborResult.map((data, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{ longitude: data.location.x, latitude: data.location.y }}
                  image={require('../assets/location5.png')}
                >
                  <Callout tooltip>
                    <LocationContainer>
                      <LocationBubble onPress={() => goToDetectResult(data._id)}>
                        <LocationText>{data.model_result.name}</LocationText>
                        <LocationImage source={{ uri: data.img }} />
                      </LocationBubble>
                      <ArrowBorder></ArrowBorder>
                      <Arrow></Arrow>
                    </LocationContainer>
                  </Callout>
                </Marker>
              );
            })
          : null}
        <MaterialCommunityIcons
          onPress={findMyCurrentLocation}
          name="target"
          size={30}
          color="#3B9660"
          style={{
            padding: 3,
            backgroundColor: '#FFF',
            position: 'absolute',
            zIndex: 11,
            right: 30,
            bottom: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0,0.5)',
            shadowColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </MapView>
    </Container>
  );
};

export default Map;
