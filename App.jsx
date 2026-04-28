import React, {useState,useRef,useCallback,useEffect}from"react";
import {
  ResourceAuthenticatedUser, ResourceInternet, ArchitectureServiceAWSWAF, ArchitectureServiceAmazonCloudFront, ArchitectureServiceAmazonRoute53, ResourceElasticLoadBalancingApplicationLoadBalancer, ArchitectureServiceAmazonVirtualPrivateCloud, ArchitectureServiceAmazonAPIGateway, ArchitectureServiceAWSLambda, ArchitectureServiceAmazonEC2, ArchitectureServiceAmazonElasticContainerService, ArchitectureServiceAmazonElasticKubernetesService, ArchitectureServiceAWSFargate, ArchitectureServiceAmazonBedrock, ArchitectureServiceAmazonSageMaker, ArchitectureServiceAmazonSimpleQueueService, ArchitectureServiceAmazonSimpleNotificationService, ArchitectureServiceAmazonEventBridge, ArchitectureServiceAmazonDynamoDB, ArchitectureServiceAmazonRDS, ArchitectureServiceAmazonAurora, ArchitectureServiceAmazonElastiCache, ArchitectureServiceAmazonSimpleStorageService, ArchitectureServiceAmazonElasticBlockStore, ArchitectureServiceAmazonEFS, ArchitectureServiceAmazonCloudWatch, ArchitectureServiceAWSIdentityandAccessManagement
} from "aws-react-icons";

const SERVICES={
  User:{color:"#00FFFF",category:"External",label:"User"},Internet:{color:"#00FFFF",category:"External",label:"Internet"},
  WAF:{color:"#FF4444",category:"Network",label:"WAF"},CloudFront:{color:"#A855F7",category:"Network",label:"CloudFront"},
  Route53:{color:"#A855F7",category:"Network",label:"Route 53"},ALB:{color:"#8C4FFF",category:"Network",label:"ALB"},
  VPC:{color:"#8C4FFF",category:"Network",label:"VPC"},APIGateway:{color:"#F59E0B",category:"API",label:"API Gateway"},
  Lambda:{color:"#FFD700",category:"Compute",label:"Lambda"},EC2:{color:"#FF9900",category:"Compute",label:"EC2"},
  ECS:{color:"#FF9900",category:"Compute",label:"ECS"},EKS:{color:"#FF9900",category:"Compute",label:"EKS"},
  Fargate:{color:"#FF9900",category:"Compute",label:"Fargate"},Bedrock:{color:"#00E5FF",category:"AI",label:"Bedrock"},
  SageMaker:{color:"#00E5FF",category:"AI",label:"SageMaker"},SQS:{color:"#FF6B6B",category:"Messaging",label:"SQS"},
  SNS:{color:"#FF6B6B",category:"Messaging",label:"SNS"},EventBridge:{color:"#FF6B6B",category:"Messaging",label:"EventBridge"},
  DynamoDB:{color:"#4ECDC4",category:"Database",label:"DynamoDB"},RDS:{color:"#4ECDC4",category:"Database",label:"RDS"},
  Aurora:{color:"#4ECDC4",category:"Database",label:"Aurora"},ElastiCache:{color:"#4ECDC4",category:"Database",label:"ElastiCache"},
  S3:{color:"#27AE60",category:"Storage",label:"S3"},EBS:{color:"#27AE60",category:"Storage",label:"EBS"},
  EFS:{color:"#27AE60",category:"Storage",label:"EFS"},CloudWatch:{color:"#E74C3C",category:"Monitoring",label:"CloudWatch"},
  IAM:{color:"#E74C3C",category:"Monitoring",label:"IAM"},
};

const CAT_COLORS={External:"#00FFFF",Network:"#A855F7",API:"#F59E0B",Compute:"#FFD700",AI:"#00E5FF",Messaging:"#FF6B6B",Database:"#4ECDC4",Storage:"#27AE60",Monitoring:"#E74C3C"};

const ALIASES={"user":"User","internet":"Internet","web":"Internet","waf":"WAF","firewall":"WAF","cloudfront":"CloudFront","cdn":"CloudFront","route 53":"Route53","route53":"Route53","dns":"Route53","alb":"ALB","load balancer":"ALB","vpc":"VPC","api gateway":"APIGateway","api":"APIGateway","gateway":"APIGateway","lambda":"Lambda","function":"Lambda","serverless":"Lambda","ec2":"EC2","server":"EC2","ecs":"ECS","container":"ECS","docker":"ECS","eks":"EKS","kubernetes":"EKS","fargate":"Fargate","bedrock":"Bedrock","llm":"Bedrock","claude":"Bedrock","sagemaker":"SageMaker","ml":"SageMaker","sqs":"SQS","queue":"SQS","sns":"SNS","notification":"SNS","eventbridge":"EventBridge","events":"EventBridge","dynamodb":"DynamoDB","dynamo":"DynamoDB","nosql":"DynamoDB","rds":"RDS","database":"RDS","aurora":"Aurora","elasticache":"ElastiCache","redis":"ElastiCache","cache":"ElastiCache","s3":"S3","bucket":"S3","storage":"S3","ebs":"EBS","efs":"EFS","cloudwatch":"CloudWatch","monitor":"CloudWatch","iam":"IAM"};

const ICONS = {
  User: ResourceAuthenticatedUser, Internet: ResourceInternet, WAF: ArchitectureServiceAWSWAF, CloudFront: ArchitectureServiceAmazonCloudFront, Route53: ArchitectureServiceAmazonRoute53, ALB: ResourceElasticLoadBalancingApplicationLoadBalancer, VPC: ArchitectureServiceAmazonVirtualPrivateCloud, APIGateway: ArchitectureServiceAmazonAPIGateway, Lambda: ArchitectureServiceAWSLambda, EC2: ArchitectureServiceAmazonEC2, ECS: ArchitectureServiceAmazonElasticContainerService, EKS: ArchitectureServiceAmazonElasticKubernetesService, Fargate: ArchitectureServiceAWSFargate, Bedrock: ArchitectureServiceAmazonBedrock, SageMaker: ArchitectureServiceAmazonSageMaker, SQS: ArchitectureServiceAmazonSimpleQueueService, SNS: ArchitectureServiceAmazonSimpleNotificationService, EventBridge: ArchitectureServiceAmazonEventBridge, DynamoDB: ArchitectureServiceAmazonDynamoDB, RDS: ArchitectureServiceAmazonRDS, Aurora: ArchitectureServiceAmazonAurora, ElastiCache: ArchitectureServiceAmazonElastiCache, S3: ArchitectureServiceAmazonSimpleStorageService, EBS: ArchitectureServiceAmazonElasticBlockStore, EFS: ArchitectureServiceAmazonEFS, CloudWatch: ArchitectureServiceAmazonCloudWatch, IAM: ArchitectureServiceAWSIdentityandAccessManagement
};

const EX=[
  {l:"Serverless API",t:"User → WAF → CloudFront → API Gateway → Lambda → DynamoDB"},
  {l:"Three-Tier Web",t:"Internet → Route53 → ALB → EC2 → Aurora → ElastiCache"},
  {l:"AI Pipeline",t:"User → API Gateway → Lambda → Bedrock → DynamoDB → S3"},
  {l:"Event-Driven",t:"API Gateway → Lambda → SQS → ECS → DynamoDB → CloudWatch"},
  {l:"ML Inference",t:"User → CloudFront → API Gateway → Lambda → SageMaker → S3"},
];

const APP_NAME="Matrix";

// ── LANDING PAGE ──────────────────────────────────────────────────
const FEATURES=[
  {icon:"✦",title:"Natural Language Input",desc:"Describe your AWS architecture in plain English — no diagram tools needed."},
  {icon:"⚡",title:"Instant Diagram Generation",desc:"Watch your architecture come to life in milliseconds with smart NLP parsing."},
  {icon:"🧠",title:"AI-Aware Services",desc:"Supports Bedrock, SageMaker, Lambda and 25+ AWS services out of the box."},
  {icon:"🔗",title:"Share & Export",desc:"One-click SVG export or share via a stateless Base64 URL with anyone."},
];

const PREVIEW_NODES=[
  {label:"User",color:"#00FFFF",icon:ICONS.User,x:0,y:0},
  {label:"WAF",color:"#FF4444",icon:ICONS.WAF,x:180,y:0},
  {label:"CloudFront",color:"#A855F7",icon:ICONS.CloudFront,x:360,y:0},
  {label:"Lambda",color:"#FFD700",icon:ICONS.Lambda,x:540,y:0},
  {label:"DynamoDB",color:"#4ECDC4",icon:ICONS.DynamoDB,x:720,y:0},
];

function LandingPage({onEnter}){
  const[typed,setTyped]=useState("");
  const[phase,setPhase]=useState(0);
  const full="User → WAF → CloudFront → Lambda → DynamoDB";
  useEffect(()=>{
    let i=0;
    const t=setInterval(()=>{
      setTyped(full.slice(0,i));
      i++;
      if(i>full.length){clearInterval(t);setTimeout(()=>setPhase(1),600);}
    },45);
    return()=>clearInterval(t);
  },[]);

  return(
    <div className="lp-root">
      {/* Animated blobs */}
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>

      {/* NAV */}
      <nav className="lp-nav">
        <div className="lp-logo">
          <svg width="30" height="30" viewBox="0 0 34 34">
            <defs><linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00FF41"/><stop offset="100%" stopColor="#6366f1"/></linearGradient></defs>
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="url(#lg2)" strokeWidth="1.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="url(#lg2)" fontFamily="Courier New,monospace">M</text>
          </svg>
          <span className="lp-logo-text">Matrix</span>
        </div>
        <div className="lp-nav-links">
          <span className="lp-nav-link">Features</span>
          <span className="lp-nav-link">Examples</span>
          <span className="lp-nav-link">Docs</span>
        </div>
        <button className="lp-nav-cta" onClick={onEnter}>Launch App →</button>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-badge">✦ AWS Architecture Generator</div>
        <h1 className="lp-hero-title">
          Design Cloud Architecture<br/>
          <span className="lp-hero-accent">with Plain English</span>
        </h1>
        <p className="lp-hero-sub">
          Matrix converts natural language descriptions into professional AWS<br/>
          architecture diagrams — instantly, offline, beautifully.
        </p>

        {/* Live typing demo */}
        <div className="lp-demo-box">
          <div className="lp-demo-label">Try it — type your architecture:</div>
          <div className="lp-demo-input">
            <span className="lp-demo-text">{typed}</span>
            <span className="lp-cursor">|</span>
          </div>
          {phase===1&&(
            <div className="lp-demo-nodes">
              {PREVIEW_NODES.map((n,i)=>(
                <div key={i} className="lp-preview-node" style={{"--c":n.color,animationDelay:`${i*0.12}s`}}>
                  <span className="lp-pn-icon" style={{display:"flex",alignItems:"center",justifyContent:"center"}}><n.icon size={28}/></span>
                  <span className="lp-pn-label" style={{color:n.color}}>{n.label}</span>
                  {i<PREVIEW_NODES.length-1&&<span className="lp-pn-arrow">→</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div className="lp-cta-row">
          <button className="lp-btn-primary" onClick={onEnter}>
            <span>✦ Launch Matrix</span>
            <span className="lp-btn-arrow">→</span>
          </button>
          <button className="lp-btn-ghost" onClick={onEnter}>View Examples</button>
        </div>

        {/* Stats */}
        <div className="lp-stats">
          {[["27+","AWS Services"],["∞","Architectures"],["0ms","Setup Time"],["100%","Offline"]].map(([n,l])=>(
            <div key={l} className="lp-stat">
              <div className="lp-stat-num">{n}</div>
              <div className="lp-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-section-tag">Why Matrix</div>
        <h2 className="lp-section-title">Everything you need to<br/>visualize cloud architecture</h2>
        <div className="lp-features-grid">
          {FEATURES.map((f,i)=>(
            <div key={i} className="lp-feat-card" style={{animationDelay:`${i*0.1}s`}}>
              <div className="lp-feat-icon">{f.icon}</div>
              <div className="lp-feat-title">{f.title}</div>
              <div className="lp-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLES STRIP */}
      <section className="lp-examples">
        <div className="lp-section-tag">Ready to use</div>
        <h2 className="lp-section-title">One-click architecture examples</h2>
        <div className="lp-ex-grid">
          {EX.map((ex,i)=>(
            <div key={i} className="lp-ex-card" onClick={onEnter}>
              <div className="lp-ex-label">{ex.l}</div>
              <div className="lp-ex-text">{ex.t}</div>
              <div className="lp-ex-cta">Generate →</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="lp-footer-cta">
        <div className="lp-fc-glow"/>
        <h2 className="lp-fc-title">Ready to architect the cloud?</h2>
        <p className="lp-fc-sub">No login. No setup. Just describe and visualize.</p>
        <button className="lp-btn-primary lg" onClick={onEnter}>
          <span>✦ Launch Matrix for Free</span>
          <span className="lp-btn-arrow">→</span>
        </button>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <span className="lp-logo-text" style={{fontSize:13}}>Matrix</span>
          <span style={{color:"#1e293b",margin:"0 8px"}}>·</span>
          <span style={{color:"#334155",fontSize:11}}>AWS Architecture Generator</span>
        </div>
        <div style={{fontSize:10,color:"#1e293b"}}>Built with React + Vite · Fully Offline</div>
      </footer>
    </div>
  );
}


function parse(text){
  const lower=text.toLowerCase();
  const sorted=Object.entries(ALIASES).sort((a,b)=>b[0].length-a[0].length);
  const matches=[];
  for(const[alias,svc]of sorted){let i=lower.indexOf(alias);while(i!==-1){matches.push({i,end:i+alias.length,svc});i=lower.indexOf(alias,i+1);}}
  matches.sort((a,b)=>a.i-b.i||(b.end-b.i)-(a.end-a.i));
  const filtered=[];let last=-1;
  for(const m of matches){if(m.i>=last){filtered.push(m);last=m.end;}}
  if(!filtered.length)return{nodes:[{id:"n0",s:"Internet"},{id:"n1",s:"ALB"},{id:"n2",s:"EC2"},{id:"n3",s:"RDS"}],edges:[{f:"n0",t:"n1"},{f:"n1",t:"n2"},{f:"n2",t:"n3"}]};
  const nodes=filtered.map((m,i)=>({id:"n"+i,s:m.svc}));
  return{nodes,edges:nodes.slice(0,-1).map((_,i)=>({f:nodes[i].id,t:nodes[i+1].id}))};
}

const NW=120,NH=100,HG=90,VG=70,PAD=60;
function layout(nodes,edges){
  const inE={};nodes.forEach(n=>(inE[n.id]=[]));
  edges.forEach(e=>{if(inE[e.t])inE[e.t].push(e.f);});
  const layer={};nodes.forEach(n=>{if(!inE[n.id].length)layer[n.id]=0;});
  let ch=true,it=0;
  while(ch&&it++<50){ch=false;edges.forEach(e=>{if(layer[e.f]!==undefined){const nx=layer[e.f]+1;if(layer[e.t]===undefined||layer[e.t]<nx){layer[e.t]=nx;ch=true;}}});}
  nodes.forEach(n=>{if(layer[n.id]===undefined)layer[n.id]=0;});
  const cols={};nodes.forEach(n=>{const l=layer[n.id];if(!cols[l])cols[l]=[];cols[l].push(n.id);});
  const pos={};
  Object.keys(cols).map(Number).sort((a,b)=>a-b).forEach((ck,ci)=>{
    cols[ck].forEach((id,ri)=>{pos[id]={x:PAD+ci*(NW+HG),y:PAD+ri*(NH+VG)};});
  });
  const px=Object.values(pos);
  return{pos,W:Math.max(...px.map(p=>p.x+NW))+PAD,H:Math.max(...px.map(p=>p.y+NH))+PAD};
}

function bezier(f,t,pos){
  const fx=pos[f].x+NW/2,fy=pos[f].y+NH/2,tx=pos[t].x+NW/2,ty=pos[t].y+NH/2;
  const mx=(fx+tx)/2;
  return{d:`M${fx},${fy} C${mx},${fy} ${mx},${ty} ${tx},${ty}`,lx:mx,ly:(fy+ty)/2};
}

export default function App(){
  const[showLanding,setShowLanding]=useState(true);
  const[prompt,setPrompt]=useState("");
  const[diagram,setDiagram]=useState(null);
  const[loading,setLoading]=useState(false);
  const[sel,setSel]=useState(null);
  const[zoom,setZoom]=useState(1);
  const[tool,setTool]=useState("select");
  const[history,setHistory]=useState([]);
  const[shareText,setShare]=useState("Share");
  const[title,setTitle]=useState("Untitled");
  const[addingNode,setAddingNode]=useState(false);
  const[addSearch,setAddSearch]=useState("");
  const canvasRef=useRef(null);
  const dragRef=useRef(null); // {type:"pan"|"node", startX, startY, nodeId?, startPos?, scrollX?, scrollY?}

  // All hooks must be declared before any conditional returns
  const generate=useCallback(async(p)=>{
    const txt=p??prompt;if(!txt.trim())return;
    setLoading(true);await new Promise(r=>setTimeout(r,700));
    try{
      const{nodes,edges}=parse(txt);
      const{pos,W,H}=layout(nodes,edges);
      setDiagram({nodes,edges,pos,W:Math.max(W,900),H:Math.max(H,400)});setTitle("Architecture Diagram");setSel(null);
      setHistory(h=>[{prompt:txt,diagram:{nodes,edges,pos,W:Math.max(W,900),H:Math.max(H,400)},ts:Date.now()},...h].slice(0,8));
    }catch(e){console.error(e);}
    finally{setLoading(false);}
  },[prompt]);

  const handleShare=useCallback(()=>{
    if(!diagram)return;
    const b64=btoa(encodeURIComponent(JSON.stringify({diagram,title,prompt})));
    navigator.clipboard.writeText(`${location.origin}${location.pathname}#share=${b64}`);
    setShare("Copied!");setTimeout(()=>setShare("Share"),2000);
  },[diagram,title,prompt]);

  // Mouse handlers for Pan mode
  const handleCanvasMouseDown=useCallback((e)=>{
    if(tool!=="pan"||!diagram)return;
    e.preventDefault();
    const wrap=canvasRef.current;
    const svgEl=wrap?.querySelector("svg");
    if(!svgEl){
      dragRef.current={type:"pan",startX:e.clientX,startY:e.clientY,scrollX:wrap.scrollLeft,scrollY:wrap.scrollTop};
      return;
    }
    // Convert client coords to SVG coords
    const rect=svgEl.getBoundingClientRect();
    const svgX=(e.clientX-rect.left)/zoom;
    const svgY=(e.clientY-rect.top)/zoom;
    // Check if over any node
    const hitNode=Object.entries(diagram?.pos || {}).find(([id,p])=>
      svgX>=p.x-8 && svgX<=p.x+NW+8 && svgY>=p.y-8 && svgY<=p.y+NH+8
    );
    if(hitNode){
      const[nodeId,startPos]=hitNode;
      dragRef.current={type:"node",nodeId,startX:e.clientX,startY:e.clientY,startPos:{...startPos},scale:zoom};
    } else {
      dragRef.current={type:"pan",startX:e.clientX,startY:e.clientY,scrollX:wrap.scrollLeft,scrollY:wrap.scrollTop};
    }
  },[tool,diagram,zoom]);

  const handleCanvasMouseMove=useCallback((e)=>{
    const dr=dragRef.current;if(!dr)return;
    if(dr.type==="pan"){
      const wrap=canvasRef.current;
      wrap.scrollLeft=dr.scrollX-(e.clientX-dr.startX);
      wrap.scrollTop=dr.scrollY-(e.clientY-dr.startY);
    } else if(dr.type==="node"){
      const dx=(e.clientX-dr.startX)/dr.scale;
      const dy=(e.clientY-dr.startY)/dr.scale;
      const newX=Math.max(0,dr.startPos.x+dx);
      const newY=Math.max(0,dr.startPos.y+dy);
      setDiagram(d=>{
        const newPos={...d.pos,[dr.nodeId]:{x:newX,y:newY}};
        const px=Object.values(newPos);
        return{...d,pos:newPos,W:Math.max(Math.max(...px.map(p=>p.x+NW))+PAD,900),H:Math.max(Math.max(...px.map(p=>p.y+NH))+PAD,400)};
      });
    }
  },[]);

  const handleCanvasMouseUp=useCallback(()=>{ dragRef.current=null; },[]);

  const exportSVG=useCallback(()=>{
    const svg=canvasRef.current?.querySelector("svg");if(!svg)return;
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:"image/svg+xml"}));
    a.download=`${title.replace(/\s+/g,"-")}.svg`;a.click();
  },[title]);

  // Conditional render AFTER all hooks
  if(showLanding) return <LandingPage onEnter={()=>setShowLanding(false)}/>;

  const nodes=diagram?.nodes||[];
  const edges=diagram?.edges||[];
  const pos=diagram?.pos||{};
  const W=diagram?.W||800,H=diagram?.H||500;

  const catGroups=Object.entries(Object.entries(SERVICES).reduce((a,[k,v])=>{if(!a[v.category])a[v.category]=[];a[v.category].push({k,...v});return a;},{}));

  return(
    <div className="app-root">
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>

      <header className="topbar">
        <div className="brand">
          <svg width="34" height="34" viewBox="0 0 34 34">
            <defs><linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00FF41"/><stop offset="100%" stopColor="#6366f1"/></linearGradient></defs>
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="url(#hg)" strokeWidth="1.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="url(#hg)" fontFamily="Courier New,monospace">M</text>
          </svg>
          <div><div className="brand-name">Matrix</div><div className="brand-tag">Architecture Generator</div></div>
        </div>
        <div className="breadcrumb"><span className="bc-ws">Workspace</span><span className="bc-sep">/</span><span className="bc-title">{title}</span></div>
        <div className="topbar-actions">
          <div className="chip"><span className="chip-dot"/>Cloud Architecture</div>
          {diagram&&<span className="stat-chip">{nodes.length} nodes · {edges.length} edges</span>}
          <button className="btn-ghost" onClick={handleShare}>{shareText}</button>
          <button className="btn-primary" onClick={exportSVG}>Export SVG</button>
        </div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <div className="glass-card">
            <div className="card-label"><span>Architecture Description</span><span>{prompt.length}/500</span></div>
            <textarea className="prompt-area" value={prompt} maxLength={500}
              placeholder={"Describe your AWS architecture...\n\ne.g. User → WAF → CloudFront → API Gateway → Lambda → DynamoDB"}
              onChange={e=>setPrompt(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))generate();}}
            />
            <div className="hint">⌘↵ or Ctrl↵ to generate</div>
          </div>

          <button className="btn-generate" onClick={()=>generate()} disabled={loading||!prompt.trim()}>
            {loading?<><span className="spinner"/>Generating…</>:<><span className="gen-icon">✦</span>Generate Diagram</>}
          </button>

          <div className="glass-card" style={{gap:8,display:"flex",flexDirection:"column"}}>
            <div className="section-title">Examples</div>
            {EX.map((ex,i)=>(
              <button key={i} className="example-btn" onClick={()=>{setPrompt(ex.t);generate(ex.t);}}>
                <span className="ex-label">{ex.l}</span>
                <span className="ex-text">{ex.t.slice(0,58)}…</span>
              </button>
            ))}
          </div>

          {history.length>0&&(
            <div className="glass-card" style={{gap:8,display:"flex",flexDirection:"column"}}>
              <div className="section-title">History</div>
              {history.map(h=>(
                <button key={h.ts} className="history-item" onClick={()=>{setDiagram(h.diagram);setPrompt(h.prompt);}}>
                  <span className="h-title">Architecture Diagram</span>
                  <span className="h-time">{new Date(h.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                </button>
              ))}
            </div>
          )}

          <div className="glass-card">
            <div className="section-title" style={{marginBottom:10}}>Services</div>
            {catGroups.map(([cat,svcs])=>(
              <div key={cat} style={{marginBottom:10}}>
                <div style={{fontSize:"8px",letterSpacing:".1em",textTransform:"uppercase",color:CAT_COLORS[cat]||"#888",marginBottom:5,fontWeight:700}}>{cat}</div>
                <div className="svc-chips">
                  {svcs.map(s=>(
                    <button key={s.k} className="svc-chip"
                      style={{background:`${s.color}18`,color:s.color,border:`1px solid ${s.color}40`}}
                      onClick={()=>setPrompt(p=>p?`${p} → ${s.label}`:s.label)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="canvas-wrap" ref={canvasRef}
          style={{cursor:tool==="pan"?"grab":"default"}}
          onClick={()=>tool==="select"&&setSel(null)}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        >
          <div className="canvas-toolbar">
            <div className="tool-group">
              {[["select","↖ Select"],["pan","✋ Pan"]].map(([id,lbl])=>(
                <button key={id} className={`tool-btn${tool===id?" active":""}`}
                  onClick={()=>{setTool(id);if(id==="pan")setSel(null);}}>
                  {lbl}
                </button>
              ))}
            </div>
            <div style={{width:1,height:20,background:"rgba(255,255,255,0.06)"}}/>
            <button className="zoom-btn" onClick={()=>setZoom(z=>Math.max(.2,+(z-.1).toFixed(1)))}>−</button>
            <span className="zoom-display">{Math.round(zoom*100)}%</span>
            <button className="zoom-btn" onClick={()=>setZoom(z=>Math.min(3,+(z+.1).toFixed(1)))}>+</button>
            <button className="zoom-btn" style={{fontSize:9,padding:"0 8px",width:"auto"}} onClick={()=>setZoom(1)}>Fit</button>
            <div style={{width:1,height:20,background:"rgba(255,255,255,0.06)",margin:"0 4px"}}/>
            {diagram&&(
              <button className="zoom-btn" style={{fontSize:10,padding:"0 10px",width:"auto",color:"#00FF41",borderColor:"rgba(0,255,65,0.3)"}} onClick={()=>setAddingNode(true)}>+ Node</button>
            )}
            {sel&&diagram&&(
              <button className="zoom-btn" style={{fontSize:10,padding:"0 10px",width:"auto",color:"#FF6B6B",borderColor:"rgba(255,107,107,0.3)"}} onClick={()=>{
                const newNodes=nodes.filter(x=>x.id!==sel);
                const newEdges=edges.filter(e=>e.f!==sel&&e.t!==sel);
                const newPos={...pos};delete newPos[sel];
                const px=Object.values(newPos);
                const W2=px.length?Math.max(...px.map(p=>p.x+NW))+PAD:800;
                const H2=px.length?Math.max(...px.map(p=>p.y+NH))+PAD:500;
                setDiagram({nodes:newNodes,edges:newEdges,pos:newPos,W:Math.max(W2,900),H:Math.max(H2,400)});
                setSel(null);
              }}>🗑 Delete</button>
            )}
            <div className="toolbar-spacer"/>
            {diagram&&<span className="stat-pill">{nodes.length} nodes · {edges.length} connections</span>}
          </div>

          {!diagram&&!loading&&(
            <div className="empty-state">
              <div className="empty-3d-scene">
                <div className="float-card fc-1"><span className="fc-icon" style={{color:"#6366f1",display:"flex"}}>{React.createElement(ICONS.Lambda,{size:24})}</span><span className="fc-label" style={{color:"#6366f1"}}>Lambda</span></div>
                <div className="float-card fc-2"><span className="fc-icon" style={{color:"#00e5ff",display:"flex"}}>{React.createElement(ICONS.Bedrock,{size:24})}</span><span className="fc-label" style={{color:"#00e5ff"}}>Bedrock</span></div>
                <div className="float-card fc-3"><span className="fc-icon" style={{color:"#a855f7",display:"flex"}}>{React.createElement(ICONS.DynamoDB,{size:24})}</span><span className="fc-label" style={{color:"#a855f7"}}>DynamoDB</span></div>
                <div className="float-card fc-bottom"><span style={{fontSize:10,color:"rgba(0,255,136,0.6)",fontFamily:"JetBrains Mono,monospace"}}>User → WAF → CloudFront → …</span></div>
              </div>
              <div className="empty-title">Matrix Visualizer</div>
              <div className="empty-sub">Transform plain English into professional AWS cloud architecture diagrams.</div>
              <div className="empty-pills">
                {EX.slice(0,3).map((ex,i)=>(
                  <button key={i} className="pill-btn" onClick={()=>{setPrompt(ex.t);generate(ex.t);}}>{ex.l}</button>
                ))}
              </div>
            </div>
          )}

          {loading&&(
            <div className="loading-state">
              <div className="loading-orb">
                <div className="orb-ring orb-r1"/><div className="orb-ring orb-r2"/>
                <div className="orb-ring orb-r3"/><div className="orb-core"/>
              </div>
              <div className="loading-label">Generating Architecture…</div>
              <div className="loading-sub">Parsing services · Building graph · Laying out nodes</div>
            </div>
          )}

          {diagram&&!loading&&(
            <div className="diagram-wrap" style={{transform:`scale(${zoom})`,transformOrigin:"top left",padding:"40px"}}>
              <svg width={W} height={H} style={{display:"block",overflow:"visible",fontFamily:"Inter,sans-serif"}}>
                <defs>
                  <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.5)"/>
                  </marker>
                  <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {edges.map((e,i)=>{
                  if(!pos[e.f]||!pos[e.t])return null;
                  const{d,lx,ly}=bezier(e.f,e.t,pos);
                  const col=SERVICES[nodes.find(n=>n.id===e.f)?.s]?.color||"#6366f1";
                  return(
                    <g key={i}>
                      <path d={d} stroke={col} strokeWidth="6" fill="none" opacity="0.08" strokeLinecap="round"/>
                      <path d={d} stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round"
                        strokeDasharray="6 4" style={{animation:"dash 2s linear infinite"}} markerEnd="url(#arr)"/>
                      <rect x={lx-18} y={ly-9} width={36} height={16} rx="4" fill="rgba(3,5,8,0.9)" stroke={`${col}44`} strokeWidth="1"/>
                      <text x={lx} y={ly+4} fontSize="8" fill={col} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontWeight="500">HTTPS</text>
                    </g>
                  );
                })}

                {nodes.map(n=>{
                  const svc=SERVICES[n.s]||{color:"#6366f1",label:n.s,category:"Other"};
                  const p=pos[n.id];if(!p)return null;
                  const isS=sel===n.id&&tool==="select";
                  const Icon=ICONS[n.s];
                  const nodeCursor=tool==="pan"?"move":"pointer";
                  return(
                    <g key={n.id} data-nodeid={n.id}
                      style={{cursor:nodeCursor}}
                      onClick={ev=>{
                        if(tool!=="select")return;
                        ev.stopPropagation();
                        setSel(n.id);
                      }}>
                      <rect x={p.x-4} y={p.y-4} width={NW+8} height={NH+8} rx="18"
                        fill={svc.color} opacity={isS?0.18:0.07} filter="url(#glow-strong)"/>
                      <defs>
                        <linearGradient id={`cg-${n.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.07)"/>
                          <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
                        </linearGradient>
                      </defs>
                      <rect x={p.x} y={p.y} width={NW} height={NH} rx="14" fill="#080c18" stroke={isS?svc.color:`${svc.color}55`} strokeWidth={isS?2:1.5}/>
                      <rect x={p.x} y={p.y} width={NW} height={NH} rx="14" fill={`url(#cg-${n.id})`}/>
                      <rect x={p.x+8} y={p.y} width={NW-16} height={3} rx="2" fill={svc.color} opacity="0.9"/>
                      {Icon ? (
                        <svg x={p.x+NW/2-22} y={p.y+22} width={44} height={44}>
                          <Icon size={44} />
                        </svg>
                      ) : (
                        <text x={p.x+NW/2} y={p.y+46} fontSize="26" textAnchor="middle" dominantBaseline="middle">●</text>
                      )}
                      <text x={p.x+NW/2} y={p.y+NH-22} fontSize="10" fontWeight="700" fill="#f0f4ff" textAnchor="middle">{svc.label}</text>
                      <rect x={p.x+(NW-svc.category.length*5.5-12)/2} y={p.y+NH-14} width={svc.category.length*5.5+12} height={11} rx="3" fill={`${svc.color}22`} stroke={`${svc.color}44`} strokeWidth="0.5"/>
                      <text x={p.x+NW/2} y={p.y+NH-6} fontSize="7" fill={svc.color} textAnchor="middle" fontWeight="600" letterSpacing=".06em">{svc.category.toUpperCase()}</text>
                      {isS&&<>
                        <path d={`M${p.x+4},${p.y+14} L${p.x+4},${p.y+4} L${p.x+14},${p.y+4}`} stroke={svc.color} strokeWidth="2" fill="none"/>
                        <path d={`M${p.x+NW-14},${p.y+4} L${p.x+NW-4},${p.y+4} L${p.x+NW-4},${p.y+14}`} stroke={svc.color} strokeWidth="2" fill="none"/>
                        <path d={`M${p.x+4},${p.y+NH-14} L${p.x+4},${p.y+NH-4} L${p.x+14},${p.y+NH-4}`} stroke={svc.color} strokeWidth="2" fill="none"/>
                        <path d={`M${p.x+NW-14},${p.y+NH-4} L${p.x+NW-4},${p.y+NH-4} L${p.x+NW-4},${p.y+NH-14}`} stroke={svc.color} strokeWidth="2" fill="none"/>
                      </>}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </main>
      </div>

      {/* ── EDIT PANEL — only in select mode ── */}
      {sel&&tool==="select"&&diagram&&(()=>{
        const curNodes=diagram.nodes||[];
        const curEdges=diagram.edges||[];
        const curPos=diagram.pos||{};
        const n=curNodes.find(x=>x.id===sel);
        const s=n?SERVICES[n.s]:null;
        if(!n||!s)return null;
        const deleteNode=()=>{
          const newNodes=curNodes.filter(x=>x.id!==sel);
          const newEdges=curEdges.filter(e=>e.f!==sel&&e.t!==sel);
          const newPos={...curPos};delete newPos[sel];
          const px=Object.values(newPos);
          const W2=px.length?Math.max(...px.map(p=>p.x+NW))+PAD:800;
          const H2=px.length?Math.max(...px.map(p=>p.y+NH))+PAD:500;
          setDiagram({nodes:newNodes,edges:newEdges,pos:newPos,W:Math.max(W2,900),H:Math.max(H2,400)});
          setSel(null);
        };

        const changeService=(newSvc)=>{
          const newNodes=curNodes.map(x=>x.id===sel?{...x,s:newSvc}:x);
          setDiagram(d=>({...d,nodes:newNodes}));
        };

        const connectTo=(targetId)=>{
          if(targetId===sel)return;
          const already=curEdges.find(e=>(e.f===sel&&e.t===targetId)||(e.f===targetId&&e.t===sel));
          if(already)return;
          setDiagram(d=>({...d,edges:[...d.edges,{f:sel,t:targetId}]}));
        };

        const deleteEdge=(eIdx)=>{
          setDiagram(d=>({...d,edges:d.edges.filter((_,i)=>i!==eIdx)}));
        };

        const connectedEdges=curEdges.map((e,i)=>({...e,i})).filter(e=>e.f===sel||e.t===sel);
        const otherNodes=curNodes.filter(x=>x.id!==sel);

        return(
          <div className="edit-panel">
            {/* Header */}
            <div className="ep-header">
              <div className="ep-title" style={{color:s.color,display:"flex",alignItems:"center",gap:6}}>
                <span style={{display:"flex"}}>{ICONS[n.s] ? React.createElement(ICONS[n.s],{size:20}) : "●"}</span>
                {s.label}
              </div>
              <button className="info-close" onClick={()=>setSel(null)}>✕</button>
            </div>

            {/* Change Service */}
            <div className="ep-section">
              <div className="ep-section-label">Service Type</div>
              <select className="ep-select"
                value={n.s}
                onChange={e=>changeService(e.target.value)}>
                {Object.entries(SERVICES).map(([k,v])=>(
                  <option key={k} value={k}>{v.label} ({v.category})</option>
                ))}
              </select>
            </div>

            {/* Connections */}
            <div className="ep-section">
              <div className="ep-section-label">Connections ({connectedEdges.length})</div>
              {connectedEdges.length===0&&<div className="ep-empty">No connections</div>}
              {connectedEdges.map(e=>{
                const otherId=e.f===sel?e.t:e.f;
                const other=curNodes.find(x=>x.id===otherId);
                const otherSvc=other?SERVICES[other.s]:null;
                const dir=e.f===sel?"→":"←";
                return(
                  <div key={e.i} className="ep-edge-row">
                    <span style={{color:otherSvc?.color||"#888",display:"flex"}}>{ICONS[other?.s] ? React.createElement(ICONS[other?.s],{size:14}) : "●"}</span>
                    <span className="ep-edge-label" style={{display:"flex",alignItems:"center",gap:4}}>{dir} {otherSvc?.label||otherId}</span>
                    <button className="ep-del-edge" onClick={()=>deleteEdge(e.i)} title="Remove connection">✕</button>
                  </div>
                );
              })}
            </div>

            {/* Add Connection */}
            {otherNodes.length>0&&(
              <div className="ep-section">
                <div className="ep-section-label">Connect To</div>
                <div className="ep-connect-chips">
                  {otherNodes.map(nd=>{
                    const sv=SERVICES[nd.s];
                    const alreadyConn=curEdges.find(e=>(e.f===sel&&e.t===nd.id)||(e.f===nd.id&&e.t===sel));
                    return(
                      <button key={nd.id}
                        className="ep-conn-chip"
                        disabled={!!alreadyConn}
                        style={{color:sv?.color||"#888",borderColor:`${sv?.color||"#888"}44`,background:`${sv?.color||"#888"}12`,opacity:alreadyConn?0.4:1,display:"inline-flex",alignItems:"center",gap:6}}
                        onClick={()=>connectTo(nd.id)}>
                        {ICONS[nd.s] ? React.createElement(ICONS[nd.s],{size:14}) : "●"} {sv?.label||nd.s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delete Node */}
            <button className="ep-delete-btn" onClick={deleteNode}>
              🗑 Delete Node
            </button>
          </div>
        );
      })()}

      {/* ── ADD NODE MODAL ── */}
      {diagram&&addingNode&&(
        <div className="modal-overlay" onClick={()=>setAddingNode(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Add New Node</span>
              <button className="info-close" onClick={()=>setAddingNode(false)}>✕</button>
            </div>
            <div className="modal-search">
              <input className="modal-input" placeholder="Search services…" value={addSearch} onChange={e=>setAddSearch(e.target.value)} autoFocus/>
            </div>
            <div className="modal-grid">
              {Object.entries(SERVICES)
                .filter(([k,v])=>!addSearch||v.label.toLowerCase().includes(addSearch.toLowerCase())||v.category.toLowerCase().includes(addSearch.toLowerCase()))
                .map(([k,v])=>(
                  <button key={k} className="modal-svc-btn"
                    style={{borderColor:`${v.color}40`,background:`${v.color}10`}}
                    onClick={()=>{
                      // Add node to diagram with a new position
                      const newId="n"+Date.now();
                      const px=Object.values(pos);
                      const maxX=px.length?Math.max(...px.map(p=>p.x)):0;
                      const newPos={...pos,[newId]:{x:maxX+NW+HG,y:PAD}};
                      const newNodes=[...nodes,{id:newId,s:k}];
                      const newW=Math.max(W,maxX+NW+HG+NW+PAD,900);
                      setDiagram(d=>({...d,nodes:newNodes,pos:newPos,W:newW}));
                      setAddingNode(false);setAddSearch("");setSel(newId);
                    }}>
                    <span style={{display:"flex",marginBottom:4}}>{ICONS[k] ? React.createElement(ICONS[k],{size:28}) : "●"}</span>
                    <span style={{color:v.color,fontSize:10,fontWeight:700}}>{v.label}</span>
                    <span style={{color:"#475569",fontSize:8,textTransform:"uppercase",letterSpacing:".06em"}}>{v.category}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes dash{to{stroke-dashoffset:-20}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
