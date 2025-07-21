import { useNavigate } from "react-router";

export const Private = () => {
    const navigate = useNavigate();
    


    const closeSession = async () => {
        localStorage.removeItem("token");
        navigate("/login")
    }
    
    return(


        <div className="cartita card p-3 my-5 bg-success mx-auto">

            <h1 className="text-center p-2">Hello World!</h1>
            <p className="text-center p-2">¡Sesión iniciada!</p>

                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-danger p-2" onClick={closeSession}>Cerrar sesión</button>
                </div>
            
        </div>


    )

}