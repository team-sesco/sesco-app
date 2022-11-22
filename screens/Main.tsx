import React, { useEffect } from 'react';
import { Alert, BackHandler, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  width: 95%;
  margin: 0 auto;
`;
const VSeparator = styled.View`
  height: 15px;
`;
const MainBannerBtn = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px solid rgba(9, 9, 9, 0.1);
`;
const MainBannerText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;
const MainBannerText2 = styled(MainBannerText)`
  font-weight: 600;
  color: #48a446;
  margin-left: 50px;
`;

const DetectPestBtn = styled.TouchableOpacity`
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #3b9660;
`;

const DetectPestInnerBorder = styled.View`
  width: 97%;
  height: 140px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 15px;
`;

const DetectPestText = styled.Text`
  font-size: 25px;
  color: white;
`;

const NormalBtnWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const NormalBtn = styled.TouchableOpacity`
  width: 48%;
  height: 85px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 15px;
  justify-content: space-around;
  border: 1px solid rgba(9, 9, 9, 0.1);
`;
const NormalBtnText = styled.Text`
  color: #48a346;
  font-weight: 600;
  font-size: 15px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const BookMarkWrapper = styled.View``;
const BookMarkItem = styled.TouchableOpacity`
  width: 100%;
`;

const Main = () => {
  const navigation = useNavigation();

  const goToDetectPest = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'DetectPest',
    });
  };

  return (
    <Container>
      <VSeparator />
      <MainBannerBtn>
        <MainBannerText>SE. SCO를 처음 이용하시나요?</MainBannerText>
        <MainBannerText2>이용 방법</MainBannerText2>
        <Ionicons name="chevron-forward" color="#98A1BD" size={24} />
      </MainBannerBtn>
      <VSeparator />
      <DetectPestBtn onPress={goToDetectPest}>
        <DetectPestInnerBorder>
          <DetectPestText>병해충 탐지하기</DetectPestText>
        </DetectPestInnerBorder>
      </DetectPestBtn>
      <VSeparator />
      <NormalBtnWrapper>
        <NormalBtn>
          <Ionicons name="home-outline" color="#48a346" size={24} />
          <NormalBtnText>내 농작물</NormalBtnText>
        </NormalBtn>
        <NormalBtn>
          <Ionicons name="map-outline" color="#48a346" size={24} />
          <NormalBtnText>지도</NormalBtnText>
        </NormalBtn>
      </NormalBtnWrapper>
      <VSeparator />
      <Title>즐겨찾는 나의 작물</Title>
      <VSeparator />
      <Title>최근 탐지 기록</Title>
    </Container>
  );
};

export default Main;
