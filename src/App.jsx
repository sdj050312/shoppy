import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import AuthContextProvider from "../src/context/AuthContext.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <Header></Header>
    <Outlet></Outlet>
    </AuthContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
