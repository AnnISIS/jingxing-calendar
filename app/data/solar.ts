import {Body,Observer,SearchHourAngle} from "astronomy-engine";

const LOCATIONS=[
  {name:"北京",detail:"天安门广场",latitude:39.904569,longitude:116.391389},
  {name:"庐山",detail:"庐山东林寺",latitude:29.601111,longitude:115.944167},
] as const;
const pad=(value:number)=>String(value).padStart(2,"0");

function solarNoon(year:number,month:number,day:number,latitude:number,longitude:number){
  const beijingMidnightUtc=new Date(Date.UTC(year,month-1,day)-8*3600000);
  const instant=SearchHourAngle(Body.Sun,new Observer(latitude,longitude,0),0,beijingMidnightUtc,+1).time.date;
  const beijingTime=new Date(instant.getTime()+8*3600000);
  return `${pad(beijingTime.getUTCHours())}:${pad(beijingTime.getUTCMinutes())}`;
}

export function dailySolarNoons(year:number,month:number,day:number){
  return LOCATIONS.map(location=>({...location,time:solarNoon(year,month,day,location.latitude,location.longitude)}));
}
