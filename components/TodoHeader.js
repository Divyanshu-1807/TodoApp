  import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useContext, useState, useRef } from "react";
  import { useDispatch } from "react-redux";
  import { addTask } from "../redux/taskslice";
  import { TodoContext } from "../context/TodoContext";
  import DateTimePicker from '@react-native-community/datetimepicker';
  import { useRoute, useNavigation } from "@react-navigation/native";
  import BottomNav from "../Navigation/BottomNavigation";
  import * as Animatable from 'react-native-animatable';

  const categories = ["Family", "Work", "Birthday", "Festival", "Casual", "Important","Special"];
  const TodoHeader = () => {
    const buttonRef = useRef(null)
    const {dispatch}=useContext(TodoContext)
    // const dispatch=useDispatch()
    const route = useRoute();
    const navigation = useNavigation();
    const editTodo = route.params?.todo;

    const [title, setTitle] = useState(editTodo?.title || "");
    const [description, setDescription] = useState(editTodo?.description || "");
    const [category, setCategory] = useState(editTodo?.category || "");
    const [date, setDate] = useState(editTodo?.date ? new Date(editTodo.date) : null);
    const [showPicker, setShowPicker] = useState(false);
    
    const onSubmit=()=>{
      buttonRef.current?.rubberBand?.();

      if(title.trim().length===0){
        // Alert.alert("Add Title","Title field is empty!!")       
        return
      }
      if(!date){
        Alert.alert("Select Date","You must selct a date!!s")       
        return
      }

      if (editTodo) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: editTodo.id,
            title: title.trim(),
            description: description.trim(),
            category: category,
            date: date.toISOString(),
          },
        });
        navigation.goBack();
      } else{
        dispatch({
          type: "ADD",
          payload: {
            title: title.trim(),
            description: description.trim(),
            category: category,
            date: date.toISOString(), 
          },
        });
      }
      setTitle("")
      setDescription("")
      setCategory("")
      setDate(null)  

      // dispatch(
      //   addTask({
      //     task:todo,
      //   })
      // );

      // setTodo("")
    }
    
    const onChange = (event, selectedDate) => {
      setShowPicker(false); 
      if (selectedDate) setDate(selectedDate);
    };

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Todo List
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap:10,
            marginTop:10,
          }}
        >

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor="gray"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={{ width:"100%" }}>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
              <Text style={{ color: date ? 'black' : 'gray', fontSize:18 }}>
                {date ? date.toDateString() : 'Select Date'}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date || new Date() }
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <View style={styles.categoryWrap}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.selectedChip,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.selectedText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Animatable.View ref={buttonRef} 
          style={{
            width: "100%",
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: editTodo ? "green" : "black" ,
              padding: 10,
              // margin: 10,
              // width: "100%",
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={onSubmit} 
          >
            <Text style={{ color: "white" }}>{editTodo ? "Save" : "Add"}</Text>
          </TouchableOpacity>
          </Animatable.View>

        </View>
        <BottomNav></BottomNav>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding:20,
    },
    input: {
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 7,
      padding: 10,
      // margin: 10,
      fontSize: 18,
      width: "100%",
    },
    dateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    categoryWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      // justifyContent:"center",
    },
    categoryChip: {
      borderWidth: 1,
      backgroundColor: "gray",
      borderColor: "gray",
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 14,
      marginRight: 10,
      marginBottom: 10,
      height:35,
    },
    selectedChip: {
      backgroundColor: "black",
      borderColor: "blue",
      borderWidth:2,
      paddingVertical:4,
    },
    categoryText: {
      color: "white",
      fontWeight: "500",
      fontSize:14,
    },
    selectedText: {
      color: "white",
      fontSize:16,
    },
  });
  export default TodoHeader;