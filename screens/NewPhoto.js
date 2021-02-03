import React from 'react';
import {PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Container, Content, Button, Text, Thumbnail} from 'native-base';
import Indicator from '../components/Indicator';
import {useDispatch, useSelector} from 'react-redux';
import {addPhoto, getPhoto} from '../redux/actions/photo';

// async function hasAndroidPermission() {
//   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

//   const hasPermission = await PermissionsAndroid.check(permission);
//   if (hasPermission) {
//     return true;
//   }

//   const status = await PermissionsAndroid.request(permission);
//   return status === 'granted';
// }

// async function savePicture() {
//   if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
//     return;
//   }
//   CameraRoll.save(tag, {type, album});
// }

const NewPhoto = () => {
  const [photos, setphotos] = React.useState([]);
  const Aphotos = useSelector((state) => state.photoReducer.photoList);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPhoto());
  }, []);

  const showPhotos = () => {
    CameraRoll.getPhotos({
      first: 3,
      assetType: 'Photos',
      include: ['filename', 'imageSize'],
    })
      .then((r) => {
        setphotos(r.edges);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPhotoFunc = (avatar, createdAt) => {
    dispatch(addPhoto(avatar, createdAt));
  };

  console.log(Aphotos);
  return (
    <Container>
      {/* <Indicator loading={loading} /> */}
      <Content
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <Button onPress={showPhotos}>
          <Text>Show photos</Text>
        </Button>

        {photos.map((p, i) => {
          return (
            <Content key={i}>
              <Text>{p.node.timestamp}</Text>
              <TouchableOpacity
                onPress={() =>
                  addPhotoFunc(p.node.image.uri, p.node.timestamp)
                }>
                <Thumbnail
                  key={i}
                  square
                  large
                  style={{width: 300, height: 300, margin: 20}}
                  source={{uri: p.node.image.uri}}
                />
              </TouchableOpacity>
            </Content>
          );
        })}
        <Text>AAAAAAAAAAA</Text>

        {Aphotos.map((i) => (
          <>
            <Thumbnail
              style={{width: 300, height: 300, margin: 20}}
              square
              large
              source={{
                uri: i.avatar,
              }}
            />
            <Text>{i.createdAt}</Text>
          </>
        ))}
      </Content>
    </Container>
  );
};

export default NewPhoto;
