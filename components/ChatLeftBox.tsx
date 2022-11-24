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
  border: 1px solid rgba(9, 9, 9, 0.1);
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const ChatContent = styled.Text<{ isFontSize: Boolean; isPoint: String }>`
  font-size: ${(props) => (props.isFontSize ? '20px' : props.isPoint ? '16px' : '15px')};
  color: ${(props) => (props.isPoint ? '#3B9660' : '#000')};
  font-weight: ${(props) => (props.isPoint ? '600' : '400')};
`;

const ChatLeftBox = ({ content, isFontSize, point }) => {
  const CHAT_NICKNAME_BOT = 'SE. SCO 봇';
  const position1 = content.indexOf('에서는');
  const position2 = content.indexOf('탐지');
  return (
    <ChatContainer>
      <ChatImage source={tempIcon} />
      <ChatWrapper>
        <ChatNickName>{CHAT_NICKNAME_BOT}</ChatNickName>
        <ChatWindow>
          {point ? (
            <ChatContent isFontSize={isFontSize}>
              {content.slice(0, position1 + 4)}
              <ChatContent isFontSize={isFontSize} isPoint={true}>
                {point}
              </ChatContent>
              {content.slice(position2 - 2)}
            </ChatContent>
          ) : (
            <ChatContent isFontSize={isFontSize}>{content}</ChatContent>
          )}
        </ChatWindow>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default ChatLeftBox;
