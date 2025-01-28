import React, { useState, useEffect } from "react";

import { Input } from "src/components";
import { TicketType } from "src/types";
import { centToDollar } from "src/utils/price";

export type TicketTypeItemProps = {
  ticketType: TicketType;
  quantity: number;
  onChange: (type: string, quantity: number) => void;
};

export const TicketTypeItem = ({
  ticketType,
  quantity,
  onChange,
}: TicketTypeItemProps) => {
  const price = centToDollar(ticketType.cost);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    onChange(ticketType.type, quantity);
  };

  return (
    <div className="flex gap-6 pb-4 border-b-2 border-slate-300">
      <div className="text-slate-700 flex-1">
        <p className="text-lg uppercase">{ticketType.name}</p>
        <p className="text-sm">{ticketType.description}</p>
        <p className="text-lg">{price}</p>
      </div>
      <div className="w-[100px]">
        <Input
          type="number"
          name={ticketType.type}
          min={0}
          className="w-full text-lg text-center"
          aria-label={`${ticketType.name} quantity`}
          value={quantity}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
