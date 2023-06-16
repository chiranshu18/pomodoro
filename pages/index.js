import Link from "next/link";
import About from "../components/About";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

const indexPage = () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
      window.location.href = "/pomodoro";
    }
  }, []);

  return (
    <div className="w-100 h-screen bg-gray-800 text-white">
      <Link href="/pomodoro">
        <h1 className="px-10 py-3 text-3xl cursor-pointer">Pomodoro</h1>
      </Link>
      <div>
        <About />
      </div>
    </div>
  );
};

export default indexPage;
