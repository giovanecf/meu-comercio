import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Clients from "./pages/client/clients";
import Products from "./pages/product/products";
import Stats from "./pages/stats/stats";
import Sales from "./pages/sale/sales";

import Colors from "./constants/colors";

const Tab = createMaterialBottomTabNavigator();

function MainRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Sales"
      activeColor={Colors.secondary}
      barStyle={{
        backgroundColor: Colors.primaryLight,
        height: 50,
      }}
    >
      <Tab.Screen
        name="Sales"
        component={Sales}
        options={{
          tabBarLabel: "Vendas",
          tabBarIcon: ({ color, focused }) =>
            focused === true ? (
              <MaterialCommunityIcons
                name="currency-usd"
                color={color}
                size={24}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-currency-usd"
                color={color}
                size={24}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: "Depósito",
          tabBarIcon: ({ color, focused }) =>
            focused === true ? (
              <MaterialCommunityIcons
                name="cube-outline"
                color={color}
                size={24}
              />
            ) : (
              <MaterialCommunityIcons name="cube" color={color} size={24} />
            ),
          tabBarBadge: false,
        }}
      />
      <Tab.Screen
        name="Clients"
        component={Clients}
        options={{
          tabBarLabel: "Clientes",
          tabBarIcon: ({ color, focused }) =>
            focused === true ? (
              <MaterialCommunityIcons
                name="account-group-outline"
                color={color}
                size={24}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={24}
              />
            ),
          tabBarBadge: false,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: ({ color, focused }) =>
            focused === true ? (
              <MaterialCommunityIcons
                name="chart-line"
                color={color}
                size={24}
              />
            ) : (
              <MaterialCommunityIcons
                name="chart-areaspline"
                color={color}
                size={24}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainRoutes;
