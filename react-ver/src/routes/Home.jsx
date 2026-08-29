import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export function Home() {
    const [totalVisits, setTotalVisits] = useState(0)

    const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID
    const token = import.meta.env.VITE_VERCEL_TOKEN

    console.log('Token:',token)
    console.log('Project ID:', projectId)

    useEffect(() => {
            async function handleVisits() {
                try{
                    axios.get("https://api.vercel.com/v1/query/web-analytics/visits/count", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            projectId: projectId,
                        }
                    }).then(res => {
                        console.log('API Response | Home page:', res.data)
                        setTotalVisits(res.data.visitors)
                    })
                } catch (error) {
                    console.error("Failed to fetch visits:", error)
                }
            }
            handleVisits()
        },[])
        
    return (
        <main className="flex flex-col items-start gap-4 p-3">
            <div className="flex items-center gap-2">
                <Link to='/projects' 
                className=" bg-zinc-100 p-2 text-sm text-zinc-700 font-mono">
                    Projects
                </Link>
                <Link to='/experience' 
                className=" bg-zinc-100 p-2 text-sm text-zinc-700 font-mono">
                    Experiences
                </Link>
            </div>
            
            <h1 className="text-2xl font-bold text-zinc-50">Website Analytics using React</h1>

            <p>Total Visitors: {totalVisits || 0}</p>
        </main>
    )
}