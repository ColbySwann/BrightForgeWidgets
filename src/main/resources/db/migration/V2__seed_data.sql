INSERT INTO color (color_code, color_label, color_hex) VALUES
('clear', 'Clear', '#FFFFFF'),
('black', 'Black', '#000000'),
('cyan', 'Cyan', '#00FFFF'),
('red', 'Red', '#FF0000'),
('chaos', 'Chaos Mix', '#AA00FF');

INSERT INTO lifecycle_status (status_code, description) VALUES
('active', 'Currently available for sale'),
('oos_permanent', 'Out of stock permanently'),
('retired', 'No longer manufactured'),
('deleted', 'Soft deleted from catalog');