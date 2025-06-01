"use client";
import { useState } from "react";
import { LuRefreshCw } from "react-icons/lu";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(50000);
  const [isToUSD, setIsToUSD] = useState(false);

  // Utility function to convert based on direction
  const convert = (value: number, toUSD: boolean) =>
    toUSD ? value / exchangeRate : value * exchangeRate;

  const converted = convert(amount, isToUSD).toFixed(isToUSD ? 5 : 0);

  const handleSwitch = () => {
    const newDirection = !isToUSD;
    const newAmount = convert(amount, newDirection);
    setIsToUSD(newDirection);
    setAmount(newAmount);
  };

  const getLabel = (isRight: boolean) =>
    isToUSD ? (isRight ? "🇺🇸 USD" : "🇮🇷 IRR") : isRight ? "🇮🇷 IRR" : "🇺🇸 USD";

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-[60%] shadow-lg rounded-xl p-8 flex flex-col gap-4">
        {/* Exchange Rate Input */}
        <div className="w-full flex flex-col">
          <label className="p-2 text-gray-400">
            Exchange Rate (1 USD to IRR)
          </label>
          <input
            type="number"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(Number(e.target.value))}
            className="w-full p-4 pt-6 border-slate-300 outline-none rounded-xl bg-white font-light"
          />
        </div>

        {/* Conversion Inputs */}
        <div className="flex items-center gap-2 mb-4">
          {/* Left Input */}
          <div className="w-1/2 bg-white p-8 rounded-xl">
            <label className="text-gray-500 mb-2 block">
              Amount in {getLabel(false)}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="peer w-full p-4 pt-6 border-slate-300 outline-none bg-white font-light border-b-2 transition"
            />
          </div>

          {/* Switch Button */}
          <div
            className="relative z-20 -mx-6 cursor-pointer"
            onClick={handleSwitch}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                <LuRefreshCw size={20} color="#7C3AED" />
              </div>
            </div>
          </div>

          {/* Right Output */}
          <div className="w-1/2 bg-white p-8 rounded-xl">
            <label className="text-gray-500 mb-2 block">
              Converted to {getLabel(true)}
            </label>
            <input
              type="text"
              value={converted}
              readOnly
              className="peer w-full p-4 pt-6 border-slate-300 outline-none bg-white font-light border-b-2 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
