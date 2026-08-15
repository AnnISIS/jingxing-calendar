"use client";
import {festivals,findFestival,festivalLevel} from "../data/festivals";
import {dharmaEvents,dharmaStarting,dharmaOnDate,formatDharmaDate} from "../data/dharma";
const cn=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
export const augustLunar=["十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九"];

export function CalendarView({month,day,onChange,onViewDay,embedded=false}:{month:number;day:number;onChange:(m:number,d:number)=>void;onViewDay:()=>void;embedded?:boolean}){
  const first=(new Date(2026,month-1,1).getDay()+6)%7,days=new Date(2026,month,0).getDate(),prevDays=new Date(2026,month-1,0).getDate();
  const cells=[...Array.from({length:first},(_,i)=>({day:prevDays-first+i+1,out:true})),...Array.from({length:days},(_,i)=>({day:i+1,out:false}))];
  while(cells.length%7)cells.push({day:cells.length%7,out:true});
  const chosen=findFestival(month,day),chosenDharma=dharmaOnDate(month,day),monthDharma=dharmaEvents.filter(x=>x.startMonth===month||x.endMonth===month);
  const move=(n:number)=>{const m=month+n;if(m>=1&&m<=12)onChange(m,1)};
  return <main className={`site-shell calendar-site ${embedded?"embedded-view":""}`}>
    <header className="calendar-hero"><img className="calendar-landscape" src="/summer-mountain.jpg" alt="淡墨夏季山居图"/><div className="calendar-hero-veil"/><div className="calendar-year"><span>丙午年</span><p>二〇二六</p></div><div className="month-switch"><button onClick={()=>move(-1)} aria-label="上个月">‹</button><div><strong>{cn[month-1]}</strong><span>二〇二六年 · 圣日与东林法务</span></div><button onClick={()=>move(1)} aria-label="下个月">›</button></div></header>
    <section className="calendar-sheet">
      <div className={`month-dharma-status ${monthDharma.length?"has-dharma":""}`}><i/><div><strong>{monthDharma.length?`本月有 ${monthDharma.length} 项已核验东林法务`:"本月暂无已发布的东林法务"}</strong><span>{monthDharma.length?"佛七、闭关持续日期均以朱红线标示":"网站不会用往年惯例代替正式公告"}</span></div><button onClick={()=>monthDharma.length?onChange(month,monthDharma[0].startDay):onChange(1,1)}>{monthDharma.length?"查看":"查看一月"}</button></div>
      <div className="calendar-key"><span><i/>佛菩萨纪念日</span><span><i className="dharma"/>东林法务</span></div>
      <div className="week-row">{["一","二","三","四","五","六","日"].map(x=><span key={x}>{x}</span>)}</div>
      <div className="calendar-grid">{cells.map((c,i)=>{const e=!c.out?findFestival(month,c.day):undefined,d=!c.out?dharmaOnDate(month,c.day):[],starts=!c.out?dharmaStarting(month,c.day):[];return <button key={i} className={`${c.out?"outside":""} ${!c.out&&day===c.day?"selected":""} ${e?"event-cell sacred":""} ${d.length?"dharma-cell":""}`} disabled={c.out} onClick={()=>!c.out&&onChange(month,c.day)}><strong>{c.day}</strong><small>{month===8&&!c.out?augustLunar[c.day-1]:e?.lunar||""}</small>{e&&<em>{e.short}</em>}{starts.length>0&&<em className="dharma-label">{starts[0].short}</em>}</button>})}</div>
      <article className={`selected-day ${chosen||chosenDharma.length?"has-event":""}`}><time><strong>{String(day).padStart(2,"0")}</strong><span>{month}月</span></time><div><p>{chosen?.title||chosenDharma[0]?.title||"清净普通日"}</p><span>{chosen?`农历${chosen.lunar} · ${festivalLevel(chosen)}`:chosenDharma[0]?`${chosenDharma[0].place} · 已核验法务`:"公历二〇二六年"}</span></div>{chosen?<button className="day-poster-button" onClick={onViewDay}>查看<br/>圣像</button>:<b>·</b>}</article>
      <p className="calendar-hint">金色为圣日，朱红为东林法务；题签可点选查看</p>
      <section className="donglin-dharma"><header><i/>东林法务 <span>东林官网实时资料</span></header><p>已收录东林寺官网“法务安排”中的2026全年项目，并以1月净行月历补足普佛、皈戒等日常法务。</p>{dharmaEvents.map((e,i)=><a href={e.source} target="_blank" rel="noreferrer" key={i}><time>{formatDharmaDate(e)}</time><span>{e.title}<small>{e.place}</small></span><em>官网</em></a>)}</section>
      <section className="year-festivals"><header><i/>全年佛菩萨纪念日 <span>{festivals.length} 日</span></header>{Array.from({length:12},(_,i)=>i+1).map(m=><div className="festival-month" key={m}><b>{String(m).padStart(2,"0")}</b><div>{festivals.filter(x=>x.month===m).map(e=><button key={e.day} onClick={()=>onChange(e.month,e.day)}><time>{e.day}日</time><span>{e.title}<small>农历{e.lunar} · {festivalLevel(e)}</small></span><em>›</em></button>)}</div></div>)}</section>
    </section>
  </main>;
}
