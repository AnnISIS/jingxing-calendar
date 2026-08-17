import {DailyInfo} from "../DailyInfo";
import {getTraditionalTime} from "../data/traditional-time";

export type OrdinaryVariant = "amitabha" | "mountain" | "lotus" | "moon" | "guanyin-gold" | "guanyin-watermoon" | "guanyin-willow" | "guanyin-nine-lotus" | "guanyin-seated" | "guanyin-standing" | "guanyin-white-blue" | "guanyin-cheng" | "guanyin-thousand-arms" | "guanyin-four-arms" | "guanyin-white-scroll" | "guanyin-lotus-moon" | "guanyin-dragon" | "amitabha-descending";

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
    amitabha: { caption:"时序清宁，常随佛行", image:"/ordinary-amitabha.webp", alt:"西方三圣行云图" },
    mountain: { caption:"白云生远岫，清露满空山", image:"/summer-mountain.jpg", alt:"夏季山居图" },
    lotus: { caption:"风过莲池，香远益清", image:"", alt:"莲池清晓" },
    moon: { caption:"松间明月，照见本心", image:"/moon-mountain.jpg", alt:"秋山山水图" },
    "guanyin-gold": {caption:"慈眼视众生，清风满人间",image:"/ordinary-guanyin-gold.webp",alt:"白衣观世音菩萨立像"},
    "guanyin-watermoon": {caption:"水月澄明，莲心自在",image:"/ordinary-guanyin-watermoon.webp",alt:"水月观世音菩萨坐像"},
    "guanyin-willow": {caption:"杨枝洒净，愿海清凉",image:"/ordinary-guanyin-willow.webp",alt:"杨柳净瓶观世音菩萨立像"},
    "guanyin-nine-lotus": {caption:"莲开九品，慈航普度",image:"/ordinary-guanyin-nine-lotus.webp",alt:"明代九莲观世音菩萨像"},
    "guanyin-seated": {caption:"慈容寂静，照见清凉",image:"/ordinary-guanyin-seated.webp",alt:"宋元观世音菩萨坐像"},
    "guanyin-standing": {caption:"杨枝遍洒，愿海澄清",image:"/ordinary-guanyin-standing.webp",alt:"杨柳观世音菩萨立像"},
    "guanyin-white-blue": {caption:"慈光澄澈，清净自在",image:"/ordinary-guanyin-white-blue.webp",alt:"白衣观世音菩萨立像"},
    "guanyin-cheng": {caption:"观自在心，听潮无声",image:"/ordinary-guanyin-cheng.webp",alt:"程宗元观世音菩萨坐像"},
    "guanyin-thousand-arms": {caption:"千处祈求，千处应现",image:"/ordinary-guanyin-thousand-arms.webp",alt:"千手千眼观世音菩萨唐卡"},
    "guanyin-four-arms": {caption:"慈悲喜舍，念念清明",image:"/ordinary-guanyin-four-arms.webp",alt:"四臂观世音菩萨唐卡"},
    "guanyin-white-scroll": {caption:"白衣映月，慈航静远",image:"/ordinary-guanyin-white-scroll.webp",alt:"白衣观世音菩萨长卷"},
    "guanyin-lotus-moon": {caption:"莲心无染，月印千江",image:"/ordinary-guanyin-lotus-moon.webp",alt:"莲月白衣观世音菩萨像"},
    "guanyin-dragon": {caption:"乘愿渡海，慈护群生",image:"/ordinary-guanyin-dragon.webp",alt:"乘龙白衣观世音菩萨像"},
    "amitabha-descending": {caption:"光明遍照，摄取不舍",image:"/ordinary-amitabha-descending.webp",alt:"南宋阿弥陀佛接引图"},
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
        {(variant === "amitabha" || variant === "amitabha-descending") && <div className="companion-seal">常随弥陀</div>}

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
