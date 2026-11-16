-- Sample SQL covering language tokens.

/* ── Schema ── */
CREATE SCHEMA IF NOT EXISTS shop;

CREATE TYPE order_status AS ENUM ('pending', 'shipped', 'delivered');

CREATE TABLE shop.customers (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    name        TEXT NOT NULL,
    is_active   BOOLEAN DEFAULT TRUE,
    balance     NUMERIC(10, 2) DEFAULT 0.00 CHECK (balance >= 0),
    metadata    JSONB,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shop.orders (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES shop.customers (id) ON DELETE CASCADE,
    status      order_status NOT NULL DEFAULT 'pending',
    total       DECIMAL(12, 2) NOT NULL,
    ordered_on  DATE NOT NULL
);

CREATE INDEX idx_orders_customer ON shop.orders (customer_id, ordered_on DESC);

ALTER TABLE shop.customers ADD COLUMN phone CHAR(20) NULL;

/* ── Data ── */
INSERT INTO shop.customers (email, name, balance, metadata)
VALUES
    ('alice@example.com', 'Alice', 100.50, '{"vip": true}'),
    ('bob@example.com', 'Bob''s Shop', 0, NULL)
ON CONFLICT (email) DO NOTHING
RETURNING id, email;

UPDATE shop.customers
SET balance = balance * 1.05, is_active = FALSE
WHERE created_at < NOW() - INTERVAL '1 year'
  AND email LIKE '%@example.com';

DELETE FROM shop.orders WHERE status = 'pending' AND total <= 0;

/* ── Queries ── */
WITH monthly_totals AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', ordered_on) AS month,
        SUM(total) AS month_total,
        COUNT(*) AS order_count
    FROM shop.orders
    WHERE status IN ('shipped', 'delivered')
    GROUP BY customer_id, DATE_TRUNC('month', ordered_on)
    HAVING SUM(total) > 50
)
SELECT DISTINCT
    c.id,
    UPPER(c.name) AS customer_name,
    COALESCE(m.month_total, 0) AS total,
    CASE
        WHEN m.month_total >= 1000 THEN 'gold'
        WHEN m.month_total BETWEEN 500 AND 999.99 THEN 'silver'
        ELSE 'bronze'
    END AS tier,
    RANK() OVER (PARTITION BY m.month ORDER BY m.month_total DESC) AS rank,
    c.metadata ->> 'vip' AS is_vip,
    CAST(c.balance AS INTEGER) AS rounded_balance
FROM shop.customers AS c
LEFT JOIN monthly_totals m ON m.customer_id = c.id
INNER JOIN shop.orders o USING (id)
WHERE c.is_active IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM shop.orders x WHERE x.customer_id = c.id AND x.total < 0)
  AND c.name ~* '^[a-z]+'
ORDER BY total DESC NULLS LAST, c.name ASC
LIMIT 10 OFFSET 0;

SELECT name FROM shop.customers
UNION ALL
SELECT CONCAT('order-', id::TEXT) FROM shop.orders;

/* ── Views, functions, transactions ── */
CREATE OR REPLACE VIEW shop.active_customers AS
SELECT id, name FROM shop.customers WHERE is_active = TRUE;

CREATE OR REPLACE FUNCTION shop.customer_total(p_customer_id INTEGER)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    v_total NUMERIC := 0;
BEGIN
    SELECT SUM(total) INTO v_total FROM shop.orders WHERE customer_id = p_customer_id;
    IF v_total IS NULL THEN
        RAISE NOTICE 'No orders for %', p_customer_id;
        RETURN 0;
    END IF;
    RETURN v_total;
END;
$$;

BEGIN;
UPDATE shop.customers SET balance = balance - 25 WHERE id = 1;
UPDATE shop.customers SET balance = balance + 25 WHERE id = 2;
COMMIT;

GRANT SELECT, INSERT ON shop.orders TO app_user;
DROP TABLE IF EXISTS shop.temp_data CASCADE;
