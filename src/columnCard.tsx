import React, { useEffect, useState } from "react";
import TaskCard from "./taskCard";
import { useAppSelector, useAppDispatch } from "./store";
import { addTask, setSelectedTask, Task } from "./counterSlice";

function ColumnCard({
  setTaskDetailsModalOpen,
}: {
  setTaskDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const tasks = useAppSelector((state: any) => state?.board?.tasks) as Task[];

  useEffect(() => {
    console.log("tasks: ", tasks);
  }, [tasks]);
  const dispatch = useAppDispatch();

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    setDraggedTaskId(taskId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary for the drop event to work
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: string,
    columnIndex: number
  ) => {
    event.preventDefault();
    if (draggedTaskId) {
      const draggedTask = tasks.find(
        (task) => task.id.toString() === draggedTaskId
      );

      if (draggedTask) {
        // Update the task status based on where it's dropped
        const updatedTask = { ...draggedTask, status: newStatus };
        dispatch(addTask(updatedTask));
      }
    }

    setDraggedTaskId(null);
  };

  const onClickTaskCard = (task: Task) => {
    setTaskDetailsModalOpen(true);
    dispatch(setSelectedTask(task));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {["to-do", "in-progress", "in-review", "done"].map(
          (status, columnIndex) => (
            <div
              key={status}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status, columnIndex)}
              style={{
                height: 300,
                width: 400,

                marginRight: "20px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  border: "2px solid black",
                  textAlign: "center",
                  marginTop: 20,
                  backgroundColor: "lightgrey",
                  fontWeight: "bold",
                }}
              >
                {status.toUpperCase()}
              </div>

              {tasks
                ?.filter((task) => task.status === status)
                .map((card: Task) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id.toString())}
                    style={{
                      cursor: "pointer",
                      border: "1px solid red",
                    }}
                  >
                    <TaskCard
                      task={card}
                      onClickTaskCard={() => onClickTaskCard(card)}
                    />
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ColumnCard;
