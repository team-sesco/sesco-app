import React from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 85px;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 15px;
  align-items: center;
  border: 1px solid rgba(9, 9, 9, 0.1);
`;
const CropImage = styled.Image`
  width: 60px;
  height: 60px;
  margin: 0 8%;
`;
const CropTextWrapper = styled.View`
  height: 80%;
  justify-content: space-evenly;
`;
const CropLocation = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;
const CropName = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
const CropPest = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #3b9660;
`;
const MyCropBox = styled.View`
  position: absolute;
  right: 10px;
  top: 5px;
  background-color: #3b966099;
  border-radius: 5px;
`;
const MyCropText = styled.Text`
  color: #fff;
  padding: 1px;
  font-weight: 600;
  font-size: 15px;
`;
const ArrowBox = styled.View`
  position: absolute;
  right: 20px;
`;

const BookMarkButton = ({
  onPress,
  cropImage,
  cropLocation,
  cropName,
  cropPest,
  isMyCrop = false,
}) => {
  return (
    <Container onPress={onPress}>
      <CropImage source={cropImage} />
      <CropTextWrapper>
        <CropLocation>{cropLocation}</CropLocation>
        <CropName>{cropName}</CropName>
        <CropPest>{cropPest}</CropPest>
      </CropTextWrapper>
      {isMyCrop ? (
        <MyCropBox>
          <MyCropText>내작물</MyCropText>
        </MyCropBox>
      ) : null}
      <ArrowBox>
        <AntDesign name="right" size={24} color="rgba(0,0,0,0.2)" />
      </ArrowBox>
    </Container>
  );
};

export default BookMarkButton;
