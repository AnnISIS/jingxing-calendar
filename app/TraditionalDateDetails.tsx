"use client";
import {useEffect,useState} from "react";
import {getTraditionalTime} from "./data/traditional-time";

export function TraditionalDateDetails({year,month,day}:{year:number;month:number;day:number}){
  const [clock,setClock]=useState({hour:12,minute:0});
  useEffect(()=>{const now=new Date();setClock({hour:now.getHours(),minute:now.getMinutes()})},[]);
  const realNow=new Date();
  const selectedIsRealToday=realNow.getFullYear()===year&&realNow.getMonth()+1===month&&realNow.getDate()===day;
  const info=getTraditionalTime(year,month,day,selectedIsRealToday?clock.hour:12,selectedIsRealToday?clock.minute:0);
  return <section className="traditional-date" aria-label="传统日期信息预览">
    <header><div><span>干支与时辰</span><h2>{info.ganzhi.year}年 · {info.ganzhi.month}月 · {info.ganzhi.day}日</h2></div>{info.fasting.length>0&&<b>{info.fasting.join(" · ")}</b>}</header>
    <div className="ganzhi-time"><span>{selectedIsRealToday?"此刻":"所选日正午"}</span><strong>{info.shichen}时</strong><i/>
      <p>{info.shichenRange}<small>{info.ganzhi.time}时</small></p>
    </div>
    <div className="next-term"><span>下一节气</span><strong>{info.nextTerm}</strong><time>{info.nextTermAt}</time><b>尚余 {info.countdown}</b></div>
  </section>;
}
