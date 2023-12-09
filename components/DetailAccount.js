import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import HeaderGoBack from "./HeaderGoBack";
import { useState, useEffect } from "react";
import {
  List,
  Button,
  Modal,
  Portal,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DetailAccount = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.title_add_gruop}>Tạo nhóm gia đình</Text>
          <TextInput
            mode="outlined"
            label="Tên gia đình"
            placeholder="Tên gia đinh"
            right={<TextInput.Affix text="/100" />}
          />
          <View style={styles.btn_modal}>
            <Button
              style={styles.btn_save}
              icon="content-save-alert"
              mode="contained"
              onPress={() => console.log("Pressed")}>
              Lưu
            </Button>
            <Button
              style={styles.btn_cancle}
              icon="cancel"
              mode="contained"
              onPress={hideModal}>
              Đóng
            </Button>
          </View>
        </Modal>
      </Portal>

      <HeaderGoBack title="Hồ sơ tài khoản" />
      <View style={styles.container}>
        <List.Item
          title="Mã tài khoản"
          description="232132329   (Mã này dùng để thêm nhóm)"
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Họ và tên"
          description="Nguyễn Văn A"
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Số điện thoại"
          description="028323232"
          left={(props) => <List.Icon {...props} icon="phone" />}
        />

        <List.Item
          title="Nhóm"
          description="Chưa có"
          left={(props) => <List.Icon {...props} icon="account-group" />}
          right={() => (
            <Button
              style={styles.btn_detail}
              mode="contained"
              onPress={showModal}>
              Tạo nhóm
            </Button>
          //    <Button
          //    style={styles.btn_detail}
          //    mode="contained"
          //    onPress={showModal}>
          //    Xem chi tiết
          //  </Button>
          )}
        />

        <List.Item
          title="Tủ Lạnh"
          description="8 món"
          left={(props) => <List.Icon {...props} icon="food-fork-drink" />}
          right={() => (
            <Button
              style={styles.btn_detail}
              mode="contained"
              onPress={() => console.log("Pressed")}>
              Xem tủ lạnh
            </Button>
          )}
        />
        <Button style={styles.btnLogout} icon="logout" mode="contained">
          Đăng Xuất
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  btn_save: {
    backgroundColor: "#0099ff",
  },
  btn_cancle : {
    backgroundColor : '#ff0000'
  },
  btn_modal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  title_add_gruop: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 100,
    paddingVertical: 100,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnLogout: {
    marginTop: 50,
    backgroundColor: "#0099ff",
  },
  btn_detail: {
    backgroundColor: "#00CC33",
  },
});
export default DetailAccount;
