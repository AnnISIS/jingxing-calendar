export type PracticeKind="念佛"|"持咒"|"诵经"|"拜佛"|"静坐";
export type PracticeLog={id:string;year?:number;month:number;day:number;kind:PracticeKind;amount:number;unit:string;note:string;createdAt:number};
export const PRACTICE_LOGS_KEY="jingxing-practice-logs";
export const PRACTICE_UNITS:Record<PracticeKind,string>={念佛:"声",持咒:"遍",诵经:"部",拜佛:"拜",静坐:"分钟"};
export const practiceOnDate=(logs:PracticeLog[],year:number,month:number,day:number)=>logs.filter(x=>(x.year??2026)===year&&x.month===month&&x.day===day);
