import { createContext, React, useState } from "react";

export const Context = createContext({});
export default function Usecontext({ children }) {
  const [useronline, setUseronline] = useState({});
  const [renderPost, setRenderPost] = useState(false);
  return (
    <Context.Provider
      value={{ renderPost, setRenderPost, useronline, setUseronline }}
    >
      {children}
    </Context.Provider>
  );
}
