import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {addProduct} from '../store/slices/productsSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppDispatch} from '../store/store';

import {Button} from '../components/Button';
import {COLORS} from '../theme/colors';
import {ButtonBack} from '../components/ButtonBack';
import {RootStackParamList} from '../navigation/types';

type AddProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddProduct'
>;

interface AddProductScreenProps {
  navigation: AddProductScreenNavigationProp;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({navigation}) => {
  const dispatch: AppDispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Назва обовʼязкова'),
    price: Yup.number()
      .required('Ціна обовʼязкова')
      .positive('Ціна має бути додатною'),
    description: Yup.string().required('Опис обовʼязковий'),
  });

  return (
    <Formik
      initialValues={{title: '', price: '', description: ''}}
      validationSchema={validationSchema}
      onSubmit={(values, {resetForm}) => {
        const newProduct = {
          id: Date.now(),
          title: values.title,
          price: parseFloat(values.price),
          description: values.description,
          image: 'https://via.placeholder.com/150',
          rating: {rate: 0, count: 0},
        };
        dispatch(addProduct(newProduct));
        resetForm();
        navigation.navigate('ProductsList');
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={styles.wrapper}>
          <View style={styles.navBar}>
            <ButtonBack />
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.title}>Додати товар</Text>
            <TextInput
              placeholder="Назва"
              placeholderTextColor={COLORS.PLACEHOLDER}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              style={styles.textArea}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}
            <TextInput
              placeholder="Ціна"
              placeholderTextColor={COLORS.PLACEHOLDER}
              keyboardType="numeric"
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              style={styles.textArea}
            />
            {errors.price && <Text style={styles.error}>{errors.price}</Text>}
            <TextInput
              placeholder="Опис"
              placeholderTextColor={COLORS.PLACEHOLDER}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              style={styles.textArea}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
          </View>
          <Button onPress={handleSubmit} title="Додати товар" />
        </View>
      )}
    </Formik>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    gap: 10,
    backgroundColor: COLORS.BACKGROUND,
  },
  navBar: {
    width: '100%',
    height: 40,
  },
  formWrapper: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  error: {
    padding: 10,
    color: COLORS.ERROR,
  },
  textArea: {
    marginBottom: 20,
    backgroundColor: COLORS.PLACEHOLDER_BACKGROUND,
  },
});
