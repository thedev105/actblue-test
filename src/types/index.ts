export type TicketType = {
  type: string;
  name: string;
  description: string;
  cost: number;
};

export type Band = {
  name: string;
  id: string;
  date: number;
  location: string;
  description_blurb: string;
  imgUrl: string;
  ticketTypes: TicketType[];
};

export type OrderLineItem = {
  type: string;
  quantity: number;
};

export type Order = {
  id: string;
  lines: OrderLineItem[];
  firstName: string;
  lastName: string;
  address: string;
  cardNumber: string;
  cardExp: string;
  cardCvv: string;
  total: number;
};
