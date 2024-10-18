import "./App.css";
import { useEffect, useState } from "react";
import { Button, Select } from "antd";

import ColumnCard from "./columnCard";
import TaskDetailsModal from "./modals/taskDetailsModal";
import CreateTaskModal from "./modals/CreateTaskModal";
import { deleteTask, setSelectedTask, Task } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { SearchOutlined } from "@ant-design/icons";
import { colorList } from "./utils";
import { DefaultOptionType } from "antd/es/select";
import { BaseOptionType } from "antd/es/cascader";

function App() {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [sortingOptions] = useState<(DefaultOptionType | BaseOptionType)[]>([
    { value: "A-Z", label: "A to Z" },
    { value: "Z-A", label: "Z to A" },
    { value: "Recent", label: "Most Recent Created Task" },
    { value: "least", label: "Most Oldest Created Task" },
    { value: "nearest", label: "Most Nearest Due Dates" },
    { value: "door", label: "door ki dates" },
  ]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");

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
    alert("Task Deleted !");
  };
  const handleChange = (value: string[]) => {
    setFilteredTags(value); // Combine the previous state with the new value
  };
  const handleSortingCange: any = (value: string) => {
    setSelectedSortOption(value);
    console.log("selectedOption", selectedSortOption);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div id="filter">
          <Select
            mode="tags"
            style={{
              width: "100%",
              height: 35,
              fontSize: 20,
              textAlign: "center",
            }}
            placeholder="Filter By Tags"
            onChange={handleChange}
            options={options}
          />
        </div>
        <div id="sorting">
          <Select
            allowClear
            style={{
              width: "100%",
              height: 35,
              fontSize: 20,
              textAlign: "center",
            }}
            placeholder="Sorting"
            options={sortingOptions}
            onChange={handleSortingCange}
          />
        </div>
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
      </div>
      <div>
        {" "}
        <ColumnCard
          setTaskDetailsModalOpen={setTaskDetailsModalOpen}
          searchedTask={searchedTask}
          filteredTags={filteredTags}
          selectedSortOption={selectedSortOption}
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
