import * as React from "react";
import { Appbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GoHome = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = async () => {
    navigation.navigate("home")
  };

  return (
    <Appbar.Header style={styles.barGoback}>
      
      <View style={styles.main_bar}>
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
    textAlign : "center"
  },
  barGoback : {
    backgroundColor : "#00CC33"
  },
  main_bar : {
    flex: 1,
    justifyContent : 'center',
  }
});

export default GoHome;
