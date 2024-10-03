import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../theme/colors';

type ButtonProps = {
  onPress: () => void;
  title: string;
};

export const Button: React.FC<ButtonProps> = ({onPress, title}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BUTTON,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: COLORS.TEXT,
  },
});
