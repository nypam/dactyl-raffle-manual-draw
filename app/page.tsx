"use client";
import { useState } from 'react';

export default function Home() {
  const [winner, setWinner] = useState('');
  const [tickets, setTickets] = useState('');
  const [loading, setLoading] = useState(false);

  const pickWinner = async () => {
    setLoading(true);
    const res = await fetch('/non-winning-tickets-cleaned.json');
    const candidates = await res.json();
    setTickets(candidates.length);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      setWinner(candidates[randomIndex].owner);
      counter++;
      if (counter > 50) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 100);
  };

  return (
    <div className='w-full h-full'>
       <div className=" bottom-0 left-0 right-0 relative w-full h-screen overflow-hidden video-container">
        
                <video
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="fixed top-0 z-0 bottom-0 left-0 right-0 object-cover w-full h-full videoClymaker"
                >
                  <source
                    src={`10222.mp4`}
                    type="video/mp4"
                  />
                </video>
                </div>
      <div className='absolute w-1/2 left-1/2 top-1/2 text-center -translate-x-1/2'>
      <h1 className='pb-5'>Pick a random winner from 59,144 remaining tickets</h1>
      
      {winner && <div className={`${
                          loading ? "bg-black bg-opacity-10 text-white" : "bg-white bg-opacity-100 text-[#006D53]"
                        } font-[VCHenrietta-Bold] text-2xl p-4 rounded-full bg-black bg-opacity-10`}>{winner}</div>}
      <button onClick={pickWinner} disabled={loading} className="bg-[#0DD883] hover:bg-[#006D53] mt-5 text-white font-bold py-2 px-4 rounded-full">
        {loading ? 'Picking...' : 'Pick a Winner'}
      </button>
      </div>
      
    </div>
  );
}
