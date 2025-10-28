INSERT INTO product (name, slug, blurb, color_id, image_url, usefulness_rating, qty, lifecycle_status, created_at, updated_at)
VALUES
    (
        'Flux Capacitor Mk II',
        'flux-capacitor-mk-ii',
        'An upgraded temporal energy regulator capable of powering small-scale time displacement devices.',
        3,  -- Silver
        'https://via.placeholder.com/300x200?text=Flux+Capacitor',
        4.9,
        12,
        1,  -- Active
        NOW(),
        NOW()
    ),

    (
        'Quantum Gyro Stabilizer',
        'quantum-gyro-stabilizer',
        'A precision-engineered stabilizer used in aerospace systems to maintain perfect angular balance.',
        2,  -- Blue
        'https://via.placeholder.com/300x200?text=Quantum+Gyro',
        4.3,
        8,
        1,  -- Active
        NOW(),
        NOW()
    ),

    (
        'NanoSpark Emitter',
        'nanospark-emitter',
        'Generates controlled bursts of nanoscopic plasma sparks — ideal for microassembly and research.',
        1,  -- Red
        'https://via.placeholder.com/300x200?text=NanoSpark',
        3.7,
        -3,  -- Backordered
        1,  -- Active
        NOW(),
        NOW()
    ),

    (
        'Photon Relay Core',
        'photon-relay-core',
        'Transfers photon energy between linked systems with near-zero latency.',
        4,  -- Yellow
        'https://via.placeholder.com/300x200?text=Photon+Relay',
        4.5,
        0,  -- Out of stock
        2,  -- Out of Stock
        NOW(),
        NOW()
    ),

    (
        'CryoLock Containment Seal',
        'cryolock-containment-seal',
        'A temperature-regulating product that locks molecular movement for cryogenic storage.',
        2,  -- Blue
        'https://via.placeholder.com/300x200?text=CryoLock+Seal',
        4.8,
        15,
        1,  -- Active
        NOW(),
        NOW()
    );