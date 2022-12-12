import Layout from "../components/layout/layout";
import "tailwindcss/tailwind.css";
import "../styles/globals.css"
import { ContextProvider } from '../components/UserContext'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
    supabaseClient={supabase}
    initialSession={pageProps.initialSession}
  >
    {/* <ContextProvider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    {/* </ContextProvider> */}
    </SessionContextProvider>

  );
}

export default MyApp;

