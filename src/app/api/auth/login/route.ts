import { NextResponse } from "next/server"

export async function POST(request:Request){
    const credentials     = await request.json()
    let backendResponse: Response
    try{
        backendResponse = await fetch(`${process.env.API_URL}/auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    })
    }catch {
        return NextResponse.json(
        { success: false, message: 'No pudimos conectar con el servidor. Probá de nuevo más tarde.' },
        { status: 502 }
        )
    }

    if (!backendResponse.ok) {
        const errorBody = await backendResponse.json().catch(() => null)
        return NextResponse.json(
            { success: false, message: errorBody?.message ?? 'No pudimos iniciar sesión.' },
            { status: backendResponse.status }
        )
    }

    const { access_token } = await backendResponse.json()
    const response         = NextResponse.json({ success: true })
    response.cookies.set('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })

    return response

}