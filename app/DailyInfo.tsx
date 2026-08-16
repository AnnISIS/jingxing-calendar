import {nextFestivalOccurrence} from "./data/festivals";

export function DailyInfo({year,month,day,onOpenCalendar,onSelectDate}:{year:number;month:number;day:number;onOpenCalendar:()=>void;onSelectDate:(year:number,month:number,day:number)=>void}){
  const nextFestival=nextFestivalOccurrence(year,month,day);
  return <section className="daily-information"><div className="next-observance standalone"><span>下一重要节日</span>{nextFestival&&<button onClick={()=>onSelectDate(nextFestival.year,nextFestival.month,nextFestival.day)}><p>{nextFestival.title}　<small>{nextFestival.year}年{nextFestival.month}月{nextFestival.day}日</small></p><b>›</b></button>}<button className="inline-calendar" onClick={onOpenCalendar}>进入日历</button></div></section>;
}
