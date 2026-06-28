ALTER TABLE roles
    ADD COLUMN name VARCHAR(50) NOT NULL,
    ADD COLUMN description VARCHAR(255);

ALTER TABLE roles
    ADD CONSTRAINT uk_roles_name UNIQUE (name);

ALTER TABLE users
    ADD COLUMN email VARCHAR(255) NOT NULL,
    ADD COLUMN password_hash VARCHAR(255) NOT NULL,
    ADD COLUMN first_name VARCHAR(100),
    ADD COLUMN last_name VARCHAR(100),
    ADD COLUMN role_id UUID NOT NULL,
    ADD COLUMN enabled BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN last_login TIMESTAMPTZ;

ALTER TABLE users
    ADD CONSTRAINT uk_users_email UNIQUE (email),
    ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles (id);

CREATE INDEX idx_users_role_id ON users (role_id);

INSERT INTO roles (id, created_at, updated_at, created_by, updated_by, status, version, name, description)
VALUES
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0, 'ADMINISTRATOR', 'Full administrative access to the Atlas platform.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0, 'TECHNICAL_WRITER', 'Creates and maintains technical documentation.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0, 'REVIEWER', 'Reviews documentation and content for accuracy.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0, 'MAINTENANCE_ENGINEER', 'Manages maintenance procedures and engineering content.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0, 'TECHNICIAN', 'Performs maintenance tasks using platform documentation.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0, 'TRAINER', 'Manages training content and learning resources.');

INSERT INTO users (id, created_at, updated_at, created_by, updated_by, status, version, email, password_hash, first_name, last_name, role_id, enabled)
SELECT gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
       'admin@atlas.local',
       '$2a$12$JGK0Ir8x3NC9gkgqKHR5y.Yphr1W/ijsMZYGLJYWfj.UWYTFR.86O',
       'Atlas', 'Administrator', id, TRUE
FROM roles WHERE name = 'ADMINISTRATOR';
