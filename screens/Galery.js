import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Content, Text} from 'native-base';
import {Image, RefreshControl} from 'react-native';
import {getPhoto} from '../redux/actions/photo';
import Indicator from '../components/Indicator';
import Error from '../components/Error';

const Galery = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photoReducer.photoList);
  const loading = useSelector((state) => state.photoReducer.loading);
  const error = useSelector((state) => state.photoReducer.error);

  React.useEffect(() => {
    dispatch(getPhoto());
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (photos.length === 0) {
      try {
        dispatch(getPhoto());
        setRefreshing(false);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <Container>
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {photos.length !== 0 ? (
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
          ))
        ) : (
          <Container>
            <Content
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>There are no photos yet</Text>
            </Content>
          </Container>
        )}
      </Content>
      <Indicator loading={loading} />
      {error !== null && <Error error={error.message} />}
    </Container>
  );
};

export default Galery;
