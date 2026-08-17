"use client";
import {festivals,findFestival,festivalLevel} from "../data/festivals";
import {dharmaEvents,dharmaOnDate,formatDharmaDate} from "../data/dharma";
import {lunarCellLabel} from "../data/lunar";
import {solarTermOnDate} from "../data/traditional-time";
const cn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

export function CalendarView({month,day,onChange,onViewDay,embedded=false}:{month:number;day:number;onChange:(m:number,d:number)=>void;onViewDay:()=>void;embedded?:boolean}){
  const now=new Date(),today=now.getFullYear()===2026?{month:now.getMonth()+1,day:now.getDate()}:{month:1,day:1};
  const first=(new Date(2026,month-1,1).getDay()+6)%7,days=new Date(2026,month,0).getDate(),prevDays=new Date(2026,month-1,0).getDate();
  const cells=[...Array.from({length:first},(_,i)=>({day:prevDays-first+i+1,out:true})),...Array.from({length:days},(_,i)=>({day:i+1,out:false}))];
  while(cells.length%7)cells.push({day:cells.length%7,out:true});
  const chosen=findFestival(month,day),chosenDharma=dharmaOnDate(month,day);
  const move=(n:number)=>{const m=month+n;if(m>=1&&m<=12)onChange(m,1)};
  return <main className={`site-shell calendar-site ${embedded?"embedded-view":""}`}>
    <header className="calendar-hero"><img className="calendar-landscape" src="/summer-mountain.jpg" alt="淡墨夏季山居图"/><div className="calendar-hero-veil"/><div className="calendar-year"><span>丙午年</span><p>二〇二六</p></div><div className="month-switch"><button onClick={()=>move(-1)} aria-label="上个月">‹</button><div><strong>{cn[month-1]}</strong><span>二〇二六年 · 圣日与东林法务</span></div><button onClick={()=>move(1)} aria-label="下个月">›</button></div></header>
    <section className="calendar-sheet">
      <div className="calendar-key"><button onClick={()=>onChange(today.month,today.day)}>回到今日</button><span><i/>佛菩萨纪念日</span><span><i className="dharma"/>东林法务</span></div>
      <div className="week-row">{["一","二","三","四","五","六","日"].map(x=><span key={x}>{x}</span>)}</div>
      <div className="calendar-grid">{cells.map((c,i)=>{const e=!c.out?findFestival(month,c.day):undefined,d=!c.out?dharmaOnDate(month,c.day):[],term=!c.out?solarTermOnDate(2026,month,c.day):"",isToday=!c.out&&month===today.month&&c.day===today.day,isSelected=!c.out&&day===c.day;return <button key={i} className={`${c.out?"outside":""} ${isSelected?"selected":""} ${isToday?"real-today":""} ${e?"event-cell sacred":""} ${d.length?"dharma-cell":""}`} disabled={c.out} onClick={()=>!c.out&&(isSelected?onViewDay():onChange(month,c.day))}><strong>{c.day}</strong>{isToday&&<span className="today-mark">今</span>}<small>{term||(!c.out?lunarCellLabel(month,c.day):"")}</small>{e&&<em>{e.short}</em>}{d.length>0&&<i className="dharma-dot" aria-label="东林法务"/>}</button>})}</div>
      <article className={`selected-day ${chosen||chosenDharma.length?"has-event":""}`}><time><strong>{String(day).padStart(2,"0")}</strong><span>{month}月</span></time><div><p>{chosen?.title||chosenDharma[0]?.title||"清净普通日"}</p><span>{chosen?`农历${chosen.lunar} · ${festivalLevel(chosen)}`:chosenDharma[0]?`${chosenDharma[0].place} · 已核验法务`:"公历二〇二六年"}</span></div><button className="day-poster-button" onClick={onViewDay}>{chosen?<>查看<br/>圣像</>:<>进入<br/>此日</>}</button></article>
      <section className="calendar-archives">
        <details><summary><span><i className="dharma"/>东林全年法务</span><b>{dharmaEvents.length} 项</b><em>查看详情</em></summary><div className="archive-body donglin-dharma"><p>已收录2026年东林法务资料。东林官网法务公开页面目前无法访问，具体安排请以寺院最新公告为准。</p>{dharmaEvents.map((e,i)=><div className="dharma-record" key={i}><time>{formatDharmaDate(e)}</time><span>{e.title}<small>{e.place}</small></span></div>)}</div></details>
        <details><summary><span><i/>全年佛菩萨纪念日</span><b>{festivals.length} 日</b><em>查看详情</em></summary><div className="archive-body year-festivals">{Array.from({length:12},(_,i)=>i+1).map(m=><div className="festival-month" key={m}><b>{String(m).padStart(2,"0")}</b><div>{festivals.filter(x=>x.month===m).map(e=><button key={e.day} onClick={()=>onChange(e.month,e.day)}><time>{e.day}日</time><span>{e.title}<small>农历{e.lunar} · {festivalLevel(e)}</small></span><em>›</em></button>)}</div></div>)}</div></details>
      </section>
    </section>
  </main>;
}
