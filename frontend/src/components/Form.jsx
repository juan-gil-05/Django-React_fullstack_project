import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "login" : "register"

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form action="" onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">{name}</button>
        </form>
    )




}

export default Form