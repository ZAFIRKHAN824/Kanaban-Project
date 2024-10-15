import React from "react";
import { Modal, Tag } from "antd";
import "../taskCard.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { setSelectedTask, Task } from "../counterSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { colorList } from "../utils";

const TaskDetailsModal = ({
  isModalOpen,
  setModalOpen,
  setCreateTaskModal,
  onClickDelete,
}: {
  onClickDelete: () => void;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const taskDetails = useAppSelector(
    (state: any) => state?.board?.selectedTask
  ) as Task;
  const dispatch = useAppDispatch();
  if (!taskDetails) return;
  const { title, creationDate, description, dueDate, id, status, tags } =
    taskDetails;

  const dueDateObj = new Date(dueDate);
  const currDate = new Date();
  console.log("tagsnew", tags);

  return (
    <Modal
      title="Task Details"
      open={isModalOpen}
      onOk={() => {
        setModalOpen(false);
        dispatch(setSelectedTask(undefined));
      }}
      style={{
        color: "blue",
      }}
      onCancel={() => {
        setModalOpen(false);
        dispatch(setSelectedTask(undefined));
      }}
    >
      <p>
        <span style={{ float: "right" }}>
          <DeleteOutlined onClick={onClickDelete} />
        </span>
        <br />
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
            <Tag color={`${value.color}`}>{value.value}</Tag>
          </span>
        ))}
      </p>
    </Modal>
  );
};

export default TaskDetailsModal;
