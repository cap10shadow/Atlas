CREATE TABLE products (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    version BIGINT NOT NULL DEFAULT 0,
    product_code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000)
);

ALTER TABLE products
    ADD CONSTRAINT uk_products_product_code UNIQUE (product_code);

CREATE TABLE assemblies (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    version BIGINT NOT NULL DEFAULT 0,
    product_id UUID NOT NULL,
    assembly_code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000)
);

ALTER TABLE assemblies
    ADD CONSTRAINT uk_assemblies_assembly_code UNIQUE (assembly_code),
    ADD CONSTRAINT fk_assemblies_product FOREIGN KEY (product_id) REFERENCES products (id);

CREATE INDEX idx_assemblies_product_id ON assemblies (product_id);

CREATE TABLE parts (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    version BIGINT NOT NULL DEFAULT 0,
    assembly_id UUID NOT NULL,
    part_number VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000)
);

ALTER TABLE parts
    ADD CONSTRAINT uk_parts_part_number UNIQUE (part_number),
    ADD CONSTRAINT fk_parts_assembly FOREIGN KEY (assembly_id) REFERENCES assemblies (id);

CREATE INDEX idx_parts_assembly_id ON parts (assembly_id);

INSERT INTO products (id, created_at, updated_at, created_by, updated_by, status, version, product_code, name, description)
VALUES (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
        'PRD-RADAR-001', 'Radar System', 'Primary surveillance radar system demonstrating the Atlas engineering hierarchy.');

INSERT INTO assemblies (id, created_at, updated_at, created_by, updated_by, status, version, product_id, assembly_code, name, description)
SELECT gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
       id, 'ASM-PSU-001', 'Power Supply Unit', 'Provides regulated power to the Radar System.'
FROM products WHERE product_code = 'PRD-RADAR-001';

INSERT INTO parts (id, created_at, updated_at, created_by, updated_by, status, version, assembly_id, part_number, name, description)
SELECT gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
       id, 'PRT-FAN-001', 'Cooling Fan', 'Forced-air cooling fan for the Power Supply Unit.'
FROM assemblies WHERE assembly_code = 'ASM-PSU-001';
