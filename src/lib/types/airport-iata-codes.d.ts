declare module 'airport-iata-codes' {
  interface AirportData {
    name: string;
    city?: string;
    municipality?: string;
    county?: string;
    iata_code: string;
    [key: string]: any; // Pour les autres propriétés potentielles
  }

  export default function allAirportData(iataCode?: string): AirportData[];
}