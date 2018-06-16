LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (11,'root','e10adc3949ba59abbe56e057f20f883e',1),(15,'internal','e10adc3949ba59abbe56e057f20f883e',2),(16,'external','e10adc3949ba59abbe56e057f20f883e',3),(17,'root2','e10adc3949ba59abbe56e057f20f883e',1),(18,'xiaohong','e2649675dcb08ccde2853ca7ea87422d',2),(19,'ZHAO TINGTING','e4c30cacb958bce8e6a897d48e2a0a49',2),(20,'wenchuchun','7521599d84db44ef664c72ecb9b16176',2);
UNLOCK TABLES;

LOCK TABLES `reporters` WRITE;
INSERT INTO `reporters` (`value`) VALUES ('Lai Yingsi'),('Du Zhiheng'),('Huang Yun'),('Wang Xinwei'),('He Wenjun'),('Dai Bofeng'),('Huang Xiaohong');
UNLOCK TABLES;

LOCK TABLES `countries` WRITE;
INSERT INTO `countries` (`value`) VALUES ('China'),('Myanmar'),('Cambodia'),('Indonesia'),('Laos'),('Malaysia'),('Philippines'),('Thailand'),('Vietnam'),('India'),('Bangladesh'),('Bhutan'),('Nepal'),('Pakistan');
UNLOCK TABLES;

LOCK TABLES `categories` WRITE;
INSERT INTO `categories` (`value`) VALUES ('peer-review literature'),('working report'),('thesis'),('personal communication'),('other database'),('others');
UNLOCK TABLES;

LOCK TABLES `disease_types` WRITE;
INSERT INTO `disease_types` (`value`) VALUES ('Ascaris lumbricoides'),('Trichuris trichiura'),('hookworm'),('Necator americanus'),('Ancylostoma duodenale'),('Dengue'),('Opisthorchis viverrini'),('Clonorchis sinensis'),('Plasmodium falciparum'),('Plasmodium vivax'),('Plasmodium malariae'),('Plasmodium ovale'),('Plasmodium knowlesi'),('hfmd'),('CA16'),('EV71'),('hfmd_other species'),('others');
UNLOCK TABLES;

LOCK TABLES `reporters` WRITE;
INSERT INTO `reporters` (`value`) VALUES ('NA'),('google map'),('wikimapia'),('GEOnet Names Server'),('GeoPostcodes'),('provided by authors'),('others');
UNLOCK TABLES;
