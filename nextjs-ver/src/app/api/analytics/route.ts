import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    const path = searchParams.get("path")

    const projectId = process.env.VERCEL_PROJECT_ID
    const token = process.env.VERCEL_TOKEN
    
    const res = await fetch(
        `https://api.vercel.com/v1/query/web-analytics/visits/count?projectId=${projectId}${path ? `&filter=requestPath eq '/${path}'` : ''}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    
    const data = await res.json()

    return new Response(JSON.stringify(data.data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}