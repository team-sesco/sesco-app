import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import NormalButton from '../components/NormalButton';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import carrotGIF from '../assets/carrot.gif';
import { BASE_URI } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingBackground = styled.View<{ isLoading: boolean }>`
  position: absolute;
  z-index: 10;
  display: ${(props) => (props.isLoading ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;
const LoadingGIF = styled.Image`
  width: 120px;
  height: 120px;
`;

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7fbf9;
`;

const Container = styled.ScrollView`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 120px;
`;
const Title = styled.Text<{ statusBarHeight: number }>`
  font-size: 25px;
  font-weight: 600;
  margin-top: ${(props) => `${props.statusBarHeight + 10}px`};
`;

const PhotoUploadBtn = styled.TouchableOpacity<{
  width: number;
  isPhoto: boolean;
}>`
  margin: 20px auto;
  background-color: #fff;
  border: 1px solid ${(props) => `${props.isPhoto ? '#48a346' : '#e0e2ed'}`};
  width: ${(props) => `${props.width * 0.9}px`};
  max-width: 800px;
  height: ${(props) => `${props.width * 0.9}px`};
  max-height: 800px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
`;

const NormalBtnWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const BottomContainer = styled.View<{ isAllFilled: boolean }>`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border: 1px solid ${(props) => (props.isAllFilled ? '#3B966050' : '#eee')};
`;
const BottomNextButton = styled.TouchableOpacity<{ isAllFilled: boolean }>`
  width: 90%;
  height: 50px;
  margin: 20px auto;
  background-color: ${(props) => (props.isAllFilled ? '#3B9660' : '#D8DBE270')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const BottomNextText = styled.Text<{ isAllFilled: boolean }>`
  color: ${(props) => (props.isAllFilled ? '#FFF' : 'rgba(0, 0, 0, 0.1)')};
  font-size: 17px;
`;

const { width: PHONE_WIDTH } = Dimensions.get('window');
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const DetectPest = ({ route: { params } }) => {
  const [isPhoto, setIsPhoto] = useState(0);
  const [isLocation, setIsLocation] = useState(0);
  const [isCrop, setIsCrop] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [userLocation1And2, setUserLocation1And2] = useState('');
  const [userLocation3And4, setUserLocation3And4] = useState('');
  const [userCrop, setUserCrop] = useState(null);
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(true);
  const [jwtToken, setJwtToken] = useState('');
  /**
   * 카메라 부분
   */
  const [photoUri, setPhotoUri] = useState('');
  const [cameraStatus, cameraRequestPermission] = ImagePicker.useCameraPermissions();
  const [libraryStatus, libraryRequestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  AsyncStorage.getItem('jwtToken', (_, result) => {
    setJwtToken(result);
  });
  const actionCamera = () => {
    Alert.alert('병해충 사진 등록', '', [
      {
        text: '카메라로 촬영',
        onPress: async () => {
          await cameraRequestPermission().then(async () => {
            if (cameraStatus?.status === 'denied') {
              Alert.alert(
                '카메라 허용 오류',
                '설정에 들어가서 카메라 접근을 허용해주세요!'
              );
            } else {
              try {
                const result = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [4, 4],
                  quality: 1,
                });

                if (!result.cancelled) {
                  setIsReady(false);
                  const formData = new FormData();
                  formData.append('img', {
                    name: result.fileName?.toLowerCase()
                      ? result.fileName?.toLowerCase()
                      : 'new.png',
                    type: result.type,
                    uri:
                      Platform.OS === 'android'
                        ? result.uri
                        : result.uri.replace('file://', ''),
                  });

                  const response = await fetch(`${BASE_URI}/api/v1/detection/photo`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                      Authorization: `Bearer ${jwtToken}`,
                      'Content-Type': 'multipart/form-data',
                    },
                  }).then((res) => res.json());

                  if (response.msg === 'success') {
                    setPhotoUri(response.result);
                    setIsPhoto(1);
                  } else if (response.description.includes('extension')) {
                    Alert.alert(
                      '호환되지 않은 확장자입니다.',
                      '다른 사진으로 올려주세요.'
                    );
                  } else {
                    Alert.alert('업로드에 실패하였습니다.');
                  }
                  setIsReady(true);
                }
              } catch {
                Alert.alert('오류가 발생하였습니다.');
                setIsReady(true);
              }
            }
          });
        },
      },
      {
        text: '앨범에서 선택',
        onPress: async () => {
          await libraryRequestPermission().then(async () => {
            if (libraryStatus?.status === 'denied') {
              Alert.alert('사진 허용 오류', '설정에 들어가서 사진 접근을 허용해주세요!');
            } else {
              try {
                const result = await ImagePicker.launchImageLibraryAsync({
                  quality: 1,
                  aspect: [4, 4],
                  allowsEditing: true,
                });

                if (!result.cancelled) {
                  setIsReady(false);
                  const formData = new FormData();
                  formData.append('img', {
                    name: result.fileName?.toLowerCase()
                      ? result.fileName?.toLowerCase()
                      : 'new.png',
                    type: result.type,
                    uri:
                      Platform.OS === 'android'
                        ? result.uri
                        : result.uri.replace('file://', ''),
                  });

                  const response = await fetch(`${BASE_URI}/api/v1/detection/photo`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                      Authorization: `Bearer ${jwtToken}`,
                      'Content-Type': 'multipart/form-data',
                    },
                  }).then((res) => res.json());

                  if (response.msg === 'success') {
                    setPhotoUri(response.result);
                    setIsPhoto(1);
                  } else if (response.description.includes('extension')) {
                    Alert.alert(
                      '호환되지 않은 확장자입니다.',
                      '다른 사진으로 올려주세요.'
                    );
                  } else {
                    Alert.alert('업로드에 실패하였습니다.');
                  }
                  setTimeout(() => setIsReady(true), 1500);
                }
              } catch {
                Alert.alert('오류가 발생하였습니다.');
                setIsReady(true);
              }
            }
          });
        },
      },
    ]);
  };

  useEffect(() => {
    if (params) {
      if (params.detailLocation) {
        setUserLocation(params.detailLocation);
        setIsLocation(1);
        setUserLocation1And2(
          `${params.detailLocation.region_1depth_name} ${params.detailLocation.region_2depth_name}`
        );
        setUserLocation3And4(
          `${params.detailLocation.region_3depth_name} ${params.detailLocation.region_4depth_name}`
        );
      }
      if (params.userCrop) {
        setUserCrop(params.userCrop);
        setIsCrop(1);
      }
    }
  }, [params]);

  const goToCropCategory = () => {
    //@ts-ignore
    navigation.navigate('CropCategory');
  };
  const goToLocationCategory = () => {
    //@ts-ignore
    navigation.navigate('LocationCategory');
  };

  const submitPestInfo = async () => {
    setIsReady(false);
    const response = await fetch(`${BASE_URI}/api/v1/detection`, {
      method: 'POST',
      body: JSON.stringify({
        img: photoUri,
        category: userCrop.cropName,
        location: userLocation,
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (response.msg === 'success') {
      setIsPhoto(0);
      setIsLocation(0);
      setIsCrop(0);
      setUserLocation(null);
      setUserCrop(null);
      setPhotoUri('');

      navigation.navigate('DetectPestResult', {
        response,
      });
      setIsReady(true);
      return;
    }
    setIsReady(true);
    Alert.alert('잠시 후 다시 시도해주세요!');
  };

  return (
    <>
      <LoadingBackground isLoading={!isReady}>
        <LoadingGIF source={carrotGIF} />
      </LoadingBackground>
      <Background>
        <Container>
          <Title statusBarHeight={STATUSBAR_HEIGHT}>병해충 탐지</Title>
          <Progress.Bar
            style={{ marginTop: 15 }}
            progress={(isPhoto + isLocation + isCrop) / 3}
            color={'#3b9660'}
            borderColor={'#E0E2ED70'}
            unfilledColor={'#E0E2ED70'}
            width={null}
          />
          <PhotoUploadBtn width={PHONE_WIDTH} onPress={actionCamera} isPhoto={isPhoto}>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{
                  width: PHONE_WIDTH * 0.894,
                  height: PHONE_WIDTH * 0.894,
                  maxWidth: 800,
                  maxHeight: 800,
                  borderRadius: 15,
                }}
              />
            ) : (
              <FontAwesome5 name="camera-retro" size={140} color={'#555'} />
            )}
          </PhotoUploadBtn>
          <NormalBtnWrapper>
            <NormalButton
              onPress={goToLocationCategory}
              borderColor={userLocation ? '#48a346' : 'rgba(9,9,9,0.1)'}
              textName={
                userLocation ? `${userLocation1And2}\n${userLocation3And4}` : '위치 선택'
              }
              textColor={userLocation ? ' #48a346' : '#555'}
              fontSize={userLocation ? 17 : 16}
              icon={
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={userLocation ? '#48a346' : '#555'}
                />
              }
            />
            <NormalButton
              onPress={goToCropCategory}
              borderColor={userCrop ? '#48a346' : 'rgba(9,9,9,0.1)'}
              textName={userCrop ? userCrop.cropName : '작물 선택'}
              textColor={userCrop ? ' #48a346' : '#555'}
              fontSize={userCrop ? 20 : 16}
              icon={
                <Ionicons
                  name="flower-outline"
                  size={18}
                  color={userCrop ? '#48a346' : '#555'}
                />
              }
            />
          </NormalBtnWrapper>
        </Container>
        <BottomContainer isAllFilled={isPhoto && isLocation && isCrop}>
          <BottomNextButton
            isAllFilled={isPhoto && isLocation && isCrop}
            disabled={!isPhoto || !isLocation || !isCrop}
            onPress={submitPestInfo}
          >
            <BottomNextText isAllFilled={isPhoto && isLocation && isCrop}>
              다음
            </BottomNextText>
          </BottomNextButton>
        </BottomContainer>
      </Background>
    </>
  );
};

export default DetectPest;
