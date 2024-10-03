import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {RootState} from '../store';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  {state: RootState}
>('products/fetchProducts', async () => {
  const storedProducts = await AsyncStorage.getItem('products');
  if (storedProducts !== null) {
    return JSON.parse(storedProducts);
  }

  const response = await axios.get('https://fakestoreapi.com/products');
  const products = response.data;
  await AsyncStorage.setItem('products', JSON.stringify(products));
  return products;
});

export const addProduct = createAsyncThunk<
  Product[],
  Product,
  {state: RootState}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>('products/addProduct', async (newProduct, {getState}) => {
  const storedProducts = await AsyncStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  const updatedProducts = [...products, newProduct];
  await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  return updatedProducts;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.status = 'succeeded';
        },
      )
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
        },
      );
  },
});

export default productsSlice.reducer;
