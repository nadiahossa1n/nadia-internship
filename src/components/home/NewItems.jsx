import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import CountdownTimer from "../UI/CountdownTimer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setLoading(false);
    }

    fetchNewItems();
  }, [loading]);

  const options = {
    loop: true,
    nav: true,
    dots: false,
    margin: 20,
    rewind: false,
    responsive: {
      1440: { items: 4 },
      1024: { items: 3 },
      768: { items: 2 },
      375: { items: 1 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <OwlCarousel className="owl-carousel" {...options}>
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "999px",
                      }}
                    ></div>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "100%",
                        height: "350px",
                        marginBottom: "8px",
                      }}
                    ></div>
                  </div>
                  <div
                    className="nft__item_info"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <a href="">
                      <div
                        className="skeleton-box"
                        style={{ width: "180px", height: "30px" }}
                      ></div>
                    </a>
                    <div
                      className="skeleton-box"
                      style={{ width: "100px", height: "20px" }}
                    ></div>
                  </div>
                  <div className="nft__item_like">
                    <div
                      className="skeleton-box"
                      style={{ width: "30px", height: "15px" }}
                    ></div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-carousel" {...options}>
              {newItems.map((nft) => (
                <div className="nft__item" key={nft.id}>
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${nft.authorName}`}
                    >
                      <img className="lazy" src={nft.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    <CountdownTimer expiryDate={nft.expiryDate} />
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to="/item-details">
                      <img
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{nft.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;