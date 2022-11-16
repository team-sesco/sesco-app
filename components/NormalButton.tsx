import React, { ReactNode } from "react";
import styled from "styled-components/native";

const NormalBtn = styled.TouchableOpacity<{ borderColor: string }>`
  position: relative;
  width: 48%;
  height: 85px;
  padding: 5px;
  background-color: white;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.borderColor};
`;
const NormalBtnIcon = styled.View`
  position: absolute;
  left: 5px;
  top: 5px;
`;
const NormalBtnText = styled.Text<{ textColor: string; fontSize: number }>`
  position: absolute;
  color: ${(props) => props.textColor};
  font-weight: 600;
  font-size: ${(props) => props.fontSize}px;
`;

interface INormalButton {
  onPress: Function;
  icon: ReactNode;
  borderColor: string;
  textName: string;
  textColor: string;
  fontSize: number;
}

const NormalButton: React.FC<INormalButton> = ({
  onPress,
  icon,
  borderColor,
  textName,
  textColor,
  fontSize,
}) => {
  return (
    <NormalBtn onPress={onPress} borderColor={borderColor}>
      <NormalBtnIcon>{icon}</NormalBtnIcon>
      <NormalBtnText textColor={textColor} fontSize={fontSize}>
        {textName}
      </NormalBtnText>
    </NormalBtn>
  );
};

export default NormalButton;
