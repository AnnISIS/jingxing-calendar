export type DharmaEvent={startMonth:number;startDay:number;endMonth?:number;endDay?:number;title:string;short:string;place:string;source:string};
export const dharmaEvents:DharmaEvent[]=[
{startMonth:1,startDay:1,endMonth:1,endDay:11,title:"百万佛号闭关",short:"佛号闭关",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"},
{startMonth:1,startDay:1,endMonth:1,endDay:16,title:"冬季佛七（前四七·年内段）",short:"冬季佛七",place:"东林祖庭／净土苑",source:"https://fo.china.com/fonews/society/20003541/20250816/25971946_all.html"},
{startMonth:1,startDay:2,title:"超度普佛",short:"超度普佛",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"},
{startMonth:1,startDay:3,title:"吉祥普佛",short:"吉祥普佛",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"},
{startMonth:1,startDay:5,title:"传授三皈五戒",short:"三皈五戒",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"},
{startMonth:1,startDay:11,title:"吉祥普佛／超度普佛",short:"两序普佛",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"},
{startMonth:1,startDay:18,title:"吉祥普佛／超度普佛",short:"两序普佛",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"},
{startMonth:1,startDay:19,endMonth:2,endDay:11,title:"冬季二十四天闭关",short:"冬季闭关",place:"东林祖庭",source:"https://fo.china.com/fonews/society/20003541/20250816/25971946_all.html"},
{startMonth:1,startDay:20,endMonth:2,endDay:9,title:"冬季佛七（后三七）",short:"冬季佛七",place:"东林祖庭／净土苑",source:"https://fo.china.com/fonews/society/20003541/20250816/25971946_all.html"},
{startMonth:1,startDay:26,title:"腊八吉祥普佛／超度普佛／三皈五戒",short:"腊八法务",place:"东林祖庭",source:"https://fo.sina.cn/2026-01-01/detail-inhetyxu8647766.d.html"}
];
export const dharmaStarting=(m:number,d:number)=>dharmaEvents.filter(x=>x.startMonth===m&&x.startDay===d);
export const dharmaOnDate=(m:number,d:number)=>dharmaEvents.filter(x=>{
  const current=new Date(2026,m-1,d).getTime(), start=new Date(2026,x.startMonth-1,x.startDay).getTime();
  const end=new Date(2026,(x.endMonth||x.startMonth)-1,x.endDay||x.startDay).getTime();
  return current>=start&&current<=end;
});
export const formatDharmaDate=(x:DharmaEvent)=>x.endDay?`${x.startMonth}月${x.startDay}日—${x.endMonth}月${x.endDay}日`:`${x.startMonth}月${x.startDay}日`;
