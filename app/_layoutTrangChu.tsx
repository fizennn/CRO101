import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Thư viện icon


import cart from "./cart";
import favorite from "./favorite";
import notifications from "./notifications";
import LayoutHome from "./home";


const Tab = createBottomTabNavigator();

export default function TrangChuLayout() {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === "Home") {
            iconSource = require("../assets/images/home.png");
          } else if (route.name === "Cart") {
            iconSource = require("../assets/images/cart_sl.png");
          } else if (route.name === "Favorite") {
            iconSource = require("../assets/images/fav_sl.png");
          } else if (route.name === "Notifications") {
            iconSource = require("../assets/images/noti_sl.png");
          }
    
          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "tomato" : "gray", // Đổi màu khi active
              }}
            />
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0C0F14" },
      })}
      >
        <Tab.Screen name="Home" component={LayoutHome} />
        <Tab.Screen name="Cart" component={cart} />
        <Tab.Screen name="Favorite" component={favorite} />
        <Tab.Screen name="Notifications" component={notifications} />
      </Tab.Navigator>

  );
}
