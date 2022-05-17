import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { clientContext } from "../contexts/ClientContext";
import styled from "styled-components";
import { FormControlLabel, Switch } from "@mui/material";
import { Link } from "react-router-dom";

export default function ClientProduct({ toggleTheme }) {
  const data = useContext(clientContext);

  const {
    getProduct,
    sneakers,
    addProductToCart,
    checkProductInCart,
    deleteProductInCart,
    addProductToFav,
    checkProductInFavorites,
    deleteProductInFavorites,
  } = data;

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <React.Fragment>
      <Containers>
        <Swiper
          direction={"vertical"}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {sneakers.map((item, index) => (
            <SwiperSlide key={index + 1}>
              <Containers>
                <DivInfo>
                  <DivText>
                    <div>
                      <Sneaker>{item.type}</Sneaker>
                      <SneakerBrand>{item.brand}</SneakerBrand>
                    </div>
                    <SneakerSubtype>{item.subtype}</SneakerSubtype>
                    <div>
                      <SneakerDesc>{item.desc}</SneakerDesc>
                    </div>
                    <DivSpan>
                      <Spans>Release date: {item.releaseDate}</Spans>
                      <Spans>Colorway: {item.colorway}</Spans>
                      <Spans>Sizes: {item.sizes} EU</Spans>
                    </DivSpan>
                  </DivText>
                  <div>
                    <ImageInfo src={item.image} alt="" />
                  </div>
                  <div>
                    <SpanNum>0{index + 1}</SpanNum>
                  </div>
                </DivInfo>
                <BottomDiv>
                  <div>
                    <FormControlLabel
                      control={<Switch />}
                      label="Black"
                      onChange={toggleTheme}
                    />
                  </div>
                  <BottomMid>
                    <BMSpan>{item.price}$</BMSpan>
                    {checkProductInCart(item.id) ? (
                      <BMButton onClick={() => deleteProductInCart(item.id)}>
                        Add to cart
                      </BMButton>
                    ) : (
                      <BMButton onClick={() => addProductToCart(item)}>
                        Add to cart
                      </BMButton>
                    )}
                  </BottomMid>
                  <BEDiv>
                    <Link to={`/review/${item.id}`}>
                      <BMButtonFav>Customers review</BMButtonFav>
                    </Link>
                    {checkProductInFavorites(item.id) ? (
                      <BMButtonFav
                        onClick={() => deleteProductInFavorites(item.id)}
                      >
                        Add to wish list
                      </BMButtonFav>
                    ) : (
                      <BMButtonFav onClick={() => addProductToFav(item)}>
                        Add to wish list
                      </BMButtonFav>
                    )}
                  </BEDiv>
                </BottomDiv>
              </Containers>
            </SwiperSlide>
          ))}
        </Swiper>
      </Containers>
    </React.Fragment>
  );
}

const Containers = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.bg};
`;

const DivText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: space-between;

  width: 494px;
`;

const DivSpan = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const Sneaker = styled.span`
  color: ${(props) => props.theme.text};
  font-weight: 400;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
`;
const SneakerBrand = styled.h2`
  color: ${(props) => props.theme.text};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 40px;
  letter-spacing: 1px;
`;

const SneakerSubtype = styled.h2`
  color: ${(props) => props.theme.text};
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
`;

const SneakerDesc = styled.p`
  color: ${(props) => props.theme.text};
  font-weight: 400;
  font-size: 13px;
`;

const Spans = styled.span`
  color: ${(props) => props.theme.text};
  font-weight: 400;
  font-size: 13px;
`;

const DivInfo = styled.div`
  display: flex;
  width: 90%;
  margin-left: 10%;
  justify-content: space-between;

  margin-top: 2%;
  flex-wrap: wrap;
`;

const ImageInfo = styled.img`
  background: transparent;
  height: 100%;
  transform: rotate(-20deg);
  position: absolute;
  z-index: 5;
  width: 650px !important;
  height: 350px !important;
  left: 37%;
  top: 4%;
  @media (max-width: 1282px) {
    width: 450px !important;
    height: 300px !important;
    left: 40%;
  }
  @media (max-width: 1100px) {
    width: 350px !important;
    height: 200px !important;
    left: 45%;
    top: 25%;
  }
  @media (max-width: 616px) {
    width: 350px !important;
    height: 200px !important;
    left: 35%;
    top: 35%;
  }
  @media (max-width: 548px) {
    width: 350px !important;
    height: 200px !important;
    left: 5%;
    top: 35%;
  }
  @media (max-width: 478px) {
    width: 250px !important;
    height: 200px !important;
    left: 5%;
    top: 40%;
  }
  @media (max-width: 420px) {
    width: 220px !important;
    height: 160px !important;
    left: 10%;
    top: 42%;
  }
`;
const SpanNum = styled.span`
  font-weight: 700;
  font-size: 250px;
  color: #a7a7a7;
  @media (max-width: 616px) {
    font-size: 150px;
  }
  @media (max-width: 420px) {
    font-size: 115px;
  }
`;

const BottomDiv = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  height: 119px;
  align-items: center;
  @media (max-width: 470px) {
    flex-wrap: wrap;
  }
`;
const BottomMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-weight: 700;
`;

const BMSpan = styled.span`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.text};
`;

const BMButton = styled.button`
  width: 200px;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.bg};
  font-size: 16px;
  border-radius: 10px;
  font-weight: 700;
  padding: 5px 0;
  /* margin-top: 10px; */
  cursor: pointer;
`;
const BMButtonFav = styled.button`
  width: 130px;
  margin-top: 8px;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.bg};
  font-size: 10px;
  border-radius: 10px;
  font-weight: 700;
  padding: 5px 0;
  /* margin-top: 10px; */
  cursor: pointer;
`;
const BEDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
