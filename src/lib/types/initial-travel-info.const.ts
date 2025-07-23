import { TransportModeEnum } from "./transport-mode.enum";
import type { TravelInfo } from "./travel-info.schema";

// État initial pour le formulaire
export const initialTravelInfo: TravelInfo = {
  firstName: "",
  lastName: "",
  nationality: "FR",
  street: "",
  city: "",
  postalCode: "",
  country: "FR",
  addressDetails: "",
  phone: "",
  email: "",
  departureLocation: "",
  arrivalLocation: "",
  isRoundTrip: false,
  transportMode: TransportModeEnum.AIRPORT,
  allergies: [],
  bloodGroup: "",
  healthInfo: "",
  trustContacts: [],
};