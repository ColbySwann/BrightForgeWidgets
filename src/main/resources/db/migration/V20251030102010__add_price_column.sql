Alter table product
add column price numeric(10,2) not null default 0.00;

ALTER TABLE cart_items
Add column unit_price NUMERIC(10,2);