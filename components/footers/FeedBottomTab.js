import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { resetScroll, onScreen } from "../../store/actions/user";

const FeedBottomTab = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const showcasingLocally = useSelector(
    (state) => state.user.showcasingLocally
  );
  const onFeedScreen = useSelector((state) => state.user.onFeedScreen);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (onFeedScreen) {
              dispatch(resetScroll("Feed"));
            } else {
              dispatch(onScreen("Feed"));
            }
            props.navigation.navigate("Feed");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              borderTopWidth: 1,
              borderColor: "gray",
              backgroundColor: darkModeValue ? "black" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-home"
              size={25}
              color={darkModeValue ? "white" : "black"}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Explore");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              borderTopWidth: 1,
              borderColor: "gray",
              backgroundColor: darkModeValue ? "black" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-search"
              size={25}
              color={
                props.navigation.isFocused()
                  ? "gray"
                  : [darkModeValue ? "white" : "black"]
              }
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              borderTopWidth: 1,
              borderColor: "gray",
              backgroundColor: darkModeValue ? "black" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons
              name="trophy"
              size={25}
              color={
                props.navigation.isFocused()
                  ? "gray"
                  : [darkModeValue ? "white" : "black"]
              }
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedBottomTab;