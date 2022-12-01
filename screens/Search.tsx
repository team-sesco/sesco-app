import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import carrotGIF from '../assets/carrot.gif';
import gochuImg from '../assets/gochu.png';
import muImg from '../assets/mu.png';
import baechuImg from '../assets/baechu.png';
import kongImg from '../assets/kong.png';
import paImg from '../assets/pa.png';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Alert, Keyboard, TouchableOpacity } from 'react-native';
import { BASE_URI } from '../api/api';
import BookMarkButton from '../components/BookMarkButton';

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

const ListView = styled.FlatList``;

const Search = ({
  route: {
    params: { jwtToken, userName },
  },
}) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isAnyClick, setIsAnyClick] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [hasResult, setHasResult] = useState(true);

  const goBack = () => {
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'Drawer' }] });
  };

  const goToDetectResult = async (detectionId) => {
    setIsReady(false);
    const response = await fetch(`${BASE_URI}/api/v1/detection/${detectionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      navigation.navigate('AlreadyDetectPestResult', {
        response,
        userName,
      });

      setIsReady(true);
      return;
    }
    setIsReady(true);
    Alert.alert('잠시 후 다시 시도해주세요!');
  };

  const submitSearchValue = async () => {
    setIsReady(false);
    const response = await fetch(`${BASE_URI}/api/v1/search`, {
      method: 'POST',
      body: JSON.stringify({
        search_str: searchValue,
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      setSearchResult(response.result);
      setIsAnyClick(true);

      if (response.result.length === 0) {
        setHasResult(false);
      } else {
        setHasResult(true);
      }
    }

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
          <TopContainer>
            <BackBotton onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={35} color="black" />
            </BackBotton>
            <SearchText
              maxlength={20}
              placeholder="작물명, 병해충명, 지역명"
              placeholderTextColor="rgba(0,0,0,0.2)"
              value={searchValue}
              onChangeText={setSearchValue}
              onSubmitEditing={submitSearchValue}
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
                setHasResult(true);
                setSearchValue('');
              }}
            />
          </TopContainer>

          <Container>
            <NoAnyValueView isAnyClick={isAnyClick}>
              <AntDesign name="search1" color="rgba(9,9,9,0.4)" size={50} />
              <NoAnyValueText>사용자들의 병해충 정보를 검색해보세요</NoAnyValueText>
            </NoAnyValueView>
            <NoAnyResultView isAnyResult={hasResult}>
              <Ionicons
                name="ios-close-circle-outline"
                size={50}
                color="rgba(9,9,9,0.4)"
              />
              <NoAnyResultText>검색 결과가 없습니다</NoAnyResultText>
            </NoAnyResultView>
            {searchResult.length !== 0 ? (
              <ListView
                data={searchResult}
                renderItem={({ item }) => (
                  <BookMarkButton
                    onPress={() => {
                      goToDetectResult(item._id);
                    }}
                    cropImage={
                      item.category === '고추'
                        ? gochuImg
                        : item.category === '무'
                        ? muImg
                        : item.category === '배추'
                        ? baechuImg
                        : item.category === '콩'
                        ? kongImg
                        : item.category === '파'
                        ? paImg
                        : carrotGIF
                    }
                    cropLocation={item.location.address_name}
                    cropName={item.category}
                    cropPest={
                      item.model_result.name.includes('정상')
                        ? '정상'
                        : item.model_result.name
                    }
                    isMyCrop={item.user_name === userName}
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : null}
          </Container>
        </Background>
      </>
    </TouchableOpacity>
  );
};

export default Search;
