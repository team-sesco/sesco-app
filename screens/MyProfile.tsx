import React from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7fbf9;
`;

const BackBotton = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const Container = styled.View<{ statusbarHeight: number }>`
  width: 90%;
  margin: 0 auto;
  /* margin-bottom: ${(props) => props.statusbarHeight + 30}px; */
`;

const TitleSeparator = styled.View`
  margin-top: 15px;
`;

const TopView = styled.View`
  margin: 0 auto;
`;

const ProfileImageWrapper = styled.View`
  margin: 0 auto;
`;
const ProfileImage = styled.Image`
  width: 70px;
  height: 70px;
`;
const ProfileImageChangeButton = styled.TouchableOpacity`
  position: absolute;
  right: -3px;
  bottom: -3px;
`;
const MyNickname = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

const SeparateView = styled.View`
  height: 10px;
  margin: 15px 0;
  background-color: #e9ecea;
`;

const ContentWrapperView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapperButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;
`;

const ContentSubject = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;
const ContentValue = styled.Text`
  color: rgba(0, 0, 0, 0.7);
`;

const MyProfile = () => {
  const navigation = useNavigation();
  const goBack = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Main' }] });
  };
  return (
    <>
      <HeadSeparator />
      <Background>
        <Container showsVerticalScrollIndicator={false}>
          <BackBotton onPress={goBack}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </BackBotton>
          <MainTitle text="내 정보" />
          <TitleSeparator />
          <TopView>
            <ProfileImageWrapper>
              <ProfileImage source={require('../assets/defaultMyImage.png')} />
              <ProfileImageChangeButton>
                <MaterialCommunityIcons name="plus-circle" size={24} color="green" />
              </ProfileImageChangeButton>
            </ProfileImageWrapper>
            <MyNickname>NICKNAME</MyNickname>
          </TopView>
        </Container>
        <SeparateView />
        <Container>
          <ContentWrapperView>
            <ContentSubject>계정 정보</ContentSubject>
            <ContentValue>KAKAO</ContentValue>
          </ContentWrapperView>
        </Container>
        <SeparateView />
        <Container>
          <ContentWrapperButton style={{ marginTop: -10 }}>
            <ContentSubject>닉네임 변경</ContentSubject>
            <Ionicons name="chevron-forward" color="rgba(0,0,0,0.7)" size={24} />
          </ContentWrapperButton>
          <ContentWrapperButton>
            <ContentSubject>회원탈퇴</ContentSubject>
            <Ionicons name="chevron-forward" color="rgba(0,0,0,0.7)" size={24} />
          </ContentWrapperButton>
        </Container>
      </Background>
    </>
  );
};

export default MyProfile;
