-- Esquema inicial de referência; não aplicado em produção.
CREATE TABLE tenants (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE stores (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tenant_id BIGINT NOT NULL REFERENCES tenants(id), name TEXT NOT NULL, city TEXT NOT NULL);
CREATE TABLE products (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tenant_id BIGINT NOT NULL REFERENCES tenants(id), sku TEXT NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, UNIQUE(tenant_id,sku));
CREATE TABLE sales (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tenant_id BIGINT NOT NULL REFERENCES tenants(id), store_id BIGINT NOT NULL REFERENCES stores(id), product_id BIGINT NOT NULL REFERENCES products(id), sold_at TIMESTAMPTZ NOT NULL, quantity NUMERIC(14,3) NOT NULL CHECK(quantity>=0), unit_price NUMERIC(14,4) NOT NULL CHECK(unit_price>=0), unit_cost NUMERIC(14,4) NOT NULL CHECK(unit_cost>=0));
CREATE INDEX sales_tenant_store_date ON sales(tenant_id,store_id,sold_at);
CREATE TABLE scenarios (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tenant_id BIGINT NOT NULL REFERENCES tenants(id), store_id BIGINT NOT NULL REFERENCES stores(id), product_id BIGINT NOT NULL REFERENCES products(id), discount_pct NUMERIC(5,2) NOT NULL CHECK(discount_pct BETWEEN 0 AND 100), volume_change_pct NUMERIC(7,2) NOT NULL, status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','approved','rejected')), created_at TIMESTAMPTZ NOT NULL DEFAULT now());
-- ATENÇÃO: antes de conectar usuários reais, implementar RLS por tenant, constraints
-- compostas de integridade entre tenant/store/product, auditoria e políticas de acesso.
