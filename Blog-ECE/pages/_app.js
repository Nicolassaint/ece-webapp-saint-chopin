import Layout from "../components/layout/layout";
import "tailwindcss/tailwind.css";
import "../styles/globals.css"
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from "react";
import { ThemeProvider } from "next-themes";
// import { appWithTranslation } from 'next-i18next'


function MyApp({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider enableSystem={true} attribute="class">
        <Layout>
        {/* <div style={{ backgroundColor: '#FF0000' }}> */}
        <Component {...pageProps} />
        {/* </div> */}
        </Layout>
      </ThemeProvider>
    </SessionContextProvider>

  );
}

export default MyApp;

