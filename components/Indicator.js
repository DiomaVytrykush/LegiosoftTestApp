import React from 'react';
import {ActivityIndicator} from 'react-native';

const Indicator = ({loading}) => {
  return (
    <ActivityIndicator
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      animating={loading}
      color="grey"
    />
  );
};

export default Indicator;
