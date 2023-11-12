'use client'

import { ClipLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div
            className="
                h-[100vh]
                flex 
                flex-col 
                justify-center 
                items-center
                text-primary
                "
        >
            <ClipLoader
                size={100}
                color=""
            />
        </div>
    )
}

export default Loader