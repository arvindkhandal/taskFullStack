import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate()
    const handleSignUp = async () => {
        if (userName && userPassword) {
            await fetch("http://localhost:3001/signup", {
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
                    if (data) {
                        navigate('/login')

                        alert("user created successfully")
                    }
                    console.log(data)
                })
                .catch(err => {
                    alert(err)

                })

        }
    }

    return <div>
        <input value={userName} onChange={(e) => {
            setUserName(e.target.value)
        }} />
        <input value={userPassword} onChange={(e) => {
            setUserPassword(e.target.value)
        }} />
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
}

export default SignUpPage;