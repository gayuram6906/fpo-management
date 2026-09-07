import React,{useEffect,useState} from "react";
import {Search} from "lucide-react";
import api from "../services/api";

export default function Members(){
  const [data,setData]=useState([]);
  const [q,setQ]=useState("");

  useEffect(()=>{api.get("/members").then(r=>setData(r.data)).catch(()=>setData([]));},[]);

  const filtered=data.filter(m=>
    (m.name+" "+m.memberId+" "+m.village).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="page-head">
        <div><span className="eyebrow">FARMER NETWORK</span><h2>Members</h2><p>Manage registered FPO farmer members.</p></div>
      </div>
      <div className="toolbar"><div className="search"><Search size={18}/><input placeholder="Search member, ID or village" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
      <div className="panel">
        <table><thead><tr><th>ID</th><th>Member</th><th>Village</th><th>Phone</th><th>Land</th><th>Share Capital</th><th>Status</th></tr></thead>
        <tbody>{filtered.map(m=><tr key={m.id}><td>{m.memberId}</td><td><b>{m.name}</b></td><td>{m.village}</td><td>{m.phone}</td><td>{m.landHoldingAcres} ac</td><td>₹{m.shareCapital}</td><td><span className="badge success">{m.status}</span></td></tr>)}</tbody></table>
        {!filtered.length&&<div className="empty">No members found.</div>}
      </div>
    </>
  );
}