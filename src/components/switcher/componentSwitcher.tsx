import React from "react";
import OfferRequest from "./../offer/offer-request";
import OfferConfirmation from "../offer/offer-confimartion";
import OrderOngoingFreelancer from "../order/order-ongoing-freelancer";
import OrderInfo from "../order/order-info";
import OrderUploadedWorks from "../order/order-uploaded-works";
import OrderDone from "../order/order-done";
import { Order } from "@/types/Order";
import OrderCancelCard from "../order/order-cancel-card";
import OrderUploadedWorkCard from "../order/order-uploaded-works-card";

interface componentProps {
  role: String;
  orderData: Order
}

const ComponentSwitcher = ({ role, orderData }: componentProps) => {
  console.log(role, orderData)
  switch (`${orderData.status}_${role}`) {
    case "inprogress_recruiter":
      return <OfferRequest order={orderData} />;
    case "accepted_recruiter":
      return <OfferConfirmation order={orderData} />;
    case "accepted_user":
      return <OrderOngoingFreelancer order={orderData} />;
    case "inprogress_user":
      return <OrderInfo order={orderData} />;
    case "delivring_user":
      return <OrderOngoingFreelancer order={orderData} />;
    case "delivring_recruiter":
      return <OrderUploadedWorkCard order={orderData} />;
    case "revision_user":
      return <OrderOngoingFreelancer order={orderData} />;
    case "revision_recruiter":
      return <OrderUploadedWorkCard order={orderData} />;
    case "complete_user":
      return <OrderDone order={orderData} />;
    case "complete_recruiter":
      return <OrderDone order={orderData} />;
    case "cancel_recruiter":
      return <OrderCancelCard order={orderData} />;
    case "cancel_user":
      return <OrderCancelCard order={orderData} />;
    default:
      return <div></div>;
  }
};

export default ComponentSwitcher;
