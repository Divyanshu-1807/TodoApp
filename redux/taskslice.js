import { createSlice, nanoid } from "@reduxjs/toolkit";

export const taskSlice=createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        addTask:(state,action)=>{
            // console.log(nanoid())
            // console.log(action.payload)
            const newTask={
                // id:action.payload.id,
                id:nanoid(),
                title:action.payload.task,
            }
            state.push(newTask);
        },
        deleteTask:(state,action)=>{
            return state.filter((item)=>item.id !== action.payload.id)
        },
        updateTask:(state,action)=>{
            const {id,newTitle}=action.payload;
            const item=state.find((item)=>item.id===id);
            item.title=newTitle;
        }
    },
});

export const {addTask,deleteTask,updateTask} = taskSlice.actions;
export default taskSlice.reducer;