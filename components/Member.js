import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput , TouchableOpacity } from "react-native";
import HeaderGoBack from "./HeaderGoBack";

import { useSelector } from "react-redux";
import { Modal, Portal, List, Button, PaperProvider } from "react-native-paper";
import axios from "axios";
import { server } from "../server";
const Member = () => {
  const groupId = useSelector((state) => state.idGroup);
  const userId = useSelector((state) => state.userId);
  console.log(userId);
  const [listGroup, setListGroup] = useState([]);
  const [idAddUser, setIdAddUser] = useState("");
  useEffect(() => {
    const getMember = async () => {
      const res = await axios.get(
        `${server}/familygroup/${groupId}`
      );
      const data = res.data;
      setListGroup(data);
    };
    getMember();
  }, []);
  console.log((listGroup.groupAdmin));
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const handleAddMember = async () => {
    const memberData = {
      groupId: groupId,
      userId: idAddUser,
    };

    try {
      const response = await axios.post(
        `${server}/familygroup/addmember`,
        memberData
      );
      alert("Thêm thành viên thành công");
      console.log("User Logged In:", response.data);
      hideModal();
      // Gọi lại hàm getMember để cập nhật danh sách thành viên
      getMember();
    } catch (error) {
      // Kiểm tra loại lỗi và hiển thị thông báo phù hợp
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Không có id này");
      }
    }
  };

  const getMember = async () => {
    const res = await axios.get(
      `${server}/familygroup/${groupId}`
    );
    const data = res.data;
    setListGroup(data);
  };

  const handleRemoveMember = async (idUser) => {
    try {
      await axios.delete(
        `${server}/familygroup/deletemember/`,
        {
          data: { 
            groupId: groupId,
            userId : idUser
           },
        }
      );
     getMember()
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
  // Để sử dụng hàm getMember trong useEffect và handleAddMember
  useEffect(() => {
    getMember();
  }, [groupId]);
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.title_add_gruop}>Thêm thành viên</Text>
          <TextInput
            onChangeText={(text) => setIdAddUser(text)}
            mode="outlined"
            label="Nhập ID Thành viên"
            placeholder="Nhập ID Thành viên"
          />
          <View style={styles.btn_modal}>
            <Button
              style={styles.btn_save}
              icon="content-save-alert"
              mode="contained"
              onPress={() => handleAddMember()}>
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
      <HeaderGoBack title="Chi tiết gia đình" />
      <Button
        style={styles.btn_add}
        icon="plus"
        mode="contained"
        onPress={showModal}>
        Thêm thành viên
      </Button>

      {listGroup.members &&
        listGroup.members.map((value) => {
          return (
            <List.Item
              key={value._id}
              title={value.name}
              left={(props) => <List.Icon {...props} icon="account-check" />}

              right={() => 
                userId === listGroup.groupAdmin && (
                  <TouchableOpacity onPress={()=>handleRemoveMember(value._id)}>
                    <List.Icon icon="delete" />
                  </TouchableOpacity>
                )
              }
            />
          );
        })}
    </PaperProvider>
  );
};

export default Member;
const styles = StyleSheet.create({
  btn_add: {
    width: "50%",
    marginVertical: 20,
  },
  btn_save: {
    backgroundColor: "#0099ff",
  },
  btn_cancle: {
    backgroundColor: "#ff0000",
  },
  btn_modal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  title_add_gruop: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});
