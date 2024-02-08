import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";

import Navbar from "./components/navbar";
import contractData from "./contract.json";
import Home from "./pages/home";
import MintNFT from "./pages/mintNFT";
import PlayerComponent from "./pages/player";
import "./components/card.css";
import "./styles/player.css";
// import AudioPlayer from "./components/AudioPlayer";

function App() {

  const [nfts, setNfts] = useState([]);
  const [player, setPlayer] = useState(false);
  const [currentNft, setCurrentNft] = useState(null);

  const handlePayment = async (nft) => {
    let connectedAccount;
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
        const accounts = await web3.eth.getAccounts();
        connectedAccount = accounts[0];
        console.log(connectedAccount);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
    const amount = nft.nftPrice;
    const receiverAddress = contractData.owner;
    // const web3 = new Web3(provider);
    const web3 = new Web3(window.ethereum);
    console.log("Connected Account: ", connectedAccount);
    console.log("Receiver: ", receiverAddress);
    console.log("Total Amount: ", amount);
    try {
      const trxnObj = {
        from: connectedAccount,
        to: receiverAddress,
        value: amount,
        gas: "30000",
      };
      const trxn = await web3.eth.sendTransaction(trxnObj);
      const trxnHash = trxn.transactionHash;
      console.log("Transaction sent.\n Hash: ", trxnHash);
      alert("Transaction successful!");
      const trxnURL = `https://sepolia.etherscan.io/tx/${trxnHash}`;
      console.log(trxnURL);
      console.log(nft);
      let currNft = nft;
      console.log("Curr nft: ", currNft);
      setCurrentNft(nft);
      setPlayer(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BrowserRouter className="nft-marketplace">
      <Navbar player={player} />
      {/* <div id="player">{player && memoizedPlayer}</div> */}
      {/* <div className="player">{player && <AudioPlayer nft={currentNft} setPlayer={setPlayer} setCurrentNft={setCurrentNft} />}</div> */}
      <div>{player && <PlayerComponent nft={currentNft} setPlayer={setPlayer} setCurrentNft={setCurrentNft} />}</div>
      {/* {player && (currentNft.mediaType === "audio" ? <button onClick={()=>{console.log("hear me"); handlePayment(nft)}} className='btn btn-primary'>Hear Audio</button> : <button onClick={()=>{console.log("watch me");  handlePayment(nft)}} className='btn btn-primary'>Watch video</button>)} */}
      {/* <div>
        {player && (
          <div  className="player-card m-5">
            {console.log("NFT in player ", currentNft)}
            {currentNft ? (
              <div>
                <div className="card-img">
                  <img
                    src={require(`./assets/thumbnails/${currentNft.thumbnail}`)}
                    className="card-img-top card-img"
                    alt={currentNft.nftName}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{currentNft.nftName}</h5>
                  <p className="card-text">{currentNft.nftDescription}</p>
                  <p className="card-text">Price: {currentNft.nftPrice} wei</p>
                  <button
                    onClick={() => {
                      setPlayer(false);
                      setCurrentNft(null);
                      return;
                    }}
                    className="btn btn-primary"
                  >
                    Finish
                  </button>
                </div>
              </div>
            ) : (
              <>
                {() => {
                  console.log("no nft in player tab");
                }}
              </>
            )}
          </div>
        )}
      </div> */}
      <div>
        <Routes>
          <Route
            index
            element={<Home nfts={nfts} handlePayment={handlePayment} player={player}/>}
          />
          {!player && <Route
            path="mintNFT"
            element={<MintNFT nfts={nfts} setNfts={setNfts} />}
          />}
          {/* <Route path="player" element={}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
