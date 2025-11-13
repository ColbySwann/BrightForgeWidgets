insert into users (id, username, password, email, enabled, created_at, role_id)
values  (1, 'HelloWorld', '$2a$10$o8gAOU.2brnm2sEzVeDfbuJlhffrJb17ncotKz0twD9dDIQmdugYe', 'HelloWorld@gmail.com', true, '2025-10-22 12:47:28.804782', 2),
        (2, 'UserAdmin', '$2a$10$E.cYNY8U2eIlFDUHiFudyui4YOImFIe3MFT7XmgqAIxwE2kSILedG', 'userAdmin@gmail.com', true, '2025-10-29 16:24:57.424891', 2),
        (3, 'NotAdmin', '$2a$10$2M.bKy3GnVS4kF2.6rG.U.t.6kFc6voCiUkyRoSiFlG.xgHFvIb7K', 'notAdmin@yahoo.com', true, '2025-10-30 08:38:59.895187', 1);


insert into product (id, name, slug, blurb, color_id, image_url, usefulness_rating, qty, lifecycle_status, created_at, updated_at, price)
values  (22, 'Mouse Mouse', 'mouse-mouse', 'A mouse that looks just like a mouse', 5, 'http://localhost:8080/uploads/edc680aa-ee78-44aa-be58-bc16f8c01afa_Mouse Mouse.jpeg', 5, 886, 1, '2025-10-31 09:05:29.904941', '2025-11-03 12:01:46.412227', 829.99),
        (20, 'Flimsy Keyboard', 'flimsy-keyboard', 'Keyboard that has no backbone', 4, 'http://localhost:8080/uploads/1df89a11-894b-44de-b9bf-90fa01721f3c_Flimsy Keyboard.jpeg', 3, 52, 1, '2025-10-31 08:54:31.653728', '2025-11-03 12:01:14.327421', 84.99),
        (11, 'Superman Keyboard', 'superman-keyboard', 'Keyboard that is very allergic to Kryptonite', 2, 'http://localhost:8080/uploads/c41a1528-7be4-4709-a083-88796fa836e3_supeskeyboard.jpeg', 5, 1000, 1, '2025-10-28 10:57:24.376342', '2025-11-06 09:29:28.340452', 99.45),
        (12, 'BrightForge Widgets', 'brightforge-widgets', 'A widget for a widget Website', 1, 'http://localhost:8080/uploads/03a1cbdb-8362-4bf5-ae70-fd077fcfcfa0_Screenshot 2025-10-09 at 5.49.14 PM.png', 5, -3, 1, '2025-10-28 11:02:38.048612', '2025-11-12 12:21:55.565209', 23.12),
        (23, 'Red Dragon Mouse', 'red-dragon-mouse', 'A mouse', 3, 'http://localhost:8080/uploads/776d5a0c-5335-4ac9-b9ee-82be16126ef2_Reddragon Moutse.jpeg', 2, 316578, 3, '2025-10-31 09:06:19.190214', '2025-11-04 09:14:05.537701', 0.15),
        (26, 'Vintage Headphones', 'vintage-headphones', 'Headphones that are of the lowest sound quality', 3, 'http://localhost:8080/uploads/549e6899-a178-4229-9a94-759595865328_Vintage Headphones.jpeg', 1, 44, 1, '2025-11-03 11:59:09.339715', '2025-11-03 11:59:09.339730', 987.23),
        (19, 'Ergonomic Mouse', 'ergonomic-mouse', 'A mouse for those with pain', 1, 'http://localhost:8080/uploads/a3e9d0cc-3c40-4732-884b-bd338369764f_Ergo Mouse.jpeg', 4, 336, 1, '2025-10-31 08:53:43.665367', '2025-11-03 12:01:36.694011', 43.34),
        (24, 'RGB Keyboard', 'rgb-keyboard', 'Its got the RGBssss', 4, 'http://localhost:8080/uploads/455b188c-a369-4c2c-a7aa-6abd45e027ea_RGB keyboard.jpeg', 1, 40, 1, '2025-10-31 09:07:10.103110', '2025-10-31 09:07:10.103123', 78.98),
        (27, 'Stitch Headphones', 'stitch-headphones', 'Headphones for little aliens', 1, 'http://localhost:8080/uploads/d019c287-516e-4c71-885e-9748cba4620d_Stitch Headphones.jpeg', 5, 87, 1, '2025-11-03 12:00:17.055057', '2025-11-03 12:01:21.665451', 10.87),
        (25, 'Mouse with cool lights', 'mouse-with-cool-lights', 'Mouse that has rgb in the middle', 1, 'http://localhost:8080/uploads/b8e539a3-e561-489c-a36e-dcd2363235b3_white with lights mouse.jpeg', 4, 3, 3, '2025-10-31 09:08:13.209343', '2025-11-04 09:13:02.348544', 100000.01),
        (21, 'Mini Portable Keyboard', 'mini-portable-keyboard', 'If you have small hands this is the keyboard for you', 4, 'http://localhost:8080/uploads/d27b13b5-6f47-4db9-8edd-b070299a8d7c_MiniKeyboard.jpeg', 3, 998, 1, '2025-10-31 08:55:16.998472', '2025-10-31 09:08:27.868699', 55.89);


insert into public.carts (cart_id, user_id, created_at, updated_at)
values  (1, 3, '2025-10-30 12:07:29.480700', '2025-10-30 12:07:29.480708'),
        (2, 2, '2025-10-31 08:33:46.620697', '2025-10-31 08:33:46.620708');