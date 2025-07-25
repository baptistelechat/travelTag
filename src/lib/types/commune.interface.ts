export interface Commune {
  code_insee: string;
  nom_standard: string;
  nom_sans_pronom: string;
  nom_a: string;
  nom_de: string;
  nom_sans_accent: string;
  nom_standard_majuscule: string;
  typecom: string;
  typecom_texte: string;
  reg_code: string;
  reg_nom: string;
  dep_code: string;
  dep_nom: string;
  canton_code: string;
  canton_nom: string;
  epci_code: string;
  epci_nom: string;
  academie_code: string;
  academie_nom: string;
  code_postal: string;
  codes_postaux: string;
  zone_emploi: string;
  code_insee_centre_zone_emploi: string;
  code_unite_urbaine: string;
  nom_unite_urbaine: string | null;
  taille_unite_urbaine: number;
  type_commune_unite_urbaine: string;
  statut_commune_unite_urbaine: string;
  population: number;
  superficie_hectare: number;
  superficie_km2: number;
  densite: number;
  altitude_moyenne: number;
  altitude_minimale: number;
  altitude_maximale: number;
  latitude_mairie: number;
  longitude_mairie: number;
  latitude_centre: number;
  longitude_centre: number;
  polygone: [number, number][];
  grille_densite: number;
  grille_densite_texte: string;
  niveau_equipements_services: number;
  niveau_equipements_services_texte: string;
  gentile: string;
  url_wikipedia: string;
  url_villedereve: string;
}