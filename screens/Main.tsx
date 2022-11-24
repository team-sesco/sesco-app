import React from 'react';
import styled from 'styled-components/native';
import { Octicons, Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HeadSeparator from '../components/HeadSeparator';

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7fbf9;
`;

const Container = styled.ScrollView`
  width: 95%;
  margin: 0 auto;
`;

const Header = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 30px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const LeftHeader = styled.View`
  position: absolute;
  margin-left: 20px;
`;
const CenterHeader = styled.View`
  margin: 0 auto;
`;
const TextHeader = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #3b9660;
`;
const RightHeader = styled.View`
  position: absolute;
  flex-direction: row;
  margin-right: 10px;
  right: 0px;
`;
const HeaderButton = styled.TouchableOpacity``;

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
    <Background>
      <Container>
        <HeadSeparator />
        <VSeparator />
        <Header>
          <LeftHeader>
            <HeaderButton onPress={() => navigation.openDrawer()}>
              <Octicons name="three-bars" color="#98A1BD" size={28} />
            </HeaderButton>
          </LeftHeader>
          <CenterHeader>
            <TextHeader>SE. SCO</TextHeader>
          </CenterHeader>
          <RightHeader>
            <HeaderButton>
              <AntDesign
                name="search1"
                color="#98A1BD"
                size={28}
                style={{ marginRight: 15 }}
              />
            </HeaderButton>
            <HeaderButton>
              <SimpleLineIcons name="bell" color="#98A1BD" size={28} />
            </HeaderButton>
          </RightHeader>
        </Header>
        <VSeparator />
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
    </Background>
  );
};

export default Main;
