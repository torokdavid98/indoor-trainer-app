CREATE TABLE `trainings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NULL DEFAULT NULL,
  `length` int(11) NOT NULL,
  `workout` MEDIUMTEXT NOT NULL,
  `created_by` int(11) NOT NULL,
  `type` enum('recovery','interval','race','long_distance','other') NOT NULL,
  `shared` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `trainings`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `trainings`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `trainings`
    ADD CONSTRAINT `trainings_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);


CREATE TABLE `user_trainings` (
    `id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `training_id` int(11) NOT NULL,
    `status` enum('pending','finished','cancelled') NOT NULL,
    `finished_at` datetime DEFAULT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `user_trainings`
    ADD PRIMARY KEY (`id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `training_id` (`training_id`);

ALTER TABLE `user_trainings`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_trainings`
    ADD CONSTRAINT `user_trainings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    ADD CONSTRAINT `user_trainings_ibfk_2` FOREIGN KEY (`training_id`) REFERENCES `trainings` (`id`);

ALTER TABLE `user_trainings` ADD UNIQUE `unique` (`user_id`, `training_id`);