"use client";
import {useState} from "react";
import {CalendarView} from "./CalendarView";
export default function CalendarPage(){const [selected,setSelected]=useState(15);return <CalendarView selected={selected} onSelect={setSelected} onViewDay={()=>location.href="/"}/>}
