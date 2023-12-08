import * as React from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import { Appbar } from "react-native-paper";

const Header = ({ navigation }) => {

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" color="#fff" size={30} />
        <Appbar.Action icon="bell-badge-outline" color="#fff" size={30} />
      </Appbar.Header>

    
    </>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00CC33",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  drawer: {
    zIndex: 100,
  },
});
