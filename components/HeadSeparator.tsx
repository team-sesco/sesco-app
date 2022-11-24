import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #f7fbf9;
`;

const HeadSeparator = () => {
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return <Container height={STATUSBAR_HEIGHT}></Container>;
};

export default HeadSeparator;
