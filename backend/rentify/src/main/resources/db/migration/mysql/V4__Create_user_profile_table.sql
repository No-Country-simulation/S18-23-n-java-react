CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(50),
    photo VARCHAR(255),
    user_id BIGINT UNIQUE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
