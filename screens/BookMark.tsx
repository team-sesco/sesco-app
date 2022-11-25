import React from 'react';
import styled from 'styled-components/native';
import BookMarkButton from '../components/BookMarkButton';
import carrot from '../assets/carrot.gif';
import HeadSeparator from '../components/HeadSeparator';
import MainTitle from '../components/MainTitle';

const Container = styled.View`
  width: 95%;
  height: 100%;
  margin: 0 auto;
`;

const Wrapper = styled.ScrollView``;

const BookMark = () => {
  return (
    <>
      <HeadSeparator />
      <Container>
        <MainTitle text="모든 북마크" />
        <Wrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default BookMark;
