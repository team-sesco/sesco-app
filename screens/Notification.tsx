import React from 'react';
import styled from 'styled-components/native';
import HeadSeparator from '../components/HeadSeparator';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MainTitle from '../components/MainTitle';

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
  margin: 10px auto 0;
`;

const TitleSeparator = styled.View`
  margin-top: 30px;
`;

const ContentView = styled.ScrollView`
  margin-bottom: 160px;
`;

const ContentBox = styled.View`
  background-color: #fff;
  width: 98%;
  padding: 18px 18px 10px;
  margin: 0 auto 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
`;
const ContentNew = styled.View`
  height: 20px;
  margin-bottom: 10px;
`;
const ContentNewWrapper = styled.View`
  background-color: #f73e3e;
  border-radius: 7px;
  position: absolute;
  padding: 3px 4px;
`;
const ContentNewText = styled.Text<{ isNew: boolean }>`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: ${(props) => (props.isNew ? 'flex' : 'none')};
`;
const ContentText = styled.Text`
  font-size: 17px;
  line-height: 25px;
`;

const ContentDate = styled.Text`
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.3);
`;

const Notification = ({
  route: {
    params: {
      response: { result },
    },
  },
}) => {
  const navigation = useNavigation();

  function elapsedTime(date) {
    const start = new Date(date.replace(/\s/, 'T'));
    const end = Date.now();
    const diff = Number(end) - Number(start);
    const times = [
      { time: '분', milliSeconds: 1000 * 60 },
      { time: '시간', milliSeconds: 1000 * 60 * 60 },
      { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
      { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
      { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
    ].reverse();

    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      //   console.log(diff, value.time);
      if (betweenTime > 0) {
        return `${betweenTime}${value.time} 전`;
      }
    }

    return '방금 전';
  }

  const goBack = () => {
    //@ts-ignore
    navigation.pop();
  };
  return (
    <>
      <HeadSeparator />
      <Background>
        <Container>
          <BackButton onPress={goBack}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </BackButton>
          <MainTitle text="알림" />
          <TitleSeparator />
          <ContentView showsVerticalScrollIndicator={false}>
            {result.length !== 0 ? (
              result.map((data, index) => {
                return (
                  <ContentBox key={index}>
                    <ContentNew>
                      <ContentNewWrapper>
                        <ContentNewText
                          isNew={
                            !elapsedTime(data.created_at).includes('일') &&
                            !elapsedTime(data.created_at).includes('개월') &&
                            !elapsedTime(data.created_at).includes('년')
                          }
                        >
                          NEW
                        </ContentNewText>
                      </ContentNewWrapper>
                    </ContentNew>
                    <ContentText>{data.content}</ContentText>
                    <ContentDate>{elapsedTime(data.created_at)}</ContentDate>
                  </ContentBox>
                );
              })
            ) : (
              <ContentBox>
                <ContentNew>
                  <ContentNewWrapper>
                    <ContentNewText>NO NOTIFICATION</ContentNewText>
                  </ContentNewWrapper>
                </ContentNew>
                <ContentText style={{ fontSize: 20, marginBottom: 30 }}>
                  현재 존재하는 알림이 없습니다.
                </ContentText>
              </ContentBox>
            )}
          </ContentView>
        </Container>
      </Background>
    </>
  );
};

export default Notification;
