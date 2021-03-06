import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Content, Text, Icon} from 'native-base';
import {Image, RefreshControl} from 'react-native';
import {StyleSheet} from 'react-native';
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

  //Pull to Refresh
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
  }, []);

  return (
    <Container>
      {loading ? (
        <Indicator />
      ) : (
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
                  margin: 10,
                  padding: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: 'black',
                }}>
                <Image style={styles.image} source={{uri: i.avatar}} />
                <Text style={styles.date}>
                  {new Date(i.createdAt).toLocaleDateString()}
                </Text>
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
                <Text style={styles.noPhotosText}>There are no photos yet</Text>
                <Icon name="ios-create-outline" style={styles.icon} />
              </Content>
            </Container>
          )}
        </Content>
      )}
      {error !== null && <Error error={error.message} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  noPhotosText: {
    fontSize: 18,
    fontWeight: '700',
  },
  icon: {
    fontSize: 50,
    color: 'black',
  },
  date: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
});

export default Galery;
