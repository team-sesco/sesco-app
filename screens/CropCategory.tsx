import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TitleWrapper = styled.View`
  flex-direction: row;
  width: 90%;
  margin: 50px auto 20px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-left: 5px;
`;
const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  margin-bottom: 120px;
`;

const ChoiceButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 1px solid rgba(9, 9, 9, 0.05);
`;
const ChoiceText = styled.Text<{ isClick: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.isClick ? 'white' : 'black')};
  font-weight: ${(props) => (props.isClick ? '600' : '400')};
`;
const BottomContainer = styled.View<{ isAnyClick: boolean }>`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  border: 1px solid ${(props) => (props.isAnyClick ? '#3B966050' : '#eee')};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;
const BottomNextButton = styled.TouchableOpacity<{ isAnyClick: boolean }>`
  width: 90%;
  height: 50px;
  margin: 20px auto;
  background-color: ${(props) => (props.isAnyClick ? '#3B9660' : '#D8DBE290')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const BottomNextText = styled.Text<{ isAnyClick: boolean }>`
  color: #fff;
  font-size: 17px;
  font-weight: ${(props) => (props.isAnyClick ? '600' : '400')};
`;
const CropCategory = () => {
  const navigation = useNavigation();
  const [isAnyClick, setIsAnyClick] = useState(false);
  const [userCrop, SetUserCrop] = useState({});
  const cropDatasArray = [
    { id: 0, name: '고추', click: false },
    { id: 1, name: '무', click: false },
    { id: 2, name: '배추', click: false },
    { id: 3, name: '콩', click: false },
    { id: 4, name: '파', click: false },
    { id: 5, name: '알 수 없음', click: false },
  ];
  const [cropDatas, setCropDatas] = useState(cropDatasArray);
  return (
    <>
      <TitleWrapper>
        <Ionicons name="flower-outline" size={24} color="#48a346" />
        <Title>작물 카테고리</Title>
      </TitleWrapper>
      <ScrollViewContainer>
        {cropDatas.map((crop) => (
          <ChoiceButton
            key={crop.id}
            onPress={() => {
              let copiedCrops = [...cropDatas];
              // 눌렀던 버튼을 다시 눌렀다면
              if (cropDatas[crop.id].click) {
                copiedCrops[crop.id].click = false;
                setIsAnyClick(false);
                SetUserCrop({});
              } else {
                // 이미 눌러진 버튼 대신 다른 버튼을 눌렀거나 아무 것도 안 눌러져있다면
                copiedCrops.map((chose) => (chose.click = false));
                copiedCrops[crop.id].click = true;
                setIsAnyClick(true);
                SetUserCrop({ cropId: crop.id, cropName: crop.name });
              }
              setCropDatas(copiedCrops);
            }}
            style={
              crop.click ? { backgroundColor: '#3B9660' } : { backgroundColor: '#eef1f8' }
            }
          >
            <ChoiceText isClick={crop.click}>{crop.name}</ChoiceText>
          </ChoiceButton>
        ))}
      </ScrollViewContainer>
      <BottomContainer isAnyClick={isAnyClick}>
        <BottomNextButton
          isAnyClick={isAnyClick}
          disabled={!isAnyClick}
          onPress={() => navigation.navigate('DetectPest', { userCrop })}
        >
          <BottomNextText isAnyClick={isAnyClick}>확인</BottomNextText>
        </BottomNextButton>
      </BottomContainer>
    </>
  );
};

export default CropCategory;
