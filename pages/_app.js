import "tailwindcss/tailwind.css";
import "../styles/font.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/dropdown-styles.css";
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
