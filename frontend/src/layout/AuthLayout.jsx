import { Outlet } from 'react-router-dom'
const AuthLayout = () => {
    
    return (
        <>

            <main className="container mx-auto md:grid grid-cols-2 mt-14 gap-24 p-5 items-center">
                <Outlet/>
            </main>
        </>
    )
}

export default AuthLayout