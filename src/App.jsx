// import { useState } from 'react'
import './App.css'
import { useState, useEffect } from "react";
import IpMap from "./components/IpMap";

function App() {
  const [ipInfo, setIpInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "at_z75XvocfqEDHLD1CLibbcnEzJZniH";

  // Validate IP address or domain
  const isValidInput = (input) => {
    // Simple regex for IPv4, IPv6, or domain
    const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6 = /^([\da-fA-F]{0,4}:){2,7}[\da-fA-F]{0,4}$/;
    const domain = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,6}$/;
    return ipv4.test(input) || ipv6.test(input) || domain.test(input);
  };

  // Fetch info for a given IP or domain
  const fetchIpInfo = (query = "") => {
    setLoading(true);
    setError("");
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
    if (query) url += `&ipAddress=${query}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.code || data.messages || data.location == null) {
          setError("No results found for this IP address or domain.");
          setIpInfo(null);
        } else {
          setIpInfo(data);
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
    <div className="w-full h-screen">
      {/* searchBar and ipinfo section */}
      <div className="relative">
        {/* search bar */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center  p-4 bg-[url(/public/pattern-bg-desktop.png))] bg-cover min-h-48">
          <h2 className="text-center text-3xl font-bold">IP Address Tracker</h2>
          <div className="mt-4 flex justify-center w-full">
            <input
              className="p-2 bg-white text-black border-0 rounded-tl-sm rounded-bl-sm w-1/4"
              type="text"
              name="search"
              id="search"
              placeholder="Search for any IP address or domain"
              value={search}
              onChange={e => { setSearch(e.target.value); setError(""); }}
            />
            <button
              type="submit"
              className="p-2 bg-black rounded-tr-sm rounded-br-sm transition-all duration-200 hover:bg-gray-800 hover:scale-105 cursor-pointer"
              style={{transition: 'all 0.2s'}}
            >
              <img src="/public/icon-arrow.svg" alt="arrow"/>
            </button>
          </div>
          {error && (
            <div className="mt-3 w-full flex justify-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow text-center max-w-md w-full animate-fade-in">
                {error}
              </div>
            </div>
          )}
        </form>

        {/* ipinfo */}
        <div className="w-full flex justify-center z-10 relative" style={{marginTop: '-2.5rem'}}>
          <div className="flex justify-between items-center p-4 rounded-md bg-white text-black w-full max-w-4xl mx-auto shadow-xl">
            {/*ip address*/}
            <span className="block">
              <h2 className="text-black text-xs tracking-widest">IP ADDRESS</h2>
              <h2 className="text-black text-2xl font-bold">{ipInfo?.ip || "-"}</h2>
            </span>
            {/*location*/}
            <span className="block">
              <h2 className="text-black text-xs tracking-widest">LOCATION</h2>
              <h2 className="text-black text-xl font-bold">{ipInfo ? `${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.country}` : "-"}</h2>
            </span>
            {/*TIMEZONE*/}
            <span className="block">
              <h2 className="text-black text-xs tracking-widest">TIMEZONE</h2>
              <h2 className="text-black text-xl font-bold">{ipInfo?.location?.timezone ? `UTC ${ipInfo.location.timezone}` : "-"}</h2>
            </span>
            {/*ISP*/}
            <span className="block">
              <h2 className="text-black text-xs tracking-widest">ISP</h2>
              <h2 className="text-black text-xl font-bold">{ipInfo?.isp || "-"}</h2>
            </span>
          </div>
        </div>
      </div>

      {/* map section */}
      <div className="flex-1 bg-white h-full mt-2">
        {loading ? (
          <div>Loading map...</div>
        ) : ipInfo?.location ? (
          <IpMap lat={ipInfo.location.lat} lng={ipInfo.location.lng} />
        ) : (
          <div>No map data</div>
        )}
      </div>
    </div>
  )
}

export default App
