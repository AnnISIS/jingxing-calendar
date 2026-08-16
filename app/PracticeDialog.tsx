"use client";
import {useEffect,useState} from "react";
import type {PracticeKind,PracticeLog} from "./data/practice";
import {PRACTICE_UNITS} from "./data/practice";
const kinds=Object.keys(PRACTICE_UNITS) as PracticeKind[];
export function PracticeDialog({open,year,month,day,editing,onClose,onSave}:{open:boolean;year:number;month:number;day:number;editing?:PracticeLog|null;onClose:()=>void;onSave:(log:PracticeLog)=>void}){
 const [kind,setKind]=useState<PracticeKind>("念佛"),[amount,setAmount]=useState("108"),[note,setNote]=useState("");
 useEffect(()=>{if(open){setKind(editing?.kind||"念佛");setAmount(String(editing?.amount||108));setNote(editing?.note||"")}},[open,editing,month,day]);
 if(!open)return null;
 const save=()=>{const value=Math.max(1,Math.round(Number(amount)));if(!Number.isFinite(value))return;onSave({id:editing?.id||`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,year,month,day,kind,amount:value,unit:PRACTICE_UNITS[kind],note:note.trim(),createdAt:editing?.createdAt||Date.now()});onClose()};
 return <div className="personal-dialog-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="personal-dialog practice-dialog" role="dialog" aria-modal="true" aria-labelledby="practice-dialog-title"><header><span>{month}月{day}日</span><button onClick={onClose} aria-label="关闭">×</button></header><h2 id="practice-dialog-title">{editing?"修改功课":"记一笔功课"}</h2><div className="practice-kinds">{kinds.map(x=><button key={x} className={kind===x?"active":""} onClick={()=>setKind(x)}>{x}</button>)}</div><label className="practice-amount"><span>完成数量</span><input inputMode="numeric" type="number" min="1" value={amount} onChange={e=>setAmount(e.target.value)}/><b>{PRACTICE_UNITS[kind]}</b></label><input className="practice-note-input" value={note} onChange={e=>setNote(e.target.value)} placeholder="随记（选填）"/><button className="personal-save" disabled={!Number(amount)} onClick={save}>{editing?"保存修改":"记入今日"}</button><p>功课数据仅保存在这台设备</p></section></div>;
}
