import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Content, Text} from 'native-base';
import {getPhoto} from '../redux/actions/photo';
import Indicator from '../components/Indicator';
import {Image} from 'react-native';
import Error from '../components/Error';

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
      <Content
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {photos &&
          photos.map((i) => (
            <Content
              key={i.id}
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                padding: 10,
              }}>
              <Image
                style={{
                  width: 400,
                  height: 400,
                  marginBottom: 10,
                }}
                source={{
                  uri: i.avatar,
                }}
              />
              <Text>{new Date(i.createdAt).toLocaleDateString()}</Text>
            </Content>
          ))}
      </Content>
      <Indicator loading={loading} />
      {error !== null && <Error error={error.message} />}
    </Container>
  );
};

export default Galery;
