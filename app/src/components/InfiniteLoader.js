import React, { useState, useEffect, useRef } from "react";
import { Spin, Card } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Head, Container, CardLayout, Loader } from "./styles";

//Mock API call
const url = "https://jsonplaceholder.typicode.com";

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
    //set fetched data
    const response = await fetch(`${url}/posts`);
    const json = await response.json()
    setCards([...cards,...json.splice(cards.length, cards.length + 10)]);
    console.log(cards);

    //set spinner off
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
    //set spinner on
    setInfiniteLoad(true);
    // make API call here
    fetchCards();
  }, [trackPage]);

  return (
    <Container>
      <Head>Infinite Loader <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} />}/> </Head>
      <CardLayout>
        {cards.map((card) =>
          <Card key={card.id} style={{ width: 300, height: 300, margin: '0.5%' }} title={card.title}>{card.body}</Card>
        )}
      </CardLayout>
      <Loader className="infiniteLoad" ref={loader}>
        {infiniteLoad ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} />} />
        ) : (
          <h2 style={{ color: "#d9d9d9" }}>
            Load More <ReloadOutlined />
          </h2>
        )}
      </Loader>
    </Container>
  );
};

export default InfiniteLoader;
