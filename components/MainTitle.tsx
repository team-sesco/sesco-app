import React from 'react';
import styled from 'styled-components/native';

const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
`;

const MainTitle = ({ text }) => {
  return <Title>{text}</Title>;
};

export default MainTitle;
