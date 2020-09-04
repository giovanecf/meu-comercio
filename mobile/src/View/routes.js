import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabBottomRoutes from "./tabBottomRoutes";

import ClientDetails from "./pages/client/client_details";
import ProductDetails from "./pages/product/product_details";
import NewClient from "./pages/client/new_client";
import NewProduct from "./pages/product/new_product";
import NewSale from "./pages/sale/new_sale";
import PaymentSale from "./pages/sale/payment_sale";
import FinishSale from "./pages/sale/finish_sale";

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabBottomRoutes"
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        style={{ backgroundColor: "#000", flex: 1 }}
      >
        <Stack.Screen name="TabBottomRoutes" component={TabBottomRoutes} />
        <Stack.Screen name="ClientDetails" component={ClientDetails} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="NewClient" component={NewClient} />
        <Stack.Screen name="NewProduct" component={NewProduct} />
        <Stack.Screen name="NewSale" component={NewSale} />
        <Stack.Screen name="PaymentSale" component={PaymentSale} />
        <Stack.Screen name="FinishSale" component={FinishSale} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
