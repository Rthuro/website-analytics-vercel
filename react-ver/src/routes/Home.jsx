import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export function Home() {
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({})

    const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID
    const token = import.meta.env.VITE_VERCEL_TOKEN

    useEffect(() => {
            async function handleVisits() {
                setLoader(true)
                try{
                    const res = await axios.get(
                        `https://api.vercel.com/v1/query/web-analytics/visits/count`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            projectId: projectId,
                        }
                    })

                    setData(res.data.data)
                } catch (error) {
                    console.error("Vercel Analytics error:", error);
                    setData(
                        { visitors: 0, pageviews: 0 }
                    )
                } finally {
                    setLoader(false)
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

            <p className="font-mono">Total Visitors: 
                { data?.visitors == null || loader ? 'Loading...' : data?.visitors}</p>
            <p className="font-mono">Page Views: 
                { data?.pageviews == null || loader ? 'Loading...' : data?.pageviews}</p>
        </main>
    )
}