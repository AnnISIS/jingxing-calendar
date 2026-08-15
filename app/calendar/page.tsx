"use client";
import {useState} from "react";
import {CalendarView} from "./CalendarView";
export default function CalendarPage(){const [date,setDate]=useState({month:8,day:15});return <CalendarView month={date.month} day={date.day} onChange={(month,day)=>setDate({month,day})} onViewDay={()=>location.href="/"}/>}
