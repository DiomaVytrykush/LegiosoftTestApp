import React from 'react';
import {Container, Content, Spinner} from 'native-base';

const Indicator = () => {
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Spinner color="darkgrey" />
      </Content>
    </Container>
  );
};

export default Indicator;
