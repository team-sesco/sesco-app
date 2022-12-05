import React from 'react';
import LoginButton from '../../components/LoginButton';
import tempIcon from '../../assets/tempIcon.png';
import googleImg from '../../assets/google.png';
import kakaoImg from '../../assets/kakao-talk.png';
import naverImg from '../../assets/naver.png';
import {
  Container,
  LoginButtonContainer,
  LoginLogo,
  LoginTitle1,
  LoginTitle2,
  LoginTopContainer,
} from './LoginStyled';
import { useNavigation } from '@react-navigation/native';
import { Alert, Platform, StatusBar } from 'react-native';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URI } from '../../api/api';

const Login = () => {
  const navigation = useNavigation();
  const goToMain = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Drawer' }] });
  };

  const laterService = () => {
    Alert.alert('추후 지원 예정입니다.');
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const { accessToken }: KakaoOAuthToken = await login();
      const sendInfo = { access_token: accessToken, device_token: 'tempDeviceToken' };

      const {
        result: { access_token },
      } = await fetch(`${BASE_URI}/api/auth/oauth/kakao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendInfo),
      }).then((res) => res.json());
      AsyncStorage.setItem('jwtToken', access_token, () => {
        navigation.reset({ routes: [{ name: 'Drawer' }] });
      });
    } catch (err) {
      console.error('login err', err);
      Alert.alert('로그인이 실패하였습니다.');
    }
  };

  const openLink = async () => {
    await WebBrowser.openBrowserAsync(
      'https://brass-payment-372.notion.site/SE-SCO-50712a119a774442bc982b161948c6e2'
    );
  };

  return (
    <Container>
      <StatusBar barStyle={'dark-content'} />
      <LoginTopContainer>
        <LoginLogo source={tempIcon} />
        <LoginTitle1>안녕하세요</LoginTitle1>
        <LoginTitle2>손쉽게 병해충을 탐지할 수 있어요!</LoginTitle2>
      </LoginTopContainer>
      <LoginButtonContainer>
        <LoginButton
          onPress={() => openLink()}
          text="병해충 진단 미리보기"
          bgColor={'#FFF'}
          marginBottom={40}
          textColor={'#48a346'}
          isBorder={true}
          borderColor={'#48a346'}
          isExpoIcon={false}
          fontSize={17}
          fontWeight={600}
        ></LoginButton>
        <LoginButton
          onPress={laterService}
          name="Google"
          bgColor={'#FFF'}
          marginLeft={28}
          marginBottom={10}
          imgSource={googleImg}
          textColor={'#000'}
          isBorder={true}
          borderColor={'#000'}
          size={15}
          fontSize={15}
        ></LoginButton>
        {Platform.OS === 'ios' ? (
          <LoginButton
            onPress={laterService}
            name="Apple"
            bgColor={'#000'}
            marginLeft={28}
            marginBottom={10}
            isExpoIcon={true}
            textColor={'#FFF'}
            isBorder={false}
            fontSize={15}
          ></LoginButton>
        ) : null}
        <LoginButton
          onPress={() => signInWithKakao()}
          name="Kakao"
          bgColor={'#FEE500'}
          marginLeft={28}
          marginBottom={10}
          imgSource={kakaoImg}
          textColor={'#000'}
          isBorder={false}
          size={16}
          fontSize={15}
        ></LoginButton>
        <LoginButton
          onPress={laterService}
          name="Naver"
          bgColor={'#00B534'}
          marginLeft={28}
          imgSource={naverImg}
          textColor={'#FFF'}
          isBorder={false}
          size={13}
          fontSize={15}
        ></LoginButton>
      </LoginButtonContainer>
    </Container>
  );
};

export default Login;
