import { Order } from "src/types";

export const isOrderValid = (order: Order): boolean => {
  return (
    order.total === 0 ||
    !order.firstName ||
    !order.lastName ||
    !order.address ||
    !order.cardNumber ||
    !order.cardExp ||
    !order.cardCvv
  );
};
