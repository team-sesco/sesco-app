import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URI } from '../api/api';
import carrotGIF from '../assets/carrot.gif';
import { Alert, Keyboard, TouchableOpacity } from 'react-native';

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

const BackButton = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const Container = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const TitleSeparator = styled.View`
  margin-top: 30px;
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

const SeparateView = styled.View`
  height: 10px;
  margin: 41px 0;
  background-color: #e9ecea;
`;

const InputTitle = styled.Text`
  margin-left: 5px;
  margin-bottom: 10px;
`;

const InputName = styled.TextInput<{ isValid: boolean; isAnyValue: boolean }>`
  border: 1px solid
    ${(props) =>
      props.isAnyValue
        ? props.isValid
          ? '#3b9660'
          : 'rgb(175, 38, 38)'
        : 'rgba(0,0,0,0.1)'};
  border-radius: 10px;
  padding: 15px;
`;

const InputNameDetail = styled.Text`
  margin-top: 5px;
  margin-left: 5px;
  color: rgb(175, 38, 38);
`;

const BottomView = styled.View`
  flex: 1;
  position: relative;
`;

const BottomContainer = styled.View<{ isFilled: boolean }>`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 80px;
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border: 1px solid ${(props) => (props.isFilled ? '#3B966050' : '#eee')};
`;
const BottomNextButton = styled.TouchableOpacity<{ isFilled: boolean }>`
  width: 90%;
  height: 50px;
  margin: 20px auto;
  background-color: ${(props) => (props.isFilled ? '#3B9660' : '#D8DBE270')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const BottomNextText = styled.Text<{ isFilled: boolean }>`
  color: ${(props) => (props.isFilled ? '#FFF' : 'rgba(0, 0, 0, 0.1)')};
  font-size: 17px;
`;

const ChangeName = () => {
  const navigation = useNavigation();
  const [jwtToken, setJwtToken] = useState('');
  const [userName, setUserName] = useState('NICKNAME');
  const [changeUserName, setChangeUserName] = useState('');
  const [nameDetail, setNameDetail] = useState('');
  const [userImg, setUserImg] = useState('null');
  const [isReady, setIsReady] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isAnyValue, setIsAnyValue] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('jwtToken', (_, result) => {
      setJwtToken(result);
      getUserInfo(result);
    });
  }, []);

  useEffect(() => {
    validateName();
    if (!changeUserName) {
      setIsAnyValue(false);
      setNameDetail('');
      return;
    }
    setIsAnyValue(true);
  }, [changeUserName]);

  const validateName = () => {
    if (changeUserName.length < 3 || changeUserName.length > 20) {
      setIsValid(false);
      setNameDetail('닉네임은 3~20자리만 가능합니다.');
      return;
    }

    if (changeUserName === userName) {
      setIsValid(false);
      setNameDetail('기존의 닉네임으로는 변경할 수 없습니다.');
      return;
    }
    setIsValid(true);
    setNameDetail('');
  };

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
    }
  };

  const goBack = () => {
    //@ts-ignore
    navigation.navigate('MyProfile');
  };

  const changeName = async () => {
    setIsReady(false);

    const changeResponse = await fetch(`${BASE_URI}/api/v1/users/me`, {
      method: 'PUT',
      body: JSON.stringify({
        name: changeUserName,
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (changeResponse.msg === 'created') {
      Alert.alert('닉네임이 변경되었습니다!');
      setIsReady(true);
      goBack();
      return;
    } else if (changeResponse.description.includes('중복')) {
      Alert.alert('이미 존재하는 닉네임입니다.');
      setIsReady(true);
      return;
    }
    Alert.alert('오류가 발생하였습니다.');
    setIsReady(true);
  };

  return (
    <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
      <>
        <LoadingBackground isLoading={!isReady}>
          <LoadingGIF source={carrotGIF} />
        </LoadingBackground>
        <HeadSeparator />
        <Background>
          <Container>
            <BackButton onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </BackButton>
            <MainTitle text="닉네임 변경" />
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
              </ProfileImageWrapper>
            </TopView>
          </Container>
          <SeparateView />
          <Container>
            <InputTitle>닉네임</InputTitle>
            <InputName
              placeholder="변경할 닉네임을 입력해주세요"
              placeholderTextColor={'rgba(0,0,0,0.5)'}
              value={changeUserName}
              onChangeText={setChangeUserName}
              isValid={isValid}
              isAnyValue={isAnyValue}
            />
            <InputNameDetail>{nameDetail}</InputNameDetail>
          </Container>
          <BottomView>
            <BottomContainer isFilled={isValid}>
              <BottomNextButton
                isFilled={isValid}
                disabled={!isValid}
                onPress={changeName}
              >
                <BottomNextText isFilled={isValid}>변경하기</BottomNextText>
              </BottomNextButton>
            </BottomContainer>
          </BottomView>
        </Background>
      </>
    </TouchableOpacity>
  );
};

export default ChangeName;
