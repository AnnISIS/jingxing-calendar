"use client";
import type {PersonalEvent} from "./data/personal-events";
import {personalOnDate} from "./data/personal-events";
export function PersonalDay({year,month,day,events,onAdd,onEdit,onRemove}:{year:number;month:number;day:number;events:PersonalEvent[];onAdd:()=>void;onEdit:(event:PersonalEvent)=>void;onRemove:(id:string)=>void;onSelectDate:(year:number,month:number,day:number)=>void}){
 const items=personalOnDate(events,year,month,day);
 return <section className={`personal-day ${items.length?"has-items":""}`}><header><span>个人日历</span><button onClick={onAdd}>＋ 新记一事</button></header><div className="personal-body">{items.length?<div className="personal-items">{items.map(item=><article key={item.id}><i/><span><strong>{item.title}</strong><small>{item.kind}{item.yearly?" · 每年":""}</small></span><div><button onClick={()=>onEdit(item)}>修改</button><button onClick={()=>onRemove(item.id)} aria-label={`删除${item.title}`}>删除</button></div></article>)}</div>:<div className="personal-empty"><strong>此日无个人记事</strong><span>清净无事，亦是好日</span></div>}</div></section>;
}
