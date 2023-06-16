import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

const DropdownMenuDemo = ({ task, toggleTaskStatusToDone, deleteTask }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <BsThreeDotsVertical />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={() => {
              toggleTaskStatusToDone(task.id, "DONE");
            }}
          >
            Mark as complete
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem hover:bg-red-600"
            onClick={() => {
              console.log("delete task: ", task.id)
              deleteTask(task.id);
            }}
          >
            Remove
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
