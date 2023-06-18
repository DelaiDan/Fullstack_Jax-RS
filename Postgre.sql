-- Adminer 4.8.1 PostgreSQL 15.2 (Debian 15.2-1.pgdg110+1) dump

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

TRUNCATE "vehicles";

DROP TABLE IF EXISTS "brands";
DROP SEQUENCE IF EXISTS brands_id_seq;
CREATE SEQUENCE brands_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."brands" (
    "id" integer DEFAULT nextval('brands_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "brands";

-- 2023-05-21 18:28:23.74844+00
