"use client";

import {useEffect, useState} from "react";
import {OrdinaryTemplate} from "./ordinary/OrdinaryTemplate";
import type {OrdinaryVariant} from "./ordinary/OrdinaryTemplate";
import {CalendarView} from "./calendar/CalendarView";
import {findFestival} from "./data/festivals";
import {FestivalPoster} from "./FestivalPoster";
import {lunarFullLabel} from "./data/lunar";

type ViewMode="today"|"calendar";
type SelectedDate={month:number;day:number};

const CalendarIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2V7a2 2 0 0 1 2-2Z"/></svg>;
const realToday=():SelectedDate=>{const now=new Date();return now.getFullYear()===2026?{month:now.getMonth()+1,day:now.getDate()}:{month:1,day:1}};
const validDate=(month:number,day:number)=>month>=1&&month<=12&&day>=1&&day<=new Date(2026,month,0).getDate();
const readDate=():SelectedDate=>{
  if(typeof window==="undefined")return realToday();
  const raw=new URLSearchParams(window.location.search).get("date");
  const match=raw?.match(/^2026-(\d{2})-(\d{2})$/);
  if(!match)return realToday();
  const month=Number(match[1]),day=Number(match[2]);
  return validDate(month,day)?{month,day}:realToday();
};
const isStaticExport=import.meta.env.VITE_STATIC_EXPORT==="true";
const readMode=(fallback:ViewMode):ViewMode=>{
  if(typeof window==="undefined")return fallback;
  if(isStaticExport)return new URLSearchParams(window.location.search).get("view")==="calendar"?"calendar":"today";
  return window.location.pathname.replace(/\/$/,"")==="/calendar"?"calendar":fallback;
};
const urlFor=(mode:ViewMode,date:SelectedDate)=>{
  const dateValue=`2026-${String(date.month).padStart(2,"0")}-${String(date.day).padStart(2,"0")}`;
  if(isStaticExport){
    const params=new URLSearchParams({date:dateValue});
    if(mode==="calendar")params.set("view","calendar");
    return `${window.location.pathname}?${params}`;
  }
  return `${mode==="calendar"?"/calendar":"/"}?date=${dateValue}`;
};

const ordinaryVariants:OrdinaryVariant[]=[
  "amitabha",
  "guanyin-gold",
  "guanyin-watermoon",
  "guanyin-willow",
  "guanyin-standing",
  "guanyin-white-blue",
  "guanyin-cheng",
  "guanyin-thousand-arms",
  "guanyin-white-scroll",
  "guanyin-lotus-moon",
  "guanyin-dragon",
  "amitabha-descending",
];
const ordinaryVariant=(month:number,day:number)=>ordinaryVariants[Math.floor((Date.UTC(2026,month-1,day)-Date.UTC(2026,0,1))/86400000)%ordinaryVariants.length];

export default function UnifiedHome({initialMode="today"}:{initialMode?:ViewMode}){
  const [mode,setMode]=useState<ViewMode>(initialMode);
  const [date,setDate]=useState<SelectedDate>(realToday);

  useEffect(()=>{
    const syncFromHistory=()=>{
      setMode(readMode(initialMode));
      setDate(readDate());
      window.scrollTo({top:0,left:0,behavior:"auto"});
    };
    syncFromHistory();
    window.addEventListener("popstate",syncFromHistory);
    return()=>window.removeEventListener("popstate",syncFromHistory);
  },[initialMode]);

  const updateUrl=(nextMode:ViewMode,nextDate:SelectedDate,replace=false)=>{
    const url=urlFor(nextMode,nextDate);
    if(`${window.location.pathname}${window.location.search}`!==url){
      window.history[replace?"replaceState":"pushState"]({},"",url);
    }
  };
  const showMode=(nextMode:ViewMode)=>{
    setMode(nextMode);
    updateUrl(nextMode,date);
    window.scrollTo({top:0,left:0,behavior:"auto"});
  };
  const selectDate=(month:number,day:number)=>{
    const nextDate={month,day};
    setDate(nextDate);
    setMode("today");
    updateUrl("today",nextDate);
    window.scrollTo({top:0,left:0,behavior:"auto"});
  };
  const changeCalendarDate=(month:number,day:number)=>{
    const nextDate={month,day};
    setDate(nextDate);
    updateUrl("calendar",nextDate,true);
  };

  const festival=findFestival(date.month,date.day);
  const weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][new Date(2026,date.month-1,date.day).getDay()];
  return <div className="unified-home">
    {mode==="today"?(festival?
      <FestivalPoster festival={festival} onOpenCalendar={()=>showMode("calendar")} onSelectDate={selectDate}/>:
      <OrdinaryTemplate variant={ordinaryVariant(date.month,date.day)} embedded month={date.month} day={date.day} weekday={weekday} lunarLabel={lunarFullLabel(date.month,date.day)} onOpenCalendar={()=>showMode("calendar")} onSelectDate={selectDate}/>):
      <CalendarView embedded month={date.month} day={date.day} onChange={changeCalendarDate} onViewDay={()=>showMode("today")}/>} 
    <nav className="bottom-nav unified-nav">
      <button className={mode==="today"?"active":""} onClick={()=>showMode("today")}><span className="today-dot">●</span><b>{date.month}月{date.day}日</b></button>
      <button className={mode==="calendar"?"active":""} onClick={()=>showMode("calendar")}><CalendarIcon/><b>日历</b></button>
    </nav>
  </div>;
}
