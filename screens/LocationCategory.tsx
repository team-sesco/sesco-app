import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import carrotGIF from '../assets/carrot.gif';
import { Alert } from 'react-native';
import { KAKAO_REST_API_KEY } from '../environment/env';

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

const ChoiceButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid rgba(9, 9, 9, 0.05);
`;
const ChoiceTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ChoiceText = styled.Text<{ isClick: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => (props.isClick ? '600' : '400')};
  color: ${(props) => (props.isClick ? 'white' : 'black')};
`;
const BottomContainer = styled.View<{ isAnyClick: boolean }>`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  border: 1px solid ${(props) => (props.isAnyClick ? '#3B966050' : '#eee')};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;
const BottomNextButton = styled.TouchableOpacity<{ isAnyClick: boolean }>`
  width: 90%;
  height: 50px;
  margin: 20px auto;
  background-color: ${(props) => (props.isAnyClick ? '#3B9660' : '#D8DBE290')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const BottomNextText = styled.Text<{ isAnyClick: boolean }>`
  color: #fff;
  font-size: 17px;
  font-weight: ${(props) => (props.isAnyClick ? '600' : '400')};
`;

const LocationCategory = () => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [userLongitude, setUserLongitude] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [detailLocation, setDetailLocation] = useState({});
  const [searchContent, setSearchContent] = useState('');
  const [isAnyClick, setIsAnyClick] = useState(false);
  const [isCurrentLocationClick, setIsCurrentLocationClick] = useState(false);
  const [isSearchLocationClick, setIsSearchLocationClick] = useState(false);

  const findMyCurrentLocation = async () => {
    setIsReady(false);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('사용자가 동의하지 않아 위치정보를 불러올 수 없습니다.');
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
  const findSearchLocation = () => {};

  return (
    <>
      <LoadingBackground isLoading={!isReady}>
        <LoadingGIF source={carrotGIF} />
      </LoadingBackground>
      <TitleWrapper>
        <Ionicons name="location-outline" size={24} color="#48a346" />
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
              color={'#000'}
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
            />
          )}
          <ChoiceText isClick={isSearchLocationClick}>
            {isSearchLocationClick ? userLocation : '검색해서 위치 찾기'}
          </ChoiceText>
        </ChoiceTextWrapper>
      </ChoiceButton>
      <BottomContainer isAnyClick={isAnyClick}>
        <BottomNextButton
          isAnyClick={isAnyClick}
          disabled={!isAnyClick}
          onPress={onSubmit}
        >
          <BottomNextText isAnyClick={isAnyClick}>확인</BottomNextText>
        </BottomNextButton>
      </BottomContainer>
    </>
  );
};

export default LocationCategory;
