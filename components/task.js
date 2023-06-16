import DropdownMenu from "./dropDownMenu";
import { GiTomato } from "react-icons/gi";

const Task = ({
  task,
  toggleTaskStatusToActive,
  toggleTaskStatusToDone,
  deleteTask,
}) => {
  const styles = {
    DONE: "lime",
    ACTIVE: "rose",
    TODO: "bg-white",
  };
  return (
    <div
      onClick={() => toggleTaskStatusToActive(task.id)}
      className={"rounded-sm m-1 p-2 " + styles[task.status]}
    >
      <div className="text-black flex justify-between items-center">
        <div>
          <h1 className="text-lg">{task.title}</h1>
          <p className="text-sm block text-slate truncate">
            {task.description}
          </p>
          <div className="flex justify-between items-center w-[30px]">
            <p className="text-lg">{task.tomatoes}</p>
            <GiTomato color="red"/>
          </div>
        </div>
        <DropdownMenu
          task={task}
          toggleTaskStatusToDone={toggleTaskStatusToDone}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Task;
