import { createSlice } from "@reduxjs/toolkit";

export type Task = {
  title: string;
  description: string;
  dueDate: string;
  tags?: string[];
  creationDate: string;
  id: number;
  status : "to-do" | "in-progress" |"in-review" |"done"
  
};

interface InitialStateTypes {
  tasks: Task[];
  selectedTask: Task | undefined;
 
}
const initialState: InitialStateTypes = {
  tasks: [],
  selectedTask: undefined,
};

export const counterSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
      state.tasks.push(action.payload);
    },
    updateTask:(state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload
    },
    storedTaskLocally: (state, action) => {
      state.tasks = action.payload
    },
    // deleteTask: (state, action) => {
    //   state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    // }
  },
});

// Action creators are generated for each case reducer function
export const { addTask,updateTask, setSelectedTask,storedTaskLocally } = counterSlice.actions;

export default counterSlice.reducer;
