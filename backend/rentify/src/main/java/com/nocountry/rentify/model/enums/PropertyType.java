package com.nocountry.rentify.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum PropertyType implements TranslatableEnum{
  HOUSE("Casa"),
  PH("PH"),
  APARTMENT("Departamento"),
  LAND("Terreno"),
  COMMERCIAL_PREMISES("Local Comercial"),
  FARM("Granja"),
  VACATION_HOME("Casa de Vacaciones"),
  COMMERCIAL_OFFICE("Oficina Comercial"),
  GARAGE("Garaje"),
  WAREHOUSE("Almacén"),
  HOTEL("Hotel"),
  BUSINESS_ASSET("Fondo de Comercio"),
  BUILDING("Edificio"),
  DOCTOR_OFFICE("Consultorio Médico"),
  BOAT_BED("Amarre para Barco"),
  VAULT_PLOT("Parcela de Panteón"),
  STORAGE("Depósito");

  private final String translatedName;
}
