import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    try {

        const { searchParams } = new URL(request.url)

        // Optional - Filter by page
        const page = searchParams.get("page")

        const projectId = process.env.VERCEL_PROJECT_ID
        const token = process.env.VERCEL_TOKEN

        const res = await fetch(
            `https://api.vercel.com/v1/query/web-analytics/visits/count?projectId=${projectId}${page ? `&filter=requestPath eq '/${page}'` : ''}`,
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
    } catch (error) {
        console.error("Vercel Analytics error:", error)
        return new Response(JSON.stringify({ visitors: 0, pageviews: 0 }), {
            status: 500
        })
    }
}