import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  //   const priceForStripe = price;
  const PublishableKey = "pk_test_QrZP8culLjrrYPurWo3DPtTG00EbBlSmAx";
  console.log(typeof price);
  const onTken = (token) => {
    alert("payment Succesfull");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="ECOM SHOPPING"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is \u20B9${price}`}
      amount="Pay Now"
      token={onTken}
      stripeKey={PublishableKey}
    />
  );
};

export default StripeCheckoutButton;
