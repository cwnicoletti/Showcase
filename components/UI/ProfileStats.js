import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const ProfileStats = (props) => {
  const darkModeValue = props.darkModeValue;
  const followersValue = props.followersValue;
  const followingValue = props.followingValue;
  const advocatesValue = props.advocatesValue;
  const followersOnPress = props.followersOnPress;
  const followingOnPress = props.followingOnPress;
  const advocatesOnPress = props.advocatesOnPress;
  const numberOfFollowers = props.numberOfFollowers;
  const numberOfFollowing = props.numberOfFollowing;
  const numberOfAdvocates = props.numberOfAdvocates;

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.statsContainer}>
      {!followersValue ? (
        <TouchableCmp
          style={{
            flex: 1,
            borderColor: darkModeValue ? "gray" : "#c9c9c9",
            alignItems: "center",
          }}
          onPress={followersOnPress}
        >
          <View
            style={{
              flex: 1,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                margin: 5,
                color: darkModeValue ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Followers
            </Text>
            <Text
              style={{
                marginBottom: 5,
                color: darkModeValue ? "white" : "black",
              }}
            >
              {numberOfFollowers}
            </Text>
          </View>
        </TouchableCmp>
      ) : null}
      {!followingValue ? (
        <TouchableCmp
          style={{
            flex: 1,
            borderColor: darkModeValue ? "gray" : "#c9c9c9",
            alignItems: "center",
          }}
          onPress={followingOnPress}
        >
          <View
            style={{
              flex: 1,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                margin: 5,
                color: darkModeValue ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Following
            </Text>
            <Text
              style={{
                marginBottom: 5,
                color: darkModeValue ? "white" : "black",
                fontSize: 15,
              }}
            >
              {numberOfFollowing}
            </Text>
          </View>
        </TouchableCmp>
      ) : null}
      {!advocatesValue ? (
        <TouchableCmp
          style={{
            flex: 1,
            borderColor: darkModeValue ? "gray" : "#c9c9c9",
            alignItems: "center",
          }}
          onPress={advocatesOnPress}
        >
          <View
            style={{
              flex: 1,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                margin: 5,
                color: darkModeValue ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Advocates
            </Text>
            <Text
              style={{
                marginBottom: 5,
                color: darkModeValue ? "white" : "black",
                fontSize: 15,
              }}
            >
              {numberOfAdvocates}
            </Text>
          </View>
        </TouchableCmp>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: { marginTop: 5, flexDirection: "row" },
});

export default ProfileStats;
