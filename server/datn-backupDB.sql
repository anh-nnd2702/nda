-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: ndajobv2
-- ------------------------------------------------------
-- Server version	8.0.31
use ndajobv2;
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
-- Table structure for table `adminacc`
--

DROP TABLE IF EXISTS `adminacc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminacc` (
  `Id` int NOT NULL,
  `adminEmail` varchar(255) NOT NULL,
  `adminPass` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminacc`
--

LOCK TABLES `adminacc` WRITE;
/*!40000 ALTER TABLE `adminacc` DISABLE KEYS */;
/*!40000 ALTER TABLE `adminacc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appliedjob`
--

DROP TABLE IF EXISTS `appliedjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appliedjob` (
  `applyId` int NOT NULL AUTO_INCREMENT,
  `jobId` int NOT NULL,
  `cvId` int NOT NULL,
  `coverLetter` text,
  `applyTime` datetime NOT NULL,
  `applyStatus` int NOT NULL,
  PRIMARY KEY (`applyId`),
  KEY `jobId` (`jobId`),
  KEY `cvId` (`cvId`),
  CONSTRAINT `appliedjob_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `job` (`jobId`),
  CONSTRAINT `appliedjob_ibfk_2` FOREIGN KEY (`cvId`) REFERENCES `cv` (`cvId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliedjob`
--

LOCK TABLES `appliedjob` WRITE;
/*!40000 ALTER TABLE `appliedjob` DISABLE KEYS */;
INSERT INTO `appliedjob` VALUES (1,6,8,'em giỏi lắm hãy nhận em đi','2023-07-08 15:40:12',3),(2,6,9,'em giỏi lắm hãy nhận em đi','2023-07-08 16:50:26',2),(3,3,8,'em giỏi lắm hãy nhận em đi','2023-07-09 06:16:25',1),(4,5,8,'hé lô các anh các chị','2023-07-09 06:31:03',1),(5,9,8,'em làm được việc này đó nha','2023-07-09 06:34:07',1),(6,2,14,'em chào anh chị, em tét zui zui chơi à','2023-07-11 11:07:05',1);
/*!40000 ALTER TABLE `appliedjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar` (
  `candId` int NOT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`candId`),
  CONSTRAINT `fk_candId` FOREIGN KEY (`candId`) REFERENCES `candidates` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar`
--

LOCK TABLES `avatar` WRITE;
/*!40000 ALTER TABLE `avatar` DISABLE KEYS */;
INSERT INTO `avatar` VALUES (13,'https://res.cloudinary.com/dbnxld9bg/image/upload/v1689320090/datn-nda/nkmbwq5l9jmomgoippwo.jpg'),(16,'https://res.cloudinary.com/dbnxld9bg/image/upload/v1689062524/datn-nda/ij0rtwnrwflmbti3dsg8.png');
/*!40000 ALTER TABLE `avatar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(30) DEFAULT NULL,
  `cityId` int DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isSeeking` tinyint(1) DEFAULT NULL,
  `isAcceptEmail` tinyint(1) DEFAULT NULL,
  `minWage` int DEFAULT NULL,
  `workFieldId` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `workLevelId` int DEFAULT NULL,
  `jobTypeId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `candEmail` (`email`),
  KEY `cityId` (`cityId`),
  KEY `workFieldId` (`workFieldId`),
  KEY `workLevelId` (`workLevelId`),
  KEY `jobTypeId` (`jobTypeId`),
  CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`),
  CONSTRAINT `candidates_ibfk_2` FOREIGN KEY (`workFieldId`) REFERENCES `workfield` (`workFieldId`),
  CONSTRAINT `candidates_ibfk_3` FOREIGN KEY (`workLevelId`) REFERENCES `worklevel` (`workLevelId`),
  CONSTRAINT `candidates_ibfk_4` FOREIGN KEY (`jobTypeId`) REFERENCES `jobtype` (`jobTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (6,'Nguyễn Em Thắng','nvvthang@gmail.com','$2b$10$GZjHSx7CA/ZURtUF7m.XyOMHzIeynZHYEFypbW1Y3EQhr1t.zJYXi',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'Nguyễn Văn A1','nvt1@gmail.com','$2b$10$e3sfOe4x6ImvSWGkzpVJqOxlaAkmcxYmzyfxaHewPcG.PDevzf09O','0123455789',52,1,'2003-11-03',NULL,1,0,2,NULL,NULL,NULL,NULL),(8,'Nguyễn Văn Tét 2','nvt2@gmail.com','$2b$10$gUjmTjJWhmaCRb26wsIf6eKMhVOqMs2W1.c9ioQSM35u7RinQjuMm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'Nguyễn Văn Tét 3','nvt3@gmail.com','$2b$10$avaW1BKeYAAwTbOC39ReSegysk8fMa5ZyRTuhQXB9dN5qYT8YK7aK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'Nguyễn Văn Tét 33','nvt33@gmail.com','$2b$10$Qi8xMGvOxF4tWW9TMUWlZ.weCS4UXGk6gtH6A7DNY67EcP0q1rOE6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'Nguyễn Văn A1','da11@gmail.com','$2b$10$nnF8zNDIiwC7X5jdqEn0aewXyOsLuBSe5Hi/Dr/bkcnd2YlmMLcXi','0123455789',52,1,'2003-11-03',NULL,1,0,2,NULL,0,0,0),(12,'Đức Anh 12','da12@gmail.com','$2b$10$bzwVAQtjARIyDX/hBo64rezNZbNCWO.2jRn7W6JuhOJ/IAKnDfAJm',NULL,0,NULL,NULL,NULL,0,NULL,0,NULL,0,0,0),(13,'Nguyễn Bá Học','bahoc1999@gmail.com','$2b$10$1OAFi98xGPtuCqxdCOypH.fIc.D6Uz9u1IOX2wmuourE64PRaMGlW','0392683826',1,1,'1999-10-20','1st Dai Co Viet Street, Hai Ba Trung',1,1,2,NULL,1,2,1),(14,'Đức Anh 13','da13@gmail.com','$2b$10$vjSKuNmIcyvnNoDtKkIuyOLFG.EZSs2SeqCeMLqixqSCOY/uABwyq',NULL,0,1,NULL,NULL,0,NULL,0,NULL,0,0,0),(15,'Nguyễn Văn A1','anh2702@gmail.com','$2b$10$3aTqhdMh/2rgZuj35vR4Qe9BB2BrVvwkD1DgquJH7FdFCetQddP.S','0123455789',50,0,'2003-11-04','1st Dai Co Viet Street, Hai Ba Trung, Ha Noi',1,0,2,NULL,0,0,0),(16,'Trần Văn Bê','betran123@gmail.com','$2b$10$Uv5v.dVSCs4Y9xkn.z35q.tQHy4Ztj5SOq3nMsYr9lW8Zph8Pi9Pq','0122588799',1,2,'2000-02-27',NULL,1,1,2,NULL,1,2,1),(17,'Trần văn A','atran123@gmail.com','$2b$10$kbAry7xWC8HOe420yUa/UObP3dAGnZNM/P5sxWM3bNV8S.w2DNNJm',NULL,0,NULL,NULL,NULL,0,NULL,0,NULL,0,0,0);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `cityId` int NOT NULL,
  `cityName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (0,'Tất cả'),(1,'Hà Nội'),(2,'Hà Giang'),(3,'Cao Bằng'),(4,'Bắc Kạn'),(5,'Tuyên Quang'),(6,'Lào Cai'),(7,'Điện Biên'),(8,'Lai Châu'),(9,'Sơn La'),(10,'Yên Bái'),(11,'Hoà Bình'),(12,'Thái Nguyên'),(13,'Lạng Sơn'),(14,'Quảng Ninh'),(15,'Bắc Giang'),(16,'Phú Thọ'),(17,'Vĩnh Phúc'),(18,'Bắc Ninh'),(19,'Hải Dương'),(20,'Hải Phòng'),(21,'Hưng Yên'),(22,'Thái Bình'),(23,'Hà Nam'),(24,'Nam Định'),(25,'Ninh Bình'),(26,'Thanh Hóa'),(27,'Nghệ An'),(28,'Hà Tĩnh'),(29,'Quảng Bình'),(30,'Quảng Trị'),(31,'Thừa Thiên Huế'),(32,'Đà Nẵng'),(33,'Quảng Nam'),(34,'Quảng Ngãi'),(35,'Bình Định'),(36,'Phú Yên'),(37,'Khánh Hòa'),(38,'Ninh Thuận'),(39,'Bình Thuận'),(40,'Kon Tum'),(41,'Gia Lai'),(42,'Đắk Lắk'),(43,'Đắk Nông'),(44,'Lâm Đồng'),(45,'Bình Phước'),(46,'Tây Ninh'),(47,'Bình Dương'),(48,'Đồng Nai'),(49,'Bà Rịa - Vũng Tàu'),(50,'Thành phố Hồ Chí Minh'),(51,'Long An'),(52,'Tiền Giang'),(53,'Bến Tre'),(54,'Trà Vinh'),(55,'Vĩnh Long'),(56,'Đồng Tháp'),(57,'An Giang'),(58,'Kiên Giang'),(59,'Cần Thơ'),(60,'Hậu Giang'),(61,'Sóc Trăng'),(62,'Bạc Liêu'),(63,'Cà Mau');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `companyAddress` varchar(255) DEFAULT NULL,
  `companyIntro` text,
  `companyPhone` varchar(30) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `companyLogo` varchar(255) NOT NULL DEFAULT 'https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',
  `companyLink` varchar(255) DEFAULT NULL,
  `companyPass` varchar(255) NOT NULL,
  `companyLicense` binary(1) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `cityId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `companyName` (`companyName`),
  UNIQUE KEY `companyEmail` (`email`),
  KEY `cityId` (`cityId`),
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Công ty abc',NULL,NULL,NULL,'abccongty@gmail.com','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$MB3zu.4Fcmo5czXVrzu7N.OvIHeQpLl2nZDtY8uEnXP86cBgWSD0m',NULL,1,0),(2,'Công ty abc1','Hai Bà Trưng',NULL,NULL,'abccongty1@gmail.com','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$SaPieEqrq5E4hP6CK/4Mm.YrDHbhhfiCgyTGAo9JPewPuo08ulrOK',NULL,1,3),(3,'Công ty abc5','Tổ 3 Thành phố Cao Bằng','Công ty xịn lắm',NULL,'abccongty5@gmail.com','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689265894/datn-nda/lonhldqgp48gfj6hkr60.png','http://example.com','$2b$10$wjGlXtuUg8Ow96ItEixzJu5ZwFz2HO3YZEP2MkZHh63hWDY6Hmfda',NULL,1,3),(4,'Công ty abc6','Cầu giấy',NULL,NULL,'abccongty6@gmail.com','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$R786jd9Vf.sjIanlD57Vnel8et7AQuG4o2XHxY6y6P8XyWicyQ//e',NULL,1,37),(5,'Công ty abc7','Cầu giấy',NULL,NULL,'abccongty7@gmail.com','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$HCrrpGgKAl0Wme20QOA6A.PbsCUSkL/sRJrbnhAzTEKnflHaGhK1a',NULL,1,34),(6,'Công ty abc 888','Số 2 Lê Thanh Nghị, Hai Bà Trưng',NULL,NULL,'abccongty8@gmail.com','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$Q6hrrPjfwcHMndZP7gMdtO/5GynLbiyDlshD.GV5MUaCdyAt6Yv0O',NULL,1,1),(7,'àas',NULL,NULL,NULL,'abccongty5@gmail.co','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$SF7TtBTW55Y/vP5A6fdmZ.g8TYK/cj3HCaikVotJxMCRq/VmDzXqW',NULL,1,0),(8,'Trần văn Tạ',NULL,NULL,NULL,'tatv@gmail.com','https://drive.google.com/uc?export=view&id=1WaXr3NCH6M8_xdwwwYiNNXpgvoMjlFTl',NULL,'$2b$10$sM7rVbnyZt94rwJNN2TdWu21CgiGS3s2RGkM0jTTJj4bE/bWUk.Y2',NULL,1,0);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv`
--

DROP TABLE IF EXISTS `cv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cv` (
  `cvId` int NOT NULL AUTO_INCREMENT,
  `cvTitle` varchar(255) NOT NULL,
  `candId` int NOT NULL,
  `cvPosition` varchar(100) DEFAULT NULL,
  `workFieldId` int NOT NULL,
  `cvIntro` text NOT NULL,
  `modifiedDate` datetime NOT NULL,
  `isMainCv` tinyint(1) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(100) NOT NULL,
  `cityId` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cvImgUrl` varchar(255) DEFAULT NULL,
  `gender` tinyint NOT NULL,
  `dateOfBirth` date NOT NULL,
  PRIMARY KEY (`cvId`),
  KEY `candId` (`candId`),
  KEY `workFieldId` (`workFieldId`),
  KEY `cv_ibfk_3_idx` (`cityId`),
  CONSTRAINT `cv_ibfk_1` FOREIGN KEY (`candId`) REFERENCES `candidates` (`Id`),
  CONSTRAINT `cv_ibfk_2` FOREIGN KEY (`workFieldId`) REFERENCES `workfield` (`workFieldId`),
  CONSTRAINT `cv_ibfk_3` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv`
--

LOCK TABLES `cv` WRITE;
/*!40000 ALTER TABLE `cv` DISABLE KEYS */;
INSERT INTO `cv` VALUES (4,'Cv thứ 455 của tôi',11,'Phó giám đốc abc',28,'Là một nhân viên abc có kỹ năng xyz, khả năng học hỏi và chịu áp lực tốt','2023-07-04 00:00:00',0,'Nguyễn Văn B','anh27022000@gmail.com','0392683827',0,NULL,NULL,0,'0000-00-00'),(5,'Cv thứ 4 của tôi',11,'Giám đốc abc',25,'Là một nhân viên abc có kỹ năng xyz, khả năng học hỏi và chịu áp lực tốt','2023-07-03 00:00:00',1,'Nguyễn Văn A','nva@gmail.com','0392683826',0,NULL,NULL,0,'0000-00-00'),(6,'Cv thứ 444 của tôi',11,'Giám đốc abc',25,'Là một nhân viên abc có kỹ năng xyz, khả năng học hỏi và chịu áp lực tốt','2023-07-04 00:00:00',0,'Nguyễn Văn A','nva@gmail.com','0392683826',0,NULL,NULL,0,'0000-00-00'),(7,'Cv thứ 444 của tôi',13,'Giám đốc abc',25,'Là một nhân viên abc có kỹ năng xyz, khả năng học hỏi và chịu áp lực tốt','2023-07-11 00:00:00',1,'Nguyễn Văn A','nva@gmail.com','0392683826',1,NULL,'https://res.cloudinary.com/dbnxld9bg/image/upload/v1689050182/datn-nda/kocawqboynqmjwsv6mso.png',1,'2000-02-27'),(8,'Cv đầu tiên của em',16,'Thực tập sinh It',1,'Là một sinh viên IT mới ra trường với khả năng học hỏi nhanh nhẹn và có thể làm việc dưới áp lực tốt','2023-07-07 00:00:00',0,'Trần văn Bê','betran123@gmail.com','0392683826',1,NULL,NULL,0,'0000-00-00'),(9,'Cv đầu tiên của em',16,'Thực tập sinh It',1,'Là một sinh viên IT mới ra trường với khả năng học hỏi nhanh nhẹn và có thể làm việc dưới áp lực tốt','2023-07-07 00:00:00',1,'Trần văn Bê','betran123@gmail.com','0392683826',1,NULL,NULL,0,'0000-00-00'),(10,'Đây là Cv của em để ứng tuyển nhân viên sale',16,'Nhân viên bán hàng',2,'Là một nhân viên kinh doanh với 2 năm kinh nghiệm bán hàng và marketing, với sự tận tụy, nhiệt huyết và sẵn sàng thích nghi với môi trường làm việc có áp lực cao. Đã tiếp xúc với nhiều khách hàng cá nhân và doanh nghiệp khi bán hàng và tiếp thị cho các sản phẩm phần mềm.','2023-07-11 00:00:00',0,'Trần Văn Bê','betran123@gmail.com','0392672722',1,NULL,'https://res.cloudinary.com/dbnxld9bg/image/upload/v1689062524/datn-nda/ij0rtwnrwflmbti3dsg8.png',1,'2000-02-27'),(11,'Đây là Cv của em để ứng tuyển nhân viên sale',16,'Nhân viên bán hàng',2,'Là một nhân viên kinh doanh với 2 năm kinh nghiệm bán hàng và marketing, với sự tận tụy, nhiệt huyết và sẵn sàng thích nghi với môi trường làm việc có áp lực cao. Đã tiếp xúc với nhiều khách hàng cá nhân và doanh nghiệp khi bán hàng và tiếp thị cho các sản phẩm phần mềm.','2023-07-11 00:00:00',0,'Trần Văn Bê','betran123@gmail.com','0392672722',1,'12 Trần khát Chân, Hai bà Trưng','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689062524/datn-nda/ij0rtwnrwflmbti3dsg8.png',1,'2000-02-27'),(12,'Đây là Cv của em để ứng tuyển nhân viên abc xyz',16,'Nhân viên ABC',9,'Em là một nhân viên cần cù lắm','2023-07-11 00:00:00',0,'Trần Văn Bê','betran123@gmail.com','0328881444',1,'Hai bà Trưng','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689062524/datn-nda/ij0rtwnrwflmbti3dsg8.png',2,'2000-02-27'),(13,'em tét thôi',16,'Thực tập sinh It',0,'em tét','2023-07-11 00:00:00',0,'Trần Văn Bê','betran123@gmail.com','0999322899',1,'19 Đại Cồ việt','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689062524/datn-nda/ij0rtwnrwflmbti3dsg8.png',2,'2000-02-27'),(14,'Cv này em tét nha',16,'Thực tập sinh tét tơ này',1,'em tét này là nhiều lần rồi nha','2023-07-11 00:00:00',0,'Trần Văn Bê 11','betran123@gmail.com','0999322898',1,'19 Đại Cồ việt- hai bà trưng','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689073498/datn-nda/ujx2jsg2wwehwcmjjj7q.png',2,'2000-02-27'),(15,'Này em test phát nữa này',16,'Nhân viên bán hàng hót hót hót',2,'Em là một con người rất chăm ngoan','2023-07-11 00:00:00',0,'Trần Văn Bê','betran123@gmail.com','0989262667',1,'Hai bà Trưng','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689062524/datn-nda/ij0rtwnrwflmbti3dsg8.png',2,'2000-02-27'),(16,'Cv đầu tiên của em tét lần thứ n',16,'Thực tập sinh It tét tơ téc đíc',1,'Hố lé','2023-07-11 14:14:48',0,'Trần Văn Bê','betran123@gmail.com','0123456789',1,'Hé lô','https://res.cloudinary.com/dbnxld9bg/image/upload/v1689084889/datn-nda/ep6fqw6vc1jedx83hj3w.jpg',2,'2000-02-27');
/*!40000 ALTER TABLE `cv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cvcertificate`
--

DROP TABLE IF EXISTS `cvcertificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cvcertificate` (
  `certId` int NOT NULL AUTO_INCREMENT,
  `cvId` int NOT NULL,
  `certTitle` varchar(255) NOT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `certDate` date NOT NULL,
  `expireDate` date DEFAULT NULL,
  `certDescribe` text,
  PRIMARY KEY (`certId`),
  KEY `cvId` (`cvId`),
  CONSTRAINT `cvcertificate_ibfk_1` FOREIGN KEY (`cvId`) REFERENCES `cv` (`cvId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cvcertificate`
--

LOCK TABLES `cvcertificate` WRITE;
/*!40000 ALTER TABLE `cvcertificate` DISABLE KEYS */;
INSERT INTO `cvcertificate` VALUES (6,8,'Toeic 770','Viện ngoại ngữ- Đại học Bách Khoa Hà Nội','2021-08-29','2023-08-29','Chứng chỉ Toeic nội bộ'),(7,9,'Toeic 770','Viện ngoại ngữ- Đại học Bách Khoa Hà Nội','2021-08-29','2023-08-29','Chứng chỉ Toeic nội bộ'),(8,10,'IELTS','IIG','2023-06-28','2025-06-28',''),(9,11,'IELTS','IIG','2023-06-28','2025-06-28','');
/*!40000 ALTER TABLE `cvcertificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cveducation`
--

DROP TABLE IF EXISTS `cveducation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cveducation` (
  `eduId` int NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(255) NOT NULL,
  `cvId` int NOT NULL,
  `major` varchar(150) DEFAULT NULL,
  `eduLevelId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `eduDescribe` text,
  PRIMARY KEY (`eduId`),
  KEY `cvId` (`cvId`),
  KEY `eduLevelId` (`eduLevelId`),
  CONSTRAINT `cveducation_ibfk_1` FOREIGN KEY (`cvId`) REFERENCES `cv` (`cvId`),
  CONSTRAINT `cveducation_ibfk_2` FOREIGN KEY (`eduLevelId`) REFERENCES `educationlevel` (`eduLevelId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cveducation`
--

LOCK TABLES `cveducation` WRITE;
/*!40000 ALTER TABLE `cveducation` DISABLE KEYS */;
INSERT INTO `cveducation` VALUES (3,'Đại học Bách Khoa Hà Nội',4,'Khoa học máy tính',3,'2018-08-01','2023-08-01',NULL),(4,'Đại học Bách Khoa Hà Nội',5,'Khoa học máy tính',3,'2018-08-01','2023-08-01',NULL),(7,'Đại học Bách Khoa Hà Nội',6,'Khoa học máy tính',3,'2018-08-01','2023-08-01',NULL),(8,'Đại học Bách Khoa Hà Nội',7,'Khoa học máy tính',3,'2018-08-01','2023-08-01',NULL),(9,'Đại học Bách Khoa Hà Nội',8,'Công nghệ thông tin',3,'2018-08-20','2023-07-20','Chuyên ngành Khoa học máy tính- hệ kỹ sư'),(10,'Đại học Bách Khoa Hà Nội',9,'Công nghệ thông tin',3,'2018-08-20','2023-07-20','Chuyên ngành Khoa học máy tính- hệ kỹ sư'),(11,'Đại học Kinh tế Quốc dân',10,'Kinh tế đầu tư',3,'2018-08-20','2022-06-30','Cử nhân ngành kinh tế đầu tư- Đại học Kinh tế Quốc dân'),(12,'Đại học Kinh tế Quốc dân',11,'Kinh tế đầu tư',3,'2018-08-20','2022-06-30','Cử nhân ngành kinh tế đầu tư- Đại học Kinh tế Quốc dân'),(13,'đại học ngoại thương',15,'abc',3,'2018-08-28','2022-07-27','em học giỏi lắm á');
/*!40000 ALTER TABLE `cveducation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cvexperience`
--

DROP TABLE IF EXISTS `cvexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cvexperience` (
  `experId` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `cvId` int NOT NULL,
  `position` varchar(100) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `experDescribe` text,
  PRIMARY KEY (`experId`),
  KEY `cvId` (`cvId`),
  CONSTRAINT `cvexperience_ibfk_1` FOREIGN KEY (`cvId`) REFERENCES `cv` (`cvId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cvexperience`
--

LOCK TABLES `cvexperience` WRITE;
/*!40000 ALTER TABLE `cvexperience` DISABLE KEYS */;
INSERT INTO `cvexperience` VALUES (3,'Công ty cổ phần OOOBBB',4,'Thực tập sinh software','2022-11-01','2023-01-25',NULL),(4,'Công ty cổ phần OOOBBB',5,'Thực tập sinh software','2022-11-01','2023-01-25',NULL),(5,'Công ty cổ phần OOOBBB',6,'Thực tập sinh software','2022-11-01','2023-01-25',NULL),(6,'Công ty cổ phần OOOBBB',7,'Thực tập sinh software','2022-11-01','2023-01-25',NULL),(7,'Công ty cổ phần công nghệ ABC',8,'Thực tập sinh','2022-11-01','2023-01-15',NULL),(8,'Công ty cổ phần Giải pháp Công nghệ ABC',10,'Nhân viên Kinh doanh','2021-03-30','2021-03-30',NULL),(9,'Công ty cổ phần Giải pháp Công nghệ ABC',11,'Nhân viên Kinh doanh','2021-03-30','2021-03-30',NULL);
/*!40000 ALTER TABLE `cvexperience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cvproject`
--

DROP TABLE IF EXISTS `cvproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cvproject` (
  `prjId` int NOT NULL AUTO_INCREMENT,
  `prjName` varchar(255) NOT NULL,
  `cvId` int NOT NULL,
  `teamSize` int DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `prjPosition` varchar(100) DEFAULT NULL,
  `prjDescribe` text,
  PRIMARY KEY (`prjId`),
  KEY `cvId` (`cvId`),
  CONSTRAINT `cvproject_ibfk_1` FOREIGN KEY (`cvId`) REFERENCES `cv` (`cvId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cvproject`
--

LOCK TABLES `cvproject` WRITE;
/*!40000 ALTER TABLE `cvproject` DISABLE KEYS */;
INSERT INTO `cvproject` VALUES (5,'project 1',4,4,'2020-09-03','2020-12-02','nhóm trưởng','project trang web bán hàng online'),(6,'project 2',4,2,'2022-11-03','2023-01-12','Lập trình front-end','project trang web tin tức world cup'),(7,'project 1',5,4,'2020-09-03','2020-12-02','nhóm trưởng','project trang web bán hàng online'),(8,'project 2',5,2,'2022-11-03','2023-01-12','Lập trình front-end','project trang web tin tức world cup'),(9,'project 1',6,4,'2020-09-03','2020-12-02','nhóm trưởng','project trang web bán hàng online'),(10,'project 2',6,2,'2022-11-03','2023-01-12','Lập trình front-end','project trang web tin tức world cup'),(11,'project 1',7,4,'2020-09-03','2020-12-02','nhóm trưởng','project trang web bán hàng online'),(12,'project 2',7,2,'2022-11-03','2023-01-12','Lập trình front-end','project trang web tin tức world cup'),(13,'Đồ án 1',8,3,'2020-11-11','2021-02-20','Lập trình Frontend','Xây dựng trang web bán hàng online'),(14,'Đồ án tốt nghiệp',8,1,'2023-03-20','2023-07-11','Lập trình web full stack','Xây dựng trang web tìm kiếm việc làm với NodeJs, ReactJs, Mysql và Azure ws'),(15,'Đồ án 1',9,3,'2020-11-11','2021-02-20','Lập trình Frontend','Xây dựng trang web bán hàng online'),(16,'Đồ án tốt nghiệp',9,1,'2023-03-20','2023-07-11','Lập trình web full stack','Xây dựng trang web tìm kiếm việc làm với NodeJs, ReactJs, Mysql và Azure ws'),(17,'Dự án triển khai phần mềm quản lý lớp học đến các trường học miền trung',10,12,'2023-03-01','2023-03-01','Thành viên- Nhóm chăm sóc và tư vấn khách hàng',''),(18,'Dự án triển khai phần mềm quản lý lớp học đến các trường học miền trung',11,12,'2023-03-01','2023-03-01','Thành viên- Nhóm chăm sóc và tư vấn khách hàng','');
/*!40000 ALTER TABLE `cvproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cvskill`
--

DROP TABLE IF EXISTS `cvskill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cvskill` (
  `skillId` int NOT NULL AUTO_INCREMENT,
  `cvId` int NOT NULL,
  `skillName` varchar(100) NOT NULL,
  `skillLevel` int NOT NULL,
  `skillDescribe` text,
  PRIMARY KEY (`skillId`),
  KEY `cvId` (`cvId`),
  CONSTRAINT `cvskill_ibfk_1` FOREIGN KEY (`cvId`) REFERENCES `cv` (`cvId`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cvskill`
--

LOCK TABLES `cvskill` WRITE;
/*!40000 ALTER TABLE `cvskill` DISABLE KEYS */;
INSERT INTO `cvskill` VALUES (10,4,'Nodejs',3,NULL),(12,4,'MySql',4,NULL),(14,4,'OOP & OOAD',5,NULL),(15,5,'Nodejs',5,NULL),(16,5,'ReactJs',4,NULL),(17,5,'MySql',4,NULL),(18,5,'Data structure & algorithm',3,NULL),(19,5,'OOP & OOAD',5,NULL),(20,4,'PHP Laravel',5,NULL),(22,4,'MongoDB',5,NULL),(23,6,'Nodejs',5,NULL),(24,6,'ReactJs',4,NULL),(25,6,'MySql',4,NULL),(26,6,'Data structure & algorithm',3,NULL),(27,6,'OOP & OOAD',5,NULL),(28,7,'Nodejs',5,NULL),(29,7,'ReactJs',4,NULL),(30,7,'MySql',4,NULL),(31,7,'Data structure & algorithm',3,NULL),(32,7,'OOP & OOAD',5,NULL),(33,8,'NodeJs',4,''),(34,8,'Php',3,''),(35,8,'Mysql',5,''),(36,8,'ReactJs',4,''),(37,9,'NodeJs',4,''),(38,9,'Php',3,''),(39,9,'Mysql',5,''),(40,9,'ReactJs',4,''),(41,10,'Tin học văn phòng',5,'Sử dụng thành thạo bộ công cụ: Excel, Word, PowerPoint'),(42,10,'Xử lý vấn đề với khách hàng',4,''),(43,10,'Lập kế hoạch',3,''),(44,10,'Giao tiếp và làm việc nhóm',4,''),(45,11,'Tin học văn phòng',5,'Sử dụng thành thạo bộ công cụ: Excel, Word, PowerPoint'),(46,11,'Xử lý vấn đề với khách hàng',4,''),(47,11,'Lập kế hoạch',3,''),(48,11,'Giao tiếp và làm việc nhóm',4,'');
/*!40000 ALTER TABLE `cvskill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educationlevel`
--

DROP TABLE IF EXISTS `educationlevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educationlevel` (
  `eduLevelId` int NOT NULL,
  `eduLevelName` varchar(100) NOT NULL,
  PRIMARY KEY (`eduLevelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educationlevel`
--

LOCK TABLES `educationlevel` WRITE;
/*!40000 ALTER TABLE `educationlevel` DISABLE KEYS */;
INSERT INTO `educationlevel` VALUES (0,'Tất cả'),(1,'Phổ thông'),(2,'Cao đẳng'),(3,'Đại học'),(4,'Trên đại học');
/*!40000 ALTER TABLE `educationlevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `jobId` int NOT NULL AUTO_INCREMENT,
  `jobTitle` varchar(255) NOT NULL,
  `companyId` int NOT NULL,
  `workAddress` varchar(255) NOT NULL,
  `modifiedTime` datetime NOT NULL,
  `cityId` int NOT NULL,
  `jobDescribe` text NOT NULL,
  `eduLevelId` int NOT NULL,
  `jobTypeId` int NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `expireDate` date NOT NULL,
  `genderRequire` tinyint DEFAULT NULL,
  `workLevelId` int NOT NULL,
  `minWage` int DEFAULT NULL,
  `maxWage` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `hireCount` int DEFAULT NULL,
  `workFieldId` int NOT NULL,
  `jobRequire` text,
  `jobBenefit` text,
  PRIMARY KEY (`jobId`),
  KEY `companyId` (`companyId`),
  KEY `cityId` (`cityId`),
  KEY `eduLevelId` (`eduLevelId`),
  KEY `jobTypeId` (`jobTypeId`),
  KEY `workLevelId` (`workLevelId`),
  KEY `workFieldId` (`workFieldId`),
  CONSTRAINT `job_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `company` (`Id`),
  CONSTRAINT `job_ibfk_2` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`),
  CONSTRAINT `job_ibfk_3` FOREIGN KEY (`eduLevelId`) REFERENCES `educationlevel` (`eduLevelId`),
  CONSTRAINT `job_ibfk_4` FOREIGN KEY (`jobTypeId`) REFERENCES `jobtype` (`jobTypeId`),
  CONSTRAINT `job_ibfk_5` FOREIGN KEY (`workLevelId`) REFERENCES `worklevel` (`workLevelId`),
  CONSTRAINT `job_ibfk_6` FOREIGN KEY (`workFieldId`) REFERENCES `workfield` (`workFieldId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'Việc làm số 1',4,'Số 1 đại cồ việt','2023-06-25 10:57:30',1,'thực hiện các yêu cầu ba ba ba',3,2,0,'2023-09-07',NULL,2,1,NULL,0,20,10,NULL,NULL),(2,'Việc làm số 2',4,'Số 1 đại cồ việt','2023-06-25 08:50:08',1,'thực hiện các yêu cầu ba ba ba',3,2,1,'2023-09-07',NULL,2,0,NULL,0,10,20,NULL,NULL),(3,'Việc làm số 03',4,'Số 59 Giải phóng','2023-06-26 03:41:01',1,'thực hiện các yêu cầu ba ba ba',3,2,1,'2023-09-07',NULL,2,1,NULL,0,20,10,NULL,NULL),(4,'Việc làm số 004',4,'Số 1 đại cồ việt','2023-06-26 03:39:56',1,'thực hiện các yêu cầu ba ba ba',3,2,1,'2023-09-07',NULL,2,1,NULL,0,20,10,NULL,NULL),(5,'Việc làm số 5',4,'Số 1 đại cồ việt','2023-06-26 02:04:05',1,'thực hiện các yêu cầu ba ba ba',3,2,1,'2023-09-07',NULL,2,0,NULL,0,10,20,NULL,NULL),(6,'Việc làm số 999',3,'Tổ 3 Thành phố Cao Bằng','2023-07-14 03:52:09',3,'thực hiện các yêu cầu về abc xyz',3,1,1,'2023-09-07',NULL,2,1,NULL,1,20,10,'helo','helo'),(7,'Việc làm số 777',3,'Số 1 đại cồ việt','2023-07-01 14:17:30',1,'thực hiện các yêu cầu về abc xyz',3,1,1,'2023-07-13',NULL,2,5,NULL,1,11,22,NULL,NULL),(9,'Tuyển thành viên abc telesale',3,'Số 22 Lê Thanh Nghị, Hai Bà Trưng','2023-07-08 04:53:54',1,'Thực hiện các công việc telesale và chăm sóc kh, tìm kiếm kh tiềm năng và nhiều thứ liên quan đến bán hàng, sale và marketing',3,1,1,'2023-07-31',1,2,10,24,2,0,2,'Tốt nghiệp đại học về kinh tế, kinh doanh và liên quan\nnhanh nhẹn, chịu áp lực tốt, chấp nhận làm tăng ca','Lương cứng + hoa hồng\nteam building thường xuyên, thưởng quý, thưởng năm\nĐược đảm bảo đóng bảo hiểm và khám sức khỏe định kì'),(10,'Tuyển nhân viên chữa cháy',3,'Tổ 3 Thành phố Cao Bằng','2023-07-14 02:10:29',3,'Chữa cháy nhà bếp khi cần',1,1,1,'2023-08-30',2,2,8,8,3,2,23,'Có kinh nghiệm 3 năm chữa cháy','Lương cứng 8 triệu + thưởng 500 nghìn cho mỗi pha chữa cháy kịp thời');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobtype`
--

DROP TABLE IF EXISTS `jobtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobtype` (
  `jobTypeId` int NOT NULL,
  `jobTypeName` varchar(100) NOT NULL,
  PRIMARY KEY (`jobTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobtype`
--

LOCK TABLES `jobtype` WRITE;
/*!40000 ALTER TABLE `jobtype` DISABLE KEYS */;
INSERT INTO `jobtype` VALUES (0,'Tất cả'),(1,'Toàn thời gian'),(2,'Bán thời gian'),(3,'Tự do'),(4,'Thực tập');
/*!40000 ALTER TABLE `jobtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchjob`
--

DROP TABLE IF EXISTS `matchjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchjob` (
  `matchId` int NOT NULL AUTO_INCREMENT,
  `jobId` int NOT NULL,
  `candId` int NOT NULL,
  PRIMARY KEY (`matchId`),
  KEY `jobId` (`jobId`),
  KEY `candId` (`candId`),
  CONSTRAINT `matchjob_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `job` (`jobId`),
  CONSTRAINT `matchjob_ibfk_2` FOREIGN KEY (`candId`) REFERENCES `candidates` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchjob`
--

LOCK TABLES `matchjob` WRITE;
/*!40000 ALTER TABLE `matchjob` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportjob`
--

DROP TABLE IF EXISTS `reportjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportjob` (
  `reportId` int NOT NULL AUTO_INCREMENT,
  `candId` int NOT NULL,
  `jobId` int NOT NULL,
  `reportDescribe` text,
  `reportTime` datetime NOT NULL,
  `reportStatus` tinyint(1) NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `candId` (`candId`),
  KEY `jobId` (`jobId`),
  CONSTRAINT `reportjob_ibfk_1` FOREIGN KEY (`candId`) REFERENCES `candidates` (`Id`),
  CONSTRAINT `reportjob_ibfk_2` FOREIGN KEY (`jobId`) REFERENCES `job` (`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportjob`
--

LOCK TABLES `reportjob` WRITE;
/*!40000 ALTER TABLE `reportjob` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedjob`
--

DROP TABLE IF EXISTS `savedjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savedjob` (
  `savedJobId` int NOT NULL AUTO_INCREMENT,
  `jobId` int NOT NULL,
  `candId` int NOT NULL,
  `savedTime` datetime NOT NULL,
  PRIMARY KEY (`savedJobId`),
  KEY `jobId` (`jobId`),
  KEY `candId` (`candId`),
  CONSTRAINT `savedjob_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `job` (`jobId`),
  CONSTRAINT `savedjob_ibfk_2` FOREIGN KEY (`candId`) REFERENCES `candidates` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedjob`
--

LOCK TABLES `savedjob` WRITE;
/*!40000 ALTER TABLE `savedjob` DISABLE KEYS */;
INSERT INTO `savedjob` VALUES (10,9,7,'2023-07-09 08:48:51'),(12,5,7,'2023-07-09 08:54:04'),(22,4,16,'2023-07-13 11:15:01');
/*!40000 ALTER TABLE `savedjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workfield`
--

DROP TABLE IF EXISTS `workfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workfield` (
  `workFieldId` int NOT NULL,
  `workFieldName` varchar(255) NOT NULL,
  PRIMARY KEY (`workFieldId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workfield`
--

LOCK TABLES `workfield` WRITE;
/*!40000 ALTER TABLE `workfield` DISABLE KEYS */;
INSERT INTO `workfield` VALUES (0,'Tất cả ngành nghề'),(1,'IT-Phần mềm'),(2,'Kinh doanh-Bán hàng'),(3,'Tài chính - Ngân hàng'),(4,'Marketing'),(5,'Y tế'),(6,'Giáo dục'),(7,'Xây dựng'),(8,'Du lịch'),(9,'Thiết kế đồ họa'),(10,'Nghệ thuật/Điện ảnh'),(11,'Thể thao'),(12,'Báo chí'),(13,'Môi trường'),(14,'Luật'),(15,'Thương mại'),(16,'Nông nghiệp'),(17,'Công nghiệp'),(18,'Điện'),(19,'Thực phẩm'),(20,'Địa chất/Khoáng sản'),(21,'An toàn lao động'),(22,'Bảo hiểm'),(23,'Bảo trì- Sửa chữa'),(24,'Bất động sản'),(25,'Phiên dịch'),(26,'Điện tử'),(27,'Bưu chính-Viễn thông'),(28,'IT-Phần cứng'),(29,'Công nghệ Ô tô'),(30,'Dầu khí/Hóa chất'),(31,'Dệt may/Da giày'),(32,'Thiết kế thời trang'),(33,'Sáng tạo nội dung'),(34,'Chăm sóc khách hàng'),(35,'Điện tử Viễn thông'),(36,'Dược phẩm'),(37,'Vật liệu'),(38,'Giáo dục-Đào tạo'),(39,'Hàng hải'),(40,'Hàng không-Vũ trụ'),(41,'Vận tải'),(42,'Hành chính-Văn phòng'),(43,'Kế toán'),(44,'Kiểm toán'),(45,'Quản lý điều hành'),(46,'Hoạch định/Dự án'),(47,'Nhân sự'),(48,'Kiến trúc'),(49,'Logistic'),(50,'Mỹ phẩm/Trang sức'),(51,'Kiểm định chất lượng'),(52,'Tài chính/Đầu tư'),(53,'Spa/Làm đẹp'),(54,'Thư ký/Trợ lý'),(55,'Xuất nhập khẩu'),(56,'Tư vấn'),(57,'Tuyển dụng'),(58,'Sales/Bán hàng'),(59,'Biên tập/Xuất bản'),(60,'Thiết kế nội thất'),(61,'Tổ chức sự kiện'),(62,'Quay phim-Chụp hình');
/*!40000 ALTER TABLE `workfield` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worklevel`
--

DROP TABLE IF EXISTS `worklevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worklevel` (
  `workLevelId` int NOT NULL,
  `workLevelName` varchar(100) NOT NULL,
  PRIMARY KEY (`workLevelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worklevel`
--

LOCK TABLES `worklevel` WRITE;
/*!40000 ALTER TABLE `worklevel` DISABLE KEYS */;
INSERT INTO `worklevel` VALUES (0,'Tất cả'),(1,'Thực tập sinh'),(2,'Nhân viên'),(3,'Trưởng nhóm'),(4,'Trưởng/Phó chi nhánh'),(5,'Trưởng/Phó phòng'),(6,'Phó giám đốc'),(7,'Giám đốc');
/*!40000 ALTER TABLE `worklevel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-14 14:55:59
