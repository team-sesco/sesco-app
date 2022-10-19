import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const LoginButtonWrapper = styled.TouchableOpacity<{
  bgColor: string;
  marginBottom: number;
  isBorder: boolean;
  borderColor: boolean;
}>`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 45px;
  margin: 0 auto;
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}px` : "0px"};
  background-color: ${(props) => props.bgColor};
  border: ${(props) =>
    props.isBorder ? `1px solid ${props.borderColor}` : "0px"};
  border-radius: 10px;
`;

const LoginButtonIcon = styled.Image<{ size: number }>`
  position: absolute;
  left: 20px;
  width: ${(props) => (props.size ? `${props.size}px` : "0px")};
  height: ${(props) => (props.size ? `${props.size}px` : "0px")};
`;

const LoginButtonText = styled.Text<{
  textColor: string;
  fontSize: number;
  fontWeight: number;
  marginLeft: number;
}>`
  color: ${(props) => props.textColor};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "14px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
  margin-left: ${(props) =>
    props.marginLeft ? `${props.marginLeft}px` : "0px"};
`;

interface LoginButtonProps {
  onPress?: Function;
  name?: string;
  text?: string;
  bgColor: string;
  marginLeft?: number;
  marginBottom?: number;
  textColor: string;
  isBorder: boolean;
  borderColor?: string;
  imgSource?: string;
  isExpoIcon?: boolean;
  size?: number;
  fontSize?: number;
  fontWeight?: number;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  name,
  text,
  bgColor,
  marginLeft,
  marginBottom,
  textColor,
  isBorder,
  borderColor,
  imgSource,
  isExpoIcon,
  size,
  fontSize,
  fontWeight,
}) => {
  return (
    <LoginButtonWrapper
      onPress={onPress}
      bgColor={bgColor}
      marginBottom={marginBottom}
      isBorder={isBorder}
      borderColor={borderColor}
    >
      {imgSource ? <LoginButtonIcon source={imgSource} size={size} /> : null}
      {isExpoIcon ? (
        <Ionicons
          name="logo-apple"
          color="#FFF"
          size={18}
          style={{ position: "absolute", left: 19 }}
        />
      ) : null}
      <LoginButtonText
        textColor={textColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        marginLeft={marginLeft}
      >
        {name ? `${name}로 로그인하기` : text}
      </LoginButtonText>
    </LoginButtonWrapper>
  );
};

export default LoginButton;
