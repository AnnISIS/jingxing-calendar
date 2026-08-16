"use client";
import {useEffect,useState} from "react";
import {nextFestivalOccurrence} from "./data/festivals";
import {getTraditionalTime} from "./data/traditional-time";
import type {PersonalEvent} from "./data/personal-events";
import {dayValue,nextPersonalOccurrence} from "./data/personal-events";

export function DateSummary({year,month,day,onSelectDate,personalEvents=[]}:{year:number;month:number;day:number;onSelectDate:(year:number,month:number,day:number)=>void;personalEvents?:PersonalEvent[]}){
  const [clock,setClock]=useState({hour:12,minute:0});
  useEffect(()=>{const now=new Date();setClock({hour:now.getHours(),minute:now.getMinutes()})},[]);
  const now=new Date(),isToday=now.getFullYear()===year&&now.getMonth()+1===month&&now.getDate()===day;
  const info=getTraditionalTime(year,month,day,isToday?clock.hour:12,isToday?clock.minute:0);
  const nextFestival=nextFestivalOccurrence(year,month,day),current=dayValue(year,month,day);
  const festivalDays=nextFestival?Math.ceil((nextFestival.value-current)/86400000):0;
  const nextPersonal=nextPersonalOccurrence(personalEvents,year,month,day);
  return <section className="date-summary calendar-outlook">
    <header><span>近日</span><small>由此日向后</small></header>
    <div className="outlook-list">
      {nextFestival&&<button onClick={()=>onSelectDate(nextFestival.year,nextFestival.month,nextFestival.day)}><span>重要日子</span><p><strong>{nextFestival.title}</strong><small>{nextFestival.year!==year?`${nextFestival.year}年 · `:""}{nextFestival.month}月{nextFestival.day}日 · 农历{nextFestival.lunar} · 尚余{festivalDays}日</small></p><b>›</b></button>}
      {nextPersonal&&<button onClick={()=>onSelectDate(nextPersonal.occurrenceYear,nextPersonal.month,nextPersonal.day)}><span>下一件事</span><p><strong>{nextPersonal.title}</strong><small>{nextPersonal.occurrenceYear!==year?`${nextPersonal.occurrenceYear}年 · `:""}{nextPersonal.month}月{nextPersonal.day}日 · {nextPersonal.kind}{nextPersonal.kind==="纪念"?` · 尚余${Math.ceil((nextPersonal.value-current)/86400000)}日`:""}</small></p><b>›</b></button>}
      <button onClick={()=>onSelectDate(info.nextTermDate.year,info.nextTermDate.month,info.nextTermDate.day)}><span>下一节气</span><p><strong>{info.nextTerm}</strong><small>{info.nextTermAt}</small></p><b>›</b></button>
    </div>
    <footer><span>此日干支</span><p>{info.ganzhi.year}年 · {info.ganzhi.month}月 · {info.ganzhi.day}日</p>{isToday&&<b>{info.shichen}时　{info.shichenRange}</b>}{info.fasting.length>0&&<em>{info.fasting.join(" · ")}</em>}</footer>
  </section>;
}
