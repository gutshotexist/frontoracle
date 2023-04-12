import MyComponent from "./MyComponent";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { CONTRACT_ADDRESS, ABI } from "@/Contracts/constants";

const React = require("react");
const {
  Chart: ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} = require("chart.js");
const { Line } = require("react-chartjs-2");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph() {
  const [symbolName, setSymbolName] = useState("");
  const [formattedPrices, setFormattedPrices] = useState(null);
  const [timestamps, setTimestamps] = useState([]);
  const [prices, setPrices] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: symbolName,
        font: {
          size: 16,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      const myContract = new Contract(CONTRACT_ADDRESS, ABI, provider);
      const historicalPrices = [];
      let roundId = 1;
      let error = false;
      while (!error) {
        try {
          const [[timestamp, price], name] = await Promise.all([
            myContract.functions.getHistoryPrice("0", roundId.toString()),
            myContract.functions.symbolName("0"),
          ]);
          historicalPrices.push({ timestamp, price });
          roundId++;
        } catch (e) {
          // handle the error as needed, e.g. set error to true
          error = true;
        }
      }
      console.log("historicalPrices:", historicalPrices);
      console.log("name:", name);
      const formattedPrices = historicalPrices.map((price) => ({
        timestamp: price.timestamp.toNumber(),
        price: formatUnits(price.price, 2),
      }));
      console.log("formattedPrices:", formattedPrices);
      setFormattedPrices(formattedPrices);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (formattedPrices) {
      const newTimestamps = formattedPrices.map(({ timestamp }) =>
        new Date(timestamp * 1000).toLocaleDateString()
      );
      const newPrices = formattedPrices.map(({ price }) => +price);
      setTimestamps(newTimestamps);
      setPrices(newPrices);
    }
  }, [formattedPrices]);

  const chartHeight = 1700;
  const chartWidth = 1700;

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "",
        data: prices,
        borderColor: "rgb(210, 50, 0)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <div
        style={{ height: chartHeight, width: chartWidth, marginTop: "200px" }}
      >
        <Line data={data} options={options} />
        <MyComponent setSymbolName={setSymbolName} />
      </div>
    </div>
  );
}

export default LineGraph;
