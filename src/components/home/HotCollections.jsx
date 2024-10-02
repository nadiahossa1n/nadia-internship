import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchHotCollections();
  }, [loading]);

  const options = {
    loop: true,
    nav: true,
    dots: false,
    margin: 20,
    responsive: {
      1440: { items: 4 },
      1024: { items: 3 },
      768: { items: 2 },
      375: { items: 1 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ?  
          <OwlCarousel className="owl-carousel" {...options}>
            {new Array(4).fill(6).map((_, index) => (
              <div className="nft_coll" key={index}>
                <div className="nft_wrap">
                  <div className="skeleton-box" style={{ width: '100%', height: '200px' }}></div>
                </div>
                <div className="nft_coll_pp">
                  <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <div className="skeleton-box" style={{ width: '100px', height: '20px' }}></div>
                  <br></br>
                  <div className="skeleton-box" style={{ width: '60px', height: '20px' }}></div>
                </div>
              </div>
            ))}
          </OwlCarousel>
          : 
            <OwlCarousel className="owl-carousel" {...options}>
              {hotCollections.map((nft, index) => (
                <div key={nft.id} className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img
                        src={nft.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${nft.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={nft.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nft.title}</h4>
                    </Link>
                    <span>ERC-{nft.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          } 
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
