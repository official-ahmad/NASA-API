import React, { useState, useEffect } from "react";

const NasaPhoto = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NASA_KEY; 
  console.log("My KEY:", API_KEY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
        const res = await fetch(url);
        const result = await res.json();
        console.log("Environment Key:", import.meta.env.VITE_NASA_KEY);

        if (!res.ok) {
          throw new Error(result.error?.message || "Kuch garbar hai!");
        }

        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black p-4">
        <div className="bg-red-600 text-white p-6 rounded-xl shadow-2xl max-w-md text-center">
          <h3 className="text-xl font-bold mb-2">NASA Error</h3>
          <p className="opacity-90">{error}</p>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <h2 className="text-2xl font-mono tracking-widest">
          INITIATING LAUNCH...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative group w-full flex justify-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img
            src={data.url}
            alt={data.title}
            className="relative rounded-2xl shadow-2xl border border-white/10 w-full md:w-4/5 object-cover"
          />
        </div>

        <div className="mt-12 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl max-w-3xl">
          <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            MISSION DESCRIPTION
          </h3>
          <p className="text-lg leading-relaxed text-slate-300 first-letter:text-4xl first-letter:font-bold first-letter:mr-2">
            {data.explanation}
          </p>
        </div>

        <footer className="mt-16 text-slate-500 text-sm italic">
          Data source: NASA Open APIs &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default NasaPhoto;
