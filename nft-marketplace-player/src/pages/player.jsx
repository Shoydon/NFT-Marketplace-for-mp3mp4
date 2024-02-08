import React from 'react'
import '../styles/player.css'
import ReactAudioPlayer from 'react-audio-player';
import { useRef } from 'react';


function PlayerComponent({ nft, setPlayer, setCurrentNft }) {

    const videoRef = useRef(null);

    return (
        <div className='player'>
            {nft ?
                <div className="player-card m-5">
                    {console.log("NFT in player ", nft)}
                    {nft.mediaType === 'audio' && <>
                        <div className="card-img">
                            <img src={require(`../assets/thumbnails/${nft.thumbnail}`)} className='card-img-top card-img' alt={nft.nftName} />
                        </div>
                        <div className="card-body">
                            <h5 className='card-title'>{nft.nftName}</h5>
                            <ReactAudioPlayer
                                src={nft.nftUrl}
                                autoPlay
                                controls
                            />
                        </div>
                    </>}
                    {nft.mediaType === 'video' && <>
                        <div className="card-body">
                            {/* <Player
                            playsInline
                            poster={nft.thumbnail}
                            src={nft.nftUrl}
                            width="720"
                            height="420"
                        /> */}
                            {/* <ReactPlayer
                                url={nft.nftUrl}
                                width="1640"
                                height="820"
                                controls
                            /> */}
                            {/* <VideoPlayer
                                controls={true}
                                src={nft.nftUrl}
                                poster={nft.thumbnail}
                                width="720"
                                height="420"
                                playsInline
                                // onReady={this.onPlayerReady.bind(this)}
                            /> */}
                            <video
                                // onTimeUpdate={handleProgress}
                                ref={videoRef}
                                width="100%"
                                height="100%"
                                controls
                            >
                                <source src={nft.nftUrl} type="video/mp4" />
                            </video>
                            <div>
                                <h5 className='card-title'>{nft.nftName}</h5>
                                {/* <button onClick={togglePlay} className='btn'>
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                                <progress value={progress} max="100" /> */}
                            </div>
                        </div>
                    </>}
                    <button onClick={() => { setPlayer(false); setCurrentNft(null); return }} className="btn btn-warning m-2" >Close</button>
                </div> : <> {console.log("no nfts in player")} </>
            }
        </div>
        // <div className="player-card m-5">
        //     {console.log("NFT in player ",nft)}
        //     {nft.mediaType === 'audio' ? <><div className="card-img">
        //         <img src={require(`../assets/thumbnails/${nft.thumbnail}`)} className='card-img-top card-img' alt={nft.nftName} />
        //     </div>
        //     <div className="card-body">
        //         <h5 className='card-title'>{nft.nftName}</h5>
        //         <p className='card-text'>{nft.nftDescription}</p>
        //         <p className='card-text'>Price: {nft.nftPrice} wei</p>
        //         <button onClick={() => { setPlayer(false); setCurrentNft(null); return }} className="btn btn-primary" >Finish</button>
        //     </div></> : <>{() => {console.log("no nft in player tab");}}</>}
        // </div>
    )
}

export default PlayerComponent
