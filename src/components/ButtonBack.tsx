import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';

export const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.text}>Повернутись</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    backgroundColor: COLORS.BUTTON,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: COLORS.TEXT,
  },
});
