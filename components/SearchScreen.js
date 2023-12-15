import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

import axios from "axios";
import { server } from "../server";
const SearchScreen = () => {
  const [dataSearch , setDataSearch ] = useState([])
  const [keyWord , setKeyWord] = useState('')
  const dataFake = [
    {
      name: "Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)",
      image:
        "https://cdn.tgdd.vn/Products/Images/8790/297340/bhx/-202306211455508775.jpg",
      price: 200000,
    },
    {
      name: "Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)",
      image:
        "https://cdn.tgdd.vn/Products/Images/8790/297340/bhx/-202306211455508775.jpg",
      price: 200000,
    },
  ];
  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.item_product}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.img_product}
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} VND</Text>
        <Button
          icon="cart-arrow-down"
          mode="contained"
          style={styles.btn_add_to_cart}>
          Thêm vào giỏ
        </Button>
      </View>
    );
  };
  const handleSearch = async (keywordBody) => {
    console.log(keyWord);
    try {
      const response = await axios.post(
        `${server}/food/search/`,
        {
          keyword: keywordBody 
        }
      );
      console.log(response);
      setDataSearch(response.data)
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderGoBack title="Tìm kiếm" />
      <TextInput label="Từ khoá"   onChangeText={text => setKeyWord(text)} right={<TextInput.Icon icon="magnify" />} />
      <Button
        icon="magnify"
        mode="contained"
        style={styles.btn_searh}
        onPress={()=>handleSearch(keyWord)}
        >
        Tìm kiếm
      </Button>

      <Text style={styles.title_search}>Kết quả tìm kiếm</Text>

      <View style={styles.main_product}>
        <FlatList
          key={(item) => item._id}
          data={dataSearch}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  main_product: {
    height: 600,
  },
  btn_searh: {
    marginVertical: 20,
    backgroundColor: "#00CC33",
  },
  title_search: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  btn_add_to_cart: {
    backgroundColor: "#00CC33",
  },
  item_product: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  img_product: {
    width: "100%",
    height: 150, // Chỉnh kích thước hình ảnh của sản phẩm
  },
  productName: {
    fontWeight: "bold",
    paddingVertical: 10,
  },
  productPrice: {
    color: "red",
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
  },
});
