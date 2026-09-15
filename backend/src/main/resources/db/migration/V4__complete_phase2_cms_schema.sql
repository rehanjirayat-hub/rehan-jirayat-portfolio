-- V4: complete the Phase 2 CMS schema on the existing production database.
--
-- Phase 2 added visibility/ordering fields to SocialLink, Project and SkillCategory,
-- and introduced the new SiteContent entity. Hibernate validates every entity at
-- startup and stops at the first mismatch, so production previously failed one
-- missing table/column per deploy. This migration closes ALL remaining gaps in one
-- pass:
--   * profile_social_links: add `visible`, `display_order`
--   * projects:             add `visible`, `display_order`
--   * skill_categories:     add `visible`, `display_order`
--   * site_content:         create the empty table (SiteContentInitializer seeds the
--                           default row on boot via existing application logic)
--
-- MySQL does not support "ADD COLUMN IF NOT EXISTS" / "CREATE TABLE IF NOT EXISTS",
-- so conditional DDL uses information_schema checks with PREPARE/EXECUTE (the same
-- proven pattern as V2/V3).
--
-- Non-destructive: no DROP, no TRUNCATE, no DELETE, no INSERT, no content changes.
-- Backfills touch only NULL values and are deterministic:
--   * visible defaults to TRUE (matches entity defaults; existing content stays visible)
--   * display_order is numbered from 0 ordered by each table's stable identifier

-- ============================================================
-- 1) profile_social_links: add `visible`
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'profile_social_links'
       AND COLUMN_NAME = 'visible') = 0,
    'ALTER TABLE profile_social_links ADD COLUMN visible BOOLEAN NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================
-- 2) profile_social_links: add `display_order`
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'profile_social_links'
       AND COLUMN_NAME = 'display_order') = 0,
    'ALTER TABLE profile_social_links ADD COLUMN display_order INT NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Backfill ordering deterministically (grouped per profile, stable platform key).
SET @social_order := -1;
UPDATE profile_social_links
SET display_order = (@social_order := @social_order + 1)
WHERE display_order IS NULL
ORDER BY profile_id, platform;

-- Existing social links stay visible (entity default is visible).
UPDATE profile_social_links
SET visible = TRUE
WHERE visible IS NULL;

-- ============================================================
-- 3) projects: add `visible`
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'projects'
       AND COLUMN_NAME = 'visible') = 0,
    'ALTER TABLE projects ADD COLUMN visible BOOLEAN NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================
-- 4) projects: add `display_order`
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'projects'
       AND COLUMN_NAME = 'display_order') = 0,
    'ALTER TABLE projects ADD COLUMN display_order INT NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Backfill ordering deterministically by stable project id.
SET @project_order := -1;
UPDATE projects
SET display_order = (@project_order := @project_order + 1)
WHERE display_order IS NULL
ORDER BY id;

-- Existing projects stay visible (entity default is visible).
UPDATE projects
SET visible = TRUE
WHERE visible IS NULL;

-- ============================================================
-- 5) skill_categories: add `visible`
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'skill_categories'
       AND COLUMN_NAME = 'visible') = 0,
    'ALTER TABLE skill_categories ADD COLUMN visible BOOLEAN NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================
-- 6) skill_categories: add `display_order`
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'skill_categories'
       AND COLUMN_NAME = 'display_order') = 0,
    'ALTER TABLE skill_categories ADD COLUMN display_order INT NULL',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Backfill ordering deterministically by stable category id.
SET @skill_order := -1;
UPDATE skill_categories
SET display_order = (@skill_order := @skill_order + 1)
WHERE display_order IS NULL
ORDER BY id;

-- Existing skill categories stay visible (entity default is visible).
UPDATE skill_categories
SET visible = TRUE
WHERE visible IS NULL;

-- ============================================================
-- 7) site_content: create the table if it does not exist.
--    Created EMPTY - the existing SiteContentInitializer inserts the
--    default CMS row on startup when the table has no rows.
-- ============================================================
SET @ddl := IF(
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'site_content') = 0,
    'CREATE TABLE `site_content` (
        `id` VARCHAR(50) NOT NULL,
        `hero_subtitle` VARCHAR(150) NOT NULL,
        `hero_primary_cta_label` VARCHAR(300) NOT NULL,
        `hero_primary_cta_url` VARCHAR(500) NOT NULL,
        `hero_secondary_cta_label` VARCHAR(300) NOT NULL,
        `hero_secondary_cta_url` VARCHAR(500) NOT NULL,
        `about_eyebrow` VARCHAR(150) NOT NULL,
        `about_heading` TEXT NOT NULL,
        `about_paragraph_one` TEXT NOT NULL,
        `about_paragraph_two` TEXT NOT NULL,
        `about_cta_label` VARCHAR(200) NOT NULL,
        `about_cta_url` VARCHAR(500) NOT NULL,
        `contact_heading` VARCHAR(200) NOT NULL,
        `contact_description` TEXT NOT NULL,
        `footer_description` VARCHAR(200) NOT NULL,
        `copyright_text` VARCHAR(200) NOT NULL,
        `navigation_json` TEXT NOT NULL,
        `sections_json` TEXT NOT NULL,
        `site_name` VARCHAR(200) NOT NULL,
        `professional_title` VARCHAR(200) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
    'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
