export interface Property {
    id: number;
    owner: Owner;
    country: string;
    province: string;
    city: string;
    streetName: string;
    streetNumber: string;
    numberOfRooms: number;
    propertyType: string;
    antiquity: string;
    yearsOfAntiquity: number;
    price: number;
    maintenanceFees: number;
    title: string;
    description: string;
    totalArea: number;
    builtArea: number;
    status: string;
    rooms: Room[];
    amenities: Amenity[];
    features: Features[];
    multimedia: Multimedia[];
    featured?: boolean;
  }
  
  export interface Owner {
    id: number;
    name?: string;
    lastname?: string;
    username?: string;
    email: string;
    phone: string;
  }
  
  export interface Amenity {
    id: number;
    name: string;
  }
  
  export interface Features {
    id: number;
    name: string;
  }
  
  export type FeaturesType =
    | "apto profesional"
    | "acceso para personas con discapacidad"
    | "uso comercial"
    | "permite mascotas";
  
  export interface Room {
    roomName: string;
    quantity: number;
  }
  
  export type RoomTypes =
    | "Dormitorio"
    | "Baño"
    | "Cocina"
    | "Comedor"
    | "Sala de estar"
    | "Estudio"
    | "Lavadero"
    | "Vestidor"
    | "Oficina"
    | "Balcón"
    | "Terraza"
    | "Garaje"
    | "Sótano"
    | "Ático"
    | "Jardín"
    | "Cuarto de servicio"
    | "Patio";
  
  export interface Multimedia {
    id: number;
    type: string;
    url: string;
  }