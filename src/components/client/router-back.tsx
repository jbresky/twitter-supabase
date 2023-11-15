'use client'

import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const RouterBack = () => {

    const router = useRouter()

    return (
            <BsArrowLeft onClick={() => router.back()} className="text-2xl" />
    );
}

export default RouterBack;