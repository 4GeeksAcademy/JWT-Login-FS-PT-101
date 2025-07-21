
import React, { useState, useEffect } from "react";
import { collection } from "../services/collection";
import { useNavigate } from "react-router";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogged, setIsLogged] = useState(false)

        let navigate = useNavigate();


    function resetForm(){
        setEmail("")
        setPassword("")
    }

  const handleChange = (e) => {

        const {name, value} = e.target;

        if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
           const user_data = {
                email,
                password
            };

            const result = await collection.checkLogin(user_data);

          if (result.success) {
            alert("El usuario ha iniciado sesión en el sistema")
            setIsLogged(true)
        } else {
        resetForm()
            alert("El usuario no pudo iniciar sesión. Vuelve a intentarlo")
        }

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            setIsLogged(false)
        }
        else{
            setIsLogged(true)
        }
    }, []);


    return(

                <div className="cartita card p-3 my-5 bg-info mx-auto">

            <h1 className="text-center p-2">Inicia sesión</h1>

            <form onSubmit={handleSubmit}>
                <div className="d-flex mt-3">
                    <div className="corto"></div>
                    <div className="masancho d-flex">

                        <div className="ancho">
                            <p className="text-center"><strong>Email</strong></p>
                        </div>
                        <div className="ancho">
                            
                            <p className="text-center"><strong>Password</strong></p>
                        </div>
                    </div>
                    <div className="corto"></div>
                </div>
                <div className="d-flex justify-content-center">
                    <input type="email" className="inputs form-control p-2 mx-3" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Enter your email" value={email}/>
                    <input type="password" className="inputs form-control p-2 mx-3" onChange={handleChange} id="exampleInputPassword1" aria-describedby="passwordHelp" name="password" placeholder="Enter your password" value={password}/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary p-2">Log In</button>
                </div>
            </form>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-success p-2" disabled={!isLogged} onClick={() => navigate("/private")}>Go to private</button>
                </div>
            
        </div>

    )
}