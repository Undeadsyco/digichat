-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: digichat
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `post_id` int(5) unsigned zerofill NOT NULL,
  `author_id` int(5) unsigned zerofill NOT NULL,
  `body` varchar(100) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `edited` tinyint unsigned NOT NULL,
  `likes` int(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `dislikes` int(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `comment_author_id_ref_idx` (`author_id`),
  KEY `parent_post_id_ref_idx` (`post_id`),
  CONSTRAINT `comment_author_id_ref` FOREIGN KEY (`author_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `parent_post_id_ref` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (00003,00001,00000,'this is a default comment from the database',0,00000,00000,'2024-03-15 20:36:26','2024-03-15 20:36:26'),(00006,00012,00000,'last test of the comment system',0,00000,00000,'2024-03-20 19:39:35','2024-03-20 19:39:35'),(00007,00012,00000,'last test of the comment system',0,00000,00000,'2024-03-20 19:39:39','2024-03-20 19:39:39'),(00010,00013,00000,'Test Comment',0,00000,00000,'2024-03-23 05:31:31','2024-03-23 05:31:31'),(00011,00013,00000,'another test comment',0,00000,00000,'2024-03-23 05:35:02','2024-03-23 05:35:02'),(00012,00013,00000,'final test comment',0,00000,00000,'2024-03-23 05:36:01','2024-03-23 05:36:01'),(00013,00015,00000,'test comment',0,00000,00000,'2024-03-23 05:37:27','2024-03-23 05:37:27'),(00014,00015,00000,'test comment again',0,00000,00000,'2024-03-23 05:39:36','2024-03-23 05:39:36'),(00015,00016,00000,'test comment',0,00000,00000,'2024-03-23 05:43:00','2024-03-23 05:43:00'),(00016,00017,00000,'test comment',0,00000,00000,'2024-03-23 05:45:21','2024-03-23 05:45:21');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `owner_id` int(5) unsigned zerofill NOT NULL,
  `group_name` varchar(45) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `likes` int(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `dislikes` int(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`),
  KEY `owner_id_ref_idx` (`owner_id`),
  CONSTRAINT `owner_id_ref` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (00000,00000,'the undead boys','for me and the undead clan',00000,00000,0,'2024-03-15 20:12:35','2024-03-15 20:12:35'),(00001,00000,'the Family','for the fam and i to talk and to keep in keep up to date on family events',00000,00000,0,'2024-03-23 04:56:16','2024-03-23 04:56:16');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership` (
  `group_id` int(5) unsigned zerofill NOT NULL,
  `user_id` int(5) unsigned zerofill NOT NULL,
  `role` enum('owner','admin','member') COLLATE utf8mb4_0900_as_ci NOT NULL DEFAULT 'member',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `membership_ibfk_2` (`user_id`),
  CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`) ON DELETE CASCADE,
  CONSTRAINT `membership_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
INSERT INTO `membership` VALUES (00000,00001,'member','2024-03-22 23:21:44','2024-03-22 23:21:44'),(00000,00003,'member','2024-03-23 06:21:14','2024-03-23 06:21:14'),(00001,00001,'member','2024-04-01 20:07:14','2024-04-01 20:07:14'),(00001,00002,'admin','2024-03-23 03:28:33','2024-03-23 03:59:46'),(00001,00004,'admin','2024-03-23 04:55:46','2024-03-23 04:56:16'),(00001,00005,'member','2024-03-23 03:29:15','2024-03-23 03:29:15'),(00001,00006,'member','2024-03-23 03:28:49','2024-03-23 03:28:49');
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `author_id` int(5) unsigned zerofill NOT NULL,
  `group_id` int(5) unsigned zerofill DEFAULT NULL,
  `title` varchar(200) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `body` varchar(5000) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `edited` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `likes` int(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `dislikes` int(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `private` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `post_author_id_ref_idx` (`author_id`),
  KEY `parent_group_id_ref_idx` (`group_id`),
  CONSTRAINT `parent_group_id_ref` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`) ON DELETE SET NULL,
  CONSTRAINT `post_author_id_ref` FOREIGN KEY (`author_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (00001,00000,NULL,'Test Post','This is a test post!!!',0,00000,00000,0,'2024-03-15 23:17:15','2024-03-15 23:17:15'),(00012,00000,NULL,'Test Post','This is hopefully the last test of the edit post system!!!',1,00000,00000,0,'2024-03-20 18:29:46','2024-03-20 18:29:46'),(00013,00000,00001,'Test Group Post ','This is a test group post!!!',0,00000,00000,0,'2024-03-23 05:00:57','2024-03-23 05:00:57'),(00014,00000,00001,'Test Group Message','This is a test group message!!!',0,00000,00000,1,'2024-03-23 05:14:36','2024-03-23 05:14:36'),(00015,00000,00001,'Test Group Post','This is another test group post!!!',0,00000,00000,0,'2024-03-23 05:15:52','2024-03-23 05:15:52'),(00016,00000,00001,'Test Group Post','This is the final test group post',0,00000,00000,0,'2024-03-23 05:21:05','2024-03-23 05:21:05'),(00017,00000,00001,'Test Group Post','Now this is the final test group post',0,00000,00000,0,'2024-03-23 05:23:10','2024-03-23 05:23:10'),(00018,00000,00001,'test post for reducer','made changes on reducer so now making tests',0,00000,00000,0,'2024-03-23 05:45:52','2024-03-23 05:45:52'),(00019,00001,NULL,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',0,00000,00000,0,'2024-04-01 21:53:41','2024-04-01 21:53:41');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship` (
  `register_id` int(5) unsigned zerofill NOT NULL,
  `addressee_id` int(5) unsigned zerofill NOT NULL,
  `status` enum('pending','requested','accepted','friends','rejected','denied','blocked') NOT NULL DEFAULT 'requested',
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`register_id`,`addressee_id`),
  KEY `register_id_ref_idx` (`register_id`),
  KEY `addressee_id_ref_idx` (`addressee_id`),
  CONSTRAINT `addressee_id_ref` FOREIGN KEY (`addressee_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `register_id_ref` FOREIGN KEY (`register_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
INSERT INTO `relationship` VALUES (00000,00001,'denied',0,'2024-03-22 20:34:40','2024-03-22 20:34:40'),(00000,00002,'friends',1,'2024-03-22 21:13:43','2024-03-22 21:13:43'),(00000,00003,'denied',0,'2024-03-23 07:18:19','2024-03-23 07:18:19'),(00000,00004,'denied',0,'2024-03-22 20:54:37','2024-03-22 20:54:37'),(00000,00005,'friends',1,'2024-03-23 03:29:45','2024-03-23 03:29:45'),(00000,00006,'requested',1,'2024-03-23 04:07:38','2024-03-23 04:07:38'),(00001,00000,'denied',0,'2024-03-22 20:34:40','2024-03-22 20:34:40'),(00002,00000,'accepted',1,'2024-03-22 21:13:43','2024-03-22 21:13:43'),(00002,00003,'accepted',1,'2024-03-23 07:18:17','2024-03-23 07:18:17'),(00003,00000,'denied',0,'2024-03-23 07:18:19','2024-03-23 07:18:19'),(00003,00002,'friends',1,'2024-03-23 07:18:17','2024-03-23 07:18:17'),(00004,00000,'denied',0,'2024-03-22 20:54:37','2024-03-22 20:54:37'),(00005,00000,'accepted',1,'2024-03-23 03:29:45','2024-03-23 03:29:45'),(00006,00000,'pending',1,'2024-03-23 04:07:38','2024-03-23 04:07:38');
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `user_name` varchar(45) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `password` varchar(150) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (00000,'Brandon Santana','BrandonS112358@gmail.com','SycoKing','$2a$10$DkH1GP9rNZcY5mtLEW5xoOcDi2a22K5yi1CgbAxDE/YoU10pBNWa6',1),(00001,'austin smith','austinsmith@gmail.com','smithman','$2a$10$0YMFYgghAuJ84aPx9pKMBei/p/aGKXvEt/.v1hpZxnzs9898vZSYa',0),(00002,'Bunny Santana','bunnysantana@gmail.com','bunnygal','$2a$10$8iEMqW3EboFZ9F0TG5USr.56FG3Z2pmsSz5mAe4LM3cSmJqdSr5gq',0),(00003,'bob smith','bobsmith@gmail.com','bobert','$2a$10$FHoBKB9kq3WtFbOTKvhYwu76wyjsjNhyUau5i1BEZRjT5AptaFgbq',0),(00004,'amy santana','amysantana@gmail.com','mother person','$2a$10$WqUBWVqS56muEfOYSXeLX.TwCkwvOiMiVSSkXX3/atA8/Qmt4JWcO',0),(00005,'Kristen','kristen@gmail.com','sister person','$2a$10$BLXtzk1GsgcPkU19C3k8VuRk2x0hWx5ysOZaLG..9F99uPEU8rUku',0),(00006,'tyler santana','tylersantana@email.com','tyGuy','$2a$10$SHYmEbDc2oaOsUPcBZpNDuVyPajEK7Eez.Dr2EcLBPm/3L6ATc/p2',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-13 14:47:19
