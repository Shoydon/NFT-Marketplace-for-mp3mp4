import NFTCard from '../components/card';
import '../styles/home.css'

const Home = ({ handlePayment, nfts, player }) => {

  return (
    <div>
      <div className="nft-list">
        {nfts.length ? (nfts.map(
          (nft, index) =>
            !nft.isSold && (
              <NFTCard
                key={nft.id}
                nft={nft}
                handlePayment={handlePayment}
                player={player}
              />
            )
        )) : <div className='no-nfts'><h1>No NFTs to display</h1></div>}
      </div>
    </div>
  )
}

export default Home;