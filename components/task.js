import DropdownMenu from "./dropDownMenu";

const Task = ({ task, toggleTaskStatus }) => {
  const styles = {
    DONE: "lime",
    ACTIVE: "rose",
    TODO: "bg-white",
  };
  return (
    <div
      onclick={() => toggleTaskStatus(task.id, "ACTIVE")}
      className={"rounded-sm m-1 p-2 " + styles[task.status]}
    >
      <div className="text-black flex justify-between items-center">
        <div>
          <h1 className="text-lg">{task.title}</h1>
          <p className="text-sm block text-slate truncate">
            {task.description}
          </p>
        </div>
        <DropdownMenu task={task} toggleTaskStatus={toggleTaskStatus} />
      </div>
    </div>
  );
};

export default Task;
