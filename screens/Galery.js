import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPhoto} from '../redux/actions/photo';
import {Container, Content, Thumbnail, Text} from 'native-base';
import {View} from 'react-native';
import Indicator from '../components/Indicator';

const Galery = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photoReducer.photoList);
  const loading = useSelector((state) => state.photoReducer.loading);
  const error = useSelector((state) => state.photoReducer.error);

  React.useEffect(() => {
    dispatch(getPhoto());
  }, []);

  console.log(photos, loading, error);

  return (
    <Container>
      <Indicator loading={loading} />
      <Content
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {photos &&
          photos.map((i) => (
            <View key={i.id} style={{flex: 1, alignItems: 'center'}}>
              <Thumbnail
                style={{width: 300, height: 300, margin: 20}}
                square
                large
                source={{
                  uri: i.avatar,
                }}
              />
              <Text>{i.createdAt}</Text>
            </View>
          ))}
      </Content>
    </Container>
  );
};

export default Galery;
