CREATE TABLE roles(
  role VARCHAR(6) PRIMARY KEY
); 

INSERT INTO roles(role) VALUES ('ADMIN'), ('USER');

CREATE TABLE users(
  id UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(6) DEFAULT 'USER' NOT NULL REFERENCES roles(role),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products(
id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
product_name VARCHAR(70) NOT NULL,
product_type VARCHAR(30) NOT NULL,
product_price DECIMAL(10,2) NOT NULL,
product_description TEXT NOT NULL,
allergens VARCHAR(255),
image_url VARCHAR(255)
);

CREATE TABLE statuses(
status VARCHAR(18) PRIMARY KEY
);

INSERT INTO statuses(status) VALUES ('PENDING PAYMENT'), ('IN PROGRESS'), ('COMPLETED');

CREATE TABLE orders(
id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
user_id UUID REFERENCES users(id),
status VARCHAR(18) DEFAULT 'PENDING PAYMENT' NOT NULL REFERENCES statuses(status),
delivery_address VARCHAR(150) NOT NULL,
contact_number int NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE order_items(
id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
order_id UUID REFERENCES orders(id),
product_id UUID REFERENCES products(id),
quantity int NOT NULL DEFAULT 1 CHECK (quantity > 0),
price DECIMAL(10, 2) NOT NULL,
notes VARCHAR(200)
);

CREATE TABLE carts(
id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
user_id UUID REFERENCES users(id),
product_id UUID REFERENCES products(id),
quantity int NOT NULL DEFAULT 1 CHECK (quantity > 0),
price DECIMAL(10, 2) NOT NULL,
notes VARCHAR(200)
);