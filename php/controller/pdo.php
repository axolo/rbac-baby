<?php
defined('RBAC') || die(401.3);

$pdo = new PDO("sqlsrv:Server=localhost;Database=AHHKLED", "sa", "google");
$date11 = '2016-09-01';
$date22 = '2016-12-31';
$date1 = '20160901';
$date2 = '20161231';
$sql = "
DECLARE @a date
DECLARE @b date
DECLARE @e int
DECLARE @f int
DECLARE @c int
DECLARE @d char(3)
DECLARE @dssql1 varchar(100)
DECLARE @dssql2 varchar(1000)
DECLARE @dssql3 varchar(2000)
DECLARE @dssql4 varchar(2000)
create TABLE #table1 (TYPEWL varchar(50),YF varchar(50),SHL FLOAT ) 
set @a= '".$date11."'
set @b= '".$date22."'
set @e=0
set @f= datediff(mm,@a,@b)
while @e <=@f
begin 
set @c=1
  while @c<6
  begin
 set @d=(case when @c=1 then 'C-%'   WHEN @c=2 then 'PK%' WHEN @c=3 then 'DY%' WHEN @c=4 then 'XZ%' WHEN @c=5 then 'DT%' end) 
  
 set @dssql1 ='(case when BOMNEW.CB008>0 then BOMNEW.CB008 else ''4'' end)'
 
 set @dssql2=' left join (SELECT BOMMP.CB001,BOMMP.CB005,BOMMP.CB008 FROM BOMCB as BOMMP UNION ALL SELECT BOMLB.CB001, BOMMP.CB005 ,BOMMP.CB008 FROM BOMCB as BOMLB LEFT JOIN BOMCB as BOMMP  ON BOMMP.CB001= BOMLB.CB005 AND BOMLB.CB005 
in (select MB001 from INVMB where MB002 like ''MP-%'')) as BOMNEW on BOMNEW.CB001=TA006 and BOMNEW.CB005 in (select MB001 from INVMB where MB002 like ''' +@d+''')'
  
 set @dssql3 ='insert into  #table1  select '''+@d+''' as TYPEWL,'+CONVERT(varchar(6),@a,112)+' as YF,(1-sum(('+case when @c=1 then @dssql1 else '1' end +')*TA017*TB005/SUMLY)/sum(TB005)) AS  SHL  from MOCTB left join MOCTA on TA001+TA002=TB001+TB002'+( case when @c=1 then @dssql2 else ' ' end )+'left join 
(select TB001 as TJDB,TB002 as TJDH,sum(TB005) as SUMLY from MOCTB 
left join MOCTA on TA001+TA002=TB001+TB002 where  TB003 in (select MB001 from INVMB where MB002 like REPLACE('''+@d+''','' '','''')and TB005>0  )  group by TB001,TB002 ) as TONGJI on TONGJI.TJDB+TONGJI.TJDH=TB001+TB002
where  TB003 in (select MB001 from INVMB where MB002 like REPLACE('''+@d+''','' '',''''))  and TB005>0 and TA011 in (''Y'',''y'') and TA013=''Y''
and TA002 like'''+ CONVERT(varchar(6),@a,112)+'%'''
 set @dssql4 ='insert into  #table1  select '''+@d+''' as TYPEWL,''MAX'' as YF,(1-sum(('+case when @c=1 then @dssql1 else '1' end +')*TA017*TB005/SUMLY)/sum(TB005)) AS  SHL  from MOCTB left join MOCTA on TA001+TA002=TB001+TB002'+( case when @c=1 then @dssql2 else ' ' end )+'left join 
(select TB001 as TJDB,TB002 as TJDH,sum(TB005) as SUMLY from MOCTB 
left join MOCTA on TA001+TA002=TB001+TB002 where  TB003 in (select MB001 from INVMB where MB002 like REPLACE('''+@d+''','' '','''')and TB005>0  )  group by TB001,TB002 ) as TONGJI on TONGJI.TJDB+TONGJI.TJDH=TB001+TB002
where  TB003 in (select MB001 from INVMB where MB002 like REPLACE('''+@d+''','' '',''''))  and TB005>0 and TA011 in (''Y'',''y'') and TA013=''Y''  and left(TA002,8) >=".$date1."01 and left(TA002,8) <=".$date2."31 '

set @c=@c+1
EXEC(@dssql3)
EXEC(@dssql4)
 end
  insert into  #table1 select 'ZZ' AS TYPEWL,CONVERT(varchar(6),@a,112) as YF,SUM(TA017 )from MOCTA where TA011 in ('Y','y') and TA013='Y' 
and TA002 like CONVERT(varchar(6),@a,112)+'%' 

  set @a=dateadd(mm,1,@a)
  set @e=@e+1
  end 
 insert into  #table1 select 'ZZ' AS TYPEWL,'MAX' as YF,SUM(TA017)from MOCTA where TA011 in ('Y','y') and TA013='Y' 
declare @sql varchar(4000)
set @sql = 'select distinct TYPEWL as ' + 'TYPEWL'
select 
@sql = @sql + ' , SUM(case YF when '''+YF+''' then SHL end )
['+YF+']'
from (select distinct YF from #table1) as a
set @sql = 
@sql + ' from (select distinct #table1.*  from #table1) as #table1 GROUP BY TYPEWL '
exec(@sql)
DROP TABLE #table1
";

// $sql = "declare @sql1 varchar(max);DECLARE @g int;DECLARE @h int;DECLARE @a date;DECLARE @b date;DECLARE @e int;DECLARE @f int;declare @sql varchar(max)
// set @a= '2016-12-06'
// set @b= '2017-01-07'
// set @e=0
// set @f= datediff(dd,@a,@b)
// set @sql = 'select GDDH,TA006 AS CHPH,TA034 AS CPPM,TA015 AS YJCL ,TA017 AS RKSL, DDDH,TC004 AS KHBH,MA002 AS KHJC,CJBH AS CXBH,CJMC AS CXMC ,LJYC,LJYR, LJPC '
// set @h=(SELECT COUNT(MX001) FROM CMSMX)
// set @g=1
// set @sql1=' '
// while @g<=@h
// begin 
// set @sql1 =@sql1+'select DISTINCT TA001 AS TY001 ,TA002  AS TY002,TA011,'''+CASE @g when @g then (select top(1)MX001 FROM CMSMX where MX001 NOT IN(select top(@g-1)MX001 from 
// CMSMX )  ) end+''' AS CJBH ,'''+CASE @g when @g then (select top(1)MX003 FROM CMSMX where MX003 NOT IN(select top(@g-1)MX003 from CMSMX )  ) end+'''AS 
// CJMC  from MOCTA LEFT JOIN  MOCTY ON TA001=TY001 AND TA002=TY002  '+case when @g !=@h then 'union all ' else ' ' end 
// set @g=@g+1
// end 

// -- PRINT @sql
// while @e <=@f  
// begin 
// set @sql=@sql+' ,SUM(case TY003 when '''+CONVERT(varchar(8),@a,112)+''' then  CAST(TY004 AS decimal(18,0))  end) ['+CONVERT(varchar(8),@a,112) +']'
// set @a=dateadd(dd,1,@a)
// set @e=@e+1
// end 
// set  @sql1='SELECT TBLE.TY001+''-''+TBLE.TY002 AS GDDH,TA006,TA034,TA015 ,TA017,TA026+''-''+TA027+''-''+TA028 AS DDDH,COPTC.TC004,MA002,TBLE.CJBH,TBLE.CJMC,
// SFCTC.TC036 AS LJYC,SFCTC1.TC036 AS LJYR,(MOCTY.TY004)AS LJPC,MOCTY1.TY003,MOCTY1.TY004 ,MOCTY1.TY001,MOCTY1.TY002,MOCTY.TY801 FROM( ' +@sql1+')
//  AS TBLE  LEFT JOIN MOCTA ON TA001= TY001 AND TA002 =TY002
// LEFT JOIN COPTD ON TD001 =TA026 AND TD002=TA027 AND TD003=TA028
// LEFT JOIN COPTC ON TC001 =TD001 AND TC002 =TD002 
// LEFT JOIN COPMA ON MA001=TC004
// LEFT JOIN (select TC004,TC005,TC007 ,SUM(TC036) AS TC036 from  SFCTC left join SFCTB on SFCTC .TC001 =SFCTB.TB001  and SFCTC .TC002 =SFCTB.TB002  GROUP BY TC004,TC005,TC007 ) as SFCTC  ON SFCTC.TC004=TA001 AND 
// SFCTC.TC005=TA002  AND SFCTC.TC007=''0''+CJBH
// LEFT JOIN (select TC004,TC005,TC009 ,SUM(TC036) AS TC036 from  SFCTC left join SFCTB on SFCTC .TC001 =SFCTB.TB001  and SFCTC .TC002 =SFCTB.TB002  GROUP BY TC004,TC005,TC009 ) as SFCTC1  ON SFCTC1.TC004=TA001 AND 
// SFCTC1.TC005=TA002  AND SFCTC1.TC009=''0''+CJBH
// LEFT JOIN  (SELECT TY001,TY002,TY801,SUM(TY004) AS TY004 FROM MOCTY GROUP BY TY001,TY002,TY801 )AS MOCTY ON MOCTY.TY001=TBLE.TY001  AND MOCTY.TY002=TBLE.TY002 AND MOCTY.TY801=CJBH
// LEFT JOIN  MOCTY AS MOCTY1 ON MOCTY1.TY001=TBLE.TY001  AND MOCTY1.TY002=TBLE.TY002 AND MOCTY1.TY801=CJBH'
// SET @sql=@sql+ 'from ('+@sql1+') as MOCTY   GROUP BY GDDH,TA015 ,TA017, DDDH,TC004,MA002,CJBH,CJMC,LJYC,LJYR, LJPC,TA006,TA034'
// EXEC(@sql)
// ";

// $res = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
// $res = $pdo->prepare($sql);
// $res->execute();
// $rows = $res->fetchAll();

// $sql = "
// declare @sql varchar(max);
// declare @i int;
// create table #table (MX001 varchar(50), MX002 varchar(50))
// set @i=0;
// while @i<1
// begin
// -- set @sql='select MX001, MX002 from CMSMX';
// insert into #table select MX001, MX002 from CMSMX
// set @sql = 'select * from #table';
// set @i=@i+1;
// exec(@sql);
// end
// drop table #table
// ";

$res = array();
$stmt = $pdo->query($sql);
do {
  $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
  // var_dump($stmt->fetchAll(PDO::FETCH_ASSOC));
} while ($stmt->nextRowset());

var_dump($res);