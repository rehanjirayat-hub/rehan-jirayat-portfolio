package com.rehanjirayat.portfolio.config;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import java.sql.Connection;
import java.util.List;

import javax.sql.DataSource;

/**
 * Runs Flyway with an automatic "repair" when the schema history table contains a
 * previously failed migration row (success = 0).
 *
 * <p>MySQL DDL is non-transactional, so when a migration fails mid-script Flyway
 * records a failed row and every subsequent {@code migrate} aborts with
 * "detected failed migration to version ...". Repair removes that failed row so the
 * corrected migration can be applied again, and also realigns checksums. It does not
 * touch any application tables or data.
 */
@Configuration
public class FlywayRepairConfig {

    private static final Logger log = LoggerFactory.getLogger(FlywayRepairConfig.class);

    @Bean
    public FlywayMigrationStrategy repairFailedMigrationsFirst() {
        return flyway -> {
            if (hasFailedMigration(flyway)) {
                log.warn("Flyway schema history contains failed migration(s) - running repair before migrate");
                flyway.repair();
            }
            flyway.migrate();
        };
    }

    private boolean hasFailedMigration(Flyway flyway) {
        try (Connection connection = flyway.getConfiguration().getDataSource().getConnection()) {
            JdbcTemplate jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(connection, true));
            List<Integer> failures = jdbcTemplate.queryForList(
                    "SELECT 1 FROM flyway_schema_history WHERE success = 0",
                    Integer.class);
            return !failures.isEmpty();
        } catch (Exception ex) {
            // History table may not exist yet (fresh database) - let migrate handle it.
            log.info("Skipped failed-migration check ({}), proceeding with migrate", ex.getMessage());
            return false;
        }
    }
}
