import type {Festival} from "./data/festivals";
import {PersonalDay} from "./PersonalDay";
import type {PersonalEvent} from "./data/personal-events";
type PersonalProps={events:PersonalEvent[];onAdd:()=>void;onEdit:(event:PersonalEvent)=>void;onRemove:(id:string)=>void;onSelectDate:(year:number,month:number,day:number)=>void};
export function FestivalPoster({year,festival,onOpenCalendar,personal}:{year:number;festival:Festival;onOpenCalendar:()=>void;personal?:PersonalProps}){
  return <main className="site-shell festival-view embedded-view"><section className="festival-poster"><img src={festival.image} alt={festival.title}/><div className="festival-veil"/><div className="festival-kicker">佛菩萨纪念日</div><div className="festival-copy"><p>农历{festival.lunar}</p><h1>{festival.title}</h1><div><span>{festival.kind}</span><i/>公历{year}年{festival.month}月{festival.day}日</div></div></section><section className="festival-info">{personal&&<PersonalDay year={year} month={festival.month} day={festival.day} {...personal}/>}</section></main>
}
