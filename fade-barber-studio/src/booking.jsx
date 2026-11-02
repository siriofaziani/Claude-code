import { createContext, useContext, useState } from "react";

import { BARBERS, SERVICES } from "./data.js";

/*
  Stato condiviso della prenotazione: barbiere e servizio scelti.
  Lo usano il listino ("Scegli"), le schede del team ("Prenota con…") e la sezione Prenota,
  che ne ricava la bozza del messaggio WhatsApp.
*/
const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [barberId, setBarberId] = useState(BARBERS[0].id);
  const [serviceName, setServiceName] = useState(SERVICES[0].name);
  const barber = BARBERS.find((b) => b.id === barberId);
  const service = SERVICES.find((s) => s.name === serviceName);
  const goToBooking = () => document.getElementById("prenota")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <BookingContext.Provider value={{ barber, service, setBarberId, setServiceName, goToBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
