import React from "react";
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleDetailProduct = () => {
    navigation.navigate("detailproduct");
  };
  const handleDetailCategory = () => {
    navigation.navigate("detailcategory");
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

  return (
    <View>
      <Header />

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
          <TouchableOpacity
            style={styles.touchableArea}
            onPress={handleDetailCategory}>
            <View style={styles.item_category}>
              <Image
                source={require("../assets/img-thucphamtonghop.jpeg")}
                resizeMode="contain"
                style={styles.img_item}
              />
              <Text style={styles.name_category}>Thực phẩm tổng hợp</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableArea}
            onPress={handleDetailCategory}>
            <View style={styles.item_category}>
              <Image
                source={require("../assets/img-thucphamtonghop.jpeg")}
                resizeMode="contain"
                style={styles.img_item}
              />
              <Text style={styles.name_category}>Thực phẩm tổng hợp</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableArea}
            onPress={handleDetailCategory}>
            <View style={styles.item_category}>
              <Image
                source={require("../assets/img-thucphamtonghop.jpeg")}
                resizeMode="contain"
                style={styles.img_item}
              />
              <Text style={styles.name_category}>Thực phẩm tổng hợp</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableArea}
            onPress={handleDetailCategory}>
            <View style={styles.item_category}>
              <Image
                source={require("../assets/img-thucphamtonghop.jpeg")}
                resizeMode="contain"
                style={styles.img_item}
              />
              <Text style={styles.name_category}>Thực phẩm tổng hợp</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableArea}
            onPress={handleDetailCategory}>
            <View style={styles.item_category}>
              <Image
                source={require("../assets/img-thucphamtonghop.jpeg")}
                resizeMode="contain"
                style={styles.img_item}
              />
              <Text style={styles.name_category}>Thực phẩm tổng hợp</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View>
        <Text style={styles.name_cate_main}>Thực phẩm tổng hợp</Text>
      </View>

      <View style={styles.main_product}>
        <FlatList
          data={dataFake}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
