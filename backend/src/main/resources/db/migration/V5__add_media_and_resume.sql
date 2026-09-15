-- V5: Phase 3 media + resume management schema.
--
-- Adds database-backed metadata for Cloudinary-hosted media (images) and the
-- portfolio resume (PDF), plus an optional project image reference.
--
-- Non-destructive: no DROP, no TRUNCATE, no DELETE, no data reset.
-- All DDL is conditional (MySQL lacks IF NOT EXISTS) using the information_schema +
-- PREPARE/EXECUTE pattern proven by V2-V4. Existing rows are untouched.

-- ============================================================
-- 1) media_assets: metadata for uploaded media files
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'media_assets') = 0,
    'CREATE TABLE `media_assets` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `public_id` VARCHAR(255) NOT NULL,
        `resource_type` VARCHAR(20) NOT NULL,
        `format` VARCHAR(20) NOT NULL,
        `original_filename` VARCHAR(255) NULL,
        `secure_url` VARCHAR(1024) NOT NULL,
        `width` INT NULL,
        `height` INT NULL,
        `bytes` BIGINT NOT NULL,
        `created_at` datetime(6) NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `uk_media_assets_public_id` UNIQUE (`public_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================
-- 2) site_resume: singleton active resume
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'site_resume') = 0,
    'CREATE TABLE `site_resume` (
        `id` VARCHAR(50) NOT NULL,
        `public_id` VARCHAR(255) NOT NULL,
        `secure_url` VARCHAR(1024) NOT NULL,
        `original_filename` VARCHAR(255) NULL,
        `bytes` BIGINT NOT NULL,
        `updated_at` datetime(6) NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `uk_site_resume_public_id` UNIQUE (`public_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================
-- 3) projects: add optional `image_url` (nullable - existing rows unaffected)
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'projects'
       AND COLUMN_NAME = 'image_url') = 0,
    'ALTER TABLE projects ADD COLUMN image_url VARCHAR(1024) NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
