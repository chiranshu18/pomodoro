import Link from "next/link";
import About from "../components/About";


const indexPage = () => {
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
