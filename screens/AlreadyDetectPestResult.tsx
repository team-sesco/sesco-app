import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';
import ChatLeftBox from '../components/ChatLeftBox';
import ChatRightBox from '../components/ChatRightBox';
import { BarChart } from 'react-native-chart-kit';
import carrotGIF from '../assets/carrot.gif';
import { BASE_URI } from '../api/api';
import MapView, { Callout, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
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
const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7fbf9;
`;
const TopContainer = styled.View``;
const PestPhoto = styled.Image<{ phoneWidth: number }>`
  width: ${(props) => props.phoneWidth}px;
  height: 300px;
  max-width: 800px;
  max-height: 800px;
  min-height: 200px;
  margin: 0 auto;
`;
const ReportButton = styled.TouchableOpacity`
  position: absolute;
  padding: 2px;
  right: 10px;
  bottom: 10px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`;
const ContentContainer = styled.View`
  margin: 0 auto;
  width: 95%;
`;
const PestMode = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const PestResult = styled.TouchableOpacity``;
const PestVisual = styled.TouchableOpacity``;
const PestModeText = styled.Text<{ isActivate: boolean }>`
  font-size: 20px;
  font-weight: ${(props) => (props.isActivate ? '700' : '400')};
  color: ${(props) => (props.isActivate ? '#000' : 'rgba(0,0,0,0.5)')};
  margin-bottom: 10px;
`;
const VisualText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 15px 10px 5px;
`;
const ScrollViewContainer = styled.ScrollView<{ display: boolean; isResult: boolean }>`
  display: ${(props) => (props.display ? 'flex' : 'none')};
  width: 95%;
  margin: ${(props) => (props.isResult ? '0 auto 90px' : '0 auto 20px')};
`;
const SeparationLine = styled.View<{ isIOS: boolean; isActivate: boolean }>`
  position: absolute;
  display: ${(props) => (props.isActivate ? 'flex' : 'none')};
  bottom: ${(props) => (props.isIOS ? '80px' : '58px')};
  width: 100%;
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const AskButtonBox = styled.ScrollView<{ isIOS: boolean; isActivate: boolean }>`
  position: absolute;
  display: ${(props) => (props.isActivate ? 'flex' : 'none')};
  bottom: ${(props) => (props.isIOS ? '25px' : '3px')};
`;
const AskButton = styled.TouchableOpacity<{ notSupport: boolean }>`
  display: ${(props) => (props.notSupport ? 'none' : 'flex')};
  height: 40px;
  background-color: #3b9660;
  padding: 5px 20px;
  margin: 5px;
  border-radius: 12px;
  justify-content: center;
`;
const AskButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

const LocationContainer = styled.View`
  /* left: 10px;
  top: 10px; */
`;
const LocationBubble = styled.View`
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
const AlreadyDetectPestResult = ({
  route: {
    params: {
      userName: currentUser,
      response: {
        result: {
          _id: detection_oid,
          category: cropName,
          created_at,
          is_bookmarked,
          img: photoUri,
          location: { address_name: userLocation, x: longitude, y: latitude },
          model_result: { name: pestResult, unidentified, img: visualUriTemp, ratio },
          user_name: userName,
          location,
        },
      },
    },
  },
}) => {
  const navigation = useNavigation();
  const [jwtToken, setJwtToken] = useState('');
  const [isReady, setIsReady] = useState(true);
  const scrollViewRef = useRef();
  const [isBookMark, setIsBookMark] = useState(is_bookmarked);
  const [isFontSize, setIsFontSize] = useState(false);
  const { width: PHONE_WIDTH } = Dimensions.get('window');
  const [isResult, setIsResult] = useState(true);
  const [hasVisual, setHasVisual] = useState(false);
  const [isVisual, setIsVisual] = useState(false);
  const [visualUri, setVisualUri] = useState(visualUriTemp);
  const [chatsArr, setChatsArr] = useState([{}]);
  const [preparation, setPreparation] = useState('');
  const [symptom, setSymptom] = useState('');
  const [neighborResult, setNeighborResult] = useState([]);
  const graphData = {
    labels: ratio.name,
    datasets: [
      {
        data: ratio.value.map((value) => (value * 100).toFixed(2)),
      },
    ],
  };

  useEffect(() => {
    AsyncStorage.getItem('jwtToken', (_, result) => {
      setJwtToken(result);
    });

    const tempChatsArr = [...chatsArr];
    tempChatsArr.pop();
    if (pestResult.includes('정상')) {
      tempChatsArr.push({
        type: 'bot',
        text: `${userName}님, ${created_at}에 ${userLocation}에 있는 작물에서는 탐지된 병해충이 없습니다.`,
      });

      if (unidentified) {
        tempChatsArr.push({
          type: 'bot',
          text: '이 작물은 SE. SCO AI가 판단하기 어려운 병해충인 것 같아요! 전문가의 도움을 요청해보세요.',
        });
      }
    } else {
      tempChatsArr.push({
        type: 'bot',
        text: `${userName}님, ${created_at}에 ${userLocation}에 있는 작물에서는 ${pestResult}이 탐지 되었습니다.`,
        point: pestResult,
      });
      if (unidentified) {
        tempChatsArr.push({
          type: 'bot',
          text: '이 작물은 SE. SCO AI가 모르는 병해충인 것 같아요! 전문가의 도움을 요청해보세요.',
        });
      }
    }
    tempChatsArr.push({
      type: 'bot',
      text: '아래 버튼을 눌러서 원하는 정보를 얻어보세요!',
    });
    setChatsArr([...tempChatsArr]);
  }, []);

  const getVisual = async () => {
    if (visualUri !== null) {
      setHasVisual(true);
      return;
    }
    setIsReady(false);

    const response = await fetch(
      `${BASE_URI}/api/v1/detection/visualize/${detection_oid}`,
      {
        method: 'POST',
        body: JSON.stringify({
          img: photoUri,
          category: cropName,
          disease: pestResult,
        }),
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json());

    if (response.msg === 'success') {
      setVisualUri(response.result.visualization);
      setHasVisual(true);
      setIsReady(true);
    }
  };

  const initBookMark = async () => {
    const tempChatsArr = [...chatsArr];
    if (isBookMark) {
      await fetch(`${BASE_URI}/api/v1/bookmarks/${detection_oid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      tempChatsArr.push({ type: 'human', text: '북마크 해제해주세요!' });
      tempChatsArr.push({ type: 'bot', text: '북마크 해제하였습니다.' });
      setChatsArr([...tempChatsArr]);
      setIsBookMark(false);
      return;
    }

    const response = await fetch(`${BASE_URI}/api/v1/bookmarks/${detection_oid}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    tempChatsArr.push({ type: 'human', text: '북마크 등록해주세요!' });

    if (response.msg === 'created') {
      tempChatsArr.push({ type: 'bot', text: '북마크 등록하였습니다.' });
    } else {
      tempChatsArr.push({ type: 'bot', text: '이미 북마크가 등록되었습니다.' });
    }

    setChatsArr([...tempChatsArr]);
    setIsBookMark(true);
  };

  const getPreparation = async () => {
    if (!preparation) {
      const response = await fetch(
        `${BASE_URI}/api/v1/detection/solution?disease=${pestResult.replace(
          /\s/gi,
          '_'
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      ).then((res) => res.json());

      if (response.msg === 'success') {
        setPreparation(response.result.대처방안);
        setSymptom(response.result.증상);

        const tempChatsArr = [...chatsArr];
        tempChatsArr.push({ type: 'human', text: '대처 방안 알려주세요!' });
        tempChatsArr.push({ type: 'bot', text: `${response.result.대처방안}` });
        setChatsArr([...tempChatsArr]);
        return;
      }
    }
    const tempChatsArr = [...chatsArr];
    tempChatsArr.push({ type: 'human', text: '대처 방안 알려주세요!' });
    tempChatsArr.push({ type: 'bot', text: `${preparation}` });
    setChatsArr([...tempChatsArr]);
  };

  const getSymptom = async () => {
    if (!symptom) {
      const response = await fetch(
        `${BASE_URI}/api/v1/detection/solution?disease=${pestResult.replace(
          /\s/gi,
          '_'
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      ).then((res) => res.json());

      if (response.msg === 'success') {
        setPreparation(response.result.대처방안);
        setSymptom(response.result.증상);

        const tempChatsArr = [...chatsArr];
        tempChatsArr.push({ type: 'human', text: '증상에 대해서 알려주세요!' });
        tempChatsArr.push({ type: 'bot', text: `${response.result.증상}` });
        setChatsArr([...tempChatsArr]);
        return;
      }
    }
    const tempChatsArr = [...chatsArr];
    tempChatsArr.push({ type: 'human', text: '증상에 대해서 알려주세요!' });
    tempChatsArr.push({ type: 'bot', text: `${symptom}` });
    setChatsArr([...tempChatsArr]);
  };

  const repeatResult = () => {
    const tempChatsArr = [...chatsArr];
    tempChatsArr.push({ type: 'human', text: '결과 내용 다시 보여주세요!' });
    if (pestResult.includes('정상')) {
      tempChatsArr.push({
        type: 'bot',
        text: `${userName}님, ${created_at}에 ${userLocation}에 있는 작물에서는 탐지된 병해충이 없습니다.`,
      });

      if (unidentified) {
        tempChatsArr.push({
          type: 'bot',
          text: '이 작물은 SE. SCO AI가 판단하기 어려운 병해충인 것 같아요! 전문가의 도움을 요청해보세요.',
        });
      }
    } else {
      tempChatsArr.push({
        type: 'bot',
        text: `${userName}님, ${created_at}에 ${userLocation}에 있는 작물에서는 ${pestResult}이 탐지 되었습니다.`,
        point: pestResult,
      });
      if (unidentified) {
        tempChatsArr.push({
          type: 'bot',
          text: '이 작물은 SE. SCO AI가 모르는 병해충인 것 같아요! 전문가의 도움을 요청해보세요.',
        });
      }
    }
    setChatsArr([...tempChatsArr]);
  };

  const initFontSize = () => {
    if (isFontSize) {
      setIsFontSize(false);
      return;
    }
    setIsFontSize(true);
  };

  const getNeighborResult = async () => {
    await fetch(`${BASE_URI}/api/v1/detection/map`, {
      method: 'POST',
      body: JSON.stringify({
        location: location,
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNeighborResult(json.result);
      });
  };

  const goToReport = () => {
    //@ts-ignore
    navigation.navigate('Report', { jwtToken, detection_oid, userName, currentUser });
  };

  return (
    <>
      <LoadingBackground isLoading={!isReady}>
        <LoadingGIF source={carrotGIF} />
      </LoadingBackground>
      <Background>
        <TopContainer>
          {isResult ? (
            <PestPhoto source={{ uri: photoUri }} phoneWidth={PHONE_WIDTH} />
          ) : isReady ? (
            <PestPhoto source={{ uri: visualUri }} phoneWidth={PHONE_WIDTH} />
          ) : (
            <PestPhoto source={{ uri: photoUri }} phoneWidth={PHONE_WIDTH} />
          )}
          {currentUser !== userName ? (
            <ReportButton>
              <Ionicons
                onPress={goToReport}
                name="megaphone"
                size={35}
                color="rgba(175, 38, 38, 0.9)"
              />
            </ReportButton>
          ) : null}
        </TopContainer>
        <ContentContainer>
          <PestMode>
            <PestResult
              onPress={() => {
                setIsResult(true);
                setIsVisual(false);
              }}
            >
              <PestModeText isActivate={isResult}>결 과</PestModeText>
            </PestResult>
            <PestVisual
              onPress={() => {
                setIsResult(false);
                getVisual();
                getNeighborResult();
                setIsVisual(true);
              }}
            >
              <PestModeText isActivate={isVisual}>시각 자료</PestModeText>
            </PestVisual>
          </PestMode>
        </ContentContainer>
        <ScrollViewContainer
          display={isResult}
          isResult={isResult}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {chatsArr.map(({ type, text, point = false }, index) => {
            if (type === 'bot') {
              return (
                <ChatLeftBox
                  key={index}
                  content={text}
                  isFontSize={isFontSize}
                  point={point}
                />
              );
            }
            return <ChatRightBox key={index} content={text} isFontSize={isFontSize} />;
          })}
        </ScrollViewContainer>
        <ScrollViewContainer
          display={isVisual}
          isResult={isResult}
          showsVerticalScrollIndicator={false}
        >
          {hasVisual ? (
            <>
              <VisualText>병해충 정확도</VisualText>
              <BarChart
                data={graphData}
                width={PHONE_WIDTH}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  color: (opacity = 1) => `rgba(32, 53, 32, ${opacity})`,
                  strokeWidth: 2,
                  useShadowColorFromDataset: false,
                }}
                fromZero={true}
                withInnerLines={false}
                yAxisSuffix={'%'}
                showBarTops={true}
                showValuesOnTopOfBars={true}
              />
              <VisualText>근처 병해충 정보</VisualText>
              <MapView
                style={{ height: PHONE_WIDTH }}
                userInterfaceStyle="light"
                // followsUserLocation={true}
                showsUserLocation={true}
                rotateEnabled={false}
                pitchEnabled={false}
                zoomEnabled={false}
                zoomTapEnabled={false}
                scrollEnabled={false}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                {neighborResult.length !== 0
                  ? neighborResult.map((data, index) => {
                      return detection_oid !== data._id ? (
                        <Marker
                          key={index}
                          coordinate={{
                            longitude: data.location.x,
                            latitude: data.location.y,
                          }}
                          image={require('../assets/location5.png')}
                        >
                          <Callout tooltip>
                            <LocationContainer>
                              <LocationBubble>
                                <LocationText>{data.model_result.name}</LocationText>
                                <LocationImage source={{ uri: data.img }} />
                              </LocationBubble>
                              <ArrowBorder></ArrowBorder>
                              <Arrow></Arrow>
                            </LocationContainer>
                          </Callout>
                        </Marker>
                      ) : (
                        <Marker
                          key={index}
                          coordinate={{
                            longitude: data.location.x,
                            latitude: data.location.y,
                          }}
                        />
                      );
                    })
                  : null}
              </MapView>
            </>
          ) : null}
        </ScrollViewContainer>
        <SeparationLine isIOS={Platform.OS === 'ios'} isActivate={isResult} />
        <AskButtonBox
          horizontal={true}
          showHorizontalScrollIndicator={false}
          isIOS={Platform.OS === 'ios'}
          isActivate={isResult}
        >
          <AskButton onPress={initBookMark}>
            <AskButtonText>{isBookMark ? '북마크 해제' : '북마크 등록'}</AskButtonText>
          </AskButton>
          <AskButton
            notSupport={pestResult.includes('정상') || cropName === '기타'}
            onPress={getSymptom}
          >
            <AskButtonText>증상</AskButtonText>
          </AskButton>
          <AskButton
            notSupport={pestResult.includes('정상') || cropName === '기타'}
            onPress={getPreparation}
          >
            <AskButtonText>대처 방안</AskButtonText>
          </AskButton>
          <AskButton onPress={repeatResult}>
            <AskButtonText>결과 다시보기</AskButtonText>
          </AskButton>
          <AskButton onPress={initFontSize}>
            <AskButtonText>{isFontSize ? '글자 줄여줘' : '글자 키워줘'}</AskButtonText>
          </AskButton>
        </AskButtonBox>
      </Background>
    </>
  );
};

export default AlreadyDetectPestResult;
