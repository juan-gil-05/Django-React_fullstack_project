/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import jwt_decode from "jwt_decode"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import Navigate from "react-router-dom"

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(ACCESS_TOKEN)
        try {
            const res = await api.post("api/token/refresh/", {
                refresh: refreshToken

            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.acces)
                isAuthorized(true)
            } else {
                isAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            isAuthorized(false)
        }

    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            isAuthorized(true)
            return
        }
        const decoded = jwt_decode(token)
        const tokenExpiration = decoded.exp
        const now = Date().now / 1000

        if (tokenExpiration < now) {
            await refreshToken
        } else {
            isAuthorized(true)
        }
    }

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    if (isAuthorized === null) {
        return <div>loading ...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute