CREATE TABLE `audit_logs` (
    `id` INT(11) NOT NULL,
    `user_id` INT(11) DEFAULT NULL,
    `log_type` VARCHAR(255) NOT NULL,
    `log_data` MEDIUMTEXT NOT NULL,
    `created_at` DATETIME NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=utf8;

ALTER TABLE `audit_logs` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`);
-- in mysql 5.7.x you cannot define multiple keys, so this might fail
ALTER TABLE `audit_logs`
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;