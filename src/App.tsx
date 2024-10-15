import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "antd";

import ColumnCard from "./columnCard";
import TaskDetailsModal from "./modals/taskDetailsModal";
import CreateTaskModal from "./modals/CreateTaskModal";
import { deleteTask, setSelectedTask, Task } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { SearchOutlined } from "@ant-design/icons";
import { colorList } from "./utils";

function App() {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [searchedTask, setSearchedTask] = useState("");
  const { tasks, options } = useAppSelector((state: any) => state?.board);
  const taskDetails = useAppSelector(
    (state: any) => state?.board?.selectedTask
  );

  let dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("localStoredTask", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const options = JSON.parse(
      localStorage.getItem("localStoredOptions") || "[]"
    );
    if (options.length > 0) return;
    localStorage.setItem(
      "localStoredOptions",
      JSON.stringify([
        { value: "front-end", label: "Front end", color: colorList[0] },
        { value: "back-end", label: "Back end", color: colorList[1] },
      ])
    );
  }, []);

  useEffect(() => {
    if (options.length > 0)
      localStorage.setItem("localStoredOptions", JSON.stringify(options));
  }, [options]);
  // modal states

  const onClickDelete = (task: Task) => {
    setTaskDetailsModalOpen(false);
    dispatch(deleteTask(task));
    dispatch(setSelectedTask(undefined));
  };

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
            id="InputSearchTask"
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
        onClickDelete={() => onClickDelete(taskDetails)}
      />
      <CreateTaskModal
        isModalOpen={createTaskModalOpen}
        setModalOpen={setCreateTaskModalOpen}
      />
    </>
  );
}

export default App;
