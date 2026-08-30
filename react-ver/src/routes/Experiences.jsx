import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export function Experiences() {
    const [loader, setLoader] = useState(false)
    const [visits, setVisits] = useState(null)
    const navigate = useNavigate()

    const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID
    const token = import.meta.env.VITE_VERCEL_TOKEN

    useEffect(() => {
        async function handleVisits() {
            setLoader(true)
            try{
                axios.get("https://api.vercel.com/v1/query/web-analytics/visits/count", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        projectId: projectId,
                        filter: "requestPath eq '/experience'"
                    }
                }).then(res => {
                    setVisits(res.data.data.pageviews)
                })
            } catch (error) {
                console.error("Vercel Analytics error:", error);
                setVisits(0)
            } finally {
                setLoader(false)
            }
        }
        handleVisits()
    },[])

    return (
        <main className="flex flex-col items-start gap-4 p-3">
            <button type="button"
                className=" bg-zinc-100 p-2 text-sm text-zinc-700 font-mono"
                onClick={()=>navigate('/')}>
                    Back
            </button>

            <h1 className="text-2xl font-bold text-zinc-50">Experiences</h1>

            <p className="font-mono">Total page visitor count: { visits == null || loader ? 'Loading...' : visits}</p>
        </main>
    )
}