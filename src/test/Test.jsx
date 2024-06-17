import ButtonAction from "../utils/ButtonAction";
import Navbar from "../utils/Navbar";
import BACKPAPER from "/backPaper.png"
import CHECKMARK from "/CheckMark.png"


export default function Test() {

    return (
        <div className="flex flex-col pb-20 mx-auto w-full bg-white min-h-screen flex-1 max-w-[480px] rounded-[35px] ">

            <Navbar />
            <div className="flex gap-5 self-center px-5 mt-8 text-xs leading-5 text-center text-black">
                <div className="grow my-auto">
                    דיווח אחרון היום הייתם ב{" "}
                    <span className="font-semibold text-black">מטווחים</span> בשעה{" "}
                    <span className="font-semibold text-black">8:00</span>{" "}
                </div>
                <img
                    loading="lazy"
                    srcSet={CHECKMARK}
                    className="shrink-0 w-5 aspect-square"
                />
            </div>
            <img
                loading="lazy"
                srcSet={BACKPAPER}
                className="mt-20 w-full absolute top-20 aspect-[0.72] stroke-[5px] stroke-neutral-200 stroke-opacity-40"
            />
            <div className=" z-50 flex flex-col justify-center text-sm items-center leading-5 h-full flex-1 text-right max-w-[327px] mx-auto w-full text-zinc-500">
                <div className="flex flex-col text-center leading-[150%] pb-20">
                    <div className="self-center text-lg font-semibold text-black">
                        הזנת דיווח
                    </div>
                    <div className="w-full text-sm text-zinc-500">
                        הזן את המשימה הקרובה שלך :)
                    </div>
                </div>
                {/*  */}
                <div className="w-full">
                    <div className="justify-center px-4 py-2 bg-white rounded-lg w-full border border-solid border-neutral-200 text-ellipsis">
                        איפה אני נמצא?
                    </div>
                    <div className="justify-center px-4 py-2 mt-5 bg-white rounded-lg w-full border border-solid border-neutral-200 text-ellipsis">
                        מה אני עושה?
                    </div>
                </div>

                {/*  */}
                <div className="w-full pt-10 ">
                    <div className="text-xs leading-5 py-2 text-center text-black mx-auto max-w-[286px]">
                        לאחר לחיצה על <span className="font-bold text-black">הוסף דיווח</span>{" "}
                        תינתן אפשרות של סיום דיווח
                    </div>
                    {/*  */}
                    <ButtonAction title="שלח דיווח" />
                </div>
            </div>
        </div>
    );
}



