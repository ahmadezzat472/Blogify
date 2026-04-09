import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="max-w-3xl flex-1 px-10">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
