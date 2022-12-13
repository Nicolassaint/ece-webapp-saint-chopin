import Layout from "../components/layout/layout";
import "tailwindcss/tailwind.css";
import "../styles/globals.css"
import { ContextProvider } from '../components/UserContext'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from "react";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
    supabaseClient={supabase}
    initialSession={pageProps.initialSession}
  >
    {/* <ContextProvider> */}
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ThemeProvider>
    {/* </ContextProvider> */}
    </SessionContextProvider>

  );
}

export default MyApp;

