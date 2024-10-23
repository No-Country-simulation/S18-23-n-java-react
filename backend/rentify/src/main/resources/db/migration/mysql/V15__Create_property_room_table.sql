CREATE TABLE property_room (
    property_id BIGINT NOT NULL,
    room_id INT NOT NULL,
    quantity INT,
    PRIMARY KEY (property_id, room_id),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
