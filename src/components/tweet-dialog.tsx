import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaFeatherPointed } from 'react-icons/fa6'
import { MdAdd } from "react-icons/md";

import ComposeTweet from "./server/compose-tweet";

const TweetDialog = ({ userAvatar }: { userAvatar: string}) => {
    return (
        <Dialog>
            <DialogTrigger asChild className="">
                <div className='max-xsm:fixed bottom-[15px] right-[20px] max-2xl:w-fit text-center p-3 bg-primary rounded-full cursor-pointer'>
                    <FaFeatherPointed className="hidden xsm:block 2xl:hidden" />
                    <MdAdd className="xsm:hidden" />
                    <button className='hidden 2xl:block w-full font-semibold hover:bg-opacity-90 transition duration-200'>
                        Post
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-black border-none text-white pt-8 pb-12">
                <ComposeTweet userAvatar={userAvatar} />
            </DialogContent>
        </Dialog>
    );
}

export default TweetDialog;
