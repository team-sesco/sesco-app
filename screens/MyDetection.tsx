import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import carrot from '../assets/carrot.gif';
import gochuImg from '../assets/gochu.png';
import muImg from '../assets/mu.png';
import baechuImg from '../assets/baechu.png';
import kongImg from '../assets/kong.png';
import paImg from '../assets/pa.png';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';
import { BASE_URI } from '../api/api';
import { AntDesign } from '@expo/vector-icons';
import { Alert } from 'react-native';
import BookMarkButton from '../components/BookMarkButton';
import Swiper from 'react-native-swiper';

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

const Container = styled.View`
  width: 95%;
  height: 100%;
  margin: 10px auto;
`;

const SwiperView = styled.View`
  height: 180px;
  margin: 10px 0 -20px;
`;

const SwiperButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #fff;
  border: 2px solid #3b966050;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  margin: 0 5px;
`;

const TopThreeTextWrapper = styled.View``;
const TopThreeImage = styled.Image`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-right: 20px;
`;

const TopThreeLocation = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;
const TopThreeCategory = styled.Text`
  margin-top: 3px;
  font-size: 16px;
  font-weight: 600;
`;
const TopThreePest = styled.Text`
  margin-top: 3px;
  font-size: 17px;
  font-weight: 700;
  color: #3b9660;
`;
const TopThreeDate = styled.Text`
  margin-top: 3px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
`;

const ListView = styled.FlatList`
  margin: 5px 0 80px;
`;

const NoCurrentDetectView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const NoCurrentDetectText = styled.Text`
  margin: 30px 0 200px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;

const MyDetection = ({
  route: {
    params: { jwtToken, userName },
  },
}) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [topDetectionData, setTopDetectionData] = useState([]);
  const [detectionData, setDetectionData] = useState([]);

  useEffect(() => {
    getTopThreeDetection();
    getAllDetection();
  }, [jwtToken]);

  const getTopThreeDetection = async () => {
    await fetch(`${BASE_URI}/api/v1/detection?limit=3`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.msg === 'success') {
          setTopDetectionData(response.result);
        }
      });
  };

  const getAllDetection = async () => {
    const response = await fetch(`${BASE_URI}/api/v1/detection`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      const tempResult = response.result;
      for (let count = 0; count < 3; count += 1) {
        tempResult.shift();
      }
      setDetectionData(tempResult);
    }
  };

  const goToDetectResult = async (detectionId) => {
    setIsReady(false);
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

      setIsReady(true);
      return;
    }
    setIsReady(true);
    Alert.alert('잠시 후 다시 시도해주세요!');
  };

  return (
    <>
      <LoadingBackground isLoading={!isReady}>
        <LoadingGIF source={require('../assets/pa.gif')} />
      </LoadingBackground>
      <HeadSeparator />
      <Container>
        <MainTitle text="탐지 목록" />
        {topDetectionData.length !== 0 ? (
          <SwiperView>
            <Swiper activeDotColor="#3b9660">
              {topDetectionData.map((data, index) => {
                return (
                  <SwiperButton key={index} onPress={() => goToDetectResult(data._id)}>
                    <TopThreeImage source={{ uri: data.img }} />
                    <TopThreeTextWrapper>
                      <TopThreeLocation>{data.location.address_name}</TopThreeLocation>
                      <TopThreeCategory>{data.category}</TopThreeCategory>
                      <TopThreePest>
                        {`${
                          data.model_result.name.includes('정상')
                            ? '정상'
                            : data.model_result.name
                        } (${(
                          data.model_result.ratio.value[
                            data.model_result.ratio.name.indexOf(data.model_result.name)
                          ] * 100
                        ).toFixed(2)}%)`}
                      </TopThreePest>
                      <TopThreeDate>{data.created_at}</TopThreeDate>
                    </TopThreeTextWrapper>
                  </SwiperButton>
                );
              })}
            </Swiper>
          </SwiperView>
        ) : null}
        {detectionData.length !== 0 ? (
          <ListView
            data={detectionData}
            renderItem={({ item }) => (
              <BookMarkButton
                onPress={() => {
                  goToDetectResult(item._id);
                }}
                cropImage={
                  item.category === '고추'
                    ? gochuImg
                    : item.category === '무'
                    ? muImg
                    : item.category === '배추'
                    ? baechuImg
                    : item.category === '콩'
                    ? kongImg
                    : item.category === '파'
                    ? paImg
                    : carrot
                }
                cropLocation={item.location.address_name}
                cropName={item.category}
                cropPest={
                  item.model_result.name.includes('정상')
                    ? '정상'
                    : item.model_result.name
                }
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : topDetectionData.length !== 0 ? null : (
          <NoCurrentDetectView>
            <AntDesign name="closecircleo" color="rgba(0,0,0,0.5)" size={30} />
            <NoCurrentDetectText>탐지된 기록이 없습니다.</NoCurrentDetectText>
          </NoCurrentDetectView>
        )}
      </Container>
    </>
  );
};

export default MyDetection;
