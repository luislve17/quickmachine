-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: quickmachine
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.17.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `cat_id` int(6) unsigned NOT NULL,
  `category` varchar(30) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'free'),(2,'regular'),(3,'premium');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_clustering`
--

DROP TABLE IF EXISTS `log_clustering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_clustering` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `usr_name` varchar(64) DEFAULT NULL,
  `data_name` varchar(128) DEFAULT NULL,
  `cant_clusters` int(5) DEFAULT NULL,
  `cant_data` int(8) DEFAULT NULL,
  `num_iter` int(7) DEFAULT NULL,
  `register_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_clustering`
--

LOCK TABLES `log_clustering` WRITE;
/*!40000 ALTER TABLE `log_clustering` DISABLE KEYS */;
INSERT INTO `log_clustering` VALUES (1,'admin','test2.txt',4,200,1163,'2018-06-27 08:48:00'),(2,'admin','test2.txt',4,200,1142,'2018-06-27 08:48:23'),(3,'admin','test.txt',4,100,1207,'2018-06-27 08:48:38'),(4,'regular','test2.txt',4,200,1223,'2018-06-27 08:49:05');
/*!40000 ALTER TABLE `log_clustering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_linreg`
--

DROP TABLE IF EXISTS `log_linreg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_linreg` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `usr_name` varchar(64) DEFAULT NULL,
  `data_name` varchar(128) DEFAULT NULL,
  `theta_0` float(20,17) DEFAULT NULL,
  `theta_1` float(20,17) DEFAULT NULL,
  `delta_J` float(25,20) DEFAULT NULL,
  `num_iter` int(7) DEFAULT NULL,
  `learning_rate` float(15,15) DEFAULT NULL,
  `epsilon` float(15,15) DEFAULT NULL,
  `register_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_linreg`
--

LOCK TABLES `log_linreg` WRITE;
/*!40000 ALTER TABLE `log_linreg` DISABLE KEYS */;
INSERT INTO `log_linreg` VALUES (1,'admin','test.txt',14.52443027496337900,3.49759817123413100,0.00009997736924560740,17041,0.000500000023749,0.000099999997474,'2018-06-27 08:47:09'),(2,'admin','test.txt',14.52439785003662100,3.49759864807128900,0.00009998113091569394,17028,0.000500000023749,0.000099999997474,'2018-06-27 09:40:19'),(3,'admin','test.txt',14.52439785003662100,3.49759864807128900,0.00009998113091569394,17028,0.000500000023749,0.000099999997474,'2018-06-27 09:40:19'),(4,'admin','test.txt',14.52439785003662100,3.49759864807128900,0.00009998113091569394,17028,0.000500000023749,0.000099999997474,'2018-06-27 09:40:20'),(5,'admin','test.txt',14.52439785003662100,3.49759864807128900,0.00009998113091569394,17028,0.000500000023749,0.000099999997474,'2018-06-27 09:40:20');
/*!40000 ALTER TABLE `log_linreg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menus` (
  `menu_id` int(6) unsigned NOT NULL,
  `menu` varchar(30) NOT NULL,
  `parent_id` int(6) unsigned NOT NULL,
  `cat_id` int(6) unsigned NOT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Archivo',0,1),(2,'Data',0,1),(3,'Modulos',0,2),(4,'Nuevo',1,1),(5,'Importar',1,2),(7,'Ajuste Lineal',3,2),(8,'Clasificar',3,2),(9,'Mostrar',2,1),(10,'Historial',3,2);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `category` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','21232f297a57a5a743894a0e4a801fc3','Premium'),(2,'regular','af37d08ae228a87dc6b265fd1019c97d','Regular'),(3,'free','aa2d6e4f578eb0cfaba23beef76c2194','Free'),(5,'test','098f6bcd4621d373cade4e832627b4f6','Regular'),(8,'prueba','c893bad68927b457dbed39460e6afd62','Regular'),(9,'User1','1a1dc91c907325c69271ddf0c944bc72','Premium'),(10,'jhon','e10adc3949ba59abbe56e057f20f883e','Free'),(11,'muca','3ca892ba2f1dc61a278fd6d897adc832','Premium'),(12,'luis','502ff82f7f1f8218dd41201fe4353687','Premium'),(13,'test1234','81dc9bdb52d04dc20036dbd8313ed055','Premium');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-27 12:16:06
