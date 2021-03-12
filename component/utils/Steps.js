import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Steps = (props) => {
  const {steps} = props;
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Steps</Text> */}
      <Text style={styles.steps}>{steps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  steps: {
    color: 'red',
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Steps;
