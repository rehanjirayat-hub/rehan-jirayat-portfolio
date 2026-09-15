ALTER TABLE education
    ADD COLUMN IF NOT EXISTS visible BOOLEAN NULL,
    ADD COLUMN IF NOT EXISTS display_order INT NULL;

SET @education_order := -1;

UPDATE education
SET display_order = (@education_order := @education_order + 1)
WHERE display_order IS NULL
ORDER BY id;

UPDATE education
SET visible = TRUE
WHERE visible IS NULL;
