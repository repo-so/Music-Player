import React, { useState, useEffect } from "react";

const ClockCard: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dayOfWeek = time.toLocaleString("en-US", { weekday: "short" }).toUpperCase();
  const dayOfMonth = time.getDate();
    const month = (time.getMonth() + 1).toString().toUpperCase();
  return (
    <div className="w-50 px-2 py-2 relative  rounded-lg shadow-md border border-gray-200 overflow-hidden">
     
    <div className="w-6 h-1.5 absolute bg-white rounded-xs -top-0.5 translate-x-21 shadow-[0px_0px_50px_12px_rgba(255,255,255,1)]"/>

      <div className="flex flex-row items-center h-11 ml-6 ">
        <div className="text-center mr-2 mt-0.5">
        <div className="font-poppins text-sm text-white font-semibold">{dayOfWeek}</div>
        <div className="font-poppins text-[0.67rem] text-white/90 -mt-1.5">
          {dayOfMonth}/{month}
        </div>
        </div>

        <div className="text-center text-[1.65rem] mt-0.5 flex flex-row items-center font-bold text-white font-poppins">
        {hours}<p className="text-[1.1rem] text-gray-400 px-[0.15rem]">:</p>{minutes}<p className="text-[1.1rem] text-gray-400 px-[0.15rem]">:</p>{seconds}
      </div>
      </div>

    
    </div>
  );
};

export default ClockCard;
