import React from "react";
import { Modal } from "antd";
import "../taskCard.css";
import CreateTask from "../createTask";
import { useAppDispatch } from "../store";
import { setSelectedTask } from "../counterSlice";
import { SmallDashOutlined } from "@ant-design/icons";

const CreateTaskModal = ({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      style={{ color: "yellow", fontFamily: "cursive" }}
      onCancel={() => {
        setModalOpen(false);
        dispatch(setSelectedTask(undefined));
      }}
      footer={null}
    >
      <CreateTask setCreateTaskModal={setModalOpen} />
    </Modal>
  );
};

export default CreateTaskModal;
