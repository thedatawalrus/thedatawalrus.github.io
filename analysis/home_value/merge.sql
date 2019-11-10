USE `zillow`;

select home.*, d.adjClose, s.sp_price
from homeDataV2 as home
left outer join djia as d
on (home.dt = d.dt)
left outer join sp as s
on (home.dt = s.dt)
;


-- insert into homeDataV2
-- select h.*, concat(REPLACE(LTRIM(REPLACE(substr(h.yearMonth,6,2), '0', ' ')), ' ', '0'),"/1/",substr(h.yearMonth,3,2))
-- from homeData h
-- ;