import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { loadStores } from "../../store/stores.slice";

import StoreItem from "../store-item/index";
import { styles } from "./styles";

const StoreList = ({ category = 0 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStores());
  }, [dispatch]);

  const stores = useSelector((state) => state.store);

  const onPress = () => {
    console.log("onPress");
  };
  const renderItem = ({ item, onPress }) => {
    return <StoreItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default StoreList;
