import React from 'react';
import styled from 'styled-components/native';
import tempIcon from '../assets/tempIcon.png';

const ChatContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
const ChatImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border: 1px solid #aaa;
  border-radius: 15px;
`;
const ChatWrapper = styled.View`
  max-width: 75%;
`;
const ChatNickName = styled.Text`
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
`;
const ChatWindow = styled.View`
  background-color: #fff;
  padding: 12px 10px;
  border: 1px solid rgba(9, 9, 9, 0.3);
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const ChatContent = styled.Text<{ isFontSize: Boolean }>`
  font-size: ${(props) => (props.isFontSize ? '20px' : '15px')};
`;

const ChatLeftBox = ({ content, isFontSize }) => {
  const CHAT_NICKNAME_BOT = 'SE. SCO 봇';
  return (
    <ChatContainer>
      <ChatImage source={tempIcon} />
      <ChatWrapper>
        <ChatNickName>{CHAT_NICKNAME_BOT}</ChatNickName>
        <ChatWindow>
          <ChatContent isFontSize={isFontSize}>{content}</ChatContent>
        </ChatWindow>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default ChatLeftBox;
