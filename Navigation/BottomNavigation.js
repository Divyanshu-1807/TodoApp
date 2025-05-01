import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("TodoList")}>
        <Icon name="clipboard-text" size={28} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <Icon name="plus" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="account" size={28} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles=StyleSheet.create({
    bottomNav: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 5,
      backgroundColor: "#fff",
      borderTopWidth: 0.5,
      borderColor: "#ccc",
      elevation: 10, // Add this if it's getting overlapped
      zIndex: 10,
    },
    fab: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#fdd835",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
})

export default BottomNav