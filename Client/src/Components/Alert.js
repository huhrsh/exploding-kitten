import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../Redux"
import { toast } from "react-toastify"
import { useEffect } from "react"

function Alert(props) {
    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://exploding-kitten-yc3s.onrender.com'
    const { setAlert, alert } = props
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    let updatedUser
    if (alert === 'won') {
        updatedUser = { ...user, won: user.won + 1, games: user.games + 1, deck: [], inHand: [] }
    }
    else if (alert === 'lost') {
        updatedUser = { ...user, games: user.games + 1, deck: [], inHand: [] }
    }


    async function updateUser() {
        dispatch(setUser(updatedUser))
        const response = await fetch(apiUrl + '/update-user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        if (response.ok) {
        }
        else {
            toast.error("Error in updating database, cannot logout.")
        }
    }

    // update user whenever Alert component is rendered 
    useEffect(() => {
        updateUser()
    }, [])


    return (
        <section className="w-screen h-screen animate__animated animate__fadeInUp fixed top-0 left-0 bg-[#000000dd] p-12 z-20">
            {alert === "won" &&
                <div className="flex flex-col justify-center items-center gap-12 h-full" >
                    <p className="text-5xl" ><span className="text-orange-500" >Congratulations, </span>you won.</p>
                    {/* <p className="text-3xl" >Your current score is: <span className="text-orange-500">{user.won} wins </span> out of {user.games} games</p> */}
                    <button className="bg-orange-500 rounded py-3 px-5 text-2xl" onClick={() => setAlert(null)} >Continue</button>
                </div>
            }
            {alert === "lost" &&
                <div className="flex flex-col justify-center items-center gap-12 h-full" >
                    <p className="text-5xl" ><span className="text-orange-500" >Ooops, </span>you lost.</p>
                    {/* <p className="text-3xl" >Your current score is: <span className="text-orange-500">{user.won} wins </span> out of {user.games} games</p> */}
                    <button className="bg-orange-500 rounded py-3 px-5 text-2xl" onClick={() => setAlert(null)} >Continue</button>
                </div>
            }
        </section>
    )
}

export default Alert