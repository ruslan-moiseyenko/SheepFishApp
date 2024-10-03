import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import ProductsListScreen from './src/screens/ProductsListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import AddProductScreen from './src/screens/AddProductScreen';

export type RootStackParamList = {
  ProductsList: undefined;
  ProductDetails: {productId: number};
  AddProduct: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProductsList"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="ProductsList"
            component={ProductsListScreen}
            options={{title: 'Список товарів'}}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{title: 'Деталі товару'}}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{title: 'Додати товар'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
