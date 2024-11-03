import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { useState } from "react";
import KebabMenu from "../assets/icons/kebab-menu.svg";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { authStoreActions } from "../store/authStore";
import { useDispatch } from "react-redux";

const HeaderAccount = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.caption}>My account</Text>
      <Menu
        visible={visible}
        anchor={
          <Pressable onPress={() => setVisible(true)}>
            <KebabMenu width={32} height={32} fill={"#edf1f3"} />
          </Pressable>
        }
        onRequestClose={() => setVisible(false)}
        style={styles.menuContainer}
      >
        <MenuItem onPress={() => dispatch(authStoreActions.logout())}>
          <View style={styles.menuItem}>
            <Icon
              name="logout"
              size={20}
              color="#edf1f3"
              style={styles.menuIcon}
            />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1b2045",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  caption: {
    color: "#edf1f3",
    fontSize: 32,
    fontWeight: "bold",
  },
  menuContainer: {
    backgroundColor: "#11132e",
    borderWidth: 0,
    borderRadius: 5,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  menuItemText: {
    color: "#edf1f3",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  menuIcon: {
    marginRight: 10, // Добавляем отступ справа от иконки
  },
});

export default HeaderAccount;
