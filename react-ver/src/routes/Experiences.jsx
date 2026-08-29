import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export function Experiences() {
    const [visits, setVisits] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        async function handleVisits() {
            try{
                axios.get("https://api.vercel.com/v1/query/web-analytics/visits/count", {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VERCEL_TOKEN}`,
                    },
                    params: {
                        projectId: import.meta.env.VERCEL_PROJECT_ID,
                        filter: "requestPath eq '/experience'"
                    }
                }).then(res => {
                    console.log('API Response | Experience Page:', res.data)
                    setVisits(res.data.visitors)
                })
            } catch (error) {
                console.error("Failed to fetch visits:", error)
            }
        }
        handleVisits()
    },[])

    return (
        <main className="flex flex-col items-start gap-4 p-3">
            <button type="button"
                className=" bg-zinc-100 p-2 text-sm text-zinc-700 font-mono"
                onClick={()=>navigate(-1)}>
                    Back
            </button>

            <h1 className="text-2xl font-bold text-zinc-50">Experiences</h1>

            <p>Total page visitor count.</p>
        </main>
    )
}