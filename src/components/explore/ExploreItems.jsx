import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftItem from "../UI/NftItem";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchExploreItems(filter) {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
      setExploreItems(data);
      setLoading(false);
    }

    fetchExploreItems(filter);
  }, [filter]);

  const loadMoreItems = () => {
    setVisibleItems((prevVisible) => prevVisible + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <Skeleton width="100%" height="400px" />
          </div>
        ))
      ) : (
        <>
          {exploreItems.slice(0, visibleItems).map((nft) => (
            <div
              key={nft.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftItem
                id={nft.nftId}
                authorId={nft.authorId}
                authorName={nft.authorName}
                authorImage={nft.authorImage}
                expiryDate={nft.expiryDate}
                nftImage={nft.nftImage}
                price={nft.price}
                title={nft.title}
                likes={nft.likes}
              />
            </div>
          ))}
          {visibleItems < exploreItems.length && (
            <div className="col-md-12 text-center">
              <Link
                to="#"
                onClick={loadMoreItems}
                id="loadmore"
                className="btn-main lead"
              >
                Load more
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExploreItems;
