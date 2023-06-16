import React, { useRef, useState, useEffect } from "react";
import ModalSetting from "../components/ModalSetting";
import Alarm from "../components/Alarm";
import Navigation from "../components/Navigation";
import Timer from "../components/Timer";
import TaskList from "../components/tasklist";
import axios from "axios";

import { useUser } from "@auth0/nextjs-auth0/client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function Home() {
  const [POMODORO, SHORTBREAK, LONGBREAK] = [25, 5, 10];

  const [openSetting, setOpenSetting] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [poromodo, setPomodo] = useState(POMODORO);
  const [shortBreak, setShortBreak] = useState(SHORTBREAK);
  const [longBreak, setLongBreak] = useState(LONGBREAK);
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState(0);
  const [consumedSecond, setConsumedSecond] = useState(0);
  const [countTask, setCountTask] = useState(0);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      axios
        .get("http://localhost:3000/api/user", {
          params: {
            id: user.sid,
          },
        })
        .then((response) => {
          setTasks(response.data.tasks || []);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            axios
              .post("http://localhost:3000/api/user", {
                id: user.sid,
                name: user.nickname || user.email,
              })
              .then((response) => {});
          }
        });
    }
    // make an axios call to get user data
  }, []);

  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Task 1",
    //   description: "Description for task",
    //   status: "ACTIVE",
    //   dueDate: new Date(),
    //   tomatoes: 1,
    //   createdAt: new Date(),
    // },
    // {
    //   id: 2,
    //   title: "Task 2",
    //   description: "Description for task",
    //   status: "TODO",
    //   dueDate: new Date(),
    //   tomatoes: 1,
    //   createdAt: new Date(),
    // },
    // {
    //   id: 3,
    //   title: "Task 3",
    //   description: "Description for task",
    //   status: "DONE",
    //   dueDate: new Date(),
    //   tomatoes: 1,
    //   createdAt: new Date(),
    // },
    // {
    //   id: 4,
    //   title: "Task 4",
    //   description: "Description for task",
    //   status: "TODO",
    //   dueDate: new Date(),
    //   tomatoes: 1,
    //   createdAt: new Date(),
    // },
    // {
    //   id: 5,
    //   title: "Task 5",
    //   description: "Description for task",
    //   status: "TODO",
    //   dueDate: new Date(),
    //   tomatoes: 1,
    //   createdAt: new Date(),
    // },
  ]);

  const deleteTask = (id) => {
    // setTasks([...tasks.filter((task) => task.id !== id)]);
    axios
      .delete("http://localhost:3000/api/task", {
        params: {
          id: id,
        },
      })
      .then(() => {
        axios
          .get("http://localhost:3000/api/user", {
            params: {
              id: user.sid,
            },
          })
          .then((response) => {
            setTasks(response.data.tasks || []);
          });
      });
  };

  const toggleTaskStatusToActive = (id) => {
    let curr = tasks.find((task) => task.id === id);
    if (curr.status === "DONE") {
      return;
    } else {
      tasks.forEach((task) => {
        task.status = task.status === "ACTIVE" ? "TODO" : task.status;
        if (task.id === id) {
          task.status = "ACTIVE";
        }
      });
    }
    setTasks([...tasks]);
  };

  const toggleTaskStatusToDone = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.status = "DONE";
        }
        return task;
      })
    );
  };

  const pomodoroRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();
  const alarmRef = useRef();

  const updateTimeDefaultValue = () => {
    setPomodo(pomodoroRef.current.value);
    setShortBreak(shortBreakRef.current.value);
    setLongBreak(longBreakRef.current.value);
  };

  const getTickingTime = () => {
    const timeStage = {
      0: poromodo,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage];
  };

  const updateMinute = () => {
    const updateStage = {
      0: setPomodo,
      1: setShortBreak,
      2: setLongBreak,
    };
    return updateStage[stage];
  };

  const switchStage = (index) => {
    reset();
    setStage(index);
  };

  const reset = () => {
    setConsumedSecond(0);
    setTicking(false);
    setPomodo(POMODORO);
    setShortBreak(SHORTBREAK);
    setLongBreak(LONGBREAK);
    setSeconds(0);
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
    if (stage === 0) {
      setTasks(
        tasks.map((task) => {
          if (task.status === "ACTIVE") {
            task.tomatoes += 1;
          }
          return task;
        })
      );
    }
    alarmRef.current.play();
    setTimeout(() => {
      muteAlarm();
      if (stage !== 0) {
        switchStage(0);
        startTimer();
        return;
      }
      setCountTask(countTask + 1);
      if (countTask === 3) {
        switchStage(2);
        setCountTask(0);
      } else {
        switchStage(1);
      }
      startTimer();
    }, 30);
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();
    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  };
  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  };

  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "Show warning" : null;
    };

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1);
        clockTicking();
      }
    }, 1);
    if (isTimeUp) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [poromodo, shortBreak, longBreak, ticking, seconds]);

  return (
    <>
      {isLoading && <div className="h-screen w-screen "></div>}
      {!isLoading && user && (
        <div className="min-h-screen  bg-gray-800 font-inter">
          <div className="max-w-2xl mx-auto min-h-screen flex flex-col">
            <Navigation setOpenSetting={setOpenSetting} />
            <div className="mt-10 ">
              <Timer
                switchStage={switchStage}
                getTickingTime={getTickingTime}
                stage={stage}
                ticking={ticking}
                startTimer={startTimer}
                seconds={seconds}
                muteAlarm={muteAlarm}
                isTimeUp={isTimeUp}
                reset={reset}
              />
            </div>

            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              toggleTaskStatusToActive={toggleTaskStatusToActive}
              toggleTaskStatusToDone={toggleTaskStatusToDone}
              deleteTask={deleteTask}
              getTickingTime={getTickingTime}
              seconds={seconds}
              user={user}
            />
          </div>
          <ModalSetting
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            pomodoroRef={pomodoroRef}
            shortBreakRef={shortBreakRef}
            longBreakRef={longBreakRef}
            updateTimeDefaultValue={updateTimeDefaultValue}
          />
          <Alarm ref={alarmRef} />
        </div>
      )}
    </>
  );
}
