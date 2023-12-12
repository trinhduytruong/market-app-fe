import React , { useEffect , useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const DetailCategory = () => {
  const navigation = useNavigation();
  const idCategory = useSelector((state) => state.idCategory);
  console.log(idCategory);
  const handleDetailProduct = () => {
    navigation.navigate("detailproduct");
  };
  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.item_product}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.img_product}
        />
        <Text onPress={handleDetailProduct} style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>{formatVND(item.price)} VND</Text>

        <Button
          icon="cart-arrow-down"
          mode="contained"
          style={styles.btn_add_to_cart}>
          Thêm vào giỏ
        </Button>
      </View>
    );
  };
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
  const [listProduct , setListProduct] = useState([])
  useEffect(()=>{
    const getProduct = async () =>{
      const res = await fetch(`http://localhost:8889/api/food/${idCategory}`)
      const data = await res.json()
      setListProduct(data)
    }
    getProduct()
  },[])
  function formatVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  return (
    <View>
      <HeaderGoBack title="Danh mục sản phẩm" />

      <View style={styles.main_product}>
        <FlatList
          data={listProduct}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default DetailCategory;
const styles = StyleSheet.create({
 
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

  btn_add_to_cart: {
    backgroundColor: "#00CC33",
  },
});
