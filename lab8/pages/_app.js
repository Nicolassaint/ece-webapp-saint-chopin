import Layout from "../components/layout/layout";
import "tailwindcss/tailwind.css";
import { ContextProvider } from '../components/UserContext'


export default function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
