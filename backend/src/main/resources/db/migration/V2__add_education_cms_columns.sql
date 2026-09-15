-- V2: add CMS columns to the existing education table (MySQL-compatible).
--
-- MySQL (unlike MariaDB) does not support "ALTER TABLE ... ADD COLUMN IF NOT EXISTS",
-- so columns are added conditionally via information_schema checks. This keeps the
-- migration idempotent and safe whether or not the columns already exist.
--
-- Non-destructive: no DROP, no TRUNCATE, no DELETE, no table recreation.
-- Existing education rows are preserved; backfill statements only touch NULL values.

-- Add 'visible' only if it is missing.
SET @add_visible := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'education'
       AND COLUMN_NAME = 'visible') = 0,
    'ALTER TABLE education ADD COLUMN visible BOOLEAN NULL',
    'SELECT 1');
PREPARE stmt FROM @add_visible;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add 'display_order' only if it is missing.
SET @add_display_order := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'education'
       AND COLUMN_NAME = 'display_order') = 0,
    'ALTER TABLE education ADD COLUMN display_order INT NULL',
    'SELECT 1');
PREPARE stmt FROM @add_display_order;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Backfill display_order deterministically for existing rows (ordered by id).
-- Only rows with no explicit order yet are assigned one.
SET @education_order := -1;
UPDATE education
SET display_order = (@education_order := @education_order + 1)
WHERE display_order IS NULL
ORDER BY id;

-- Default existing education records to visible (only touches NULL values).
UPDATE education
SET visible = TRUE
WHERE visible IS NULL;
