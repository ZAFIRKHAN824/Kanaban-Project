import { Tag } from "antd";
import "./taskCard.css";
import { Task } from "./counterSlice";

function TaskCard({
  task,
  onClickTaskCard,
}: {
  task: Task;
  onClickTaskCard: () => void;
}) {
  const { title, description, dueDate, creationDate, tags } = task;
  const currDate = new Date();
  const dueDateObj = new Date(dueDate);

  return (
    <>
      <div className="taskCard" onClick={onClickTaskCard}>
        <div id="title">{title}</div>
        <br />
        <div id="descrip">{description}</div>
        <div>{creationDate}</div>
        <div
          style={{
            color:
              (dueDateObj.getTime() - currDate.getTime()) /
                (1000 * 60 * 60 * 24) <=
              1
                ? "red"
                : "black",
          }}
        >
          {dueDate}
        </div>

        <div id="tags">
          {" "}
          {tags?.map((value, index) => (
            <span key={index}>
              <Tag color={`${value.color}`}>{value.value}</Tag>
            </span>
          ))}{" "}
        </div>
      </div>
    </>
  );
}

export default TaskCard;
