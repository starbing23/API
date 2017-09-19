CREATE TABLE   IF NOT EXISTS  `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` text(60000) DEFAULT NULL,
  `blogId` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `headImg` varchar(255) DEFAULT NULL,
  `like` INT(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;