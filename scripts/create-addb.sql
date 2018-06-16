CREATE DATABASE koa_addb
  CHARACTER SET utf8
  COLLATE utf8_general_ci;

use koa_addb;

-- reports.reporter
DROP TABLE IF EXISTS `reporters`;
CREATE TABLE `reporters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- reports.country
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- reports.category
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- reports.disease
DROP TABLE IF EXISTS `disease_types`;
CREATE TABLE `disease_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- diseases.disease_informations
DROP TABLE IF EXISTS `disease_informations`;
CREATE TABLE `disease_informations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- loactions.geoSource
DROP TABLE IF EXISTS `geo_refs`;
CREATE TABLE `geo_refs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reporterID` int(11) NOT NULL,
  `diseaseID` int(11) NOT NULL,
  `countryID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `journal` varchar(200) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `authors` varchar(200) DEFAULT NULL,
  `yearOfPub` int(11) NOT NULL,
  `volume` int(11) DEFAULT NULL,
  `issue` int(11) DEFAULT NULL,
  `pageFrom` int(11) DEFAULT NULL,
  `pageTo` int(11) DEFAULT NULL,
  `authorContactNeeded` enum('No','Yes','Already') NOT NULL,
  `openAccess` enum('No','Yes') NOT NULL,
  `checked` enum('No','Yes') NOT NULL,
  `note` longtext,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reporterID`) REFERENCES `reporters` (`id`),
  FOREIGN KEY (`diseaseID`) REFERENCES `disease_types` (`id`),
  FOREIGN KEY (`countryID`) REFERENCES `countries` (`id`),
  FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB;


DROP TABLE IF EXISTS `surveys`;
CREATE TABLE `surveys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportID` int(11) NOT NULL,
  `dataType` varchar(45) DEFAULT NULL,
  `surveyType` varchar(45) DEFAULT NULL,
  `monthStart` varchar(45) DEFAULT NULL,
  `monthFinish` varchar(45) DEFAULT NULL,
  `yearStart` varchar(45) DEFAULT NULL,
  `yearFinish` varchar(45) DEFAULT NULL,
  `note` longtext,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reportID`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportID` int(11) NOT NULL,
  `surveyID` int(11) NOT NULL,
  `geoRefID` int(11) NOT NULL,
  `adm1` varchar(45) DEFAULT NULL,
  `adm2` varchar(45) DEFAULT NULL,
  `adm3` varchar(45) DEFAULT NULL,
  `pointName` varchar(45) DEFAULT NULL,
  `pointType` varchar(45) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `note` longtext,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reportID`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`surveyID`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`geoRefID`) REFERENCES `geo_refs` (`id`)
) ENGINE=InnoDB;


DROP TABLE IF EXISTS `diseases`;
CREATE TABLE `diseases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportID` int(11) NOT NULL,
  `surveyID` int(11) NOT NULL,
  `locationID` int(11) NOT NULL,
  `information` varchar(45) DEFAULT NULL,
  `species` varchar(45) NOT NULL,
  `diagnosticSymptoms` varchar(45) DEFAULT NULL,
  `diagnosticBlood` varchar(45) DEFAULT NULL,
  `diagnosticSkin` varchar(45) DEFAULT NULL,
  `diagnosticStool` varchar(45) DEFAULT NULL,
  `numSamples` varchar(45) DEFAULT NULL,
  `numSpecimen` varchar(45) DEFAULT NULL,
  `ageLower` int(11) DEFAULT NULL,
  `ageUpper` int(11) DEFAULT NULL,
  `numExamine` int(11) DEFAULT NULL,
  `numPositive` int(11) DEFAULT NULL,
  `percentPositive` float DEFAULT NULL,
  `numExamineMale` int(11) DEFAULT NULL,
  `numPositiveMale` int(11) DEFAULT NULL,
  `percentPositiveMale` float DEFAULT NULL,
  `numExamineFemale` int(11) DEFAULT NULL,
  `numPositiveFemale` int(11) DEFAULT NULL,
  `percentPositiveFemale` float DEFAULT NULL,
  `note` longtext,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reportID`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`surveyID`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`locationID`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


DROP TABLE IF EXISTS `interventions`;
CREATE TABLE `interventions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportID` int(11) NOT NULL,
  `surveyID` int(11) NOT NULL,
  `locationID` int(11) NOT NULL,
  `diseaseID` int(11) NOT NULL,
  `group` varchar(45) DEFAULT NULL,
  `monthsAfterBaseline` int(11) DEFAULT NULL,
  `drug` varchar(200) DEFAULT NULL,
  `frequency` int(11) DEFAULT NULL,
  `period` int(11) DEFAULT NULL,
  `coverage` float DEFAULT NULL,
  `otherMethods` varchar(400) DEFAULT NULL,
  `numExamine` int(11) DEFAULT NULL,
  `numPositive` int(11) DEFAULT NULL,
  `numExamineMale` int(11) DEFAULT NULL,
  `numPositiveMale` int(11) DEFAULT NULL,
  `numExamineFemale` int(11) DEFAULT NULL,
  `numPositiveFemale` int(11) DEFAULT NULL,
  `percentPositive` float DEFAULT NULL,
  `percentPositiveMale` float DEFAULT NULL,
  `percentPositiveFemale` float DEFAULT NULL,
  `note` longtext,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reportID`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`surveyID`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`locationID`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`diseaseID`) REFERENCES `diseases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `authority` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
