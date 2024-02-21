import { useEffect } from "react"

export default ({data}) => {
    useEffect(() => console.log("d = ",data), [data])
    return (
        <div className="w-[90%] flex-col items-start mb-12">
            <span>Charge Information</span>
            <div className="flex flex-row justify-center w-full h-[90px] items-center rounded-md mt-4 mb-8 border-2">
                <div className="w-[80%] h-[60px]  flex flex-row justify-between">
                    <div className="flex flex-col justify-around items-start w-[33%]">
                        <span className="text-gray-500 text-[12px]">Description</span>
                        {/* <span className="text-gray-500 text-[14px]">{data?.data?.description || "-"}</span> */}
                    </div>
                    <div className="flex flex-col items-start w-[33%]">
                        <span>Description</span>
                        <span>Description</span>
                    </div>
                    <div className="flex flex-col items-start w-[33%]">
                        <span>Description</span>
                        <span>Description</span>
                    </div>
                </div>
            </div>
        </div>
    )
}