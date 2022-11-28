import React, { useState } from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import carrotGIF from '../assets/carrot.gif';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Keyboard, TouchableOpacity } from 'react-native';

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

const Container = styled.View`
  width: 95%;
  margin: 10px auto 120px;
  flex: 1;
`;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SearchText = styled.TextInput`
  flex: 1;
  height: 40px;
  margin-right: 10px;
  font-size: 18px;
  padding: 5px 15px;
  padding-right: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  background-color: #e9ecea80;
`;

const BackBotton = styled.TouchableOpacity``;

const NoAnyValueView = styled.View<{ isAnyClick: boolean }>`
  display: ${(props) => (props.isAnyClick ? 'none' : 'flex')};
  flex: 1;
  margin: 200px auto;
  align-items: center;
`;
const NoAnyValueText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(9, 9, 9, 0.4);
`;

const NoAnyResultView = styled.View<{ isAnyResult: boolean }>`
  display: ${(props) => (props.isAnyResult ? 'none' : 'flex')};
  flex: 1;
  margin: 200px auto;
  align-items: center;
`;
const NoAnyResultText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(9, 9, 9, 0.4);
`;

const Search = (route: { params: { jwtToken } }) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isAnyClick, setIsAnyClick] = useState(false);

  const goBack = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Drawer' }] });
  };
  return (
    <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
      <>
        <LoadingBackground isLoading={!isReady}>
          <LoadingGIF source={carrotGIF} />
        </LoadingBackground>
        <HeadSeparator />
        <Background>
          <TopContainer>
            <BackBotton onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={35} color="black" />
            </BackBotton>
            <SearchText
              maxlength={20}
              placeholder="작물명, 병해충명, 지역(동)명"
              value={searchValue}
              onChangeText={setSearchValue}
            />
            <Ionicons
              name="ios-close-circle-sharp"
              size={20}
              color="black"
              style={{
                position: 'absolute',
                right: 20,
                display: searchValue ? 'flex' : 'none',
              }}
              onPress={() => {
                setSearchValue('');
              }}
            />
          </TopContainer>

          <Container>
            <NoAnyValueView isAnyClick={isAnyClick}>
              <AntDesign name="search1" color="rgba(9,9,9,0.4)" size={50} />
              <NoAnyValueText>사용자들의 병해충 정보를 검색해보세요</NoAnyValueText>
            </NoAnyValueView>
          </Container>
        </Background>
      </>
    </TouchableOpacity>
  );
};

export default Search;
