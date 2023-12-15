import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "./Header";
import Swiper from "react-native-swiper";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';

import axios from "axios";
import { server } from "../server";
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  
  const handleDetailProduct = (id) => {
    dispatch({ type: "SET_PRODUCT_ID", payload: id });
    navigation.navigate("detailproduct");
  };
  const handleDetailCategory = (id) => {
    dispatch({ type: "SET_CATEGORY_ID", payload: id });
    navigation.navigate("detailcategory");
  };

  const handleAddToCart = async (productId) => {
    if (!userId) {
      // Hiển thị thông báo nếu không có userId
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Bạn chưa đăng nhập",
      });
      return; // Dừng hàm nếu không có userId
    }
  
    try {
      const response = await axios.post(
        `${server}/user/addtocart/${userId}`,
        {
          foodId: productId,
          quantity: 1, // hoặc số lượng mà người dùng chọn
        }
      );
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Sản phẩm đã được thêm vào giỏ hàng.',
      });
      dispatch({ type: "UPDATE_CART" });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể thêm sản phẩm vào giỏ hàng.',
      });
      
    }
  };
  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.item_product}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.img_product}
        />
        <Text
          onPress={() => handleDetailProduct(item._id)}
          style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>{formatVND(item.price)}</Text>

        <Button
          icon="cart-arrow-down"
          mode="contained"
          onPress={()=>handleAddToCart(item._id)}
          style={styles.btn_add_to_cart}>
          Thêm vào giỏ
        </Button>
      </View>
    );
  };

  const [listCategory, setListCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const getCate = async () => {
      const res = await fetch(`${server}/category`);
      const data = await res.json();
      setListCategory(data);
    };
    getCate();

    const getProduct = async () => {
      const res = await fetch(
        `${server}/food/6576e938b2c51899369460d9`
      );
      const data = await res.json();
      setListProduct(data);
    };
    getProduct();
  }, []);
  function formatVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  
  return (
    <View>
      <Header />
      <ScrollView>
        <View style={styles.sliderContainer}>
          <Swiper style={styles.wrapper}>
            <View style={styles.slide1}>
              <Image
                source={require("../assets/Vinid-750x356.png")}
                resizeMode="contain"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide2}>
              <Image
                source={require("../assets/e76527be-bannerweb_dichoonline_1920x1080.webp")}
                resizeMode="contain"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide3}>
              <Image
                source={require("../assets/e76527be-bannerweb_dichoonline_1920x1080.webp")}
                resizeMode="contain"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>
        <View>
          <Text style={styles.text_category}>Danh mục sản phẩm</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.main_category}>
            {listCategory &&
              listCategory.map((value, id) => {
                return (
                  <>
                    <TouchableOpacity
                      style={styles.touchableArea}
                      onPress={() => handleDetailCategory(value._id)}>
                      <View style={styles.item_category}>
                        <Image
                          source={require("../assets/img-thucphamtonghop.jpeg")}
                          resizeMode="contain"
                          style={styles.img_item}
                        />
                        <Text style={styles.name_category}>{value.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
          </View>
        </ScrollView>

        <View>
          <Text style={styles.name_cate_main}>Sữa</Text>
        </View>

        <View style={styles.main_product}>
          <FlatList
            data={listProduct}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.name}
            numColumns={2}
          />
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main_product: {
    marginBottom: 200,
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
  name_category: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
  },
  name_cate_main: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  main_category: {
    flexDirection: "row",
    padding: 0,
    flex: 1,
  },
  item_category: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 100,
  },
  img_item: {
    height: 50,
  },
  sliderContainer: {
    height: 200,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderImage: {
    width: "100%",
    height: "100%",
  },
  text_category: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
