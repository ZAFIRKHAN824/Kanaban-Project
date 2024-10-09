import React from "react";
import { Modal, Tag } from "antd";
import "../taskCard.css";
import { EditOutlined } from "@ant-design/icons";
import { Task } from "../counterSlice";
import { useAppSelector } from "../store";
import { color } from "../utils";

const TaskDetailsModal = ({
  isModalOpen,
  setModalOpen,
  setCreateTaskModal,
}: {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const taskDetails = useAppSelector(
    (state: any) => state?.board?.selectedTask
  ) as Task;
  if (!taskDetails) return;
  const { title, creationDate, description, dueDate, id, status, tags } =
    taskDetails;

  const dueDateObj = new Date(dueDate);
  const currDate = new Date();

  return (
    <Modal
      title="Task Details"
      open={isModalOpen}
      onOk={() => setModalOpen(false)}
      style={{
        color: "blue",
      }}
    >
      <p>
        <strong>Title:</strong> {title}
        <span style={{ float: "right" }}>
          <EditOutlined
            onClick={() => {
              setModalOpen(false);
              setCreateTaskModal(true);
            }}
          />
        </span>
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Creation Date:</strong> {creationDate}
      </p>
      <p
        style={{
          color:
            (dueDateObj.getTime() - currDate.getTime()) /
              (1000 * 60 * 60 * 24) <=
            1
              ? "red"
              : "null",
        }}
      >
        <strong>Due Date:</strong> {dueDate}
      </p>
      <p>
        <strong>Tags:</strong>{" "}
        {tags?.map((value, index) => (
          <span key={index}>
            <Tag color={`${color[index]}`}>{value}</Tag>
          </span>
        ))}
      </p>
    </Modal>
  );
};

export default TaskDetailsModal;
