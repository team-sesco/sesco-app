import React from "react";
import LoginButton from "../../components/LoginButton";
import tempIcon from "../../assets/tempIcon.png";
import googleImg from "../../assets/google.png";
import kakaoImg from "../../assets/kakao-talk.png";
import naverImg from "../../assets/naver.png";
import {
  Container,
  LoginButtonContainer,
  LoginLogo,
  LoginTitle1,
  LoginTitle2,
  LoginTopContainer,
} from "./LoginStyled";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  const goToMain = () => {
    //@ts-ignore
    navigation.navigate("Main");
  };
  return (
    <Container>
      <StatusBar barStyle={"dark-content"} />
      <LoginTopContainer>
        <LoginLogo source={tempIcon} />
        <LoginTitle1>안녕하세요</LoginTitle1>
        <LoginTitle2>손쉽게 병해충을 탐지할 수 있어요!</LoginTitle2>
      </LoginTopContainer>
      <LoginButtonContainer>
        <LoginButton
          onPress={goToMain}
          text="병해충 진단 미리보기"
          bgColor={"#FFF"}
          marginBottom={40}
          textColor={"#48a346"}
          isBorder={true}
          borderColor={"#48a346"}
          isExpoIcon={false}
          fontSize={17}
          fontWeight={600}
        ></LoginButton>
        <LoginButton
          name="Google"
          bgColor={"#FFF"}
          marginLeft={35}
          marginBottom={10}
          imgSource={googleImg}
          textColor={"#000"}
          isBorder={true}
          borderColor={"#000"}
          size={15}
          fontSize={15}
        ></LoginButton>
        <LoginButton
          name="Apple"
          bgColor={"#000"}
          marginLeft={35}
          marginBottom={10}
          isExpoIcon={true}
          textColor={"#FFF"}
          isBorder={false}
          fontSize={15}
        ></LoginButton>
        <LoginButton
          name="Kakao"
          bgColor={"#FEE500"}
          marginLeft={35}
          marginBottom={10}
          imgSource={kakaoImg}
          textColor={"#000"}
          isBorder={false}
          size={16}
          fontSize={15}
        ></LoginButton>
        <LoginButton
          name="Naver"
          bgColor={"#00B534"}
          marginLeft={35}
          imgSource={naverImg}
          textColor={"#FFF"}
          isBorder={false}
          size={13}
          fontSize={15}
        ></LoginButton>
      </LoginButtonContainer>
    </Container>
  );
};

export default Login;
