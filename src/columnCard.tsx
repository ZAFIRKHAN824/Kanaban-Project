import React, { useEffect, useState } from "react";
import TaskCard from "./taskCard";
import { useAppSelector, useAppDispatch } from "./store";
import { addTask, setSelectedTask, Task } from "./counterSlice";

function ColumnCard({
  filteredTags,
  setTaskDetailsModalOpen,
  searchedTask,
  selectedSortOption,
}: {
  selectedSortOption: string;
  filteredTags: string[];
  searchedTask: string;
  setTaskDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const tasks = useAppSelector((state: any) => state?.board?.tasks) as Task[];

  useEffect(() => {
    console.log("tasks: ", tasks);
  }, [tasks]);
  const dispatch = useAppDispatch();

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [titleFirstLetter, setTitleFirstLetter] = useState<string[]>([]);

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

  useEffect(() => {
    console.log("filteredTags: ", filteredTags);
  }, [filteredTags]);

  function sortedTasks(status: string) {
    const sortedTasks = tasks
      .filter((task) => task.status === status)
      .sort((a, b) => {
        if (selectedSortOption === "A-Z") {
          if (a.title > b.title) {
            return 1;
          }
          if (b.title > a.title) {
            return -1;
          }
          return 0;
        } else if (selectedSortOption === "Z-A") {
          if (a.title > b.title) {
            return -1;
          }
          if (b.title > a.title) {
            return 1;
          }
          return 0;
        } else if (selectedSortOption === "Recent") {
          const dateA = new Date(a.creationDate).getTime();
          const dateB = new Date(b.creationDate).getTime();

          if (dateA > dateB) {
            return -1;
          }
          if (dateA < dateB) {
            return 1;
          }
        } else if (selectedSortOption === "least") {
          const dateA = new Date(a.creationDate).getTime();
          const dateB = new Date(b.creationDate).getTime();

          if (dateA > dateB) {
            return 1;
          }
          if (dateA < dateB) {
            return -1;
          }
        } else if (selectedSortOption === "nearest") {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();

          if (dateA > dateB) {
            return 1;
          }
          if (dateA < dateB) {
            return -1;
          }
        } else if (selectedSortOption === "door") {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();

          if (dateA > dateB) {
            return -1;
          }
          if (dateA < dateB) {
            return 1;
          }
        }
        return 0;
      });
    console.log("sortedTasks: ", sortedTasks);
    return sortedTasks;
  }

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

              {sortedTasks(status).map((card: Task) => {
                return (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id.toString())}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {(card.title
                      .toLocaleLowerCase()
                      .includes(searchedTask.toLocaleLowerCase()) ||
                      card.description
                        .toLocaleLowerCase()
                        .includes(searchedTask.toLocaleLowerCase())) &&
                    (filteredTags.length === 0 ||
                      filteredTags?.every((tag) =>
                        card.tags?.map((tag) => tag.value)?.includes(tag)
                      )) ? (
                      <TaskCard
                        task={card}
                        onClickTaskCard={() => onClickTaskCard(card)}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ColumnCard;
