import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppDispatch, RootState} from '../store/store';
import {fetchProducts} from '../store/slices/productsSlice';
import {COLORS} from '../theme/colors';
import {Button} from '../components/Button';
import {RootStackParamList} from '../navigation/types';
import {Product} from './types';

type ProductsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductsList'
>;

interface ProductsListScreenProps {
  navigation: ProductsListScreenNavigationProp;
}

const ProductsListScreen: React.FC<ProductsListScreenProps> = ({
  navigation,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item.id})
      }>
      <View style={styles.cardWrapper}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.infoWrapper}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Список товарів</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <Button
        title="Додати товар"
        onPress={() => navigation.navigate('AddProduct')}
      />
    </View>
  );
};

export default ProductsListScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.TEXT,
    borderBottomWidth: 5,
  },
  title: {
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
    color: COLORS.TEXT,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.TEXT,
  },
  cardWrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {width: 50, height: 50},
  infoWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.BUTTON,
    borderRadius: 10,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
  },
});
