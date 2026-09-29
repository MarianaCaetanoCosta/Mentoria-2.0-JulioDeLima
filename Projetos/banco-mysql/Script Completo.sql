CREATE DATABASE  IF NOT EXISTS `banco` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `banco`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: banco
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `contas`
--

DROP TABLE IF EXISTS `contas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titular` varchar(100) NOT NULL,
  `saldo` decimal(10,2) NOT NULL,
  `ativa` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas`
--

LOCK TABLES `contas` WRITE;
/*!40000 ALTER TABLE `contas` DISABLE KEYS */;
INSERT INTO `contas` VALUES (1,'João da Silva',14584.01,1),(2,'Maria Oliveira',23415.99,1);
/*!40000 ALTER TABLE `contas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transferencias`
--

DROP TABLE IF EXISTS `transferencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transferencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conta_origem_id` int NOT NULL,
  `conta_destino_id` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  `autenticada` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `conta_origem_id` (`conta_origem_id`),
  KEY `conta_destino_id` (`conta_destino_id`),
  CONSTRAINT `transferencias_ibfk_1` FOREIGN KEY (`conta_origem_id`) REFERENCES `contas` (`id`),
  CONSTRAINT `transferencias_ibfk_2` FOREIGN KEY (`conta_destino_id`) REFERENCES `contas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transferencias`
--

LOCK TABLES `transferencias` WRITE;
/*!40000 ALTER TABLE `transferencias` DISABLE KEYS */;
INSERT INTO `transferencias` VALUES (1,1,2,100.00,'2026-09-29 14:51:37',0),(2,2,1,100.00,'2026-09-29 14:55:44',0),(3,1,2,500.00,'2026-09-29 14:55:44',0),(4,2,1,500.00,'2026-09-29 14:55:44',0),(5,1,2,4999.99,'2026-09-29 14:55:44',0),(6,2,1,4999.99,'2026-09-29 14:55:44',0),(7,1,2,5000.00,'2026-09-29 14:55:44',0),(8,2,1,5000.00,'2026-09-29 14:55:44',0),(9,1,2,5000.01,'2026-09-29 14:55:44',1),(10,2,1,5000.01,'2026-09-29 14:55:44',1),(11,1,2,6000.00,'2026-09-29 14:55:44',1),(12,2,1,6000.00,'2026-09-29 14:55:44',1),(13,1,2,7500.00,'2026-09-29 14:55:44',1),(14,2,1,7500.00,'2026-09-29 14:55:44',1),(15,1,2,8000.00,'2026-09-29 14:55:44',1),(16,2,1,8000.00,'2026-09-29 14:55:44',1),(17,1,2,10000.00,'2026-09-29 14:55:44',1),(18,2,1,10000.00,'2026-09-29 14:55:44',1),(19,1,2,12000.00,'2026-09-29 14:55:44',1),(20,2,1,12000.00,'2026-09-29 14:55:44',1),(21,1,2,14000.00,'2026-09-29 14:55:44',1),(22,2,1,14000.00,'2026-09-29 14:55:44',1),(23,1,2,5500.00,'2026-09-29 14:55:44',1),(24,2,1,5500.00,'2026-09-29 14:55:44',1),(25,1,2,6500.00,'2026-09-29 14:55:44',1),(26,2,1,6500.00,'2026-09-29 14:55:44',1),(27,1,2,9000.00,'2026-09-29 14:55:44',1),(28,2,1,9000.00,'2026-09-29 14:55:44',1),(29,1,2,11000.00,'2026-09-29 14:55:44',1),(30,2,1,11000.00,'2026-09-29 14:55:44',1),(31,1,2,250.00,'2026-09-29 14:55:44',0),(32,2,1,250.00,'2026-09-29 14:55:44',0),(33,1,2,1000.00,'2026-09-29 14:55:44',0),(34,2,1,1000.00,'2026-09-29 14:55:44',0),(35,1,2,2500.00,'2026-09-29 14:55:44',0),(36,2,1,2500.00,'2026-09-29 14:55:44',0),(37,1,2,7000.00,'2026-09-29 14:55:44',1),(38,2,1,7000.00,'2026-09-29 14:55:44',1),(39,1,2,3500.00,'2026-09-29 14:55:44',0),(40,2,1,3500.00,'2026-09-29 14:55:44',0);
/*!40000 ALTER TABLE `transferencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'julio.lima','123456'),(2,'junior.lima','123456');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-29 15:04:09
