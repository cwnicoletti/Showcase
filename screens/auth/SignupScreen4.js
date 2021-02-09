import React, { useReducer, useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { setPassword } from "../../store/actions/signup";
import { signup } from "../../store/actions/auth";
import { setIntroing } from "../../store/actions/signup";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updateValues,
    };
  }
  return state;
};

const SignupScreen2 = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector((state) => state.signup.email);
  const fullname = useSelector((state) => state.signup.fullname);
  const username = useSelector((state) => state.signup.username);
  const localId = useSelector((state) => state.auth.userId);
  const showcaseId = useSelector((state) => state.user.showcaseId);

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      password: "",
      confirmpassword: "",
    },
    inputValidities: {
      password: false,
      confirmpassword: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    await setIsLoading(true);
    if (
      formState.inputValues.password === formState.inputValues.confirmpassword
    ) {
      await dispatch(setPassword(formState.inputValues.password));
      await dispatch(
        await signup(email, fullname, username, formState.inputValues.password)
      );
      await console.log(localId);
      await dispatch(setIntroing(localId, showcaseId, true));
      await props.navigation.navigate("Intro");
    }
    await setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        extraHeight={200}
      >
        <View style={styles.inner}>
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon.png")}
          />
          <Text style={styles.text}>
            By continuing, you agree to our Terms of Use, and Privacy Policy
          </Text>
          <Card style={styles.authContainer}>
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="confirmpassword"
              label="Confirm Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isLoading ? (
              <View style={styles.activityContainer}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <TouchableCmp
                style={{
                  borderColor:
                    formState.formIsValid === false ? "gray" : "#007AFF",
                  borderWidth: 1,
                  margin: 10,
                  alignItems: "center",
                }}
                onPress={authHandler}
                disabled={formState.formIsValid === false}
              >
                <Text
                  style={{
                    margin: 10,
                    color: formState.formIsValid === false ? "gray" : "#007AFF",
                    fontSize: 16,
                  }}
                >
                  Finish Signup
                </Text>
              </TouchableCmp>
            )}
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

SignupScreen2.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/showcase_icon_transparent_white.png")}
        />
        <Text
          style={{
            ...styles.logoTitle,
            color: "white",
          }}
        >
          Showcase
        </Text>
      </View>
    ),
    headerTitleStyle: {
      color: "white",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: "black",
    },
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Back"
          iconName={"ios-arrow-back"}
          color={"white"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  inner: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  logoImage: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 22,
  },
  text: {
    color: "white",
    padding: 10,
  },
  authContainer: {
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: {
      width: null,
      height: null,
    },
    shadowRadius: null,
    elevation: null,
    borderRadius: null,
    backgroundColor: "black",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },
  loadingAuth: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#00B7DB",
    borderRadius: 10,
  },
  activityContainer: {
    marginTop: 10,
  },
  buttonText: {
    color: "#00B7DB",
  },
  buttonLinkedInContainer: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  buttons: {
    alignItems: "center",
    paddingVertical: 10,
    color: "#00B7DB",
  },
});

export default SignupScreen2;
