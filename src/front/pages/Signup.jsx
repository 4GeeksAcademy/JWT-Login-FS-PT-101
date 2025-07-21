import React, { useState } from "react";
import { useNavigate } from "react-router";
import { collection } from "../services/collection";

export const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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

            const result = await collection.sendSignup(user_data);

          if (result.success) {
            alert("Usuario agregado al sistema. Acepta para continuar e iniciar sesión")
            navigate("/login")
        } else {
        resetForm()
            alert("El usuario no pudo ser registrado. Vuelve a intentarlo")
        }

    }

    return(

        <div className="cartita card p-3 my-5 bg-danger mx-auto">

            <h1 className="text-center p-2">Formulario para registrarse</h1>
          

          

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
                    <input type="email" onChange={handleChange} value={email} name="email" className="inputs form-control p-2 mx-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email"/>
                    <input type="password" onChange={handleChange} value={password} name="password" className="inputs form-control p-2 mx-3" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter your password"/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary p-2">Registrarse</button>
                </div>
            </form>
            
        </div>
        
    )
}