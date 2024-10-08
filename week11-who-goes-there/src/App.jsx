import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://zshupgtdzylfrobtxqut.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaHVwZ3RkenlsZnJvYnR4cXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NjU5NDYsImV4cCI6MjA0MTU0MTk0Nn0.eUppHb5xDIbqUmrMocymACanwtJswWwYrU2vzaIUzkI"
);

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();  // This method logs out the user
    window.location.reload();  // Optional: Reload to update the UI after logging out
  }


  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
    <div>
      <p>Logged in!</p>
      <button onClick={handleLogout}>Log Out </button>
    </div>)
    
  }
}
