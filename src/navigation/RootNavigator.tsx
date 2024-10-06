import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AddProductScreen from '../screens/AddProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductsListScreen from '../screens/ProductsListScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductsList"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="ProductsList" component={ProductsListScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
