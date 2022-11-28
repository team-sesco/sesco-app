import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URI } from '../api/api';
import carrotGIF from '../assets/carrot.gif';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

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

const BackBotton = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const Container = styled.View<{ statusbarHeight: number }>`
  width: 90%;
  margin: 0 auto;
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
  width: 150px;
  height: 150px;
  border-radius: 50px;
`;
const ProfileImageChangeButton = styled.TouchableOpacity`
  position: absolute;
  right: -5px;
  bottom: -5px;
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
  const [jwtToken, setJwtToken] = useState('');
  const [userName, setUserName] = useState('NICKNAME');
  const [userImg, setUserImg] = useState('null');
  const [createDate, setCreateDate] = useState('');
  const [isReady, setIsReady] = useState(true);
  const isFocused = useIsFocused();
  const [libraryStatus, libraryRequestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    AsyncStorage.getItem('jwtToken', (_, result) => {
      setJwtToken(result);
      getUserInfo(result);
    });
  }, [isFocused]);

  useEffect(() => {
    if (jwtToken) {
      getUserInfo(jwtToken);
    }
  }, [userImg]);

  const getUserInfo = async (jwtToken) => {
    const response = await fetch(`${BASE_URI}/api/v1/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      setUserName(response.result.name);
      setUserImg(response.result.img);
      setCreateDate(response.result.created_at.slice(0, 10));
    }
  };

  const goToChangeName = () => {
    //@ts-ignore
    navigation.navigate('ChangeName');
  };

  const goToDeleteUser = () => {
    //@ts-ignore
    navigation.navigate('DeleteUser', { jwtToken, createDate, userName });
  };

  const goBack = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Main' }] });
  };

  const changeImage = async () => {
    await libraryRequestPermission().then(async () => {
      if (libraryStatus?.status === 'denied') {
        Alert.alert('사진 허용 오류', '설정에 들어가서 사진 접근을 허용해주세요!');
      } else {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true,
          });

          if (!result.cancelled) {
            setIsReady(false);
            const formData = new FormData();
            formData.append('photo', {
              name: result.fileName?.toLowerCase()
                ? result.fileName?.toLowerCase()
                : 'new.png',
              type: result.type,
              uri:
                Platform.OS === 'android'
                  ? result.uri
                  : result.uri.replace('file://', ''),
            });

            const response = await fetch(`${BASE_URI}/api/v1/users/me/photo`, {
              method: 'POST',
              body: formData,
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }).then((res) => res.json());

            if (response.msg === 'success') {
              setUserImg(response.result);
              const changeResponse = await fetch(`${BASE_URI}/api/v1/users/me`, {
                method: 'PUT',
                body: JSON.stringify({
                  img: response.result,
                  name: userName,
                }),
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  'Content-Type': 'application/json',
                },
              }).then((res) => res.json());

              if (changeResponse.msg === 'created') {
                setUserImg(
                  'https://sesco-s3.s3.ap-northeast-2.amazonaws.com/profile/white_background.png'
                );
                Alert.alert('사진이 변경되었습니다!');
              }
            } else if (response.description.includes('extension')) {
              Alert.alert('호환되지 않은 확장자입니다.', '다른 사진으로 올려주세요.');
            } else {
              Alert.alert('업로드에 실패하였습니다.');
            }
            setIsReady(true);
          }
        } catch {
          Alert.alert('오류가 발생하였습니다.');
          setIsReady(true);
        }
      }
    });
  };
  return (
    <>
      <LoadingBackground isLoading={!isReady}>
        <LoadingGIF source={carrotGIF} />
      </LoadingBackground>
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
              <ProfileImage
                source={
                  userImg === null || userImg === 'null'
                    ? require('../assets/defaultMyImage.png')
                    : { uri: userImg }
                }
              />
              <ProfileImageChangeButton onPress={() => changeImage()}>
                <MaterialCommunityIcons name="plus-circle" size={30} color="green" />
              </ProfileImageChangeButton>
            </ProfileImageWrapper>
            <MyNickname>{userName}</MyNickname>
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
          <ContentWrapperButton style={{ marginTop: -10 }} onPress={goToChangeName}>
            <ContentSubject>닉네임 변경</ContentSubject>
            <Ionicons name="chevron-forward" color="rgba(0,0,0,0.7)" size={24} />
          </ContentWrapperButton>
          <ContentWrapperButton onPress={goToDeleteUser}>
            <ContentSubject>회원탈퇴</ContentSubject>
            <Ionicons name="chevron-forward" color="rgba(0,0,0,0.7)" size={24} />
          </ContentWrapperButton>
        </Container>
      </Background>
    </>
  );
};

export default MyProfile;
