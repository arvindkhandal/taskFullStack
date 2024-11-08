import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const navigate = useNavigate()
    const handleLogin = async () => {
        if (userName && userPassword) {
            if (userName && userPassword) {
                await fetch("http://localhost:3001/login", {
                    method: "POST",
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: userName,
                        password: userPassword
                    })
                }).then(response => {
                    return response.json();
                })
                    .then(data => {
                        if (data?.message=="User login successful") {
                            localStorage.setItem("user", true)
                            navigate('/home')

                            alert("user login successfully")
                        }
                        else{
                            alert("user not created account yet ")
                        }
                        console.log(data)
                    })
                    .catch(err => {
                        alert(err)

                    })

            }
        }
    }

    return <div>
        <input value={userName} onChange={(e) => {
            setUserName(e.target.value)
        }} />
        <input value={userPassword} onChange={(e) => {
            setUserPassword(e.target.value)
        }} />
        <button onClick={handleLogin}>login</button>
    </div>
}

export default Login;