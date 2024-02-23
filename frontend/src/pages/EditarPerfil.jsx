import AdminNav from "../components/AdminNav";

const EditarPerfil = () => {
    return (
        <>
            <AdminNav/>
            <h2 className="font-black text-3xl text-center mt-10 ">Editar Perfil</h2>
            <p className="text-xl mt-5 text-center mb-10">Modifica tu {" "}
            <span className=" text-indigo-600 font-bold">Informacion</span></p>

            <div className="flex justify-center">
                <div className="2-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    <form>
                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                            />
                        </div>

                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                            />
                        </div>

                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Telefono</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                            />
                        </div>
                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input 
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                            />
                        </div>

                        <input 
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase 
                            w-full mt-5 cursor-pointer "
                        />

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil