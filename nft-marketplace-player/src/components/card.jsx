import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './card.css'

const NFTCard = ({ nft, handlePayment, player }) => {

    return (
        <div className="card m-5">
            <div className="card-img">
                <img src={require(`../assets/thumbnails/${nft.thumbnail}`)} className = 'card-img-top card-img' alt={nft.nftName} />
            </div>
            <div className="card-body">
                <h5 className='card-title'>{nft.nftName}</h5>
                <p className='card-text'>{nft.nftDescription}</p>
                <p className='card-text'>Price: {nft.nftPrice} wei</p>
                {!player && (nft.mediaType === "audio" ? <button onClick={()=>{console.log("hear me"); handlePayment(nft)}} className='btn btn-primary'>Hear Audio</button> : <button onClick={()=>{console.log("watch me");  handlePayment(nft)}} className='btn btn-primary'>Watch video</button>)}
            </div>
        </div>
    );
};

export default NFTCard
