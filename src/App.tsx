import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "antd";

import ColumnCard from "./columnCard";
import TaskDetailsModal from "./modals/taskDetailsModal";
import CreateTaskModal from "./modals/CreateTaskModal";
import { useAppSelector } from "./store";

function App() {
  // modal states
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
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
      <div>
        {" "}
        <ColumnCard setTaskDetailsModalOpen={setTaskDetailsModalOpen} />
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
