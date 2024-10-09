import React from "react";
import { Modal, Tag } from "antd";
import "../taskCard.css";
import CreateTask from "../createTask";

const CreateTaskModal = ({
  isModalOpen,
  setModalOpen,
}: {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      style={{ color: "yellow", fontFamily: "cursive" }}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <CreateTask setCreateTaskModal={setModalOpen} />
    </Modal>
  );
};

export default CreateTaskModal;
