"use client";
import {useState} from "react";
import {CalendarView} from "./CalendarView";
export default function CalendarPage(){const now=new Date();const [date,setDate]=useState({year:now.getFullYear(),month:now.getMonth()+1,day:now.getDate()});return <CalendarView year={date.year} month={date.month} day={date.day} onChange={(year,month,day)=>setDate({year,month,day})} onViewDay={()=>location.href="/"}/>}
