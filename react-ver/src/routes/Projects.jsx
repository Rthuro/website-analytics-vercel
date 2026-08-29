import { useNavigate } from "react-router-dom"

export function Projects() {
    const navigate = useNavigate()
    return (
         <main className="flex flex-col items-start gap-4 p-3">
            <button type="button"
            className=" bg-zinc-100 p-2 text-sm text-zinc-700 font-mono" onClick={()=>navigate(-1)}>
                Back
            </button>

            <h1 className="text-2xl font-bold text-zinc-50">Projects</h1>

            <p>Total page visitor count.</p>
        </main>
    )
}