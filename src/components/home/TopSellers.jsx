import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopSellers() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
      setLoading(false);
    }

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ? (
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "20px" }}
                      ></div>
                      <span>
                        <div
                          className="skeleton-box"
                          style={{ width: "40px", height: "20px" }}
                        ></div>
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {topSellers.map((nft) => (
                  <li key={nft.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={nft.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${nft.authorId}`}>{nft.authorName}</Link>
                      <span>{nft.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
