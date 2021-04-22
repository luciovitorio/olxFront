import React from "react";
import { Item } from "./styled";
import { Link } from "react-router-dom";

function AdItem(props) {
  let price = "";

  if (props.data.priceNegotiable) {
    price = "Preço negociável";
  } else {
    price = `R$ ${props.data.price}`;
  }

  return (
    <div>
      <Item className="aditem">
        <Link to={`/ad/${props.data.id}`}>
          <div className="itemImage">
            <img src={props.data.image} alt="" />
          </div>
          <div className="itemName">{props.data.title}</div>
          <div className="itemPrice">{price}</div>
        </Link>
      </Item>
    </div>
  );
}

export default AdItem;
