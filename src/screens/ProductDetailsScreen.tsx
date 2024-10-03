import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {COLORS} from '../theme/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '../components/Button';

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

type ProductsDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;
interface ProductDetailsScreenProps {
  route: ProductDetailsScreenRouteProp;
  navigation: ProductsDetailsScreenNavigationProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;
  const product = useSelector((state: RootState) =>
    state.products.items.find(item => item.id === productId),
  );

  if (!product) {
    return <Text style={styles.text}>Товар не знайдено</Text>;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoWrapper}>
        <Image source={{uri: product.image}} style={styles.image} />
        <Text style={styles.text}>{product.title}</Text>
        <Text style={styles.text}>${product.price}</Text>
        <Text style={styles.text}>{product.description}</Text>
      </View>
      <Button onPress={() => navigation.goBack()} title="Повернутись" />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    gap: 10,
    backgroundColor: COLORS.BACKGROUND,
  },
  infoWrapper: {
    flex: 1,
  },
  text: {
    color: COLORS.TEXT,
  },
  image: {
    width: 'auto',
    height: '50%',
    justifyContent: 'center',
  },
});
