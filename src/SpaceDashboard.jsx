import React, { useState, useEffect } from "react";
import Particles from "./ParticleBg"; // Ensure file name matches exactly

const SpaceExplorer = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NASA_KEY;

  const fetchNasaData = async (type, query = "") => {
    setLoading(true);
    let url = "";

    if (type === "apod")
      url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    if (type === "search")
      url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(type === "search" ? result.collection.items.slice(0, 9) : result);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === "home") {
      setData(null);
      return;
    }

    if (currentPage === "apod") {
      fetchNasaData("apod");
    } else {
      // Ye line ab har planet ka naam NASA ko bhej degi automatically
      fetchNasaData("search", currentPage);
    }
  }, [currentPage]);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex flex-col font-sans overflow-x-hidden">
      {/* --- BACKGROUND PARTICLES LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={300}
          particleSpread={15}
          speed={0.05} // Isay thoda barha dein taaki movement dikhayi de
          moveParticlesOnHover={true} // Sabse zaroori: Isay true hona chahiye!
          particleHoverFactor={2} // Mouse hilne par kitna move kare
          disableRotation={false} // Check karein ye galti se true toh nahi
          className="w-full h-full"
        />
      </div>

      {/* --- UI CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="fixed top-6 left-0 right-0 z-50 px-4">
          <div className="max-w-fit mx-auto">
            {" "}
            {/* max-w-fit se ye buttons ke mutabiq shrink ho jayega */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-2 flex items-center gap-2 transition-all duration-700 hover:shadow-blue-500/10 hover:border-white/20">
              {/* Logo - Liquid Drop Style */}
              <div
                className="px-6 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 text-blue-400 font-black tracking-tighter cursor-pointer hover:bg-blue-600/40 transition-all duration-500 mr-2"
                onClick={() => setCurrentPage("home")}
              >
                NASA<span className="text-white">PRO</span>
              </div>

              {/* Navigation Links - The Liquid Elements */}
              <div className="flex gap-1 items-center overflow-x-auto no-scrollbar max-w-[300px] md:max-w-none px-2 py-1">
                {[
                  "home",
                  "mercury",
                  "venus",
                  "earth",
                  "mars",
                  "jupiter",
                  "saturn",
                  "uranus",
                  "neptune",
                  "apod",
                ].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 relative group overflow-hidden whitespace-nowrap ${
                      currentPage === page
                        ? "text-white bg-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] border border-white/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {/* Background Liquid Hover Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                    <span className="relative z-10">
                      {page === "apod" ? "Daily Photo" : page}
                    </span>

                    {/* Bottom Glow for Active Link */}
                    {currentPage === page && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[1px]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
          {currentPage === "home" && (
            <div className="text-center py-20 flex flex-col items-center">
              <h1 className="text-5xl md:text-8xl font-black mb-6 bg-gradient-to-b from-white to-blue-900 bg-clip-text text-transparent">
                STALLAR JOURNEY
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
                Navigate through the cosmos using NASA's live data archives.
                Experience the beauty of our universe, one planet at a time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
                <button
                  onClick={() => setCurrentPage("mars")}
                  className="p-5 bg-orange-600/20 border border-orange-500/50 rounded-2xl font-bold hover:bg-orange-600 transition group"
                >
                  Explore{" "}
                  <span className="group-hover:ml-2 transition-all text-orange-400">
                    Mars →
                  </span>
                </button>
                <button
                  onClick={() => setCurrentPage("earth")}
                  className="p-5 bg-blue-600/20 border border-blue-500/50 rounded-2xl font-bold hover:bg-blue-600 transition group"
                >
                  View{" "}
                  <span className="group-hover:ml-2 transition-all text-blue-400">
                    Earth →
                  </span>
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="animate-pulse text-blue-400 font-mono tracking-widest text-sm">
                ESTABLISHING UPLINK...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(currentPage === "earth" || currentPage === "mars") &&
                data?.map &&
                data.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 group"
                  >
                    <div className="overflow-hidden h-64">
                      <img
                        src={item.links[0].href}
                        className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                        alt="space"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-blue-400 font-bold mb-2 truncate">
                        {item.data[0].title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 italic">
                        {item.data[0].description}
                      </p>
                    </div>
                  </div>
                ))}

              {currentPage === "apod" && data && !data.map && (
                <div className="col-span-full text-center max-w-4xl mx-auto">
                  <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block">
                    Featured Discovery
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8">
                    {data.title}
                  </h2>
                  <div className="relative group rounded-3xl overflow-hidden mb-10 shadow-2xl border border-white/10">
                    <img
                      src={data.url}
                      className="w-full h-full object-cover"
                      alt="NASA APOD"
                    />
                  </div>
                  <div className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-white/5 text-left">
                    <p className="text-gray-300 leading-relaxed text-lg first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                      {data.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="mt-auto border-t border-white/5 py-12 bg-black/40 backdrop-blur-md text-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Data synchronized via NASA Open API Systems •{" "}
              {new Date().getFullYear()}
            </p>
            <div className="flex justify-center gap-8 mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              <span className="hover:text-blue-400 cursor-pointer transition">
                Terminal Access
              </span>
              <span className="hover:text-blue-400 cursor-pointer transition">
                Deep Space Logs
              </span>
              <span className="hover:text-blue-400 cursor-pointer transition">
                Contact Houston
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SpaceExplorer;
