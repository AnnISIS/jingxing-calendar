import type {Festival} from "./data/festivals";
import {DailyInfo} from "./DailyInfo";
export function FestivalPoster({festival,onOpenCalendar,onSelectDate}:{festival:Festival;onOpenCalendar:()=>void;onSelectDate:(month:number,day:number)=>void}){
  const isNirvana=festival.kind==="涅槃";
  return <main className="site-shell festival-view embedded-view"><section className={`festival-poster ${isNirvana?"nirvana-poster":""}`}>{isNirvana&&<img className="festival-image-backdrop" src={festival.image} alt="" aria-hidden="true"/>}<img className="festival-image" src={festival.image} alt={festival.title}/><div className="festival-veil"/><div className="festival-kicker">佛菩萨纪念日</div><div className="festival-copy"><p>农历{festival.lunar}</p><h1>{festival.title}</h1><div><span>{festival.kind}</span><i/>公历二〇二六年{festival.month}月{festival.day}日</div></div></section><section className="festival-info"><span>今日纪念</span><h2>{festival.title}</h2><p>恭逢殊胜纪念日，谨依年度佛诞资料收录。</p><DailyInfo month={festival.month} day={festival.day} onOpenCalendar={onOpenCalendar} onSelectDate={onSelectDate}/></section></main>
}
