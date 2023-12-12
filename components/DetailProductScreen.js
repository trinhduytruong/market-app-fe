import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import axios from "axios";

const DetailProductScreen = () => {
  const idProduct = useSelector((state) => state.idProduct);
  const userId = useSelector((state) => state.userId);
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `http://localhost:8889/api/food/detail/${idProduct}`
      );
      const data = await res.json();
      setDetailProduct(data);
      
    };
    getProduct();
  }, []);
  function formatVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

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
        `http://localhost:8889/api/user/addtocart/${userId}`,
        {
          foodId: productId,
          quantity: 1, // hoặc số lượng mà người dùng chọn
        }
      );

      // Xử lý phản hồi từ server
      console.log(response.data);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Sản phẩm đã được thêm vào giỏ hàng.',
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể thêm sản phẩm vào giỏ hàng.',
      });
    }
  };
  return (
    <View>
      <HeaderGoBack title="Chi tiết sản phẩm" />
      {detailProduct && (
        <View style={styles.main_detail}>
          <Image
            style={styles.img_product}
            source={{
              uri: detailProduct.image,
            }}
            resizeMode="contain"
          />
          <Text style={styles.name}>{detailProduct.name}</Text>
          <View style={styles.price_btn}>
            <Text style={styles.price}>{formatVND(detailProduct.price)}</Text>
            <Button
              icon="cart-arrow-down"
              mode="contained"
              style={styles.btn_add_to_cart} onPress={()=>handleAddToCart(detailProduct._id)}>
              Thêm vào giỏ
            </Button>
          </View>

          <Text style={styles.title_mota}>Mô tả sản phẩm</Text>
          <Text style={styles.des}></Text>
          <Text style={styles.title_mota}>NSX và HSD</Text>
          <Text style={styles.des}>
            {detailProduct.productionDate} - {detailProduct.expirationDate}
          </Text>
        </View>
      )}
      <Toast  />
    </View>
  );
};

export default DetailProductScreen;
const styles = StyleSheet.create({
  des: {
    paddingHorizontal: 20,
    fontSize: 17,
  },
  title_mota: {
    padding: 20,
    fontSize: 22,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  },
  main_detail: {
    paddingVertical: 20,
  },
  img_product: {
    width: "100%",
    height: 200,
  },
  price_btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  btn_add_to_cart: {
    backgroundColor: "#00CC33",
  },
  price: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 25,
  },
});
