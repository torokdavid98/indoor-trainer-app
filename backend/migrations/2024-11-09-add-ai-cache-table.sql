CREATE TABLE `aicache` (
  `id` int(11) NOT NULL,
  `prompt` longtext NOT NULL,
  `response` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `aicache`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `aicache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
