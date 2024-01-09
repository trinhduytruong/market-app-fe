import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Modal, Portal, List, Button, PaperProvider } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Card } from "react-native-paper";
import HeaderGoBack from "./HeaderGoBack";
import { server } from "../server";

const Recipes = () => {
  const userId = useSelector((state) => state.userId);
  const groupId = useSelector((state) => state.idGroup);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const showModal = (mode, recipe = null) => {
    setModalMode(mode);
    if (mode === "edit" && recipe) {
      setCurrentRecipe(recipe);
      setName(recipe.name);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    } else {
      setName("");
      setIngredients("");
      setInstructions("");
    }
    setVisible(true);
  };

  const hideModal = () => {
    setCurrentRecipe(null);
    setVisible(false);
  };
  const handleSaveRecipe = async () => {
    if (!name || !ingredients || !instructions) {
      alert("Vui lòng nhập tất cả thông tin công thức");
      return;
    }

    const updatedRecipe = {
      name,
      ingredients,
      instructions,
    };

    try {
      let response;
      if (modalMode === "add") {
        response = await axios.post(
          `${server}/user/addrecipe/${userId}`,
          updatedRecipe
        );
      } else if (modalMode === "edit" && currentRecipe) {
       console.log(currentRecipe._id , updatedRecipe);
        response = await axios.patch(
          `${server}/user/updaterepice/${userId}`,
          { ...updatedRecipe, recipeId: currentRecipe._id }
        );
      }
      alert("Công thức đã được cập nhật");
      console.log("Recipe Updated:", response.data);
      hideModal();
      getCart();
    } catch (error) {
      console.error("Error saving recipe:", error);
      // Handle error...
    }
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const getCart = async () => {
    try {
      const res = await axios.get(
        `${server}/familygroup/getrecipes/${groupId}`
      );
      const data = res.data;
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getCart();
      return () => setCart([]); // Optional: Reset cart on screen blur
    }, [userId, groupId])
  );



  const handleRemoveRepice = async (idRepice) => {
    try {
      await axios.delete(
        `${server}/user/deleterepice/${userId}`,
        {
          data: {
            recipeId: idRepice,
          },
        }
      );
      getCart();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <PaperProvider style={{ flex: 1 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.title_add_gruop}>
            {modalMode === "add" ? "Thêm món ăn" : "Sửa món ăn"}
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            label="Nhập tên món ăn"
            placeholder="Nhập tên món ăn"
            style={styles.input_value}
          />
          <TextInput
            value={ingredients}
            onChangeText={(text) => setIngredients(text)}
            mode="outlined"
            label="Nhập nguyên liệu"
            placeholder="Nhập nguyên liệu"
            style={styles.input_value}
          />
          <TextInput
            value={instructions}
            onChangeText={(text) => setInstructions(text)}
            mode="outlined"
            label="Nhập cách nấu"
            placeholder="Nhập cách nấu"
            style={styles.input_value}
          />

          <View style={styles.btn_modal}>
            <Button
              style={styles.btn_save}
              icon="content-save-alert"
              mode="contained"
              onPress={handleSaveRecipe}>
              {modalMode === "add" ? "Lưu" : "Cập nhật"}
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
      <HeaderGoBack title="Danh sách công thức" />

      <Button
        style={styles.btn_add}
        icon="plus"
        mode="contained"
        onPress={() => showModal("add")}>
        Thêm công thức
      </Button>
      <ScrollView>
        {userId && cart.length > 0 ? (
          cart.map((value, key) => (
            <Card key={key} style={styles.main_repice}>
              <Card.Content>
                <Text style={styles.name_repice}>
                  Tên món ăn : {value.name}
                </Text>
                <Text style={styles.nlieu}>
                  Nguyên liệu : {value.ingredients}
                </Text>
                <Text variant="bodyMedium">
                  Cách nấu : {value.instructions}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => showModal("edit", value)}>Sửa</Button>
                <Button onPress={() => handleRemoveRepice(value._id)}>
                  Xoá
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text style={styles.emptyCartMessage}>Chưa có công thức</Text>
        )}
      </ScrollView>
    </PaperProvider>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  name_repice: {
    fontSize: 20,

    fontWeight: "bold",
    color: "#ff0000",
  },
  nlieu: {
    paddingVertical: 20,
  },
  btn_buy: {
    backgroundColor: "#00CC33",
  },
  list_cart: {
    paddingLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: "7%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: "#ff0000",
  },
  emptyCartMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
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
  input_value: {
    paddingVertical: 20,
  },
});
