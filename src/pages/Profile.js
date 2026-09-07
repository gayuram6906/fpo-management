import React,{useEffect,useState} from "react";
import {UserRound} from "lucide-react";
import api from "../services/api";

export default function Profile(){
  const [data,setData]=useState(null);
  useEffect(()=>{api.get("/users/profile").then(r=>setData(r.data)).catch(()=>{});},[]);
  return <>
    <div className="page-head"><div><span className="eyebrow">ACCOUNT</span><h2>Profile</h2><p>Your authenticated FPO account.</p></div></div>
    {data?<div className="profile-card"><div className="profile-avatar"><UserRound size={35}/></div><h3>{data.name}</h3><p>{data.email}</p><div className="profile-fields">{Object.entries(data).map(([k,v])=><div key={k}><span>{k.replaceAll("_"," ")}</span><b>{String(v)}</b></div>)}</div></div>:<div className="empty">Unable to load profile.</div>}
  </>;
}