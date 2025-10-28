
INSERT INTO color (color_code, color_label, color_hex) VALUES
('blue', 'Blue', '#0000FF'),
('black', 'Black', '#000000'),
('cyan', 'Cyan', '#00FFFF'),
('red', 'Red', '#FF0000'),
('purple', 'Purple', '#800080');

INSERT INTO lifecycle_status (status_code, description) VALUES
('active', 'Currently available for sale'),
('oos_permanent', 'Out of stock permanently'),
('retired', 'No longer manufactured'),
('deleted', 'Soft deleted from catalog');