DROP TABLE IF EXISTS djia;
CREATE TABLE  djia (
    dt    	VARCHAR(512),
    open    INT(100) UNSIGNED,
    high      	INT(100) UNSIGNED,
    low           	INT(100) UNSIGNED,
    close           	INT(100) UNSIGNED,
    adjClose           	INT(100) UNSIGNED,
    volume         	INT(100) UNSIGNED
);



LOAD DATA LOCAL INFILE "~/Documents/zillow/DJIA.csv"
INTO TABLE djia
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
;

DROP TABLE IF EXISTS homeData;
CREATE TABLE  homeData (
    region_id      VARCHAR(512),
    zipcode    VARCHAR(512),
    city        VARCHAR(512),
    state            VARCHAR(512),
    metro               VARCHAR(512),
    countyName            VARCHAR(512),
    sizeRank          INT(100) UNSIGNED,
    yearMonth          VARCHAR(512),
    ppsf          INT(100) UNSIGNED
);

LOAD DATA LOCAL INFILE "~/Documents/zillow/transposed_home_zip.csv"
INTO TABLE homeData
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
;

DROP TABLE IF EXISTS sp;
CREATE TABLE  sp (
    dt      VARCHAR(512),
    sp_price    double(10,2) UNSIGNED
);

LOAD DATA LOCAL INFILE "~/Documents/zillow/s_p.csv"
INTO TABLE sp
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
;

DROP TABLE IF EXISTS homeDataV2;
CREATE TABLE  homeDataV2 (
    region_id      VARCHAR(512),
    zipcode    VARCHAR(512),
    city        VARCHAR(512),
    state            VARCHAR(512),
    metro               VARCHAR(512),
    countyName            VARCHAR(512),
    sizeRank          INT(100) UNSIGNED,
    yearMonth          VARCHAR(512),
    ppsf          INT(100) UNSIGNED,
    dt          VARCHAR(512)
);
