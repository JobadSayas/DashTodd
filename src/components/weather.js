import React from "react";

const Weather = () => {
  return (
    <div id="clima" className="relative rounded-lg w-full h-[113px] flex gap-1 flex justify-center relative bg-[#f5ebff] overflow-hidden" >
        <div className="w-[260px] bg-center bg-no-repeat bg-contain pt-[15px] bg-[url('/img/clima-lock.jpg')]" >
            <div className="w-[260px] h-[55px] relative">
                <span className="absolute top-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-white flex justify-center items-center font-bold text-2xl pt-[3px]">--</span>
            </div>
        </div>

        {/* <img id="fan" src="./img/fan.svg" className="w-[60px]"/> */}

        {/* <div id="airSpeed" className="text-white text-md absolute top-[42px] right-[22px] z-10 bg-black w-7 h-7 rounded-full border-purple-300 border-[2px] flex items-center justify-center"></div> */}
    </div>
  );
};

export default Weather;
