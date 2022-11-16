import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, Platform, StatusBar, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #edeef5;
`;

const BackToMainWrapper = styled.TouchableOpacity<{ statusBarHeight: number }>`
  flex-direction: row;
  align-items: center;
  margin: ${(props) => `${props.statusBarHeight + 10}px`} auto 10px;
  background-color: #48a346;
  width: 95%;
`;
const BackToMainText = styled.Text`
  text-justify: center;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
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
const PestTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const PestLeftWrapper = styled.View``;
const PestRightWrapper = styled.View``;
const PestName = styled.Text`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 3px;
  letter-spacing: 0.5px;
`;
const PestType = styled.Text`
  font-size: 16px;
`;
const PestLocation = styled.Text`
  text-align: right;
  font-size: 15px;
`;
const PestTime = styled.Text`
  text-align: right;
  font-size: 13px;
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
  text-decoration: ${(props) => (props.isActivate ? 'underline' : 'none')};
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
  border: 2px solid #ccc;
`;

const AskButtonBox = styled.ScrollView<{ isIOS: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.isIOS ? '25px' : '3px')};
`;
const AskButton = styled.TouchableOpacity`
  height: 40px;
  background-color: #48a346;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 12px;
  justify-content: center;
`;
const AskButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const DetectPestResult = ({
  route: {
    params: { photoUri, userLocation },
  },
}) => {
  const { width: PHONE_WIDTH } = Dimensions.get('window');
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
  const navigation = useNavigation();
  const [isResult, setIsResult] = useState(true);
  const [isVisual, setIsVisual] = useState(false);

  return (
    <Background>
      <PestPhoto source={{ uri: photoUri }} phoneWidth={PHONE_WIDTH} />

      <ContentContainer>
        <PestTitle>
          <PestLeftWrapper>
            <PestName>고추탄저병</PestName>
            <PestType>고추🌶</PestType>
          </PestLeftWrapper>
          <PestRightWrapper>
            <PestLocation>{userLocation}</PestLocation>
            <PestTime>2022년 11월 09일 18시 36분</PestTime>
          </PestRightWrapper>
        </PestTitle>
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
      >
      </ScrollViewContainer>
      <ScrollViewContainer display={isVisual}>
        <Text>시각자료</Text>
      </ScrollViewContainer>
      <SeparationLine isIOS={Platform.OS === 'ios'} />
      <AskButtonBox
        horizontal={true}
        showHorizontalScrollIndicator={false}
        isIOS={Platform.OS === 'ios'}
      >
        <AskButton>
          <AskButtonText>대처 방안</AskButtonText>
        </AskButton>
      </AskButtonBox>
    </Background>
  );
};

export default DetectPestResult;
