import CurrencyConverter from "@/components/CurrencyConverter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#f4f6f8]">
      <Navbar />
      <CurrencyConverter />
    </div>
  );
}
