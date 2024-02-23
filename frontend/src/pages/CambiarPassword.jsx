import AdminNav from "../components/AdminNav";

const CambiarPassword = () => {
    return (
        <>
            <AdminNav/>
            <h2 className="font-black text-3xl text-center mt-10 ">Cambiar Password</h2>
            <p className="text-xl mt-5 text-center mb-10">Modifica tu {" "}
            <span className=" text-indigo-600 font-bold">Passoword</span></p>
        </>
    )
}

export default CambiarPassword