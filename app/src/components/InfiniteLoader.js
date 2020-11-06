import React, { useState, useEffect, useRef } from "react";

const mock = {};
const InfiniteLoader = () => {
// Card State
    const [cards, setCards] = useState([]);
// Infinite Loader State
  const [trackPage, setTrackPage] = useState(1);
  const [infiniteLoad, setInfiniteLoad] = useState(true);
  const loader = useRef(null);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setTrackPage((page) => page + 1);
    }
  };
  const fetchCards = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    setData(mock);
    setInfiniteLoad(false);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    setInfiniteLoad(true);
    // make API call here
    fetchCards();
  }, [trackPage]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "200px",
        }}
      >
        {infiniteLoad ? (
          <Spin
            indicator={<Icon type="loading" style={{ fontSize: 50 }} spin />}
          />
        ) : (
          <h2 style={{ color: "#d9d9d9" }}>Load More</h2>
        )}
      </div>
      <span className="infiniteLoad" ref={loader}></span>
    </>
  );
};

export default InfiniteLoader;
