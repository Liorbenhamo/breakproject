import { createContext, React,useState } from "react";


export const Context = createContext({});
export default function Usecontext({ children }) {
    const [useronline, setUseronline] = useState({});
  return (
    <Context.Provider value={{useronline,setUseronline}}>
      {children}
    </Context.Provider>
  )
}
