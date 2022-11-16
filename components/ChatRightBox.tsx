import React from 'react';
import styled from 'styled-components/native';

const ChatContainer = styled.View`
  margin-top: 10px;
  align-items: flex-end;
`;
const ChatWrapper = styled.View`
  max-width: 75%;
  align-items: flex-end;
`;
const ChatNickName = styled.Text`
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
`;
const ChatWindow = styled.View`
  background-color: #48a34690;
  padding: 12px 10px;
  border: 1px solid rgba(9, 9, 9, 0.3);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const ChatContent = styled.Text<{ isFontSize: Boolean }>`
  font-size: ${(props) => (props.isFontSize ? '20px' : '15px')};
`;

const ChatRightBox = ({ content, isFontSize }) => {
  const CHAT_NICKNAME = '나';
  return (
    <ChatContainer>
      <ChatWrapper>
        <ChatNickName>{CHAT_NICKNAME}</ChatNickName>
        <ChatWindow>
          <ChatContent isFontSize={isFontSize}>{content}</ChatContent>
        </ChatWindow>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default ChatRightBox;
