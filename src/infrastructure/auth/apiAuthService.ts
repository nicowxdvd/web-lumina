import { AuthService, LoginResult } from "@/domain/auth/authService.port";
import type { Credentials } from '@/domain/auth/credentials'

export const  apiAuthService: AuthService ={
    async login(credentials: Credentials): Promise<LoginResult>{

        const response = await fetch('/api/auth/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials), 
        })
        const body = await response.json()
        return { success: response.ok, message: body.message }
    },
}