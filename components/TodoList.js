import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext,useState,useEffect,useRef,useLayoutEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TodoContext } from "../context/TodoContext";
import BottomNav from "../Navigation/BottomNavigation";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const ITEMS_PER_PAGE = 4;
const TodoList = () => {
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(1);
  const [page, setPage] = useState(1);
  useFocusEffect(
    React.useCallback(() => {
      setPage(pageRef.current);
    }, [])
  );

  const { data, dispatch } = useContext(TodoContext);
  const navigation = useNavigation();

  const onDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleLoad = () => {
    if (ITEMS_PER_PAGE * page < data.length) {
      // setPage((prevPage) => prevPage + 1);
      pageRef.current += 1;
      setPage(pageRef.current);
    }
  };

  const renderItem = ({ item }) => {
    const dateObj = new Date(item.date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = dateObj.toLocaleString("default", { month: "short" });

    const renderRightActions = () => (
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.deleteBox}
      >
        <Icon name="delete" size={24} color="white" />
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={[styles.dateBox, { backgroundColor: item.color }]}>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.month}>{month}</Text>
          </View>

        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.chip,{backgroundColor:item.color}]}>
            <Text style={styles.chipText}>{item.category}</Text>
          </View>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
        </View>

        </View>

        <View style={styles.iconRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddTodo", { todo: item })}
            >
              <Icon name="pencil" size={22} color="#007bff" style={{ marginRight: 12 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <Icon name="delete" size={22} color="red" />
            </TouchableOpacity>
        </View>

      </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {/* <HamburgerMenu navigation={navigation} /> */}
      <FlatList
        data={data.slice(0, ITEMS_PER_PAGE * page)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        // onEndReached={handleLoad}
        // onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 80 }} 
        // ListFooterComponent={renderFooter}
      />

      {ITEMS_PER_PAGE * page < data.length && (
        <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoad}>
          <Text style={styles.loadMoreText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      )}

      <BottomNav />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 11,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:15,
  },
  dateBox: {
    width: 40,
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  month: {
    fontSize: 13,
    color: "#333",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardContent: {
    // marginTop: 10,
    justifyContent:"space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 16,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  loadMoreBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right:10,
    alignSelf:'flex-end',
    padding:15,
    backgroundColor: '#800000',
    borderRadius: 10,
    zIndex: 5,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

