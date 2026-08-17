import {dharmaEvents,formatDharmaDate} from "./data/dharma";
import {festivals} from "./data/festivals";
import {dailySolarNoons} from "./data/solar";

const value=(month:number,day:number)=>new Date(2026,month-1,day).getTime();

export function DailyInfo({month,day,onOpenCalendar,onSelectDate}:{month:number;day:number;onOpenCalendar:()=>void;onSelectDate:(month:number,day:number)=>void}){
  const current=value(month,day);
  const upcomingDharma=dharmaEvents.find(item=>{
    const start=value(item.startMonth,item.startDay);
    const end=value(item.endMonth||item.startMonth,item.endDay||item.startDay);
    return end>=current&&start<=current+45*86400000;
  });
  const nextFestival=festivals.find(item=>value(item.month,item.day)>current);
  const dharmaIsToday=upcomingDharma&&value(upcomingDharma.startMonth,upcomingDharma.startDay)<=current;
  const noons=dailySolarNoons(2026,month,day);
  return <section className="daily-information">
    {upcomingDharma&&<section className="dharma-section"><header><div><i/>{dharmaIsToday?"今日东林法务":"近期东林法务"}</div><button className="text-button" onClick={onOpenCalendar}>进入日历</button></header><button className="timeline-event daily-link" onClick={()=>onSelectDate(upcomingDharma.startMonth,upcomingDharma.startDay)}><time><strong>{upcomingDharma.startDay}</strong><span>{upcomingDharma.startMonth}月</span></time><div><p>{upcomingDharma.title}</p><span>{upcomingDharma.place} · {formatDharmaDate(upcomingDharma)}</span></div><b>›</b></button><p className="event-caveat">法务信息以主办寺院最新公告为准</p></section>}
    <div className={`next-observance ${!upcomingDharma?"standalone":""}`}><span>下一重要圣日</span>{nextFestival?<button onClick={()=>onSelectDate(nextFestival.month,nextFestival.day)}><p>{nextFestival.title}　<small>{nextFestival.month}月{nextFestival.day}日</small></p><b>›</b></button>:<p>本年度圣日已圆满</p>}{!upcomingDharma&&<button className="inline-calendar" onClick={onOpenCalendar}>进入日历</button>}</div>
    <section className="solar-noon-strip"><span>日照正午</span><div>{noons.map(item=><p key={item.name}><small>{item.name}</small><strong>{item.time}</strong></p>)}</div></section>
  </section>;
}
