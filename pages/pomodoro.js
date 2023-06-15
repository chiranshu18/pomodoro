import React, { useRef, useState, useEffect } from "react";
import ModalSetting from "../components/ModalSetting";
import Alarm from "../components/Alarm";
import Navigation from "../components/Navigation";
import Timer from "../components/Timer";
import TaskList from "../components/tasklist";
// import About from "../components/About";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function Home() {
  const [POMODORO, SHORTBREAK, LONGBREAK] = [15, 5, 10];

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

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description for task",
      status: "ACTIVE",
      dueDate: new Date(),
      tomatoes: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for task",
      status: "TODO",
      dueDate: new Date(),
      tomatoes: 1,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description for task",
      status: "DONE",
      dueDate: new Date(),
      tomatoes: 1,
      createdAt: new Date(),
    },
    {
      id: 4,
      title: "Task 4",
      description: "Description for task",
      status: "TODO",
      dueDate: new Date(),
      tomatoes: 1,
      createdAt: new Date(),
    },
    {
      id: 5,
      title: "Task 5",
      description: "Description for task",
      status: "TODO",
      dueDate: new Date(),
      tomatoes: 1,
      createdAt: new Date(),
    },
  ]);

  const toggleTaskStatus = (id, status) => {
    tasks.forEach((element) => {
      if (element.id === id) {
        element.status = status;
      }
    });
    setTasks([...tasks]);
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
    alarmRef.current.play();
    setTimeout(() => {
      muteAlarm();
      console.log("timeout start");
      if (stage !== 0) {
        console.log("stage !== 1", stage);
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
      console.log("timeout before start");
      startTimer();
    }, 30);
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();
    console.log(minutes, seconds);
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
      <div className="min-h-screen  bg-gray-800 font-inter">
        <div className="max-w-2xl mx-auto min-h-screen flex flex-col">
          <Navigation setOpenSetting={setOpenSetting} />
          <div className="mt-10">
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
            toggleTaskStatus={toggleTaskStatus}
            getTickingTime={getTickingTime}
            seconds={seconds}
          />
          {/* <About /> */}
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
    </>
  );
}