## Run this sql script after the database initialization to load sample properties

```sql
-- Here I perform an INSERT of a sample user to add it as the owner of the properties
INSERT INTO users (email, password, status, created_at, is_verify, role_id)
VALUES ('johndoe@example.com', '$2a$10$somethingHashedPassword', 'ACTIVE', NOW(), 1, 1);

SET @userId = LAST_INSERT_ID();

INSERT INTO user_profiles (name, last_name, user_id)
VALUES ('John', 'Doe', @userId);


-- Here I perform an INSERT of 42 different properties
INSERT INTO properties (
    owner_id,antiquity, built_area, country, description, maintenance_fees, price, property_type,
    province, rooms, status, street_name, street_number, title, total_area, years_of_antiquity
) VALUES
      (@userId,'BRAND_NEW', 120.50, 'Argentina', 'Moderno departamento de 2 ambientes', 1500.50, 100000.00, 'APARTMENT', 'Buenos Aires', 2, 'AVAILABLE', 'Av. Libertador', '500', 'Departamento moderno en excelente ubicación', 130.00, 0),
      (@userId,'UNDER_CONSTRUCTION', 200.00, 'Argentina', 'Casa en construcción con amplio jardín', 0.00, 250000.00, 'HOUSE', 'Córdoba', 3, 'MAINTENANCE', 'Calle Falsa', '123', 'Casa con potencial en desarrollo', 350.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 450.00, 'Argentina', 'Quinta de lujo en zona exclusiva', 5000.00, 1500000.00, 'VACATION_HOME', 'Mendoza', 5, 'AVAILABLE', 'Los Álamos', '25', 'Quinta vacacional de lujo con piscina', 800.00, 20),
      (@userId,'BRAND_NEW', 80.75, 'Chile', 'Moderna oficina en pleno centro', 300.00, 75000.00, 'COMMERCIAL_OFFICE', 'Santiago', 1, 'AVAILABLE', 'Calle Ahumada', '900', 'Oficina moderna lista para ser utilizada', 85.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 300.00, 'Argentina', 'Edificio antiguo de 3 pisos con patio', 10000.00, 600000.00, 'BUILDING', 'Rosario', 10, 'RENTED', 'San Martín', '45', 'Edificio histórico con 10 habitaciones', 600.00, 50),
      (@userId,'UNDER_CONSTRUCTION', 500.00, 'Argentina', 'Galpón amplio en construcción', 0.00, 350000.00, 'WAREHOUSE', 'La Plata', 1, 'MAINTENANCE', 'Calle 10', '444', 'Galpón ideal para logística', 700.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 120.00, 'Brasil', 'Casa con vista al mar', 200.00, 200000.00, 'HOUSE', 'Río de Janeiro', 3, 'AVAILABLE', 'Praia Grande', '85', 'Casa frente al mar con terraza', 150.00, 10),
      (@userId,'BRAND_NEW', 75.00, 'Uruguay', 'Apartamento nuevo en Pocitos', 1000.00, 125000.00, 'APARTMENT', 'Montevideo', 2, 'AVAILABLE', 'Rambla', '1250', 'Apartamento con vista al río', 80.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 60.00, 'Argentina', 'Oficina en barrio financiero', 500.00, 50000.00, 'COMMERCIAL_OFFICE', 'CABA', 1, 'AVAILABLE', 'Reconquista', '150', 'Oficina en excelente ubicación céntrica', 65.00, 15),
      (@userId,'UNDER_CONSTRUCTION', 100.00, 'Argentina', 'PH en construcción en zona residencial', 0.00, 180000.00, 'PH', 'Mar del Plata', 4, 'MAINTENANCE', 'Independencia', '3500', 'PH amplio y luminoso en desarrollo', 120.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 400.00, 'Argentina', 'Terreno con galpón en área industrial', 0.00, 700000.00, 'LAND', 'Tucumán', 0, 'UNAVAILABLE', 'Ruta 9', 'km 20', 'Terreno ideal para industria', 500.00, 30),
      (@userId,'BRAND_NEW', 200.00, 'Chile', 'Local comercial a estrenar', 2000.00, 90000.00, 'COMMERCIAL_PREMISES', 'Valparaíso', 1, 'AVAILABLE', 'Calle Comercio', '100', 'Local nuevo con gran afluencia de público', 210.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 150.00, 'Argentina', 'Garaje para 3 autos en zona céntrica', 100.00, 30000.00, 'GARAGE', 'Córdoba', 0, 'AVAILABLE', 'Belgrano', '123', 'Garaje amplio y seguro', 160.00, 5),
      (@userId,'UNDER_CONSTRUCTION', 180.00, 'Argentina', 'Hotel boutique en construcción', 0.00, 1200000.00, 'HOTEL', 'Salta', 12, 'MAINTENANCE', 'Mitre', '450', 'Hotel de lujo en construcción', 350.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 75.00, 'Uruguay', 'Deposito con fácil acceso', 300.00, 85000.00, 'STORAGE', 'Maldonado', 0, 'AVAILABLE', 'Ruta Interbalnearia', 'km 20', 'Deposito ideal para almacenamiento', 100.00, 8),
      (@userId,'BRAND_NEW', 50.00, 'Argentina', 'Cama náutica en marina exclusiva', 500.00, 25000.00, 'BOAT_BED', 'Tigre', 0, 'AVAILABLE', 'Marina del Sol', '10', 'Cama náutica en marina privada', 50.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 320.00, 'Argentina', 'Fondo de comercio de restaurante', 1000.00, 350000.00, 'BUSINESS_ASSET', 'San Luis', 0, 'RENTED', 'Rivadavia', '200', 'Restaurante en funcionamiento', 330.00, 12),
      (@userId,'BRAND_NEW', 500.00, 'Argentina', 'Casa moderna en country', 2500.00, 450000.00, 'HOUSE', 'Pilar', 4, 'AVAILABLE', 'Ruta 8', 'km 50', 'Casa moderna con piscina y jardín', 600.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 180.00, 'Brasil', 'Terreno frente al mar en Bahía', 0.00, 400000.00, 'LAND', 'Bahía', 0, 'AVAILABLE', 'Praia Grande', '100', 'Terreno ideal para desarrollo turístico', 1000.00, 8),
      (@userId,'UNDER_CONSTRUCTION', 250.00, 'Argentina', 'Departamento en construcción en Recoleta', 1000.00, 300000.00, 'APARTMENT', 'CABA', 3, 'MAINTENANCE', 'Callao', '1500', 'Departamento amplio en zona exclusiva', 270.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 650.00, 'Argentina', 'Campo en venta en zona rural', 0.00, 900000.00, 'FARM', 'Santa Fe', 0, 'UNAVAILABLE', 'Ruta Provincial', 'km 30', 'Campo apto para agricultura', 10000.00, 50),
      (@userId,'BRAND_NEW', 120.00, 'Argentina', 'Casa a estrenar en barrio privado', 500.00, 300000.00, 'HOUSE', 'San Isidro', 3, 'AVAILABLE', 'Las Heras', '550', 'Casa moderna con jardín y pileta', 180.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 300.00, 'Argentina', 'Hotel en pleno centro turístico', 10000.00, 2500000.00, 'HOTEL', 'Bariloche', 20, 'RENTED', 'Mitre', '800', 'Hotel con 20 habitaciones y restaurante', 1200.00, 25),
      (@userId,'UNDER_CONSTRUCTION', 450.00, 'Chile', 'Edificio en construcción en zona comercial', 0.00, 1000000.00, 'BUILDING', 'Valparaíso', 0, 'MAINTENANCE', 'Calle Comercio', '123', 'Edificio moderno en desarrollo', 900.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 220.00, 'Argentina', 'Consultorio médico en centro médico', 500.00, 60000.00, 'DOCTOR_OFFICE', 'Córdoba', 1, 'AVAILABLE', 'Independencia', '200', 'Consultorio en funcionamiento', 230.00, 12),
      (@userId,'BRAND_NEW', 350.00, 'Argentina', 'Local comercial en shopping', 5000.00, 500000.00, 'COMMERCIAL_PREMISES', 'Rosario', 2, 'AVAILABLE', 'Calle San Luis', '1500', 'Local a estrenar con gran exposición', 360.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 100.00, 'Brasil', 'Casa en zona rural con gran terreno', 150.00, 100000.00, 'FARM', 'Bahía', 3, 'AVAILABLE', 'Calle del Campo', '12', 'Casa de campo con terreno agrícola', 500.00, 15),
      (@userId,'UNDER_CONSTRUCTION', 175.00, 'Argentina', 'Oficina en construcción en zona financiera', 0.00, 100000.00, 'COMMERCIAL_OFFICE', 'CABA', 1, 'MAINTENANCE', 'San Martín', '800', 'Oficina amplia en desarrollo', 180.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 500.00, 'Argentina', 'Hotel boutique en San Telmo', 20000.00, 1800000.00, 'HOTEL', 'CABA', 15, 'AVAILABLE', 'Bolívar', '750', 'Hotel histórico en excelente ubicación', 550.00, 50),
      (@userId,'BRAND_NEW', 90.00, 'Argentina', 'PH nuevo en zona tranquila', 800.00, 200000.00, 'PH', 'La Plata', 2, 'AVAILABLE', 'Diagonal 73', '1300', 'PH con patio y garage', 100.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 45.00, 'Uruguay', 'Cama náutica en puerto deportivo', 300.00, 18000.00, 'BOAT_BED', 'Punta del Este', 0, 'AVAILABLE', 'Puerto', '5', 'Cama náutica en puerto exclusivo', 50.00, 5),
      (@userId,'UNDER_CONSTRUCTION', 125.00, 'Argentina', 'Terreno en construcción con galpón', 0.00, 280000.00, 'LAND', 'Corrientes', 0, 'MAINTENANCE', 'Ruta 12', 'km 15', 'Terreno en desarrollo con galpón', 400.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 120.00, 'Argentina', 'Depósito en zona industrial', 100.00, 85000.00, 'WAREHOUSE', 'Córdoba', 0, 'AVAILABLE', 'Parque Industrial', '14', 'Depósito con excelente ubicación logística', 150.00, 8),
      (@userId,'BRAND_NEW', 180.00, 'Argentina', 'Local comercial a estrenar en zona céntrica', 2000.00, 120000.00, 'COMMERCIAL_PREMISES', 'San Juan', 1, 'AVAILABLE', 'Mitre', '100', 'Local nuevo en avenida principal', 185.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 240.00, 'Argentina', 'Casa en venta con gran jardín', 500.00, 220000.00, 'HOUSE', 'Neuquén', 3, 'AVAILABLE', 'Belgrano', '85', 'Casa con amplio terreno y pileta', 260.00, 20),
      (@userId,'UNDER_CONSTRUCTION', 130.00, 'Argentina', 'PH en construcción con terraza', 0.00, 190000.00, 'PH', 'CABA', 3, 'MAINTENANCE', 'Corrientes', '2500', 'PH con terraza en desarrollo', 140.00, 1),
      (@userId,'YEARS_OF_ANTIQUITY', 480.00, 'Argentina', 'Fondo de comercio en zona turística', 1200.00, 500000.00, 'BUSINESS_ASSET', 'Misiones', 0, 'RENTED', 'Av. Libertad', '60', 'Fondo de comercio en pleno centro turístico', 500.00, 30),
      (@userId,'BRAND_NEW', 140.00, 'Chile', 'Edificio nuevo en venta', 3000.00, 900000.00, 'BUILDING', 'Santiago', 10, 'AVAILABLE', 'Providencia', '300', 'Edificio moderno con vista panorámica', 1500.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 90.00, 'Argentina', 'Consultorio médico en venta', 500.00, 50000.00, 'DOCTOR_OFFICE', 'Santa Fe', 1, 'AVAILABLE', 'Av. Pellegrini', '450', 'Consultorio en pleno centro', 95.00, 10),
      (@userId,'BRAND_NEW', 80.00, 'Argentina', 'Depósito a estrenar en zona comercial', 500.00, 100000.00, 'STORAGE', 'Tucumán', 0, 'AVAILABLE', 'Calle Comercio', '120', 'Depósito con fácil acceso a rutas', 85.00, 0),
      (@userId,'YEARS_OF_ANTIQUITY', 60.00, 'Argentina', 'Garaje en venta en edificio', 100.00, 25000.00, 'GARAGE', 'Rosario', 0, 'AVAILABLE', 'San Lorenzo', '25', 'Garaje cubierto en pleno centro', 65.00, 5),
      (@userId,'UNDER_CONSTRUCTION', 250.00, 'Argentina', 'Quinta en construcción en zona rural', 0.00, 400000.00, 'VACATION_HOME', 'Entre Ríos', 4, 'MAINTENANCE', 'Ruta 14', 'km 50', 'Quinta vacacional en desarrollo', 300.00, 1);


```

## Data for the room table

```sql
    INSERT INTO `room` (`name`) 
    VALUES 
    ('Dormitorio'),
    ('Baño'),
    ('Cocina'),
    ('Comedor'),
    ('Sala de estar'),
    ('Estudio'),
    ('Lavadero'),
    ('Vestidor'),
    ('Oficina'),
    ('Balcón'),
    ('Terraza'),
    ('Garaje'),
    ('Sótano'),
    ('Ático'),
    ('Jardín'),
    ('Cuarto de servicio'),
    ('Patio');

```
