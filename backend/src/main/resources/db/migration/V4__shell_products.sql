INSERT INTO products (id, created_at, updated_at, created_by, updated_by, status, version, product_code, name, description)
VALUES
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
     'PRD-COMM-001', 'Communication System', 'Secure communication platform for the Atlas engineering portfolio.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
     'PRD-MISSILE-001', 'Missile Guidance System', 'Precision guidance platform for the Atlas engineering portfolio.'),
    (gen_random_uuid(), now(), now(), 'system', 'system', 'ACTIVE', 0,
     'PRD-NAV-001', 'Navigation Computer', 'Onboard navigation platform for the Atlas engineering portfolio.');
