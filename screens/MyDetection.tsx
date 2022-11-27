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
    params: { jwtToken },
  },
}) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [detectionData, setDetectionData] = useState([]);

  useEffect(() => {
    getAllDetection();
  }, [jwtToken]);

  const getAllDetection = async () => {
    const response = await fetch(`${BASE_URI}/api/v1/detection`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      setDetectionData(response.result);
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
        ) : (
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
