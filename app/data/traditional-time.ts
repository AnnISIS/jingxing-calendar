import {Solar} from "lunar-javascript";

const pad=(value:number)=>String(value).padStart(2,"0");

export function getTraditionalTime(year:number,month:number,day:number){
  const now=new Date();
  const selectedIsToday=now.getFullYear()===year&&now.getMonth()+1===month&&now.getDate()===day;
  const hour=selectedIsToday?now.getHours():12;
  const minute=selectedIsToday?now.getMinutes():0;
  const lunar=Solar.fromYmdHms(year,month,day,hour,minute,0).getLunar();
  const previous=lunar.getPrevJieQi();
  const next=lunar.getNextJieQi();
  const nextSolar=next.getSolar();
  const nextAt=new Date(nextSolar.getYear(),nextSolar.getMonth()-1,nextSolar.getDay(),nextSolar.getHour(),nextSolar.getMinute());
  const selectedAt=new Date(year,month-1,day,hour,minute);
  const remaining=Math.max(0,nextAt.getTime()-selectedAt.getTime());
  const hou=lunar.getHou();
  return {
    currentTerm:hou.split(" ")[0]||previous.getName(),
    hou,
    wuHou:lunar.getWuHou(),
    nextTerm:next.getName(),
    nextTermAt:`${pad(nextSolar.getMonth())}月${pad(nextSolar.getDay())}日 ${pad(nextSolar.getHour())}:${pad(nextSolar.getMinute())}`,
    countdown:`${Math.floor(remaining/86400000)}日${Math.floor((remaining%86400000)/3600000)}时`,
  };
}

export function solarTermOnDate(year:number,month:number,day:number){
  return Solar.fromYmdHms(year,month,day,12,0,0).getLunar().getJieQi()||"";
}
