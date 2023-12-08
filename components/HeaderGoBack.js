import * as React from "react";
import { Appbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";



const HeaderGoBack = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header style={styles.barGoback}>
      <Appbar.BackAction onPress={handleGoBack} color="#fff" />
      <View>
        <Text style={styles.title_goback}>{title}</Text>
      </View>
      <View></View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title_goback: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
  },
  barGoback : {
    backgroundColor : "#00CC33"
  }
});

export default HeaderGoBack;
