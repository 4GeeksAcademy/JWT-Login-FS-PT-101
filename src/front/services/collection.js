export const collection = {}

collection.sendSignup = async (user_data) => {

    try{
        const resp = await fetch("https://crispy-zebra-wr5xx55w7gx4c5p6j-3001.app.github.dev/api/signup", 
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(user_data)
            })

        const data = await resp.json()
        
		if(resp.status == 400) throw Error("Missing data")
		else if(resp.status == 409) throw Error("User already exists")
		else if(!resp.ok) throw Error("Unknown error")

        return data
    }
    catch(error){
        console.log(error)
    }
}

collection.checkLogin = async (user_data) => {

    try{
        const resp = await fetch("https://crispy-zebra-wr5xx55w7gx4c5p6j-3001.app.github.dev/api/login", 
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(user_data)
            })


        const data = await resp.json()

		if(resp.status == 400) throw Error("Missing data")
		else if(resp.status == 409) throw Error("User unknown or incorrect data")
		else if(!resp.ok) throw Error("Unknown error")

        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        
          return {
            success: true,
            data: data,
        }

    } catch (error) {
        console.log("Login error: ", error.message);

        return {
            success: false,
            message: error.message,
        };
    }
}