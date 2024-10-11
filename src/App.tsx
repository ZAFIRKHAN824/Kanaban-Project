import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "antd";

import ColumnCard from "./columnCard";
import TaskDetailsModal from "./modals/taskDetailsModal";
import CreateTaskModal from "./modals/CreateTaskModal";
import { storedTaskLocally, Task } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const [PageMounted, setPageMounted] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [searchedTask, setSearchedTask] = useState("");
  const tasks = useAppSelector((state: any) => state?.board?.tasks) as Task[];

  let dispatch = useAppDispatch();

  useEffect(() => {
    let localStoredTask = JSON.parse(
      localStorage.getItem("localStoredTask") || "[]"
    );
    dispatch(storedTaskLocally(localStoredTask));
    setPageMounted(true);
  }, []);

  useEffect(() => {
    if (tasks.length > 0)
      localStorage.setItem("localStoredTask", JSON.stringify(tasks));
  }, [tasks, PageMounted]);
  // modal states

  return (
    <>
      <div id="header">Welcome To Kanban Board</div>
      <Button
        type="primary"
        className="createTaskButt create text-lg border-2x"
        onClick={() => {
          setCreateTaskModalOpen(true);
        }}
      >
        {" "}
        Create Task
      </Button>{" "}
      <div id="serachTask">
        <span style={{ marginRight: "20px" }}>
          <input
            placeholder="Search by Title or Description"
            onChange={(e) => setSearchedTask(e.target.value)}
            type="text"
          />
        </span>
        <SearchOutlined />
      </div>
      <div>
        {" "}
        <ColumnCard
          setTaskDetailsModalOpen={setTaskDetailsModalOpen}
          searchedTask={searchedTask}
        />
      </div>
      <TaskDetailsModal
        isModalOpen={taskDetailsModalOpen}
        setModalOpen={setTaskDetailsModalOpen}
        setCreateTaskModal={setCreateTaskModalOpen}
      />
      <CreateTaskModal
        isModalOpen={createTaskModalOpen}
        setModalOpen={setCreateTaskModalOpen}
      />
    </>
  );
}

export default App;
