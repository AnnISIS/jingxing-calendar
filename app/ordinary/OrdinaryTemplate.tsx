import {DailyInfo} from "../DailyInfo";
import {getTraditionalTime} from "../data/traditional-time";

export type OrdinaryVariant = "amitabha" | "mountain" | "lotus" | "moon" | "guanyin-gold" | "guanyin-watermoon" | "guanyin-willow";

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
);

const variants = [
  ["/", "弥陀", "#9a8a69"], ["/ordinary/mountain", "云水", "#768778"],
  ["/ordinary/lotus", "莲池", "#9d756f"], ["/ordinary/moon", "松月", "#536477"],
];

export function OrdinaryTemplate({ variant, embedded=false, month=8, day=15, weekday="星期六", lunarLabel="七月初三", onOpenCalendar, onSelectDate }: { variant: OrdinaryVariant; embedded?: boolean; month?:number; day?: number; weekday?: string; lunarLabel?: string; onOpenCalendar?:()=>void; onSelectDate?:(month:number,day:number)=>void }) {
  const traditional=getTraditionalTime(2026,month,day);
  const meta = {
    amitabha: { caption:"时序清宁，常随佛行", image:"/amitabha-companion.jpg", alt:"西方三圣行云图" },
    mountain: { caption:"白云生远岫，清露满空山", image:"/summer-mountain.jpg", alt:"夏季山居图" },
    lotus: { caption:"风过莲池，香远益清", image:"", alt:"莲池清晓" },
    moon: { caption:"松间明月，照见本心", image:"/moon-mountain.jpg", alt:"秋山山水图" },
    "guanyin-gold": {caption:"慈眼视众生，清风满人间",image:"/ordinary-guanyin-gold.jpg",alt:"白衣观世音菩萨立像"},
    "guanyin-watermoon": {caption:"水月澄明，莲心自在",image:"/ordinary-guanyin-watermoon.png",alt:"水月观世音菩萨坐像"},
    "guanyin-willow": {caption:"杨枝洒净，愿海清凉",image:"/ordinary-guanyin-willow.jpg",alt:"杨柳净瓶观世音菩萨立像"},
  }[variant];

  return (
    <main className={`site-shell ordinary-site variant-${variant} ${embedded?"embedded-view":""}`}>
      <section className="ordinary-poster" aria-label={`${meta.alt}普通日佛历海报`}>
        {meta.image && <img className="ordinary-art-background" src={meta.image} alt={meta.alt} />}
        {variant === "lotus" && <div className="lotus-pond" aria-hidden="true"><i/><i/><i/><i/><i/><b/><b/><span/></div>}
        {variant === "moon" && <div className="moon-disc" aria-hidden="true" />}
        <div className="ordinary-veil" />
        <div className="paper-grain" />
        <div className="season-note"><i /><span>{traditional.hou}<small>{traditional.wuHou}</small></span></div>
        {variant === "amitabha" && <div className="companion-seal">常随弥陀</div>}

        <div className="ordinary-date">
          <p>二〇二六年{month}月</p><strong>{day}</strong>
          <div><span>{weekday}</span><i /><span>农历{lunarLabel}</span></div>
        </div>
        <div className="ordinary-footer"><p>佛历二五七〇年</p><span>{meta.caption}</span></div>
      </section>

      <section className="content-sheet editorial-content ordinary-content">
        {onOpenCalendar&&onSelectDate&&<DailyInfo month={month} day={day} onOpenCalendar={onOpenCalendar} onSelectDate={onSelectDate}/>}

        {!embedded&&<div className="variant-picker" aria-label="普通日母版预览">
          <p>普通日画境</p>
          <div>{variants.map(([href,label,color]) => <a key={href} href={href} className={href === (variant === "amitabha" ? "/" : `/ordinary/${variant}`) ? "selected" : ""}><i style={{background:color}} />{label}</a>)}</div>
        </div>}
        {!embedded&&<a className="template-link" href="/memorial">查看佛菩萨纪念日母版</a>}
      </section>

      {!embedded&&<nav className="bottom-nav" aria-label="主导航">
        <a className="active" href="/"><span className="today-dot">●</span><b>今日</b></a>
        <a href="/calendar"><CalendarIcon /><b>日历</b></a>
      </nav>}
    </main>
  );
}
