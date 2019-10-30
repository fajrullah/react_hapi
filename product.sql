CREATE TABLE PRODUCT(
   product_id serial PRIMARY KEY,
   dispEngNm VARCHAR (50) NOT NULL,
   dispNm VARCHAR (50) NOT NULL,
   parentDispNo VARCHAR (355) NOT NULL,
   created_on TIMESTAMP NOT NULL,
   updated_on TIMESTAMP
);