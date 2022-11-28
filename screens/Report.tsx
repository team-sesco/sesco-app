import React from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { BASE_URI } from '../api/api';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = styled.View`
  margin: 20px auto 15px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const HSeparator = styled.View`
  height: 2px;
  background-color: rgba(9, 9, 9, 0.05);
`;

const SelectContainer = styled.ScrollView`
  width: 90%;
  margin: 0 auto;
`;

const SelectType = styled.TouchableOpacity`
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const SelectText = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

const ArrowBox = styled.View`
  position: absolute;
  right: 5px;
`;

const Report = ({
  route: {
    params: { jwtToken, detection_oid, userName, currentUser },
  },
}) => {
  const navigation = useNavigation();
  const REPORT_TYPE = [
    {
      id: 1,
      name: '노출 및 음란물',
    },
    {
      id: 2,
      name: '스팸 및 허위 사진',
    },
    {
      id: 3,
      name: '혐오를 불러일으킴',
    },
    {
      id: 4,
      name: '폭력적',
    },
    {
      id: 5,
      name: '반복적인 유해한 행동',
    },
    {
      id: 6,
      name: '본인의 사진이 아님',
    },
  ];

  const submitReport = (reportContent) => {
    Alert.alert(
      `'${reportContent}'이 맞습니까?`,
      '허위나 악의적인 신고는\n불이익을 받을 수 있습니다',
      [
        {
          text: '취소',
          onPress: async () => {
            return;
          },
        },
        {
          text: '신고하기',
          onPress: async () => {
            await fetch(`${BASE_URI}/api/v1/report`, {
              method: 'POST',
              body: JSON.stringify({
                target_id: detection_oid,
                type: 'detection',
                content: `신고자는 ${currentUser} 이고, 신고 받은 사람은 ${userName} 이고, 신고 내용은 ${reportContent} 입니다.`,
              }),
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.msg === 'created') {
                  Alert.alert(
                    '정상적으로 신고가 접수되었습니다.',
                    '더 나은 서비스를 제공하도록 노력하겠습니다.'
                  );
                  goBack();
                }
              });
          },
        },
      ]
    );
  };

  const goBack = () => {
    //@ts-ignore
    navigation.pop();
  };

  return (
    <>
      <Header>
        <HeaderText>신고 사유</HeaderText>
      </Header>
      <HSeparator />
      <SelectContainer>
        {REPORT_TYPE.map(({ id, name }) => {
          return (
            <SelectType
              key={id}
              onPress={() => {
                submitReport(name);
              }}
            >
              <SelectText>{name}</SelectText>
              <ArrowBox>
                <AntDesign name="right" size={20} color="rgba(0,0,0,0.2)" />
              </ArrowBox>
            </SelectType>
          );
        })}
      </SelectContainer>
    </>
  );
};

export default Report;
