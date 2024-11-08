export interface Property {
  id: number;
  ownerId: number;
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

export interface UpdateProperty {
  id?: number;
  ownerId: number;
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

export type UpdatePropertyKeys = 
  "id" |
  "ownerId" |
  "country" |
  "province" |
  "city" |
  "streetName" |
  "streetNumber" |
  "numberOfRooms" |
  "propertyType" |
  "antiquity" |
  "yearsOfAntiquity" |
  "price" |
  "maintenanceFees" |
  "title" |
  "description" |
  "totalArea" |
  "builtArea" |
  "status" |
  "rooms" |
  "amenities" |
  "features" |
  "multimedia"

export interface PropertyCard {
  id: number;
  ownerId: number;
  country: string;
  province: string;
  city: string;
  numberOfRooms: number;
  yearsOfAntiquity: number;
  price: number;
  title: string;
  description: string;
  totalArea: number;
  builtArea: number;
  rooms: Room[];
  amenities: Amenity[];
  features: Features[];
  multimedia: Multimedia[];
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
