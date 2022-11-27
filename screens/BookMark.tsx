import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import BookMarkButton from '../components/BookMarkButton';
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
import { useNavigation } from '@react-navigation/native';

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
  margin: 0 auto;
  margin-top: 10px;
`;

const Wrapper = styled.ScrollView<{ isBookMark: boolean }>`
  display: ${(props) => (props.isBookMark ? 'flex' : 'none')};
  margin-bottom: 80px;
`;

const NoBookMarkView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const NoBookMarkText = styled.Text`
  margin: 30px 0 200px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;

const BookMark = ({
  route: {
    params: { jwtToken },
  },
}) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [bookMarkData, setBookMarkData] = useState([]);

  useEffect(() => {
    getAllBookMark();
  }, [jwtToken]);

  const getAllBookMark = async () => {
    const response = await fetch(`${BASE_URI}/api/v1/bookmarks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      setBookMarkData(response.result);
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
        <MainTitle text="모든 북마크" />
        <Wrapper isBookMark={bookMarkData.length !== 0}>
          {bookMarkData.length !== 0 ? (
            bookMarkData.map((data, index) => {
              return (
                <BookMarkButton
                  key={index}
                  onPress={() => goToDetectResult(data.detection_id)}
                  cropImage={
                    data.detection_category === '고추'
                      ? gochuImg
                      : data.detection_category === '무'
                      ? muImg
                      : data.detection_category === '배추'
                      ? baechuImg
                      : data.detection_category === '콩'
                      ? kongImg
                      : data.detection_category === '파'
                      ? paImg
                      : carrot
                  }
                  cropLocation={data.detection_location.address_name}
                  cropName={data.detection_category}
                  cropPest={
                    data.detection_result.name.includes('정상') ? '정상' : '병해충 탐지됨'
                  }
                />
              );
            })
          ) : (
            <NoBookMarkView>
              <AntDesign name="closecircleo" color="rgba(0,0,0,0.5)" size={40} />
              <NoBookMarkText>등록된 북마크가 없습니다.</NoBookMarkText>
            </NoBookMarkView>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default BookMark;
