import { useDispatch } from "react-redux";
import logo from "../Assets/Images/bomb.png"
import { clearUser } from '../Redux';
import { toast } from "react-toastify";

function Header({ phase,user,setPhase,setLeaderboard }) {
    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://exploding-kitten.onrender.com'
    const dispatch = useDispatch()
    
    // function to handle sign out 
    async function handleSignOut() {
        const response = await fetch(apiUrl + '/update-user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (response.ok) {
            dispatch(clearUser());
            setPhase("user")
        }
        else {
            toast.error("Error in updating database, cannot logout.")
        }
    }

    return (
        <header className='h-16 py-2 px-8 flex justify-between items-center sticky top-0 left-0'>
            <h1 className='flex h-16 items-center gap-3 text-4xl text-orange-500 shadow'>
                Exploding Kittens
                <img className='h-3/5 rotate-12' src={logo} alt='logo' />
            </h1>
            <div className='flex w-2/6 justify-end items-center gap-16'>
                <div className=' cursor-pointer hover:text-orange-500 transition  h-16 flex items-center gap-4 text-2xl ' onClick={() => { setLeaderboard(true) }}>Leaderboard</div>
                {phase === 'game' && <div className='hover:text-orange-500 transition cursor-pointer text-2xl ' onClick={handleSignOut} >Log Out</div>}
            </div >
        </header>
    )
}

export default Header