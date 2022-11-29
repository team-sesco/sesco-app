import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../screens/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalInfoPolicy from '../screens/PersonalInfoPolicy';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MyProfile from '../screens/MyProfile';
import { SafeAreaView } from 'react-navigation';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LogBox } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
const Container = styled.View`
  width: 100%;
  height: 88%;
  margin: 10px auto;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  margin-left: 10px;
  margin-bottom: 20px;
`;

const BlockContainer = styled.TouchableOpacity`
  margin: 15px auto;
  flex-direction: row;
  width: 90%;
  height: 50px;
  align-items: center;
`;

const BlockText = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  font-weight: 600;
`;

const BlockSeparator = styled.View`
  width: 100%;
  height: 10px;
  background-color: #e9ecea;
`;

const MainBannerBtn = styled.TouchableOpacity`
  width: 95%;
  height: 50px;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px solid rgba(9, 9, 9, 0.1);
`;
const MainBannerText = styled.Text`
  font-size: 13px;
  font-weight: 400;
`;
const MainBannerText2 = styled(MainBannerText)`
  font-weight: 600;
  color: #48a446;
  margin-left: 20px;
`;

const DrawerNavigator = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.removeItem('jwtToken');
    //@ts-ignore
    navigation.reset({ routes: [{ name: 'SameLogin' }] });
  };

  const openLink = async () => {
    await WebBrowser.openBrowserAsync(
      'https://brass-payment-372.notion.site/SE-SCO-50712a119a774442bc982b161948c6e2'
    );
  };

  return (
    <SafeAreaView>
      <Container>
        <Title>메뉴</Title>
        <BlockSeparator />
        <BlockContainer onPress={() => navigation.navigate('MyProfile')}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
          <BlockText>내 정보</BlockText>
          <AntDesign
            name="right"
            size={20}
            color="rgba(0,0,0,0.3)"
            style={{ position: 'absolute', right: 0 }}
          />
        </BlockContainer>
        <BlockSeparator />
        <BlockContainer onPress={() => navigation.navigate('PersonalInfoPolicy')}>
          <Ionicons name="document-text-outline" size={30} color="black" />
          <BlockText>개인정보처리방침</BlockText>
          <AntDesign
            name="right"
            size={20}
            color="rgba(0,0,0,0.3)"
            style={{ position: 'absolute', right: 0 }}
          />
        </BlockContainer>
        <BlockContainer
          onPress={async () => {
            await AsyncStorage.clear();
            //@ts-ignore
            navigation.reset({ routes: [{ name: 'SameLogin' }] });
          }}
        >
          <Ionicons name="ios-close-circle-outline" size={30} color="black" />
          <BlockText>로그아웃</BlockText>
        </BlockContainer>
      </Container>
      <MainBannerBtn onPress={() => openLink()}>
        <MainBannerText>SE. SCO를 처음 이용하시나요?</MainBannerText>
        <MainBannerText2>이용 방법</MainBannerText2>
        <Ionicons name="chevron-forward" color="#98A1BD" size={16} />
      </MainBannerBtn>
    </SafeAreaView>
  );
};

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      useLegacyImplementation={true}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#F7FBF9',
          width: '80%',
        },
        swipeEnabled: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNavigator.Screen
        name="Main"
        component={Main}
        options={{ drawerLabel: '홈' }}
      />
      <DrawerNavigator.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ drawerLabel: '내 정보' }}
      />
      <DrawerNavigator.Screen
        name="PersonalInfoPolicy"
        component={PersonalInfoPolicy}
        options={{ drawerLabel: '개인정보처리방침' }}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
