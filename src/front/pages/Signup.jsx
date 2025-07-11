import React, { useState } from "react";

export const Signup = () => {

const object = []
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    object.push(email)
    object.push(password)

  const handleChange = (e) => {

    object.email = setEmail(e.target.value)
    object.password = setPassword(e.target.value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()


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
                    <input type="email" onChange={handleChange} className="inputs form-control p-2 mx-3" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Enter your email"/>
                    <input type="password" onChange={handleChange} className="inputs form-control p-2 mx-3" id="exampleInputPassword1" aria-describedby="emailHelp" name="password" placeholder="Enter your password"/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary p-2">Registrarse</button>
                </div>
            </form>
            
        </div>
        
    )
}