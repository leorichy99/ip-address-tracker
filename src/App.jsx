// import { useState } from 'react'
import { useState, useEffect } from "react";
import IpMap from "./components/IpMap";
import LoadingSpinner from "./components/LoadingSpinner";
import { Alert } from "antd";

function App() {
  const [ipInfo, setIpInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  // Validate IP address or domain
  const isValidInput = (input) => {
    // Simple regex for IPv4, IPv6, or domain
    const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6 = /^([\da-fA-F]{0,4}:){2,7}[\da-fA-F]{0,4}$/;
    const domain = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})*\.[A-Za-z]{2,}$/;
    return ipv4.test(input) || ipv6.test(input) || domain.test(input);
  };

  // Fetch info for a given IP or domain
  const fetchIpInfo = (query = "") => {
    setLoading(true);
    setError("");
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IPIFY_API_KEY}`;
    if (query) {
      if (isValidInput(query)) {
        if (/^(\d{1,3}\.){3}\d{1,3}$/.test(query) || /^([\da-fA-F]{0,4}:){2,7}[\da-fA-F]{0,4}$/.test(query)) {
          url += `&ipAddress=${query}`;
        } else {
          url += `&domain=${query}`;
        }
      }
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.code || data.messages || data.location == null) {
          setError("No results found for this IP address or domain.");
          setIpInfo(null);
        } else {
          setIpInfo(data);
          console.log(data); // Log the fetched data for debugging
        }
        setLoading(false);
      })
      .catch(error => {
        setError("Network error. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIpInfo(); // Fetch user's IP info on load
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError("Please enter an IP address or domain.");
      setIpInfo(null);
      return;
    }
    if (!isValidInput(search.trim())) {
      setError("Invalid IP address or domain format.");
      setIpInfo(null);
      return;
    }
    fetchIpInfo(search.trim());
  };


  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* searchBar and ipinfo section */}
      <div className="relative w-full flex-shrink-0">
        {/* search bar */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-4 bg-[url(/pattern-bg-mobile.png)] sm:bg-[url(/pattern-bg-desktop.png)] bg-cover min-h-48 sm:min-h-40 md:min-h-48">
          <h2 className="text-center text-2xl text-white sm:text-3xl font-bold">IP Address Tracker</h2>
          <div className="mt-4 flex justify-center w-full gap-0 px-2 sm:p-0">
            <input
              className="p-2 bg-white text-gray-900 outline-none rounded-tl-sm rounded-bl-sm w-full sm:w-1/2 md:w-1/4 min-w-0 transition-all duration-200 placeholder-gray-500"
              type="text"
              name="search"
              id="search"
              placeholder="Search for any IP address or domain"
              value={search}
              autoComplete="off"
              onChange={e => {
                const value = e.target.value;
                setSearch(value);
                setError("");
                if (value.trim() === "") {
                  fetchIpInfo(); // Reset info when input is cleared
                }
              }}
              style={{ border: "none" }}
            />
            <button
              type="submit"
              className="p-2 bg-black rounded-tr-sm rounded-br-sm transition-all duration-200 hover:bg-gray-800 hover:scale-105 cursor-pointer w-auto"
              style={{transition: 'all 0.2s'}}
            >
              <img src="/icon-arrow.svg" alt="arrow" className="mx-auto"/>
            </button>
          </div>
        </form>

        {/* ipinfo */}
        {ipInfo?.location && !loading && !error && (
          <div
            className="absolute w-full flex justify-center z-20 px-2 transition-all duration-500 opacity-0 translate-y-4"
            style={{
              marginTop: '-2.5rem',
              pointerEvents: 'none',
              opacity: ipInfo?.location && !loading && !error ? 1 : 0,
              transform: ipInfo?.location && !loading && !error ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <div
              className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-2 sm:gap-4 p-2 sm:p-4 rounded-md bg-white text-black w-full max-w-4xl mx-auto shadow-xl"
              style={{ pointerEvents: 'auto' }}
            >
              {/*ip address*/}
              <span className="block w-full md:w-auto text-center md:text-left">
                <h2 className="text-gray-600 text-[10px] tracking-widest uppercase">IP ADDRESS</h2>
                <h2 className="text-black text-lg md:text-xl font-bold break-all">{ipInfo?.ip || "-"}</h2>
              </span>
              {/* Separator */}
              <span className="hidden md:inline-block h-12 border-l border-gray-200 mx-1"></span>
              {/*location*/}
              <span className="block w-full md:w-1/4 text-center md:text-left">
                <h2 className="text-gray-600 text-xs tracking-widest uppercase mb-1">LOCATION</h2>
                <h2 className="text-black text-base md:text-xl font-bold break-all leading-tight">
                  {ipInfo
                    ? <>
                        {ipInfo.location.city},<br />
                        {ipInfo.location.region},<br />
                        {ipInfo.location.postalCode}
                        {ipInfo.location.country}
                      </>
                    : "-"}
                </h2>
              </span>
              {/* Separator */}
              <span className="hidden md:inline-block h-12 border-l border-gray-200 mx-1"></span>
              {/*TIMEZONE*/}
              <span className="block w-full md:w-auto text-center md:text-left">
                <h2 className="text-gray-600 text-[10px] tracking-widest uppercase">TIMEZONE</h2>
                <h2 className="text-black text-base md:text-xl font-bold">{ipInfo?.location?.timezone ? `UTC ${ipInfo.location.timezone}` : "-"}</h2>
              </span>
              {/* Separator */}
              <span className="hidden md:inline-block h-12 border-l border-gray-200 mx-1"></span>
              {/*ISP*/}
              <span className="block w-full md:w-1/4 text-center md:text-left">
                <h2 className="text-gray-600 text-xs tracking-widest uppercase mb-1">ISP</h2>
                <h2 className="text-black text-base md:text-xl font-bold break-all leading-tight">
                  {ipInfo?.isp
                    ? ipInfo.isp.split(' ').map((word, i) => (
                        <span key={i}>{word}<br /></span>
                      ))
                    : "-"}
                </h2>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* map section */}
      <div className="flex-1 w-full relative z-10 flex">
        {error ? (
          <div className="flex justify-center items-center h-full w-full p-4">
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="w-full max-w-md"
              style={{ fontSize: 18 }}
            />
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : ipInfo?.location ? (
          <IpMap lat={ipInfo.location.lat} lng={ipInfo.location.lng}/>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  )
}

export default App
