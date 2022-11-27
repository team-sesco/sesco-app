import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px 30px;
  align-items: center;
  border: 1px solid rgba(9, 9, 9, 0.1);
  border-radius: 30px;
  margin: 0 auto;
`;

const CropPest = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #3b9660;
  margin-bottom: 5px;
`;

const CropLocation = styled.Text`
  font-size: 11px;
  color: rgba(0, 0, 0, 0.8);
`;

const CropDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const CurrentDetectButton = ({ cropPest, cropLocation, cropDate }) => {
  return (
    <Container>
      <CropPest>{cropPest}</CropPest>
      <CropLocation>{cropLocation}</CropLocation>
      <CropDate>{cropDate}</CropDate>
    </Container>
  );
};

export default CurrentDetectButton;
