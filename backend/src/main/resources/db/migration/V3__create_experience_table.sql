-- V3: create the empty `experience` table required by the Phase 2 CMS Experience entity.
--
-- The production MySQL database predates the Experience entity, so Hibernate schema
-- validation fails with "Schema-validation: missing table [experience]". Flyway runs
-- before Hibernate validation, so this migration creates the table first.
--
-- MySQL (unlike MariaDB) does not support "CREATE TABLE IF NOT EXISTS", so the table is
-- created conditionally via an information_schema check (same pattern as V2). This keeps
-- the migration safe in any environment where Hibernate's ddl-auto=update already
-- created the table.
--
-- Non-destructive: no DROP, no TRUNCATE, no DELETE, no INSERT.
-- The table is created EMPTY - no employment history is invented or seeded.
-- Columns/types match the current Experience entity exactly (Hibernate snake_case).

SET @create_experience := IF(
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'experience') = 0,
    'CREATE TABLE `experience` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `job_title` VARCHAR(150) NOT NULL,
        `company` VARCHAR(200) NOT NULL,
        `location` VARCHAR(200) NOT NULL,
        `start_date` VARCHAR(20) NOT NULL,
        `end_date` VARCHAR(20) NULL,
        `current` BOOLEAN NOT NULL,
        `description` TEXT NOT NULL,
        `display_order` INT NOT NULL,
        `company_url` VARCHAR(500) NULL,
        `visible` BOOLEAN NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
    'SELECT 1');
PREPARE stmt FROM @create_experience;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
