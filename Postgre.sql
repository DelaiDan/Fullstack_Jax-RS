-- Adminer 4.8.1 PostgreSQL 15.2 (Debian 15.2-1.pgdg110+1) dump

DROP TABLE IF EXISTS "brands";
DROP SEQUENCE IF EXISTS brands_id_seq;
CREATE SEQUENCE brands_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."brands" (
    "id" integer DEFAULT nextval('brands_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "brands" ("id", "name") VALUES
(1,	'Peugeot'),
(4,	'Chevrolet'),
(5,	'FIAT'),
(6,	'Volkswagen'),
(8,	'BMW');

DROP TABLE IF EXISTS "vehicles";
DROP SEQUENCE IF EXISTS vehicles_id_seq;
CREATE SEQUENCE vehicles_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."vehicles" (
    "id" integer DEFAULT nextval('vehicles_id_seq') NOT NULL,
    "model" character varying NOT NULL,
    "year" integer NOT NULL,
    "brand" integer NOT NULL,
    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "vehicles" ("id", "model", "year", "brand") VALUES
(1,	'308',	2013,	1),
(8,	'Corsa Classic',	2009,	4),
(9,	'Corsa JOY',	2006,	4),
(10,	'E6',	1978,	8);

-- 2023-06-25 22:13:45.258655+00
