import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Button, Icon, Text, Container} from 'native-base';

const Error = ({error}) => {
  const [modalVisible, setModalVisible] = React.useState(true);

  return (
    <Container style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              style={styles.modalButton}
              transparent
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Icon name="close-circle" style={styles.modalIcon} />
            </Button>
            <Text style={styles.modalText}>
              {error} {'\n'} Try again later
            </Text>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  modalButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  modalIcon: {
    fontSize: 30,
    color: 'black',
  },
});

export default Error;
