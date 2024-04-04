import { useState } from "react"
import { toast } from 'react-toastify'
import { setUser } from "../Redux";
import { useDispatch } from "react-redux";
import { PuffLoader } from 'react-spinners'

function User({ setPhase }) {
    const apiUrl = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://exploding-kitten-yc3s.onrender.com"
    const dispatch = useDispatch()
    const [inp1, setInp1] = useState("")
    const [name, setName] = useState("")
    const [inp2, setInp2] = useState("")
    const [loading, setLoading] = useState(false)

    // handle new player registrations 
    async function handleNewPlayer() {
        if(inp1==="" || name===""){
            toast.warn("Input can't be empty")
            return;
        }
        setLoading(true)
        const response = await fetch(apiUrl + "/create-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:name.toUpperCase(), username: inp1.toUpperCase() })
        })
        const data = await response.json()
        if (response.status === 500) {
            toast.warn(data.msg)
        }
        if (response.status === 200) {
            dispatch(setUser(data))
            setPhase('game')
        }
        setLoading(false)
    }

    // handle existing player logins 
    async function handleExistingPlayer() {
        if(inp2===""){
            toast.warn("Input can't be empty")
            return;
        }
        setLoading(true)
        const response = await fetch(apiUrl + "/login-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: inp2.toUpperCase() })
        })
        const data = await response.json()
        if (response.status === 500) {
            toast.warn(data.msg)
        }
        if (response.status === 200) {
            dispatch(setUser(data))
            setPhase('game')
        }
        setLoading(false)
    }

    return (
        <>
            {loading ? <PuffLoader color="#f97316" className="absolute top-[45vh] left-[50vw] -translate-x-[50%] -translate-y-[50%] " /> :
                <main className="flex flex-col items-center h-[66vh] mt-12 gap-12">
                    <h1 className="text-4xl font-[sugar] tracking-wide" >Login as a</h1>
                    <div className="w-screen flex justify-center h-full">
                        <div className=" py-4 w-2/5 flex flex-col items-center gap-8 h-full" >
                            <h1 className="font-[sugar] text-4xl text-orange-500 tracking-wide" >New Player</h1>
                            <input className="font-[sugar] text-2xl px-3 py-3 focus:bg-gray-900 transition text-[#eee] focus:rounded-r-lg focus:border-l-2 border-orange-500 tracking-wide outline-none bg-gray-700" type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                            <input className="font-[sugar] text-2xl px-3 py-3 focus:bg-gray-900 transition text-[#eee] focus:rounded-r-lg focus:border-l-2 border-orange-500 tracking-wide outline-none bg-gray-700" type="text" minLength={0} maxLength={12} placeholder="username" value={inp1} onChange={(e) => { setInp1(e.target.value) }} required />
                            <button className="w-2/3 transition bg-gray-900 duration-200 rounded py-3 hover:bg-orange-500 text-3xl font-light font-[sugar] tracking-wide " onClick={handleNewPlayer}>Create user</button>
                        </div>
                        <div className="h-full w-0.5 bg-gray-200" ></div>
                        <div className=" py-4 w-2/5 flex flex-col items-center gap-8 h-full" >
                            <h1 className="font-[sugar] text-4xl text-orange-500 tracking-wide" >Existing Player</h1>
                            <input className="font-[sugar] text-2xl px-3 py-3 focus:bg-gray-900 transition text-[#eee] focus:rounded-r-lg focus:border-l-2 border-orange-500 tracking-wide outline-none bg-gray-700" type="text" minLength={0} maxLength={12} placeholder="username" onChange={(e) => { setInp2(e.target.value) }} required />
                            <button className="w-2/3 transition bg-gray-900 duration-200 rounded py-3 hover:bg-orange-500 text-3xl font-light font-[sugar] tracking-wide " onClick={handleExistingPlayer} >Enter the game</button>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}

export default User