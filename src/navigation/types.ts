import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {ProductDetailsScreenProps} from '../screens/ProductDetailsScreen';

export type RootStackParamList = {
  ProductsList: undefined;
  ProductDetails: ProductDetailsScreenProps;
  AddProduct: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
