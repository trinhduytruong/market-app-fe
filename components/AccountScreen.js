import React from "react";
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

const AccountScreen = () => {
  const [index, setIndex] = React.useState(0);

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
                  onChangeText={(text) => setUsername(text)}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Số điện thoại."
                  placeholderTextColor="#fff"
                  onChangeText={(text) => setPhoneNumber(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Mật khẩu."
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
              <TouchableOpacity style={styles.loginBtn}>
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
                  placeholder="Số điện thoại."
                  placeholderTextColor="#fff"
                  onChangeText={(text) => setPhoneNumber(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Mật khẩu."
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize="none"
                />
              </View>
            
              <TouchableOpacity style={styles.loginBtn}>
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
