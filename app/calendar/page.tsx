"use client";
import { useState } from "react";

const lunar = ["十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九"];
const events: Record<number,{title:string;short:string;kind:"sacred"|"dharma"|"both";note:string}> = {
  1:{title:"观世音菩萨成道日",short:"观音成道",kind:"sacred",note:"农历六月十九 · 成道纪念"},
  25:{title:"大势至菩萨圣诞",short:"势至圣诞",kind:"sacred",note:"农历七月十三 · 圣诞纪念"},
  27:{title:"佛欢喜日 · 盂兰盆会",short:"盂兰盆会",kind:"both",note:"农历七月十五 · 东林法务"},
};
const cells = [
  ...[26,27,28,29,30,31].map(day=>({day,lunar:"",outside:true})),
  ...Array.from({length:31},(_,i)=>({day:i+1,lunar:lunar[i],outside:false})),
  ...[1,2,3,4,5].map(day=>({day,lunar:"",outside:true})),
];

const TodayIcon=()=> <span className="today-dot">●</span>;
const CalendarIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>;

export default function CalendarPage(){
  const [selected,setSelected]=useState(15);
  const special=events[selected];
  return <main className="site-shell calendar-site">
    <header className="calendar-hero">
      <img className="calendar-landscape" src="/summer-mountain.jpg" alt="淡墨夏季山居图" />
      <div className="calendar-hero-veil" />
      <div className="calendar-year"><span>丙午年</span><p>二〇二六</p></div>
      <div className="month-switch"><button aria-label="上个月">‹</button><div><strong>八月</strong><span>农历六月十九 — 七月十九</span></div><button aria-label="下个月">›</button></div>
    </header>

    <section className="calendar-sheet">
      <div className="week-row">{["一","二","三","四","五","六","日"].map(x=><span key={x}>{x}</span>)}</div>
      <div className="calendar-grid">
        {cells.map((cell,i)=>{
          const event=!cell.outside?events[cell.day]:undefined;
          return <button key={i} className={`${cell.outside?"outside":""} ${selected===cell.day&&!cell.outside?"selected":""} ${event?`event-cell ${event.kind}`:""}`} onClick={()=>!cell.outside&&setSelected(cell.day)} disabled={cell.outside}>
            <strong>{cell.day}</strong><small>{cell.lunar}</small>
            {event&&<em>{event.short}</em>}
          </button>
        })}
      </div>

      <article className={`selected-day ${special?"has-event":""}`}>
        <time><strong>{String(selected).padStart(2,"0")}</strong><span>八月</span></time>
        <div>
          <p>{special?.title || "清净普通日"}</p>
          <span>{special?.note || `农历七月${lunar[selected-1]} · 佛历2570年`}</span>
        </div><b>›</b>
      </article>

      <p className="calendar-hint">点击日期查看详情</p>
    </section>

    <nav className="bottom-nav" aria-label="主导航"><a href="/"><TodayIcon/><b>今日</b></a><a className="active" href="/calendar"><CalendarIcon/><b>日历</b></a></nav>
  </main>
}
