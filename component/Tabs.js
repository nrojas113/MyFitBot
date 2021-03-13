import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Main from "./screens/Main";
import Data from "./screens/Data";
import MyBotsList from "./screens/MyBotsList";

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen
        name="Data"
        component={Data}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="poll" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyBots"
        component={MyBotsList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
