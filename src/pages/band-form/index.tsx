import React from "react";
import {
  Button,
  CalendarIcon,
  CardNumberIcon,
  Input,
  MapPinIcon,
} from "src/components";
import { Band, Order } from "src/types";
import { convertEpochToDate } from "src/utils/date";
import { TicketTypeItem } from "./ticket-type-item";
import { centToDollar } from "src/utils/price";
import { isOrderValid } from "src/utils/order";

export type BandFormProps = {
  band: Band;
  onSubmit: (order: Order) => void;
};

export const BandForm = (props: BandFormProps) => {
  const { band, onSubmit } = props;
  const [order, setOrder] = React.useState<Order>({
    firstName: "",
    lastName: "",
    address: "",
    cardNumber: "",
    cardExp: "",
    cardCvv: "",
    lines: [],
    total: 0,
  });
  const date = convertEpochToDate(band.date);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(order);
  };

  const handleLineItem = (type: string, quantity: number) => {
    const lineItem = order.lines.find((line) => line.type === type);
    if (lineItem) {
      lineItem.quantity = quantity;
    } else {
      order.lines.push({ type, quantity });
    }
    const total = order.lines.reduce((acc, line) => {
      const ticket = band.ticketTypes.find((t) => t.type === line.type);
      return ticket ? acc + ticket.cost * line.quantity : acc;
    }, 0);
    setOrder({ ...order, total });
  };

  const disabled = isOrderValid(order);

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12">
        <h1
          className="mt-3 text-3xl font-extrabold tracking-tight text-slate-800"
          aria-label="band name"
        >
          {band.name}
        </h1>

        <p className="flex items-center gap-2 mt-4 mb-0 max-w-4xl text-base/7 text-slate-700">
          <CalendarIcon />
          {date}
        </p>
        <p className="flex items-center gap-2 mt-0 mb-4 max-w-4xl text-base/7 text-slate-700">
          <MapPinIcon />
          {band.location}
        </p>
      </div>

      <div className="col-span-5">
        <img
          src={band.imgUrl}
          alt={band.name}
          className="w-full h-auto mb-4 rounded-md"
        />
        <div
          dangerouslySetInnerHTML={{ __html: band.description_blurb }}
          className="text-gray-700"
        />
      </div>

      <div className="col-span-7 px-6 py-4 bg-slate-200 rounded-md">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-800">
          Select Tickets
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {band.ticketTypes.map((ticket) => (
            <div key={ticket.type}>
              <TicketTypeItem ticketType={ticket} onChange={handleLineItem} />
            </div>
          ))}
          <p className="flex justify-between items-center text-lg text-slate-700">
            <span>TOTAL</span>
            <span aria-label="Total">{centToDollar(order.total)}</span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="firstName"
              aria-label="First Name"
              placeholder="First name"
              className="w-full"
              value={order.firstName}
              onChange={handleChange}
              required
              aria-required
            />
            <Input
              type="text"
              name="lastName"
              aria-label="Last Name"
              placeholder="Last name"
              className="w-full"
              value={order.lastName}
              onChange={handleChange}
              required
              aria-required
            />
            <div className="col-span-2">
              <Input
                type="text"
                name="address"
                aria-label="Address"
                placeholder="Address"
                className="w-full"
                value={order.address}
                onChange={handleChange}
                required
                aria-required
              />
            </div>
            <p className="text-slate-800">Payment Details</p>
            <div className="col-span-2">
              <Input
                type="text"
                name="cardNumber"
                aria-label="Card number"
                placeholder="0000 0000 0000 0000"
                className="w-full"
                endIcon={<CardNumberIcon />}
                value={order.cardNumber}
                onChange={handleChange}
                required
                aria-required
              />
            </div>
            <Input
              type="text"
              name="cardExp"
              placeholder="MM / YY"
              aria-label="Expiration date"
              className="w-full"
              value={order.cardExp}
              onChange={handleChange}
              required
              aria-required
            />
            <Input
              type="text"
              name="cardCvv"
              placeholder="CVV"
              aria-label="Security code"
              className="w-full"
              value={order.cardCvv}
              onChange={handleChange}
              required
              aria-required
            />
          </div>
          <Button type="submit" className="w-full" disabled={disabled}>
            Get Tickets
          </Button>
        </form>
      </div>
    </div>
  );
};
