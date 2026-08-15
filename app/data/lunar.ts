const dayNames=["","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];

const lunarParts=(month:number,day:number)=>{
  const raw=new Intl.DateTimeFormat("zh-CN-u-ca-chinese",{month:"long",day:"numeric"}).format(new Date(2026,month-1,day));
  const match=raw.match(/^(.+?)(\d+)日$/);
  return match?{month:match[1],day:Number(match[2])}:{month:"",day:0};
};

export const lunarFullLabel=(month:number,day:number)=>{
  const lunar=lunarParts(month,day);
  return lunar.day?`${lunar.month}${dayNames[lunar.day]}`:"";
};

export const lunarCellLabel=(month:number,day:number)=>{
  const lunar=lunarParts(month,day);
  return lunar.day===1?lunar.month:dayNames[lunar.day]||"";
};
