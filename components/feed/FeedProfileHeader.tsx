import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinksList from "../UI/LinksList";
import ProfileStats from "../UI/ProfileStats";
import UserTitleShowcaseLocal from "../user/UserTitleShowcaseLocal";

const FeedProfileHeader = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = Object.values(props.links);

  return (
    <View>
      <View
        style={{
          ...styles.container,
          ...props.containerStyle,
        }}
      >
        <UserTitleShowcaseLocal {...props} />
        <ProfileStats
          darkModeValue={darkModeValue}
          followersValue={props.hideFollowing}
          followingValue={props.hideFollowers}
          advocatesValue={props.hideAdvocates}
          followersOnPress={props.followersOnPress}
          followingOnPress={props.followingOnPress}
          advocatesOnPress={props.advocatesOnPress}
          numberOfFollowers={props.numberOfFollowers}
          numberOfFollowing={props.numberOfFollowing}
          numberOfAdvocates={props.numberOfAdvocates}
        />
        {props.description ? (
          <Text style={props.descriptionStyle}>{props.description}</Text>
        ) : null}
        <LinksList links={links} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});

export default FeedProfileHeader;