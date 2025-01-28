import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BandForm } from "./index";
import kpopBand from "src/band-json/kpop-band.json";

describe("BandForm", () => {
  test("renders BandForm component with required fields", () => {
    render(<BandForm band={kpopBand} onSubmit={jest.fn()} />);
    expect(screen.getByText(kpopBand.name)).toBeInTheDocument();
    expect(screen.getByText(kpopBand.location)).toBeInTheDocument();
    kpopBand.ticketTypes.forEach((ticket) => {
      expect(screen.getByText(ticket.name)).toBeInTheDocument();
      expect(screen.getByText(ticket.description)).toBeInTheDocument();
    });
  });

  test("updates total value when ticket quantity changes", () => {
    render(<BandForm band={kpopBand} onSubmit={jest.fn()} />);
    const generalTicketInput = screen.getByLabelText(
      "General Admission quantity"
    );
    fireEvent.change(generalTicketInput, { target: { value: "2" } });
    expect(screen.getByText("$120.00")).toBeInTheDocument();
  });

  test("submit button is disabled when required fields are empty", () => {
    render(<BandForm band={kpopBand} onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Card number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByLabelText("Expiration date"), {
      target: { value: "12/23" },
    });
    fireEvent.change(screen.getByLabelText("Security code"), {
      target: { value: "123" },
    });
    const submitButton = screen.getByRole("button", { name: /Get Tickets/i });
    expect(submitButton).toBeDisabled();
  });

  test("logs order on form submission", () => {
    const handleOrder = jest.fn();
    render(<BandForm band={kpopBand} onSubmit={handleOrder} />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("Card number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByLabelText("Expiration date"), {
      target: { value: "12/23" },
    });
    fireEvent.change(screen.getByLabelText("Security code"), {
      target: { value: "123" },
    });

    const generalTicketInput = screen.getByLabelText(
      "General Admission quantity"
    );
    fireEvent.change(generalTicketInput, { target: { value: "2" } });
    const vipInput = screen.getByLabelText("VIP quantity");
    fireEvent.change(vipInput, { target: { value: "3" } });

    const submitButton = screen.getByRole("button", { name: /Get Tickets/i });
    fireEvent.click(submitButton);

    expect(handleOrder).toHaveBeenCalledWith({
      id: kpopBand.id,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      cardNumber: "4111111111111111",
      cardExp: "12/23",
      cardCvv: "123",
      lines: [
        { type: "general", quantity: 2 },
        { type: "vip", quantity: 3 },
      ],
      total: 57000,
    });
  });
});
