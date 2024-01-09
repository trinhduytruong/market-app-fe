import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import HeaderGoBack from "./HeaderGoBack";
import GoHome from "./GoHome";
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
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { server } from "../server";
const DetailAccount = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [nameGruop, setNameGruop] = useState("");
  const [dataUser, setDataUser] = useState();
  const [lengthList, setLengthList] = useState(0);
  const [lengthRecipe, setlengthRecipe] = useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${server}/user/${userId}`);
      const data = await res.json();

      setDataUser(data);
    };
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const res = await fetch(`${server}/user/${userId}`);
        const data = await res.json();
        setDataUser(data);

        if (data && data.isGroup) {
          const resGroup = await fetch(
            `${server}/familygroup/${data.idGroup}`
          );
          const dataGroup = await resGroup.json();
          setLengthList(dataGroup.listItem.length); // Giả sử rằng bạn muốn đặt số lượng thành viên trong nhóm
          setlengthRecipe(dataGroup.recipes.length);
        }
      };
      getData();

      getData();
      return () => setLengthList(0);
    }, [userId])
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${server}/user/${userId}`);
      const data = await res.json();
      setDataUser(data);

      if (data && data.isGroup) {
        const resGroup = await fetch(
          `${server}/familygroup/${data.idGroup}`
        );
        const dataGroup = await resGroup.json();
        setLengthList(dataGroup.listItem.length); // Giả sử rằng bạn muốn đặt số lượng thành viên trong nhóm
        setlengthRecipe(dataGroup.recipes.length);
      }
    };
    getData();
  }, [userId, lengthList, lengthRecipe]);

  const logOut = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({ type: "LOGOUT" });
      navigation.navigate("Home");
      setIsLoading(false);
    }, 1000);
  };
  const createGruop = async (nameGruop) => {
    console.log(nameGruop);
    try {
      const response = await axios.post(
        `${server}/familygroup/create/`,
        {
          groupAdmin: userId,
          name: nameGruop,
        }
      );
      console.log(response.data);
      alert("Đã tạo nhóm");
      hideModal();
    } catch (error) {
      console.error(error);
    }
  };
  const detailGruop = () => {
    navigation.navigate("detailgruop");
    dispatch({ type: "SET_GROUP_ID", payload: dataUser.idGroup });
  };
  const detailListItem = () => {
    navigation.navigate("listitem");
    dispatch({ type: "SET_GROUP_ID", payload: dataUser.idGroup });
  };
  const detailRecipes = () => {
    navigation.navigate("recipes");
    dispatch({ type: "SET_GROUP_ID", payload: dataUser.idGroup });
  };
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.title_add_gruop}>Tạo nhóm gia đình</Text>
          <TextInput
            onChangeText={(text) => setNameGruop(text)}
            mode="outlined"
            label="Tên gia đình"
            placeholder="Tên gia đình"
            right={<TextInput.Affix text="/100" />}
          />
          <View style={styles.btn_modal}>
            <Button
              style={styles.btn_save}
              icon="content-save-alert"
              mode="contained"
              onPress={() => createGruop(nameGruop)}>
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

      <GoHome title="Hồ sơ tài khoản" />
      {dataUser && (
        <View style={styles.container}>
          <List.Item
            title="Mã tài khoản"
            description={dataUser._id}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="Họ và tên"
            description={dataUser.name}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="Số điện thoại"
            description={dataUser.phone}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />

          <List.Item
            title="Nhóm"
            description={dataUser.isGroup ? "Đã có" : "Chưa có"}
            left={(props) => <List.Icon {...props} icon="account-group" />}
            right={() => (
              <>
                {dataUser.isGroup ? (
                  <Button
                    style={styles.btn_detail}
                    mode="contained"
                    onPress={detailGruop}>
                    Xem chi tiết
                  </Button>
                ) : (
                  <Button
                    style={styles.btn_detail}
                    mode="contained"
                    onPress={showModal}>
                    Tạo nhóm
                  </Button>
                )}
              </>
            )}
          />

          <List.Item
            title="Tủ Lạnh"
            description={lengthList}
            left={(props) => <List.Icon {...props} icon="food-fork-drink" />}
            right={() => (
              <Button
                style={styles.btn_detail}
                mode="contained"
                onPress={() => detailListItem()}>
                Xem tủ lạnh
              </Button>
            )}
          />
          <List.Item
            title="Công thức nấu ăn"
            description={lengthRecipe}
            left={(props) => <List.Icon {...props} icon="food-fork-drink" />}
            right={() => (
              <Button
                style={styles.btn_detail}
                mode="contained"
                onPress={() => detailRecipes()}>
                Xem chi tiết
              </Button>
            )}
          />
          <Button
            style={styles.btnLogout}
            onPress={() => logOut()}
            icon="logout"
            mode="contained">
            Đăng Xuất
          </Button>
        </View>
      )}
      <Spinner
        visible={isLoading}
        textContent={"Đang đăng xuất..."}
        textStyle={styles.spinnerText}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  btn_save: {
    backgroundColor: "#0099ff",
  },
  btn_cancle: {
    backgroundColor: "#ff0000",
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
