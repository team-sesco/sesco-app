import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, Platform, StatusBar, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ChatLeftBox from '../components/ChatLeftBox';
import ChatRightBox from '../components/ChatRightBox';

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7fbf9;
`;
const PestPhoto = styled.Image<{ phoneWidth: number }>`
  width: ${(props) => props.phoneWidth}px;
  height: 300px;
  max-width: 800px;
  max-height: 800px;
  min-height: 200px;
  margin: 0 auto;
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
const ScrollViewContainer = styled.ScrollView<{ display: boolean }>`
  display: ${(props) => (props.display ? 'flex' : 'none')};
  width: 95%;
  margin: 0 auto 90px;
`;
const SeparationLine = styled.View<{ isIOS: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.isIOS ? '80px' : '58px')};
  width: 100%;
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const AskButtonBox = styled.ScrollView<{ isIOS: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.isIOS ? '25px' : '3px')};
`;
const AskButton = styled.TouchableOpacity`
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

const DetectPestResult = ({
  route: {
    params: {
      response: {
        result: {
          category,
          created_at,
          img: photoUri,
          location: { address_name: userLocation },
          result: pestResult,
        },
      },
    },
  },
}) => {
  const scrollViewRef = useRef();
  const [isBookMark, setIsBookMark] = useState(false);
  const [isFontSize, setIsFontSize] = useState(false);
  const { width: PHONE_WIDTH } = Dimensions.get('window');
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
  const navigation = useNavigation();
  const [isResult, setIsResult] = useState(true);
  const [isVisual, setIsVisual] = useState(false);
  const [chatsArr, setChatArr] = useState([
    { type: 'bot', text: '병해충 탐지가 완료되었습니다.' },
    {
      type: 'bot',
      text: `사용자1님, ${created_at}에 ${userLocation}에 있는 작물에서는 ${pestResult}이 탐지 되었습니다.`,
      point: pestResult,
    },
    { type: 'bot', text: '아래 버튼을 눌러서 원하는 정보를 얻어보세요!' },
  ]);

  const initBookMark = () => {
    const tempChatsArr = [...chatsArr];
    if (isBookMark) {
      tempChatsArr.push({ type: 'human', text: '북마크 해제해주세요!' });
      tempChatsArr.push({ type: 'bot', text: '북마크 해제하였습니다.' });
      setChatArr([...tempChatsArr]);
      setIsBookMark(false);
      return;
    }
    tempChatsArr.push({ type: 'human', text: '북마크 등록해주세요!' });
    tempChatsArr.push({ type: 'bot', text: '북마크 등록하였습니다.' });
    setChatArr([...tempChatsArr]);
    setIsBookMark(true);
  };

  const repeatResult = () => {
    const tempChatsArr = [...chatsArr];
    tempChatsArr.push({ type: 'human', text: '결과 내용 다시 보여주세요!' });
    tempChatsArr.push({
      type: 'bot',
      text: `사용자1님, ${created_at}에 ${userLocation}에 있는 작물에서는 ${pestResult}이 탐지 되었습니다.`,
      point: pestResult,
    });
    setChatArr([...tempChatsArr]);
  };

  const initFontSize = () => {
    if (isFontSize) {
      setIsFontSize(false);
      return;
    }
    setIsFontSize(true);
  };

  const graphData = {
    labels: ['고추탄저병', '고추흰가루병', '고추세균성점무늬병'],
    datasets: [
      {
        data: [96.42, 11.54, 18.19],
      },
    ],
  };

  return (
    <Background>
      {/* <BackToMainWrapper statusBarHeight={STATUSBAR_HEIGHT} onPress={goToMain}>
        <Ionicons name="caret-back-outline" size={24} color={'#FFF'} />
        <BackToMainText>메인화면으로 이동하기</BackToMainText>
      </BackToMainWrapper> */}
      <PestPhoto source={{ uri: photoUri }} phoneWidth={PHONE_WIDTH} />

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
              setIsVisual(true);
            }}
          >
            <PestModeText isActivate={isVisual}>시각 자료</PestModeText>
          </PestVisual>
        </PestMode>
      </ContentContainer>
      <ScrollViewContainer
        display={isResult}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
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
      <ScrollViewContainer display={isVisual}>
        <BarChart
          data={graphData}
          width={PHONE_WIDTH}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            color: (opacity = 1) => `rgba(32, 53, 32, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            useShadowColorFromDataset: false, // optional
          }}
          fromZero={true}
          // withInnerLines={false}
          yAxisSuffix={'%'}
          showBarTops={true}
          showValuesOnTopOfBars={true}
        />
      </ScrollViewContainer>
      <SeparationLine isIOS={Platform.OS === 'ios'} />
      <AskButtonBox
        horizontal={true}
        showHorizontalScrollIndicator={false}
        isIOS={Platform.OS === 'ios'}
      >
        <AskButton onPress={initBookMark}>
          <AskButtonText>{isBookMark ? '북마크 해제' : '북마크 등록'}</AskButtonText>
        </AskButton>
        <AskButton>
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
  );
};

export default DetectPestResult;
