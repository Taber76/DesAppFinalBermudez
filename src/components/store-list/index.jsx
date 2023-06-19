import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList } from "react-native";

import { loadStores, filterStores } from "../../store/stores.slice";

import StoreItem from "../store-item/index";
import { styles } from "./styles";

const StoreList = ({ category = "all" }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterStores(category));
  }, [category]);

  useEffect(() => {
    dispatch(loadStores());
  }, []);

  const stores = useSelector((state) => state.stores.stores); // state.stores.selected

  const onPress = () => {
    console.log("onPress");
  };

  const renderItem = ({ item, onPress }) => {
    return item ? <StoreItem item={item} /> : null;
  };

  const keyExtractor = (item) => {
    return item ? item.id.toString() : 0;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
};

export default StoreList;
