'use client'

// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom"

const ComposeButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            className='rounded-2xl bg-primary py-1 px-4 w-fit text-md font-bold hover:bg-opacity-90 transition duration-200 disabled:opacity-60'
            type="submit"
            disabled={pending}
        >
            {pending ? 'Posting...': 'Post'}
        </button>
    );
}

export default ComposeButton;