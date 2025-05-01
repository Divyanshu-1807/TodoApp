import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";

export const TodoContext = createContext();

const initialState=[]

const categoryColors = {
    Family: "#FFB6C1",
    Work: "#ADD8E6",
    Birthday: "#FFD700",
    Festival: "#FFA07A",
    Casual: "#90EE90",
    Important: "#FF6347",  
    Special: "#BA55D3", 
};
function todoReducer(state,action){
    switch (action.type) {  
        case "INIT":
            return action.payload
        case "ADD":
            // return [...state,{id:nanoid(),title:action.payload}];
            return [
                ...state,
                {
                  id: nanoid(),
                  title: action.payload.title,
                  description: action.payload.description || "",
                  category: action.payload.category || "Casual",
                  date: action.payload.date || new Date().toISOString(),
                  color: categoryColors[action.payload.category] || "#eeeeee",
                },
            ];
        case "DELETE":
            return state.filter((item)=>item.id!==action.payload);
        case "UPDATE":
            // return state.map((item)=>item.id===action.payload.id ? {...item,title:action.payload.title} : item);
            return state.map((item) =>
                item.id === action.payload.id
                  ? {
                      ...item,
                      title: action.payload.title,
                      description: action.payload.description,
                      category: action.payload.category,
                      date: action.payload.date,
                      color: categoryColors[action.payload.category] || "#eeeeee",
                    }
                  : item
              );
        default:
            return state;
    }
}

export const TodoProvider = ({children}) => {
    const [ data, dispatch ]=useReducer(todoReducer,initialState);
    
    useEffect(()=>{
        const loadTodos = async () => {
            const todos=await AsyncStorage.getItem("todos");
            if(todos!=null){
                dispatch({type:"INIT",payload:JSON.parse(todos)})
            }
        }
        loadTodos()
    },[])

    useEffect(()=>{
        const saveTodos = async () => {
            await AsyncStorage.setItem("todos",JSON.stringify(data));
        }
        saveTodos()
    },[data])

    return (
        <TodoContext.Provider value={{data,dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}