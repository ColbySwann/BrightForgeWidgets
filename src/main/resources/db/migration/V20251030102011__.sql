ALTER TABLE carts
    ADD CONSTRAINT uc_carts_user UNIQUE (user_id);

ALTER TABLE cart_items
    ADD color_id BIGINT;

ALTER TABLE cart_items
    ADD CONSTRAINT FK_CART_ITEMS_ON_COLOR FOREIGN KEY (color_id) REFERENCES color (color_id);

ALTER TABLE product
    ALTER COLUMN price TYPE DECIMAL USING (price::DECIMAL);

ALTER TABLE cart_items
    ADD product_id BIGINT;

ALTER TABLE cart_items
    ADD CONSTRAINT FK_CART_ITEMS_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE cart_items
    ALTER COLUMN unit_price TYPE DECIMAL USING (unit_price::DECIMAL);

ALTER TABLE cart_items
    ALTER COLUMN unit_price SET NOT NULL;