-- Aquí inserto un usuario de ejemplo para agregarlo como propietario de las propiedades
INSERT INTO users (email, password, status, created_at, is_verify, role_id)
VALUES ('johndoe@example.com', '$2a$10$0HNCOcOLf.TihrHlvL63huM5BY7A0Ugp51E/4uuyAsAVCLf7z9rGm', 'ACTIVE', NOW(), true, 1);

-- Obtener el ID del usuario insertado
WITH inserted_user AS (
    SELECT id FROM users WHERE email = 'johndoe@example.com'
)
INSERT INTO user_profiles (name, last_name, phone, user_id)
SELECT 'John', 'Doe', '+54 9 261 123 4567', id FROM inserted_user;

-- Aquí inserto 17 habitaciones diferentes
INSERT INTO rooms (name)
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

-- Inserto las características
INSERT INTO features (name)
VALUES
    ('apto profesional'),
    ('acceso para personas con discapacidad'),
    ('uso comercial'),
    ('permite mascotas');

-- Inserto las comodidades
INSERT INTO amenities (name)
VALUES
    ('aire acondicionado'),
    ('gimnasio'),
    ('hidromasaje'),
    ('solarium'),
    ('pileta'),
    ('sala de juegos'),
    ('parrilla'),
    ('sum'),
    ('cocina equipada'),
    ('ascensor'),
    ('quincho'),
    ('laundry'),
    ('internet'),
    ('wi-fi'),
    ('horno'),
    ('microondas'),
    ('calefaccion'),
    ('sauna');

-- Aquí inserto 42 propiedades diferentes
WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'BRAND_NEW', 120.50, 'Argentina', 'Tigre', 'Moderno departamento de 2 ambientes', 1500.50, 100000.00, 'APARTMENT', 'Buenos Aires', 2, 'AVAILABLE', 'Av. Libertador', '500', 'Departamento moderno en excelente ubicación', 130.00, 0)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Baño'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'UNDER_CONSTRUCTION', 200.00, 'Argentina', 'Villa Carlo Paz', 'Casa en construcción con amplio jardín', 0.00, 250000.00, 'HOUSE', 'Córdoba', 3, 'MAINTENANCE', 'Calle Falsa', '123', 'Casa con potencial en desarrollo', 350.00, 1)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 2),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Baño'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Jardín'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'YEARS_OF_ANTIQUITY', 450.00, 'Argentina', 'Maipu', 'Quinta de lujo en zona exclusiva', 5000.00, 1500000.00, 'VACATION_HOME', 'Mendoza', 5, 'AVAILABLE', 'Los Álamos', '25', 'Quinta vacacional de lujo con piscina', 800.00, 20)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 4),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Baño'), 3),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Sala de estar'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Jardín'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'BRAND_NEW', 80.75, 'Argentina', 'Buenos Aires', 'Moderna oficina en pleno centro', 300.00, 75000.00, 'COMMERCIAL_OFFICE', 'Buenos Aires', 1, 'AVAILABLE', 'Avenida Corrientes', '900', 'Oficina moderna lista para ser utilizada', 85.00, 0)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Oficina'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'YEARS_OF_ANTIQUITY', 300.00, 'Argentina', 'San Lorenzo', 'Edificio antiguo de 3 pisos con patio', 10000.00, 600000.00, 'BUILDING', 'Santa Fe', 10, 'RENTED', 'San Martín', '45', 'Edificio histórico con 10 habitaciones', 600.00, 50)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 6),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Baño'), 2),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Patio'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'UNDER_CONSTRUCTION', 500.00, 'Argentina', 'La Plata', 'Galpón amplio en construcción', 0.00, 350000.00, 'WAREHOUSE', 'Buenos Aires', 1, 'MAINTENANCE', 'Calle 10', '444', 'Galpón ideal para logística', 700.00, 1)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Garaje'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'YEARS_OF_ANTIQUITY', 120.00, 'Argentina', 'Mar del Plata', 'Casa con vista al mar', 200.00, 200000.00, 'HOUSE', 'Buenos Aires', 3, 'AVAILABLE', 'Boulevard Marítimo', '85', 'Casa frente al mar con terraza', 150.00, 10)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 2),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Baño'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Sala de estar'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'BRAND_NEW', 250.00, 'Argentina', 'Bariloche', 'Cabaña de lujo en la montaña', 0.00, 300000.00, 'VACATION_HOME', 'Río Negro', 4, 'AVAILABLE', 'Ruta 40', '2000', 'Cabaña de montaña con piscina', 500.00, 0)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 3),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Baño'), 2),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'YEARS_OF_ANTIQUITY', 400.00, 'Argentina', 'Salta', 'Finca agrícola con plantaciones de olivos', 5000.00, 800000.00, 'FARM', 'Salta', 5, 'AVAILABLE', 'Camino a los Olivos', '200', 'Finca con producción de aceite', 600.00, 15)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 3),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Patio'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'UNDER_CONSTRUCTION', 550.00, 'Argentina', 'Jujuy', 'Construcción de cabañas en zona turística', 0.00, 400000.00, 'VACATION_HOME', 'Jujuy', 6, 'MAINTENANCE', 'Ruta 9', '700', 'Cabañas en construcción para alquiler turístico', 800.00, 1)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 4),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Patio'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'YEARS_OF_ANTIQUITY', 350.00, 'Argentina', 'Neuquén', 'Casa de campo en el bosque', 100.00, 500000.00, 'HOUSE', 'Neuquén', 4, 'AVAILABLE', 'Camino de la Selva', '500', 'Casa de campo rodeada de naturaleza', 400.00, 20)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 3),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'BRAND_NEW', 600.00, 'Argentina', 'Córdoba', 'Casa con pileta y quincho', 0.00, 600000.00, 'HOUSE', 'Córdoba', 5, 'AVAILABLE', 'Calle Libertad', '300', 'Casa familiar con jardín', 700.00, 0)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 4),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1);

WITH inserted_property AS (
INSERT INTO properties (owner_id, antiquity, built_area, country, city, description, maintenance_fees, price, property_type, province, number_of_rooms, status, street_name, street_number, title, total_area, years_of_antiquity)
VALUES (currval('users_id_seq'), 'YEARS_OF_ANTIQUITY', 150.00, 'Argentina', 'Buenos Aires', 'Casa de 2 pisos con garage', 200.00, 350000.00, 'HOUSE', 'Buenos Aires', 3, 'RENTED', 'Calle Corrientes', '1000', 'Casa de 2 pisos en zona residencial', 300.00, 15)
    RETURNING id
    )
INSERT INTO property_room (property_id, room_id, quantity)
VALUES
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Dormitorio'), 3),
    ((SELECT id FROM inserted_property), (SELECT id FROM rooms WHERE name = 'Cocina'), 1);


-- Aquí inserto un usuario de ejemplo 2 para agregarlo
INSERT INTO users (email, password, status, created_at, is_verify, role_id)
VALUES ('bewaka2777@digopm.com', '$2a$10$0HNCOcOLf.TihrHlvL63huM5BY7A0Ugp51E/4uuyAsAVCLf7z9rGm', 'ACTIVE', NOW(), true, 1);

-- Obtener el ID del usuario insertado
WITH inserted_user AS (
    SELECT id FROM users WHERE email = 'bewaka2777@digopm.com'
)
INSERT INTO user_profiles (name, last_name, phone, user_id)
SELECT 'Jonathan', 'Sanchez','+54 9 11 1234 5678', id FROM inserted_user;

