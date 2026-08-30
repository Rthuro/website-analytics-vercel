'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Projects() {
    const [visits, setVisits] = useState(0)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
    async function handleVisits() {
      setLoader(true)
      try {
        const res = await fetch('/api/analytics?filter=projects')
        const data = await res.json()
        setVisits(data.visitors)
      } catch (error) {
        console.error("Vercel Analytics error:", error)
        setVisits(0)
      } finally {
        setLoader(false)
      }
    }
    handleVisits()
  }, [])

    return (
         <main className="flex flex-col items-start gap-4 p-3">
            <Link
            className=" bg-zinc-100 p-2 text-sm text-zinc-700 font-mono"
            href="/">
                Back
            </Link>

            <h1 className="text-2xl font-bold text-zinc-50">Projects</h1>

            <p className="font-mono">Total page visitor count: { loader ? 'Loading...' : visits}</p>
        </main>
    )
}