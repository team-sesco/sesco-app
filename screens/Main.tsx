import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Octicons, Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HeadSeparator from '../components/HeadSeparator';
import BookMarkButton from '../components/BookMarkButton';
import carrot from '../assets/carrot.gif';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URI } from '../api/api';
import CurrentDetectButton from '../components/CurrentDetectButton';
import * as WebBrowser from 'expo-web-browser';

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
  margin-left: 25px;
`;
const RightHeader = styled.View`
  position: absolute;
  flex-direction: row;
  margin-right: 20px;
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

const SwiperView = styled.View``;
const NoBookMarkView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const NoBookMarkText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;
const AllBookMarkButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
`;
const AllBookMarkText = styled.Text`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 15px;
`;

const SlideView = styled.FlatList`
  margin-top: 15px;
`;

const NoCurrentDetectView = styled.View`
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`;
const NoCurrentDetectText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;

const WidthSeparator = styled.View`
  width: 10px;
`;

const Main = () => {
  const navigation = useNavigation();
  const [jwtToken, setJwtToken] = useState('');
  const [bookMarkData, setBookMarkData] = useState([]);
  const [detectData, setDetectData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('jwtToken', (_, result) => {
      setJwtToken(result);
    });
  }, []);

  useEffect(() => {
    getBookMark();
    getDetectCrop();
  }, [jwtToken]);

  const openLink = async () => {
    await WebBrowser.openBrowserAsync(
      'https://brass-payment-372.notion.site/SE-SCO-50712a119a774442bc982b161948c6e2'
    );
  };

  const goToMap = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Map' }] });
  };

  const goToDetectPest = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'DetectPest',
    });
  };

  const goToBookMark = () => {
    //@ts-ignore
    navigation.navigate('BookMark', { jwtToken });
  };

  const getBookMark = async () => {
    const response = await fetch(`${BASE_URI}/api/v1/bookmarks?limit=15`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      setBookMarkData(response.result);
    }
  };

  const getDetectCrop = async () => {
    await fetch(`${BASE_URI}/api/v1/detection?limit=10`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.msg === 'success') {
          setDetectData(response.result);
        }
      });
  };

  return (
    <Background>
      <HeadSeparator />
      <VSeparator />
      <Header>
        <LeftHeader>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <Octicons name="three-bars" color="#98A1BD" size={28} />
          </HeaderButton>
        </LeftHeader>
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
      <Container showsVerticalScrollIndicator={false}>
        <MainBannerBtn onPress={() => openLink()}>
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
          <NormalBtn onPress={goToMap}>
            <Ionicons name="map-outline" color="#48a346" size={24} />
            <NormalBtnText>지도</NormalBtnText>
          </NormalBtn>
        </NormalBtnWrapper>
        <VSeparator />
        <VSeparator />
        <Title>즐겨찾는 나의 작물</Title>
        <Swiper
          activeDotColor="#3b9660"
          style={{ height: bookMarkData.length !== 0 ? 350 : 150 }}
        >
          {bookMarkData.length !== 0 ? (
            bookMarkData
              .filter((_, filterIndex) => filterIndex % 3 === 0)
              .map((_, index) => {
                return (
                  <SwiperView key={index}>
                    {bookMarkData.map((data, semiIndex) => {
                      if (
                        semiIndex === index * 3 ||
                        semiIndex === index * 3 + 1 ||
                        semiIndex === index * 3 + 2
                      ) {
                        return (
                          <BookMarkButton
                            key={semiIndex}
                            cropImage={carrot}
                            cropLocation={data.detection_location.address_name}
                            cropName={data.detection_category}
                            isCropPest={
                              data.detection_result.name.includes('정상')
                                ? '정상'
                                : '병해충 탐지됨'
                            }
                          />
                        );
                      }
                    })}
                  </SwiperView>
                );
              })
          ) : (
            <NoBookMarkView>
              <AntDesign name="closecircleo" color="rgba(0,0,0,0.5)" size={30} />
              <NoBookMarkText>등록된 북마크가 없습니다.</NoBookMarkText>
            </NoBookMarkView>
          )}
        </Swiper>
        <AllBookMarkButton onPress={goToBookMark}>
          <AllBookMarkText>모든 북마크 보러가기</AllBookMarkText>
          <AntDesign name="right" size={18} color="rgba(0,0,0,0.5)" />
        </AllBookMarkButton>
        <VSeparator />
        <VSeparator />
        <Title>최근 탐지 기록</Title>
        {detectData.length !== 0 ? (
          <SlideView
            horizontal
            data={detectData}
            renderItem={({ item }) => (
              <CurrentDetectButton
                cropPest={item.model_result.name}
                cropLocation={item.location.address_name}
                cropDate={item.created_at.slice(0, item.created_at.indexOf('일') + 1)}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={WidthSeparator}
          />
        ) : (
          <NoCurrentDetectView>
            <AntDesign name="closecircleo" color="rgba(0,0,0,0.5)" size={30} />
            <NoCurrentDetectText>탐지된 기록이 없습니다.</NoCurrentDetectText>
          </NoCurrentDetectView>
        )}
      </Container>
      <VSeparator />
      <VSeparator />
    </Background>
  );
};

export default Main;
