'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

interface HomeProps {
  visitors: number;
  pageviews: number;
}

export default function Home() {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState<HomeProps>({ visitors: 0, pageviews: 0 })

  useEffect(() => {
    async function handleVisits() {
      setLoader(true)
      try {
        const res = await fetch('/api/analytics?path=experiences')
        const data = await res.json()
        setData(data)
      } catch (error) {
        console.error("Vercel Analytics error:", error)
        setData({ visitors: 0, pageviews: 0 })
      } finally {
        setLoader(false)
      }
    }
    handleVisits()
  }, [])

  return (
    <main className="flex flex-col items-start gap-4 p-3">
        <div className="flex gap-2 items-center">
          <Link
            href='/projects'
            className="bg-zinc-100 p-2 text-sm text-zinc-700 font-mono">
            Projects
          </Link>
          <Link
            href='/experiences'
            className="bg-zinc-100 p-2 text-sm text-zinc-700 font-mono">
            Experiences
          </Link>
        </div>

        <h1 className="text-3xl font-bold font-mono text-blue-100">
          Web Analytics using Next.js
        </h1>

        <p className="font-mono">Total Visitors:
          {loader ? 'Loading...' : data.visitors}</p>
        <p className="font-mono">Page Views:
          {loader ? 'Loading...' : data.pageviews}</p>

      </main>
  );
}
