import styled from "styled-components";

export const ItemsCont = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: fit-content;
  gap: 20px;
  margin-top: 20px;
  div {
    width: 200px;
    height: 175px;
    box-sizing: border-box;
    border: 1px solid rgb(235, 235, 235);
    background: rgb(255, 255, 255);
    background: linear-gradient(
      180deg,
      rgb(69, 128, 255) -53.983%,
      rgb(20, 142, 255) 16.274%,
      rgb(10, 96, 255) 137.894%
    );
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
  h1 {
    color: #fdfdfe;
    text-shadow: 0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3,
      0px 0px 20px #b393d3;
  }
  p {
    color: #f8f8f8;
    font-size: 30px;
    font-weight: 500;
    line-height: 32px;
    text-align: center;
    margin-top: 20px;
  }
`;
