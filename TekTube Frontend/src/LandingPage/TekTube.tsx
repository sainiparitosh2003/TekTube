const TekTube = () => {
    return (
        <div className="flex items-center px-20 mt-10">
            
            <div className="flex flex-col w-[45%]">
                <div className="text-7xl font-bold">Teknospire's <span className="text-red-500 font-semibold">Tek</span>Tube</div>
                <div className="text-lg text-gray-300 italic">Where learning meets Entertainment</div>
            </div>
            <div className="w-[55%] flex items-center justify-center">
                <div className="w-[50rem] mt-10">
                    <img src="boy.jpg" alt="" className="rounded-full border-4 border-gray-300 shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default TekTube;
