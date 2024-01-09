import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { Tab } from "@rneui/themed";
import axios from "axios";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { server } from "../server";

const AccountScreen = () => {
  const [index, setIndex] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneLogin, setPhoneLogin] = useState("");
  const [passwordLogin, setPassWordLogin] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigation();
  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name: fullName,
      phone: phoneNumber,
      password: password,
    };

    axios
      .post(`${server}/user/register`, userData)
      .then((response) => {
        alert("Đăng ký thành công");
        // handle response
        setIndex(1);
      })
      .catch((error) => {
        console.log(error);
        alert("Thông tin không hợp lệ");
      });
  };

  const handleLogin = () => {
    const loginData = {
      phone: phoneLogin,
      password: passwordLogin,
    };

    axios
      .post(`${server}/user/login`, loginData)
      .then((response) => {
        alert("Đăng nhập thành công");
        // Dispatch action to Redux store
        dispatch({ type: "SET_USER_ID", payload: response.data.user._id });
        console.log("User Logged In:", response.data.user);
        navigate.navigate("detailaccount");
      })
      .catch((error) => {
        alert("Thông tin đăng nhập không chính xác");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderGoBack title="Tài khoản" />
      <Tab value={index} onChange={setIndex} dense>
        <Tab.Item>Đăng Ký</Tab.Item>
        <Tab.Item>Đăng Nhập</Tab.Item>
      </Tab>
      <View style={{ flex: 1 }}>
        {index === 0 && (
          <View style={styles.tabContent}>
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Họ và tên"
                  placeholderTextColor="#fff"
                  onChangeText={(text) => setFullName(text)}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Số điện thoại"
                  placeholderTextColor="#fff"
                  onChangeText={(text) => setPhoneNumber(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={(text) => setConfirmPassword(text)}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleRegister}
              >
                <Text style={styles.loginText}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {index === 1 && (
          <View style={styles.tabContent}>
            <View style={styles.container}>
              <StatusBar style="auto" />

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Số điện thoại"
                  placeholderTextColor="#fff"
                  onChangeText={(text) => setPhoneLogin(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassWordLogin(text)}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  tabContent: {
    paddingVertical: 30,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 150,
    paddingVertical: 100,
  },
  inputView: {
    backgroundColor: "#99CC99",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  forgot_button: {
    height: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00CC33",
  },
  loginText: {
    color: "#fff",
  },
});
