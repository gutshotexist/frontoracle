import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ADDRESS, ABI } from "@/Contracts/constants";

function MyComponent(props) {
  const [data, setData] = useState(null);
  const [lastUpdateString, setLastUpdateString] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      const myContract = new Contract(CONTRACT_ADDRESS, ABI, provider);
      const [lastPrice, name] = await Promise.all([
        myContract.functions.getLastPrice("0"),
        myContract.functions.symbolName("0"),
      ]);
      setData(lastPrice);
      props.setSymbolName(name);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const timeDiffInMs = Date.now() - data.timestamp.toNumber() * 1000;
      const timeDiffInSeconds = Math.floor(timeDiffInMs / 1000);
      let timeDiffString;
      if (timeDiffInSeconds < 60) {
        timeDiffString = `${timeDiffInSeconds} seconds`;
      } else if (timeDiffInSeconds < 3600) {
        const timeDiffInMinutes = Math.floor(timeDiffInSeconds / 60);
        timeDiffString = `${timeDiffInMinutes} minutes`;
      } else {
        const timeDiffInHours = Math.floor(timeDiffInSeconds / 3600);
        timeDiffString = `${timeDiffInHours} hours`;
      }
      setLastUpdateString(`Last update: ${timeDiffString} ago`);
    }
  }, [data]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {data ? (
        <>
          <p>Price: {`${Math.floor(data.price / 100)},${data.price % 100}`}</p>
          <p>{lastUpdateString}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
