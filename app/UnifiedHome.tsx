"use client";
import {useState} from "react";
import {OrdinaryTemplate} from "./ordinary/OrdinaryTemplate";
import type {OrdinaryVariant} from "./ordinary/OrdinaryTemplate";
import {CalendarView} from "./calendar/CalendarView";
import {findFestival} from "./data/festivals";
import {FestivalPoster} from "./FestivalPoster";
import {lunarFullLabel} from "./data/lunar";
const CalendarIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg>;
const realToday=()=>{const now=new Date();return now.getFullYear()===2026?{month:now.getMonth()+1,day:now.getDate()}:{month:1,day:1}};
const ordinaryVariants:OrdinaryVariant[]=["amitabha","guanyin-gold","guanyin-watermoon","guanyin-willow"];
const ordinaryVariant=(month:number,day:number)=>ordinaryVariants[Math.floor((Date.UTC(2026,month-1,day)-Date.UTC(2026,0,1))/86400000)%ordinaryVariants.length];
export default function UnifiedHome(){const [mode,setMode]=useState<"today"|"calendar">("today");const [date,setDate]=useState(realToday);const festival=findFestival(date.month,date.day);const weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][new Date(2026,date.month-1,date.day).getDay()];const selectDate=(month:number,day:number)=>{setDate({month,day});setMode("today")};return <div className="unified-home">{mode==="today"?(festival?<FestivalPoster festival={festival} onOpenCalendar={()=>setMode("calendar")} onSelectDate={selectDate}/>:<OrdinaryTemplate variant={ordinaryVariant(date.month,date.day)} embedded month={date.month} day={date.day} weekday={weekday} lunarLabel={lunarFullLabel(date.month,date.day)} onOpenCalendar={()=>setMode("calendar")} onSelectDate={selectDate}/>):<CalendarView embedded month={date.month} day={date.day} onChange={(month,day)=>setDate({month,day})} onViewDay={()=>setMode("today")}/>}<nav className="bottom-nav unified-nav"><button className={mode==="today"?"active":""} onClick={()=>setMode("today")}><span className="today-dot">●</span><b>{date.month}月{date.day}日</b></button><button className={mode==="calendar"?"active":""} onClick={()=>setMode("calendar")}><CalendarIcon/><b>日历</b></button></nav></div>}
