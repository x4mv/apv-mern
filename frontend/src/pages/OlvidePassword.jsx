import { Link } from "react-router-dom"


const OlvidePassword = () => {
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera tu cuenta y no pierdas tus{" "}<span className="text-black"> pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form>
                    <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type='email'
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <input 
                        type='submit'
                        value='Recuperar password'
                        className="bg-indigo-700 w-full font-bold mt-5 
                        hover:cursor-pointer hover:bg-indigo-800 rounded
                        text-white py-3 px-10 uppercase md:w-auto"
                    />
                </form>

                <nav className="mt-5 grid grid-rows-2 gap-2">
                    <Link to='/'
                    className="block my-3 text-gray-500"
                    >Ya tienes una cuenta? Inicia Sesion Aqui!</Link>
                    <Link to='/registrar'
                    className="block my-3 text-gray-500"
                    >No tienes una cuenta? Registrarte Aqui!</Link>
                </nav>

            </div>
        </>
    )
}

export default OlvidePassword