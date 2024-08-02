import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('userId')  
        navigate('/')
    }
    return (
        <div>
            <Button
                onClick={handleLogout}
                sx={{ bgcolor: 'black' }}
                variant="contained" >
                logout
            </Button>
        </div>
    )
}
