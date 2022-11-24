import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7fbf9;
`;

const BackBotton = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const Container = styled.ScrollView<{ statusbarHeight: number }>`
  width: 90%;
  margin: 0 auto;
  margin-bottom: ${(props) => props.statusbarHeight + 30}px;
`;

const TitleSeparator = styled.View`
  margin-top: 15px;
`;

const MiddleTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const Text = styled.Text``;

const PersonalInfoPolicy = () => {
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
  const navigation = useNavigation();
  const goBack = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Main' }] });
  };
  return (
    <>
      <HeadSeparator />
      <Background>
        <Container
          statusbarHeight={STATUSBAR_HEIGHT}
          showsVerticalScrollIndicator={false}
        >
          <BackBotton onPress={goBack}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </BackBotton>
          <MainTitle text={'개인정보처리방침'}></MainTitle>
          <TitleSeparator />
          <Text>
            SE. SCO (이하 “회사”)는 개인정보보호법 제30조에 따라 이용자의 개인정보를
            보호하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.{'\n'}
            {'\n'}
            <MiddleTitle>[제1조. 개인정보 수집 항목 및 수집 방법]</MiddleTitle>
            {'\n'}1. 회사는 회원 가입, 서비스 이용, 서비스 부정 사용 방지 등을 위해 아래와
            같은 개인정보를 수집하고 있습니다. {'\n'}
            {'\t'}1) 회원 가입 시 {'\n'}
            {'\t'}
            {'\t'}▪️제 3의 SNS 서비스 정보 {'\n'}
            {'\t'}
            {'\t'}
            {'\t'}▫️SNS 계정 ID {'\n'}
            {'\t'}2) 서비스 이용 시 {'\n'}
            {'\t'}
            {'\t'}▪️IP 주소 {'\n'}
            2. 서비스 이용 과정이나 서비스 처리 과정에서 서비스 이용 기록, 쿠키, IP 주소,
            서비스 부정 이용 기록이 생성되어 수집될 수 있습니다. {'\n'}3. 회사는 서비스
            홈페이지를 통하여 개인정보를 수집하고 있습니다.{'\n'}
            {'\n'}
            <MiddleTitle>[제2조. 개인정보의 수집 및 이용 목적]</MiddleTitle>
            {'\n'}1. 회사는 회원 관리를 목적을 위하여 개인정보를 수집하여 활용합니다.{' '}
            {'\n'}
            {'\t'}1) 개인 식별 {'\n'}
            {'\t'}2) 회원 가입 의사 확인 {'\n'}
            {'\t'}3) 서비스 부정 이용 방지
            {'\n'}
            {'\n'}
            <MiddleTitle>[제3조. 개인정보의 보유 및 이용 기간]</MiddleTitle>
            {'\n'}1. 회사는 개인정보 수집 및 이용 목적이 달성된 후에는 수집한 개인정보를
            지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래와 같은 이유로 서비스
            이용 계약 해지일로부터 5년간 보존합니다. {'\n'}
            {'\t'}1) 회사 내부 방침에 의한 정보 보존 사유 {'\n'}
            {'\t'}
            {'\t'}▪️서비스 부정 이용의 재발 방지 {'\n'}
            {'\t'}
            {'\t'}▪️수사 기관의 요청에 따른 협조 {'\n'}2. 관련 법령에 의한 정보 보존 사유{' '}
            {'\n'}
            {'\t'}1) 로그 기록 {'\n'}
            {'\t'}
            {'\t'}▪️보존 이유: 통신비밀보호법 {'\n'}
            {'\t'}
            {'\t'}▪️보존 기간: 3개월 {'\n'}
            {'\n'}
            <MiddleTitle>[제4조. 개인정보의 파기 절차 및 방법]</MiddleTitle>
            {'\n'}1. 회사는 개인정보 수집 및 이용 목적이 달성된 후에는 수집한 개인정보를
            지체 없이 파기합니다. 파기 절차 및 방법은 아래와 같습니다. {'\n'}
            {'\t'}1) 개인정보 수집 및 이용 목적이 달성된 후 별도의 데이터베이스로 옮겨져
            내부 방침 및 기타 관련 법령에 의한 정보 보호 사유에 따라 일정 기간 저장된 후
            파기 되어집니다. {'\n'}
            {'\t'}2) 재생할 수 없는 기술적 방법을 사용하여 파기합니다.{'\n'}
            {'\n'}
            <MiddleTitle>
              [제5조. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항]
            </MiddleTitle>
            {'\n'}
            1. 회사는 이용자의 정보를 수시로 저장하고 찾아내는 쿠키(cookie) 등을
            운용합니다. 쿠키란 웹 서비스를 운영하는데 이용되는 웹 브라우저에 전송하여
            이용자의 접속 기기에 저장하는 아주 작은 텍스트 파일입니다. 회사는 아래와 같은
            목적을 위해 쿠키를 사용합니다. {'\n'}
            {'\t'}1) 이용자의 접속 기기의 보안 관리{'\n'}
            {'\t'}2) 이용자의 개인 식별 {'\n'}2. 이용자는 쿠키 설정에 대한 선택권을 가지고
            있습니다. 따라서, 이용자는 모든 쿠키 설정을 허용하거나, 쿠키 설정이 발생될
            경우 이용자의 확인을 거치거나, 모든 쿠키 설정을 거부할 수 있습니다. {'\n'}3.
            이용자의 접속 기기에 설치된 웹 브라우저의 옵션을 설정하여 쿠키 설정을 거부할
            수 있습니다. {'\n'}4. 단, 이용자가 쿠키 설정을 거부하였을 경우 서비스 제공에
            어려움이 있을 수 있습니다.
            {'\n'}
            {'\n'}
            <MiddleTitle>[제6조. 개인정보보호 책임자]</MiddleTitle>
            {'\n'}1. 회사는 이용자의 개인정보에 관련한 불만을 처리하기 위하여 아래와 같이
            개인정보보호 책임자를 지정하고 있습니다. 서비스 이용 중 개인정보의 유출 가능성
            등의 불편 사항이 있으시다면 아래의 이메일로 신고해주시기 바랍니다. {'\n'}
            {'\t'}1) 개인정보보호 책임자 {'\n'}
            {'\t'}
            {'\t'}▪️상호: Team. SE. SCO {'\n'}
            {'\t'}
            {'\t'}▪️이메일: help@sesco.com {'\n'}
            {'\n'}
            <MiddleTitle>[제7조. 개인정보처리방침 변경]</MiddleTitle>
            {'\n'}1. 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경
            내용의 추가, 삭제 및 정정이 있는 경우에는 변경 내용의 시행 7일 전부터 서비스
            홈페이지를 통하여 고지할 것입니다. {'\n'}
            {'\n'}
            <MiddleTitle>[제8조. 개인정보처리방침 시행]</MiddleTitle>
            {'\n'}1. 본 방침은 2023년 1월 1일부터 적용됩니다.
          </Text>
        </Container>
      </Background>
    </>
  );
};

export default PersonalInfoPolicy;
