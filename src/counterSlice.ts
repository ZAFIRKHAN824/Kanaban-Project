import { createSlice } from "@reduxjs/toolkit";

export type Task = {
  title: string;
  description: string;
  dueDate: string;
  tags?: Option[];
  creationDate: string;
  id: number;
  status : "to-do" | "in-progress" |"in-review" |"done"
};

export type Option = {
  value: string,
  label: string,
  color: string
}

interface InitialStateTypes {
  tasks: Task[];
  selectedTask: Task | undefined;
  options: Option[] | undefined
 
}
const initialState: InitialStateTypes = {
  tasks: JSON.parse(
    localStorage.getItem("localStoredTask") || "[]"
  ),
  options: JSON.parse(
    localStorage.getItem("localStoredOptions") || "[]"
  ),
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
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    },
    setOptionsColor: (state, action) => {
      state.options = action.payload
    },
    setOptions: (state:any, action) => {
      const newOptions = action.payload.filter(
        (newOption: any) => !state.options.some((option: any) => option.value === newOption.value)
      );
      state.options = [...state.options, ...newOptions];
    }
    

  },
});

// Action creators are generated for each case reducer function
export const { addTask,updateTask, setSelectedTask,deleteTask,setOptionsColor,setOptions } = counterSlice.actions;

export default counterSlice.reducer;
