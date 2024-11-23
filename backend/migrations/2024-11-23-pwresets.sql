CREATE TABLE `pwresets` (
  `token` varchar(80) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `pwresets`
  ADD PRIMARY KEY (`token`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `pwresets`
  ADD CONSTRAINT `pwresets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;