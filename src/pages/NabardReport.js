import React,{useEffect,useState} from "react";
import {Download,FileText} from "lucide-react";
import api from "../services/api";

export default function NabardReport(){
  const [data,setData]=useState(null);
  useEffect(()=>{api.get("/reports/nabard").then(r=>setData(r.data)).catch(()=>{});},[]);
  return <>
    <div className="page-head"><div><span className="eyebrow">COMPLIANCE</span><h2>NABARD Report</h2><p>Management summary generated from current FPO data.</p></div>{data&&<button className="secondary" onClick={()=>window.print()}><Download size={16}/> Print / Save PDF</button>}</div>
    {data?<div className="report-card"><div className="report-title"><div className="report-icon"><FileText/></div><div><h3>{data.reportName}</h3><span>Generated {String(data.generatedAt||"").replace("T"," ")}</span></div></div><div className="report-metrics">{Object.entries(data).filter(([k])=>!["reportName","generatedAt"].includes(k)).map(([k,v])=><div key={k}><span>{k.replaceAll("_"," ")}</span><b>{String(v)}</b></div>)}</div></div>:<div className="empty">Report unavailable for this role.</div>}
  </>;
}