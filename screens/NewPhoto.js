import React from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Thumbnail,
  View,
  ActionSheet,
  Root,
} from 'native-base';
import Indicator from '../components/Indicator';
import {useDispatch, useSelector} from 'react-redux';
import {addPhoto, getPhoto} from '../redux/actions/photo';
import ImagePicker from 'react-native-image-crop-picker';

const NewPhoto = () => {
  const [photos, setphotos] = React.useState([]);

  const storephotos = useSelector((state) => state.photoReducer.photoList);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPhoto());
  }, []);

  const onSelectImage = (image) => {
    const source = {uri: image.path};
    let item = {
      avatar: source,
      createdAt: Date.now(),
      content: image.data,
    };
    setphotos([...photos, item]);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: false,
    }).then((image) => {
      onSelectImage(image);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: false,
    }).then((image) => {
      onSelectImage(image);
    });
  };

  const onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
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

  console.log(photos, storephotos);

  const onClickPushmage = (avatar, createdAt) => {
    dispatch(addPhoto(avatar, createdAt));
  };

  return (
    <Root>
      <Container>
        {/* <Indicator loading={loading} /> */}
        <Content
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <Button onPress={onClickAddImage}>
            <Text>Press add image</Text>
          </Button>

          {photos.map((i) => (
            <TouchableOpacity
              onPress={() => onClickPushmage(i.avatar.uri, i.createdAt)}>
              <Image
                source={{uri: i.avatar.uri}}
                style={{
                  width: 300,
                  height: 300,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ))}
        </Content>
      </Container>
    </Root>
  );
};

export default NewPhoto;
