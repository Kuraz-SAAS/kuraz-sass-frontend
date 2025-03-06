import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BsBack, BsBackspaceReverseFill } from "react-icons/bs";


const SinglePhet = () => {
    const { state } = useLocation();
    const course = state?.course;

    // State to manage chat visibility
    const [isChatVisible, setIsChatVisible] = useState(false);

    return (
        <div className="px-20 py-10 font-poppins">
            <div className="flex justify-between items-center p-5">
                <p className="text-[12px] md:text-[18px] font-bold">{course?.Title}</p>
                <div className="flex items-center gap-2">
                    <BsBack size={24} />
                    <Link to={"/phet"} className="underline text-[12px] md:text-[18px] underline-offset-4">
                        Back to Phet
                    </Link>
                </div>
            </div>
            <div className="relative w-full pb-[56.25%] lg:pb-[80vh]">
                <iframe
                    src={course['Runnable Resource']}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                ></iframe>
            </div>

        </div>
    );
};

export default SinglePhet;
