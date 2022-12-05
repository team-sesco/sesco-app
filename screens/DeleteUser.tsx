import React, { useState } from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URI } from '../api/api';
import carrotGIF from '../assets/carrot.gif';
import { Alert } from 'react-native';

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

const Container = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const TitleSeparator = styled.View`
  margin-top: 30px;
`;

const ContentView = styled.View`
  width: 100%;
  text-align: center;
`;

const Content = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const AccentContent = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const UserNameContent = styled.Text`
  color: #3b9660;
  font-size: 18px;
  font-weight: 700;
`;

const HSeparator = styled.View`
  margin-top: 10px;
`;

const BottomContent = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
`;

const BottomView = styled.View`
  flex: 1;
  position: relative;
`;

const BottomContainer = styled.View`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 40px;
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border: 1px solid rgba(175, 38, 38, 0.5);
`;
const BottomNextButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  margin: 20px auto;
  background-color: rgb(175, 38, 38);
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const BottomNextText = styled.Text`
  color: #fff;
  font-size: 17px;
`;

const DeleteUser = ({
  route: {
    params: { jwtToken, createDate, userName },
  },
}) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);

  const getDateDiff = (createDate, currentDate) => {
    const date1 = new Date(createDate);
    const date2 = new Date(currentDate);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  const goBack = () => {
    //@ts-ignore
    navigation.navigate('MyProfile');
  };

  const goLogin = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'SameLogin' }] });
  };

  const deleteAndGoLogin = async () => {
    Alert.alert('회원 탈퇴', '정말 탈퇴하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {
          return;
        },
      },
      {
        text: '확인',
        onPress: async () => {
          setIsReady(false);
          await fetch(`${BASE_URI}/api/v1/users/me`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }).then(() => {
            setIsReady(true);
            Alert.alert('탈퇴 처리가 성공적으로 완료되었습니다.', '', [
              {
                text: '확인',
                onPress: async () => {
                  await AsyncStorage.clear();
                  goLogin();
                },
              },
            ]);
          });
        },
      },
    ]);
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
          <MainTitle text="탈퇴하기" />
          <TitleSeparator />
          <ContentView>
            <Content>
              저희와{' '}
              <AccentContent>
                함께한지 {getDateDiff(createDate, new Date().toISOString().slice(0, 10))}
                일 째인{' '}
              </AccentContent>{' '}
            </Content>
            <Content>
              <UserNameContent>{userName}</UserNameContent> 님
            </Content>
            <Content>아래 내용을 반드시 확인해주세요!</Content>
          </ContentView>
          <HSeparator />
          <BottomContent>ㆍ계정이 삭제된 후에는 계정을 복구할 수 없습니다.</BottomContent>
          <BottomContent>
            ㆍ계정이 삭제된 후에는 모든 데이터는 복구할 수 없습니다.
          </BottomContent>
        </Container>
        <BottomView>
          <BottomContainer>
            <BottomNextButton onPress={deleteAndGoLogin}>
              <BottomNextText>탈퇴하기</BottomNextText>
            </BottomNextButton>
          </BottomContainer>
        </BottomView>
      </Background>
    </>
  );
};

export default DeleteUser;
