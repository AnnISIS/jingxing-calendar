export type PersonalEvent={id:string;title:string;year?:number;month:number;day:number;kind:"纪念"|"日程";yearly:boolean};
export const PERSONAL_EVENTS_KEY="jingxing-personal-events";
export const personalOnDate=(events:PersonalEvent[],year:number,month:number,day:number)=>events.filter(x=>x.month===month&&x.day===day&&(x.yearly||(x.year??2026)===year));
export const dayValue=(year:number,month:number,day:number)=>new Date(year,month-1,day).getTime();

export function nextPersonalOccurrence(events:PersonalEvent[],year:number,month:number,day:number){
  const current=dayValue(year,month,day);
  return events.map(event=>{
    let occurrenceYear=event.yearly?year:(event.year??2026);
    let value=dayValue(occurrenceYear,event.month,event.day);
    if(event.yearly&&value<=current){occurrenceYear+=1;value=dayValue(occurrenceYear,event.month,event.day)}
    return {...event,occurrenceYear,value};
  }).filter(x=>x.value>current).sort((a,b)=>a.value-b.value)[0];
}
