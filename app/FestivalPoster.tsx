import type {Festival} from "./data/festivals";
import {dharmaOnDate,formatDharmaDate} from "./data/dharma";
export function FestivalPoster({festival,onOpenCalendar}:{festival:Festival;onOpenCalendar:()=>void}){
  const dharma=dharmaOnDate(festival.month,festival.day);
  return <main className="site-shell festival-view embedded-view"><section className="festival-poster"><img src={festival.image} alt={festival.title}/><div className="festival-veil"/><div className="festival-kicker">佛菩萨纪念日</div><div className="festival-copy"><p>农历{festival.lunar}</p><h1>{festival.title}</h1><div><span>{festival.kind}</span><i/>公历二〇二六年{festival.month}月{festival.day}日</div></div></section><section className="festival-info"><span>今日纪念</span><h2>{festival.title}</h2><p>恭逢殊胜纪念日，谨依年度佛诞资料收录。</p>{dharma.length>0&&<div className="festival-dharma"><header><i/><span>今日东林法务</span></header>{dharma.map((item,index)=><a href={item.source} target="_blank" rel="noreferrer" key={index}><div><strong>{item.title}</strong><small>{formatDharmaDate(item)} · {item.place}</small></div><em>官网详情 ›</em></a>)}</div>}<button onClick={onOpenCalendar}>返回全年日历</button></section></main>
}
