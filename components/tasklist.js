import Task from "./task";
import { DateTime } from "luxon";

const TaskList = ({
  tasks,
  toggleTaskStatusToActive,
  toggleTaskStatusToDone,
  getTickingTime,
  seconds,
}) => {
  const finishAt = () => {
    const now = DateTime.now();
    const finishAt = now.plus({ minutes: getTickingTime(), seconds: seconds });
    return finishAt.toLocaleString(DateTime.TIME_SIMPLE);
  };
  return (
    <div className="rounded-lg flex flex-col justify-center w-6/12 m-auto">
      <div className="border-b border-slate-100 text-white text-3xl text-center">
        <h1>Tasks</h1>
      </div>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskStatusToActive={toggleTaskStatusToActive}
            toggleTaskStatusToDone={toggleTaskStatusToDone}
          />
        ))}
      </div>
      <div className="bg-white bg-opacity-25 p-2 rounded-b-lg border-t border-slate-100 text-center">
        <span className="text-white mr-2">
          Pomos: <span className="text-xl">1/2</span>
        </span>
        <span className="text-white">
          Finish At: <span className="text-xl">{finishAt()}</span>
        </span>
      </div>
    </div>
  );
};
export default TaskList;
