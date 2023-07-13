import "@/styles/globals.scss";
import { open_sans } from "@/util/font";

export default function App({ Component, pageProps }) {
  return (
    <main className={open_sans.className}>
      <Component {...pageProps} />
    </main>
  );
}
