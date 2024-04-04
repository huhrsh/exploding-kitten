import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import close from "../Assets/Images/close.png"
import { PuffLoader } from "react-spinners"

function Leaderboard({setLeaderboard }) {
    const [loading, setLoading] = useState(false)
    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''
    const [leaderboardData, setLeaderboardData] = useState()
    
    // function to fetch data from db 
    async function getLeaderboard() {
        setLoading(true)
        // setting the screen to load as long as data is not fetched 
        const response = await fetch(apiUrl + '/get-leaderboard', {
            method: "GET",
        })
        if (response.ok) {
            const data = await response.json()
            // console.log(data)
            setLeaderboardData(data)
        }
        else {
            toast.error("Error in fetching leaderboard data.")
        }
        setLoading(false)
    }

    // fetching fresh data everytime component renders 
    useEffect(() => {
        getLeaderboard()
    }, [])

    return (<>
        {loading ? <PuffLoader color="#f97316" className="absolute top-[45vh] left-[50vw] -translate-x-[50%] -translate-y-[50%] " /> : <section className="animate__animated animate__fadeInUp w-screen h-screen p-12 pt-20 z-10 fixed top-0 left-0 bg-[#000000dd]" >
            <img onClick={() => { setLeaderboard(false) }} className="absolute top-8 rounded-full p-2 cursor-pointer right-8 h-12 bg-orange-500" src={close} alt="close" />
            <ul className="flex flex-col" >
                <li className="flex text-orange-500 justify-between items-center w-full px-3 py-2 text-2xl" key={'head'}>
                    <p className="w-2/12" >S no.</p>
                    {/* <p className="w-1/4" >username</p> */}
                    <p className="w-2/4" >name</p>
                    <p className="w-1/6 text-center" >played</p>
                    <p className="w-1/6 text-center" >won</p>
                </li>
                {leaderboardData && leaderboardData.map((item, index) => (
                    <li className={`flex justify-between items-center w-full px-3 py-2 text-xl`} key={index}>
                        <p className="w-2/12 p-2">{index}</p>
                        {/* <p className="w-1/4 p-2 ">{item.username}</p> */}
                        <p className="w-2/4 p-2 ">{item.name}</p>
                        <p className="w-1/6 p-2 text-center">{item.games}</p>
                        <p className="w-1/6 p-2 text-center">{item.won}</p>
                    </li>
                ))}

            </ul>
        </section>
        }
    </>
    )
}

export default Leaderboard