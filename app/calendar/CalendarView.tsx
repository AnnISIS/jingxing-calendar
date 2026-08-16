"use client";
import {useState} from "react";
import {festivalsForYear,findFestival,festivalLevel} from "../data/festivals";
import {lunarCellLabel} from "../data/lunar";
import {calendarMarks,getTraditionalTime} from "../data/traditional-time";
import type {PersonalEvent} from "../data/personal-events";
import {personalOnDate} from "../data/personal-events";
import {DateSummary} from "../DateSummary";
const cn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

export function CalendarView({year,month,day,onChange,onViewDay,embedded=false,weekStart="monday",personalEvents=[],onAddPersonal}:{year:number;month:number;day:number;onChange:(y:number,m:number,d:number)=>void;onViewDay:()=>void;embedded?:boolean;weekStart?:"monday"|"sunday";personalEvents?:PersonalEvent[];onAddPersonal?:()=>void}){
  const [showFasting,setShowFasting]=useState(true);
  const now=new Date(),today={year:now.getFullYear(),month:now.getMonth()+1,day:now.getDate()};
  const weekday=new Date(year,month-1,1).getDay(),first=weekStart==="monday"?(weekday+6)%7:weekday,days=new Date(year,month,0).getDate(),prevDays=new Date(year,month-1,0).getDate();
  const cells=[...Array.from({length:first},(_,i)=>({day:prevDays-first+i+1,out:true})),...Array.from({length:days},(_,i)=>({day:i+1,out:false}))];while(cells.length%7)cells.push({day:cells.length%7,out:true});
  const yearFestivals=festivalsForYear(year),chosen=findFestival(year,month,day),chosenPersonal=personalOnDate(personalEvents,year,month,day);
  const move=(n:number)=>{const target=new Date(year,month-1+n,1);onChange(target.getFullYear(),target.getMonth()+1,1)};
  return <main className={`site-shell calendar-site ${embedded?"embedded-view":""}`}>
    <header className="calendar-hero"><img className="calendar-landscape" src="/summer-mountain.jpg" alt="淡墨夏季山居图"/><div className="calendar-hero-veil"/><div className="calendar-year"><span>{getTraditionalTime(year,month,day).ganzhi.year}年</span><p>{year}</p></div><div className="month-switch"><button onClick={()=>move(-1)} aria-label="上个月">‹</button><div><strong>{cn[month-1]}</strong><span>{year}年 · 节气、圣日与个人日历</span></div><button onClick={()=>move(1)} aria-label="下个月">›</button></div></header>
    <section className="calendar-sheet">
      <div className="calendar-key"><button className="calendar-today-jump" onClick={()=>onChange(today.year,today.month,today.day)}><i>今</i><span>回到今日</span></button><div className="calendar-markers"><small>月历标记</small><span><i/>圣日</span><button className={showFasting?"layer-on":""} onClick={()=>setShowFasting(x=>!x)}>斋日 <b>{showFasting?"开":"关"}</b></button></div></div>
      <div className="week-row">{(weekStart==="monday"?["一","二","三","四","五","六","日"]:["日","一","二","三","四","五","六"]).map(x=><span key={x}>{x}</span>)}</div>
      <div className="calendar-grid">{cells.map((c,i)=>{const e=!c.out?findFestival(year,month,c.day):undefined,p=!c.out?personalOnDate(personalEvents,year,month,c.day):[],marks=!c.out?calendarMarks(year,month,c.day):null,isToday=!c.out&&year===today.year&&month===today.month&&c.day===today.day,isSelected=!c.out&&day===c.day;return <button key={i} className={`${c.out?"outside":""} ${isSelected?"selected":""} ${isToday?"real-today":""} ${e?"event-cell sacred":""} ${p.length?"personal-cell":""}`} disabled={c.out} onClick={()=>!c.out&&(isSelected?onViewDay():onChange(year,month,c.day))}><strong>{c.day}</strong>{isToday&&<span className="today-mark">今</span>}<small>{marks?.solarTerm||(!c.out?lunarCellLabel(year,month,c.day):"")}</small>{e&&<em>{e.short}</em>}{showFasting&&marks&&(marks.isSix||marks.isTen)&&<span className={`fasting-mark ${marks.isSix&&marks.isTen?"double":""}`}>斋</span>}{p.length>0&&<i className="personal-dot"/>}</button>})}</div>
      <section className="selected-date-scroll"><article className={`selected-day ${chosen?"has-event":""}`}><time><strong>{String(day).padStart(2,"0")}</strong><span>{month}月</span></time><div><small>所选之日</small><p>{chosen?.title||"清净普通日"}</p><span>{chosen?`农历${chosen.lunar}`:`公历${year}年 · 从容度日`}</span></div><button className="day-poster-button" onClick={onViewDay}>{chosen?<>查看<br/>圣像</>:<>进入<br/>此日</>}</button></article>
      {chosenPersonal.length>0&&<section className="calendar-day-tasks"><header><span>此日日常</span><small>{chosenPersonal.length} 件</small></header>{chosenPersonal.map(item=><article key={item.id}><i/><p><strong>{item.title}</strong><small>{item.kind}{item.yearly?" · 每年重复":""}</small></p></article>)}</section>}
      <DateSummary year={year} month={month} day={day} onSelectDate={onChange} personalEvents={personalEvents}/></section>
      {onAddPersonal&&<button className="calendar-add-personal" onClick={onAddPersonal}>＋ 为 {year}年{month}月{day}日 添加个人记事</button>}
      <section className="calendar-archives"><details><summary><span><i/>全年佛菩萨纪念日</span><b>{yearFestivals.length} 日</b><em>查看详情</em></summary><div className="archive-body year-festivals">{Array.from({length:12},(_,i)=>i+1).map(m=><div className="festival-month" key={m}><b>{String(m).padStart(2,"0")}</b><div>{yearFestivals.filter(x=>x.month===m).map((e,i)=><button key={`${e.day}-${i}`} onClick={()=>onChange(year,e.month,e.day)}><time>{e.day}日</time><span>{e.title}<small>农历{e.lunar} · {festivalLevel(e)}</small></span><em>›</em></button>)}</div></div>)}</div></details></section>
    </section>
  </main>;
}
