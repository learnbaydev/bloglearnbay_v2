import "@/styles/globals.scss";
import { Open_Sans } from "next/font/google";
const open_sans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={open_sans.className}>
      <Component {...pageProps} />
    </main>
  );
}
