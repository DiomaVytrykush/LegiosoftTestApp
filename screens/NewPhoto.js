import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  Container,
  Content,
  Button,
  Text,
  Icon,
  ActionSheet,
  Root,
} from 'native-base';
import {addPhoto} from '../redux/actions/photo';
import Indicator from '../components/Indicator';

const NewPhoto = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.photoReducer.loading);

  //Pattern function for ImagePicker
  const patternPhotoFunc = (method) => {
    ImagePicker[method]({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      includeBase64: true,
      cropping: false,
    })
      .then((image) => {
        dispatch(addPhoto(image.path, new Date(Date.now())));
      })
      .then(() => navigation.navigate('Galery'));
  };

  const takePhotoFromCamera = () => patternPhotoFunc('openCamera');
  const choosePhotoFromLibrary = () => patternPhotoFunc('openPicker');

  const onClickAddImage = () => {
    const BUTTONS = ['Take a Photo', 'Choose Photo from Library', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a Photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            takePhotoFromCamera();
            break;
          case 1:
            choosePhotoFromLibrary();
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <Root>
      <Container>
        <Indicator loading={loading} />
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button iconLeft primary onPress={onClickAddImage}>
            <Icon name="home" />
            <Text>Upload a photo</Text>
          </Button>
        </Content>
      </Container>
    </Root>
  );
};

export default NewPhoto;
