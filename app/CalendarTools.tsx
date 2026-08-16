"use client";
import {useEffect,useMemo,useState} from "react";
import {Lunar,Solar} from "lunar-javascript";
import {Body,Observer,SearchHourAngle,SearchRiseSet} from "astronomy-engine";
import {festivalsForYear} from "./data/festivals";

type ToolTab="search"|"convert"|"noon"|"settings";
const LOCATIONS=[
  ["北京","天安门广场",39.904569,116.391389],["东林寺","庐山东林寺",29.601111,115.944167],
  ["拉萨","大昭寺",29.653056,91.132222],["殊像寺","五台山殊像寺",39.002922,113.586501],
  ["峨眉山","峨眉山金顶",29.525833,103.336667],["九华山","九华山化城寺",30.480928,117.797321],
  ["普陀山","普陀山普济寺",29.987778,122.382472],["南华寺","曹溪南华寺",24.649167,113.631389],
] as const;
const pad=(n:number)=>String(n).padStart(2,"0");
function solarNoon(year:number,month:number,day:number,latitude:number,longitude:number){
  const beijingMidnightUtc=new Date(Date.UTC(year,month-1,day)-8*3600000);
  const instant=SearchHourAngle(Body.Sun,new Observer(latitude,longitude,0),0,beijingMidnightUtc,+1).time.date;
  const beijingTime=new Date(instant.getTime()+8*3600000);
  return `${pad(beijingTime.getUTCHours())}:${pad(beijingTime.getUTCMinutes())}`;
}
function solarDay(year:number,month:number,day:number,latitude:number,longitude:number){
  const start=new Date(Date.UTC(year,month-1,day)-8*3600000),observer=new Observer(latitude,longitude,0);
  const format=(date:Date|null)=>{if(!date)return "—";const local=new Date(date.getTime()+8*3600000);return `${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`};
  return {rise:format(SearchRiseSet(Body.Sun,observer,+1,start,1)?.date||null),noon:solarNoon(year,month,day,latitude,longitude),set:format(SearchRiseSet(Body.Sun,observer,-1,start,1)?.date||null)};
}

export function CalendarTools({year,month,day,onSelectDate,traditional,setTraditional,weekStart,setWeekStart}:{year:number;month:number;day:number;onSelectDate:(y:number,m:number,d:number)=>void;traditional:boolean;setTraditional:(v:boolean)=>void;weekStart:"monday"|"sunday";setWeekStart:(v:"monday"|"sunday")=>void}){
  const [tab,setTab]=useState<ToolTab>("search"),[query,setQuery]=useState("");
  const [solarInput,setSolarInput]=useState(`${year}-${pad(month)}-${pad(day)}`);
  const [noonDate,setNoonDate]=useState(`${year}-${pad(month)}-${pad(day)}`);
  const [noonPickerOpen,setNoonPickerOpen]=useState(false);
  const [pickerMonth,setPickerMonth]=useState({year,month});
  const [lunarInput,setLunarInput]=useState({year,month:7,day:4,leap:false});
  const searchable=useMemo(()=>[
    ...festivalsForYear(year).map(x=>({month:x.month,day:x.day,title:x.title,subtitle:`农历${x.lunar}`,kind:x.kind,keywords:`${x.title}${x.short}${x.lunar}${x.lunar==="腊月初八"?"腊八":""}`})),
  ],[year]);
  const searchResults=useMemo(()=>searchable.filter(x=>!query.trim()||x.keywords.includes(query.trim())),[query,searchable]);
  const solarResult=useMemo(()=>{try{const [y,m,d]=solarInput.split("-").map(Number);const lunar=Solar.fromYmd(y,m,d).getLunar();return {lunar:`${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,ganzhi:`${lunar.getYearInGanZhi()}年 · ${lunar.getMonthInGanZhi()}月 · ${lunar.getDayInGanZhi()}日`,buddhist:y+544}}catch{return null}},[solarInput]);
  const lunarResult=useMemo(()=>{try{const lunar=Lunar.fromYmd(lunarInput.year,lunarInput.leap?-lunarInput.month:lunarInput.month,lunarInput.day);return lunar.getSolar().toYmd()}catch{return "该农历日期不存在"}},[lunarInput]);
  useEffect(()=>{setSolarInput(`${year}-${pad(month)}-${pad(day)}`);setNoonDate(`${year}-${pad(month)}-${pad(day)}`)},[year,month,day]);
  const [noonYear,noonMonth,noonDay]=noonDate.split("-").map(Number);
  const openNoonPicker=()=>{setPickerMonth({year:noonYear,month:noonMonth});setNoonPickerOpen(x=>!x)};
  const movePickerMonth=(amount:number)=>{const d=new Date(pickerMonth.year,pickerMonth.month-1+amount,1);setPickerMonth({year:d.getFullYear(),month:d.getMonth()+1})};
  const pickerFirst=(new Date(pickerMonth.year,pickerMonth.month-1,1).getDay()+6)%7;
  const pickerDays=new Date(pickerMonth.year,pickerMonth.month,0).getDate();
  const chooseNoonDate=(chosenDay:number)=>{setNoonDate(`${pickerMonth.year}-${pad(pickerMonth.month)}-${pad(chosenDay)}`);setNoonPickerOpen(false)};
  return <main className="site-shell tools-site">
    <header className="tools-hero"><span>近显日历</span><button className={`tools-settings-button ${tab==="settings"?"active":""}`} onClick={()=>setTab(tab==="settings"?"search":"settings")} aria-label={tab==="settings"?"返回查阅":"打开设置"}><i>⚙</i>{tab==="settings"?"返回":"设置"}</button><h1>查阅</h1><p>搜索、日期转换与传统时间查阅</p></header>
    <nav className={`tool-tabs ${tab==="settings"?"settings-open":""}`}>{[["search","搜索"],["convert","转换"],["noon","日照时刻"]].map(([id,label])=><button className={tab===id?"active":""} key={id} onClick={()=>setTab(id as ToolTab)}>{label}</button>)}</nav>
    <section className="tools-content">
      {tab==="search"&&<><label className="search-box"><span>搜索佛菩萨纪念日</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="例如：观音、腊八、成道"/></label><p className="search-count">{query.trim()?`找到 ${searchResults.length} 条`:`${year}年共收录 ${searchResults.length} 条，按公历日期排列`}</p><div className="search-results">{searchResults.map((item,index)=><button key={`${item.month}-${item.day}-${index}`} onClick={()=>onSelectDate(year,item.month,item.day)}><time>{item.month}月{item.day}日<small>{item.subtitle}</small></time><span>{item.title}<small>{item.kind}</small></span><b>›</b></button>)}{searchResults.length===0&&<p>没有找到对应日期</p>}</div></>}
      {tab==="convert"&&<div className="converter-stack"><section><span>公历转农历</span><input type="date" min="1900-01-01" max="2100-12-31" value={solarInput} onChange={e=>setSolarInput(e.target.value)}/>{solarResult&&<div className="conversion-result"><strong>农历{solarResult.lunar}</strong><p>佛历{solarResult.buddhist}年</p><small>{solarResult.ganzhi}</small></div>}</section><section><span>农历转公历</span><div className="lunar-fields"><input aria-label="农历年份" type="number" value={lunarInput.year} onChange={e=>setLunarInput({...lunarInput,year:Number(e.target.value)})}/><input aria-label="农历月份" type="number" min="1" max="12" value={lunarInput.month} onChange={e=>setLunarInput({...lunarInput,month:Number(e.target.value)})}/><input aria-label="农历日期" type="number" min="1" max="30" value={lunarInput.day} onChange={e=>setLunarInput({...lunarInput,day:Number(e.target.value)})}/></div><label className="leap-check"><input type="checkbox" checked={lunarInput.leap} onChange={e=>setLunarInput({...lunarInput,leap:e.target.checked})}/>闰月</label><div className="conversion-result"><strong>公历 {lunarResult}</strong></div></section></div>}
      {tab==="noon"&&<><header className="selected-time"><div className="noon-title-row"><h2>八地日照</h2><button className="noon-date-chip" onClick={openNoonPicker} aria-expanded={noonPickerOpen}>{noonYear}年{noonMonth}月{noonDay}日</button></div>{noonPickerOpen&&<div className="mini-date-picker compact"><header><button onClick={()=>movePickerMonth(-1)} aria-label="上个月">‹</button><strong>{pickerMonth.year}年{pickerMonth.month}月</strong><button onClick={()=>movePickerMonth(1)} aria-label="下个月">›</button></header><div className="mini-week">{["一","二","三","四","五","六","日"].map(x=><span key={x}>{x}</span>)}</div><div className="mini-days">{Array.from({length:pickerFirst},(_,i)=><i key={`blank-${i}`}/>)}{Array.from({length:pickerDays},(_,i)=>i+1).map(n=><button className={pickerMonth.year===noonYear&&pickerMonth.month===noonMonth&&n===noonDay?"selected":""} key={n} onClick={()=>chooseNoonDate(n)}>{n}</button>)}</div></div>}<p>依所选地点显示北京时间；正午为太阳到达当日最高位置的时刻。</p></header><div className="noon-list solar-day-list"><header><span>地点</span><small>日出</small><small>正午</small><small>日落</small></header>{LOCATIONS.map(([name,formal,latitude,longitude])=>{const times=solarDay(noonYear,noonMonth,noonDay,latitude,longitude);return <div key={name}><span>{name}<small>{formal}</small></span><time>{times.rise}</time><time>{times.noon}</time><time>{times.set}</time></div>})}</div></>}
      {tab==="settings"&&<div className="settings-list"><header><span>全站设置</span><p>这些选择会保存在当前设备中</p></header><section><div><strong>文字</strong><span>全站简体或繁体显示</span></div><div className="segmented"><button className={!traditional?"active":""} onClick={()=>setTraditional(false)}>简体</button><button className={traditional?"active":""} onClick={()=>setTraditional(true)}>繁体</button></div></section><section><div><strong>每周第一天</strong><span>调整月历星期排列</span></div><div className="segmented"><button className={weekStart==="monday"?"active":""} onClick={()=>setWeekStart("monday")}>星期一</button><button className={weekStart==="sunday"?"active":""} onClick={()=>setWeekStart("sunday")}>星期日</button></div></section><section className="dataset-note"><div><strong>已合并的数据层</strong><span>完整农历、闰月、佛历、干支、十二时辰、二十四节气、七十二候、六斋日、十斋日与佛菩萨纪念日。</span></div></section></div>}
    </section>
  </main>;
}
