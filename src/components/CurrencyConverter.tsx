"use client";

import React, { useState } from "react";
import { LuRefreshCw } from "react-icons/lu";

const CurrencyConverter: React.FC = () => {
  const [exchangeRateInput, setExchangeRateInput] = useState("822500");
  const [amountInput, setAmountInput] = useState("1");
  const [usdToIrr, setUsdToIrr] = useState(true);

  const handleNumericInput = (value: string, setter: (val: string) => void) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleSwitch = () => {
    setUsdToIrr(!usdToIrr);
  };

  const getLabel = (isConvertedSide: boolean) => {
    const isUSD = isConvertedSide ? !usdToIrr : usdToIrr;
    return isUSD ? "🇺🇸 USD" : "🇮🇷 IRR";
  };

  const converted = (() => {
    const amount = parseFloat(amountInput);
    const rate = parseFloat(exchangeRateInput);
    if (isNaN(amount) || isNaN(rate)) return "";
    return usdToIrr ? (amount * rate).toFixed(0) : (amount / rate).toFixed(2);
  })();

  return (
    <div className="flex-1 flex items-center justify-center ">
      <div className="w-[90%] sm:w-[60%] shadow-lg rounded-xl p-8 flex flex-col gap-4 bg-[#f4f6f8]">
        <div className="text-purple-600  py-2 flex align-items-start ">
          <h2 className="font-semibold text-2xl ">Currency Converter</h2>
        </div>

        <div className="w-full flex flex-col">
          <label className="p-2 text-gray-400">
            Exchange Rate (1 USD to IRR)
          </label>
          <input
            type="text"
            value={exchangeRateInput}
            onChange={(e) =>
              handleNumericInput(e.target.value, setExchangeRateInput)
            }
            className="w-full p-4 pt-6 border-slate-300 outline-none rounded-xl bg-white font-light"
          />
        </div>

        <div className="flex flex-col xl:flex-row items-center  mb-4">
          <div className="w-full xl:w-1/2 bg-white p-8 rounded-xl">
            <label className="text-gray-500 mb-2 block">
              Amount in {getLabel(false)}
            </label>
            <input
              type="text"
              value={amountInput}
              onChange={(e) =>
                handleNumericInput(e.target.value, setAmountInput)
              }
              className="peer w-full p-4 pt-6 border-slate-300 outline-none bg-white font-light border-b-2 transition"
            />
          </div>
          <h1></h1>

          <div
            className="relative z-20 -my-6 xl:-mx-6 cursor-pointer"
            onClick={handleSwitch}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                <LuRefreshCw size={20} color="#7C3AED" />
              </div>
            </div>
          </div>

          <div className="w-full  xl:w-1/2 bg-white p-8 rounded-xl">
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
};

export default CurrencyConverter;
