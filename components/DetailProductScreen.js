import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { Button } from "react-native-paper";
const DetailProductScreen = () => {
  return (
    <View>
      <HeaderGoBack title="Chi tiết sản phẩm" />
      <View style={styles.main_detail}>
        <Image
          style={styles.img_product}
          source={{
            uri: "https://cdn.tgdd.vn/Products/Images/8790/297340/bhx/-202306211455508775.jpg",
          }}
          resizeMode="contain"
        />
        <Text style={styles.name}>
          Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)
        </Text>
        <View style={styles.price_btn}>
          <Text style={styles.price}>200000</Text>
          <Button
            icon="cart-arrow-down"
            mode="contained"
            style={styles.btn_add_to_cart}>
            Thêm vào giỏ
          </Button>
        </View>

        <Text style={styles.title_mota}>Mô tả sản phẩm</Text>
        <Text style={styles.des}>
          Thịt đùi heo CP đạt các tiêu chuẩn về an toàn toàn thực phẩm, đảm bảo
          chất lượng, độ tươi ngon. Thịt đùi heo chủ yêu là phần nạc nên rất phù
          hợp cho người có chế độ ăn kiêng, giảm cân giữ dáng. Thịt heo có thể
          luộc, xào, chiên hoặc kho tuỳ thích. Quét mã QR trên tem sản phẩm để
          kiểm tra nguồn gốc
        </Text>
      </View>
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
