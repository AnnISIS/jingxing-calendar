"use client";
import {useEffect,useState} from "react";
import type {PracticeLog} from "./data/practice";
import {practiceOnDate} from "./data/practice";
import {IncenseTimer} from "./IncenseTimer";
const weekday=["日","一","二","三","四","五","六"];
const dateValue=(year:number,month:number,day:number)=>new Date(year,month-1,day);

export function PracticeView({year,month,day,logs,onAdd,onEdit,onRemove,onSelectDate,onTimerRecord}:{year:number;month:number;day:number;logs:PracticeLog[];onAdd:()=>void;onEdit:(log:PracticeLog)=>void;onRemove:(id:string)=>void;onSelectDate:(year:number,month:number,day:number)=>void;onTimerRecord:(minutes:number)=>void}){
 const [page,setPage]=useState<"records"|"timer">("records"),[historyView,setHistoryView]=useState<"week"|"month">("week"),[weekOffset,setWeekOffset]=useState(0),[display,setDisplay]=useState({year,month});
 useEffect(()=>{setWeekOffset(0);setDisplay({year,month})},[year,month,day]);
 const items=practiceOnDate(logs,year,month,day);
 const totals=Object.values(items.reduce<Record<string,{kind:string;amount:number;unit:string}>>((all,x)=>{const key=`${x.kind}-${x.unit}`;all[key]??={kind:x.kind,amount:0,unit:x.unit};all[key].amount+=x.amount;return all},{}));
 const recordGroups=Object.values(items.reduce<Record<string,{kind:string;amount:number;unit:string;entries:PracticeLog[]}>>((all,x)=>{const key=`${x.kind}-${x.unit}`;all[key]??={kind:x.kind,amount:0,unit:x.unit,entries:[]};all[key].amount+=x.amount;all[key].entries.push(x);return all},{}));
 const base=dateValue(year,month,day),anchor=new Date(base);anchor.setDate(anchor.getDate()+weekOffset*7);
 const week=Array.from({length:7},(_,i)=>{const d=new Date(anchor);d.setDate(anchor.getDate()-6+i);const y=d.getFullYear(),m=d.getMonth()+1,n=d.getDate(),count=practiceOnDate(logs,y,m,n).reduce((sum,x)=>sum+x.amount,0);return {year:y,month:m,day:n,label:weekday[d.getDay()],count,valid:true}}),max=Math.max(1,...week.map(x=>x.count));
 const weekRange=`${week[0].month}月${week[0].day}日 — ${week[6].month}月${week[6].day}日`;
 const monthFirst=(new Date(display.year,display.month-1,1).getDay()+6)%7,monthDays=new Date(display.year,display.month,0).getDate();
 const monthCells=[...Array.from({length:monthFirst},()=>0),...Array.from({length:monthDays},(_,i)=>i+1)];while(monthCells.length%7)monthCells.push(0);
 const moveDisplayMonth=(amount:number)=>{const d=new Date(display.year,display.month-1+amount,1);setDisplay({year:d.getFullYear(),month:d.getMonth()+1})};
 return <main className="site-shell practice-site">
  <header className="practice-hero"><span>日用功课</span><h1>{page==="timer"?"一炷清香":"静水流深"}</h1><p>{page==="timer"?"香起一念，心归一处":"一念一行，皆有归处"}</p><time>{year}年{month}月{day}日</time></header>
  <section className="practice-content"><nav className="practice-page-tabs"><button className={page==="records"?"active":""} onClick={()=>setPage("records")}>功课记录</button><button className={page==="timer"?"active":""} onClick={()=>setPage("timer")}>一炷香</button></nav>
  {page==="timer"?<IncenseTimer onRecord={onTimerRecord}/>:<>
   <header><div><span>当日功课</span><h2>{items.length?"今日已有所行":"今日尚待起行"}</h2></div><button onClick={onAdd}>＋ 记功课</button></header>
   {totals.length?<div className="practice-totals">{totals.map(x=><div data-kind={x.kind} key={`${x.kind}-${x.unit}`}><span>{x.kind}</span><strong>{x.amount.toLocaleString()}</strong><small>{x.unit}</small></div>)}</div>:<div className="practice-empty"><i>○</i><p>不求多，只求恒</p><button onClick={onAdd}>记下第一笔</button></div>}
   <section className="practice-history"><header><div className="practice-history-tabs"><button className={historyView==="week"?"active":""} onClick={()=>setHistoryView("week")}>近七日</button><button className={historyView==="month"?"active":""} onClick={()=>setHistoryView("month")}>月历</button></div>{historyView==="week"?<small>{week.filter(x=>x.count>0).length} 日有功课</small>:<small>朱砂点为有功课</small>}</header>
   {historyView==="week"?<div className="practice-week"><nav><button onClick={()=>setWeekOffset(x=>x-1)} aria-label="前一周">‹</button><span>{weekRange}</span><button disabled={weekOffset>=0} onClick={()=>setWeekOffset(x=>x+1)} aria-label="后一周">›</button></nav><div>{week.map(x=><button key={`${x.year}-${x.month}-${x.day}`} onClick={()=>onSelectDate(x.year,x.month,x.day)}><i style={{height:`${8+28*x.count/max}px`}} className={x.count?"filled":""}/><b>{x.label}</b><small>{x.day}</small></button>)}</div></div>:<div className="practice-month"><nav><button onClick={()=>moveDisplayMonth(-1)} aria-label="上个月">‹</button><strong>{display.year}年{display.month}月</strong><button onClick={()=>moveDisplayMonth(1)} aria-label="下个月">›</button></nav><div className="practice-month-week">{["一","二","三","四","五","六","日"].map(x=><span key={x}>{x}</span>)}</div><div className="practice-month-grid">{monthCells.map((n,i)=>{const has=n>0&&practiceOnDate(logs,display.year,display.month,n).length>0,selected=display.year===year&&display.month===month&&n===day;return n?<button key={i} className={`${has?"has-practice":""} ${selected?"selected":""}`} onClick={()=>onSelectDate(display.year,display.month,n)}><span>{n}</span>{has&&<i/>}</button>:<i key={i}/>})}</div></div>}</section>
   {items.length>0&&<section className="practice-records grouped"><header><span>当日明细</span><small>{recordGroups.length} 项 · {items.length} 笔</small></header>{recordGroups.map(group=>{const timerCount=group.entries.filter(x=>x.note.includes("一炷香计时")).length;return <details data-kind={group.kind} key={`${group.kind}-${group.unit}`}><summary><i/><div className="practice-record-main"><span>{group.kind}</span><p><strong>{group.amount.toLocaleString()}</strong><small>{group.unit}</small></p><em>{group.entries.length>1?`合并 ${group.entries.length} 笔${timerCount?` · 含 ${timerCount} 次一炷香计时`:""}`:group.entries[0].note||"一笔功课"}</em></div><b>⌄</b></summary><div className="practice-group-entries">{group.entries.sort((a,b)=>b.createdAt-a.createdAt).map(x=><article key={x.id}><p><strong>{x.amount.toLocaleString()} {x.unit}</strong><small>{x.note||"手动记录"}</small></p><div className="practice-record-actions"><button onClick={()=>onEdit(x)}>修改</button><button onClick={()=>onRemove(x.id)}>删除</button></div></article>)}</div></details>})}</section>}
  </>}</section>
 </main>;
}
