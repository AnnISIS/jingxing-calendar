import {LunarMonth, Solar} from "lunar-javascript";

const SHICHEN = [
  ["子", "23:00–01:00"], ["丑", "01:00–03:00"], ["寅", "03:00–05:00"],
  ["卯", "05:00–07:00"], ["辰", "07:00–09:00"], ["巳", "09:00–11:00"],
  ["午", "11:00–13:00"], ["未", "13:00–15:00"], ["申", "15:00–17:00"],
  ["酉", "17:00–19:00"], ["戌", "19:00–21:00"], ["亥", "21:00–23:00"],
] as const;
const SIX_LARGE=[8,14,15,23,29,30], SIX_SMALL=[8,14,15,23,28,29];
const TEN_LARGE=[1,8,14,15,18,23,24,28,29,30], TEN_SMALL=[1,8,14,15,18,23,24,27,28,29];
const pad=(n:number)=>String(n).padStart(2,"0");

export function getTraditionalTime(year:number,month:number,day:number,hour=12,minute=0){
  const solar=Solar.fromYmdHms(year,month,day,hour,minute,0);
  const lunar=solar.getLunar();
  const previous=lunar.getPrevJieQi(), next=lunar.getNextJieQi(), nextSolar=next.getSolar();
  const target=new Date(nextSolar.getYear(),nextSolar.getMonth()-1,nextSolar.getDay(),nextSolar.getHour(),nextSolar.getMinute());
  const remaining=Math.max(0,target.getTime()-new Date(year,month-1,day,hour,minute).getTime());
  const lunarMonth=LunarMonth.fromYm(lunar.getYear(),lunar.getMonth());
  const lunarDay=lunar.getDay(), isSmall=lunarMonth.getDayCount()===29;
  const six=(isSmall?SIX_SMALL:SIX_LARGE).includes(lunarDay);
  const ten=(isSmall?TEN_SMALL:TEN_LARGE).includes(lunarDay);
  const shichenIndex=hour===23?0:Math.floor((hour+1)/2);
  return {
    currentTerm:previous.getName(), nextTerm:next.getName(),
    nextTermDate:{year:nextSolar.getYear(),month:nextSolar.getMonth(),day:nextSolar.getDay()},
    nextTermAt:`${pad(nextSolar.getMonth())}月${pad(nextSolar.getDay())}日 ${pad(nextSolar.getHour())}:${pad(nextSolar.getMinute())}`,
    countdown:`${Math.floor(remaining/86400000)}日${Math.floor((remaining%86400000)/3600000)}时`,
    hou:lunar.getHou(), wuHou:lunar.getWuHou(),
    ganzhi:{year:lunar.getYearInGanZhi(),month:lunar.getMonthInGanZhi(),day:lunar.getDayInGanZhi(),time:lunar.getTimeInGanZhi()},
    shichen:SHICHEN[shichenIndex][0], shichenRange:SHICHEN[shichenIndex][1], shichenList:SHICHEN,
    fasting:[six?"六斋日":"",ten?"十斋日":""].filter(Boolean), isSix:six, isTen:ten,
  };
}

export function calendarMarks(year:number,month:number,day:number){
  const info=getTraditionalTime(year,month,day);
  const lunar=Solar.fromYmd(year,month,day).getLunar();
  return {solarTerm:lunar.getJieQi()||"",isSix:info.isSix,isTen:info.isTen};
}
