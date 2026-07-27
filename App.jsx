import React, {useState,useRef,useCallback,useEffect}from"react";
import {
  ResourceAuthenticatedUser, ResourceInternet, ArchitectureServiceAWSWAF, ArchitectureServiceAmazonCloudFront, 
  ArchitectureServiceAmazonRoute53, ResourceElasticLoadBalancingApplicationLoadBalancer, 
  ArchitectureServiceAmazonVirtualPrivateCloud, ArchitectureServiceAmazonAPIGateway, ArchitectureServiceAWSLambda, 
  ArchitectureServiceAmazonEC2, ArchitectureServiceAmazonElasticContainerService, 
  ArchitectureServiceAmazonElasticKubernetesService, ArchitectureServiceAWSFargate, ArchitectureServiceAmazonBedrock, 
  ArchitectureServiceAmazonSageMaker, ArchitectureServiceAmazonSimpleQueueService, 
  ArchitectureServiceAmazonSimpleNotificationService, ArchitectureServiceAmazonEventBridge, 
  ArchitectureServiceAmazonDynamoDB, ArchitectureServiceAmazonRDS, ArchitectureServiceAmazonAurora, 
  ArchitectureServiceAmazonElastiCache, ArchitectureServiceAmazonSimpleStorageService, 
  ArchitectureServiceAmazonElasticBlockStore, ArchitectureServiceAmazonEFS, ArchitectureServiceAmazonCloudWatch, 
  ArchitectureServiceAWSIdentityandAccessManagement, ArchitectureServiceAmazonAthena, ArchitectureServiceAmazonCognito, 
  ArchitectureServiceAmazonKinesis, ArchitectureServiceAmazonRedshift, ArchitectureServiceAWSSecretsManager, 
  ArchitectureServiceAWSStepFunctions, ArchitectureServiceAmazonEC2AutoScaling, ArchitectureServiceAWSCodeBuild, 
  ArchitectureServiceAWSCodeCommit, ArchitectureServiceAWSCodePipeline, ArchitectureServiceAWSCodeDeploy,
  ArchitectureServiceAWSAppRunner, ArchitectureServiceAWSBatch, ArchitectureServiceAWSElasticBeanstalk,
  ArchitectureServiceAmazonNeptune, ArchitectureServiceAmazonDocumentDB, ArchitectureServiceAWSBackup,
  ArchitectureServiceAWSDirectConnect, ArchitectureServiceAWSTransitGateway, ArchitectureServiceAmazonVPCLattice,
  ArchitectureServiceElasticLoadBalancing, ArchitectureServiceAWSKeyManagementService, ArchitectureServiceAWSShield,
  ArchitectureServiceAWSCertificateManager, ArchitectureServiceAWSAppSync, ArchitectureServiceAmazonMQ,
  ArchitectureServiceAWSGlue, ArchitectureServiceAmazonOpenSearchService, ArchitectureServiceAWSCloudTrail,
  ArchitectureServiceAWSConfig, ArchitectureServiceAWSXRay, ArchitectureServiceAmazonSimpleEmailService
} from "aws-react-icons";

const CAT_COLORS={
  External: "#3d5a80",      // Slate Blue
  Network: "#7e5a9b",       // Muted Plum
  API: "#ca6f43",           // Terracotta Orange
  Compute: "#d3a243",       // Mustard Gold
  AI: "#4e7c5e",            // Sage Green (used for advanced services)
  Analytics: "#2f4f4f",     // Dark Slate Gray
  Messaging: "#b84a39",     // Brick Red
  Database: "#2c5d4d",      // Forest Green
  Storage: "#4e7c5e",       // Sage Green
  Monitoring: "#8a5a5c",    // Dusty Rose
  DeveloperTools: "#3d5a80", // Slate Blue
  Security: "#8a5a5c"       // Dusty Rose
};

const SERVICES={
  User:{color:CAT_COLORS.External,category:"External",label:"User"},
  Internet:{color:CAT_COLORS.External,category:"External",label:"Internet"},
  
  WAF:{color:CAT_COLORS.Network,category:"Network",label:"WAF"},
  CloudFront:{color:CAT_COLORS.Network,category:"Network",label:"CloudFront"},
  Route53:{color:CAT_COLORS.Network,category:"Network",label:"Route 53"},
  ALB:{color:CAT_COLORS.Network,category:"Network",label:"ALB"},
  ELB:{color:CAT_COLORS.Network,category:"Network",label:"ELB"},
  VPC:{color:CAT_COLORS.Network,category:"Network",label:"VPC"},
  DirectConnect:{color:CAT_COLORS.Network,category:"Network",label:"Direct Connect"},
  TransitGateway:{color:CAT_COLORS.Network,category:"Network",label:"Transit Gateway"},
  VPCLattice:{color:CAT_COLORS.Network,category:"Network",label:"VPC Lattice"},
  
  APIGateway:{color:CAT_COLORS.API,category:"API",label:"API Gateway"},
  StepFunctions:{color:CAT_COLORS.API,category:"API",label:"Step Functions"},
  AppSync:{color:CAT_COLORS.API,category:"API",label:"AppSync"},
  
  Lambda:{color:CAT_COLORS.Compute,category:"Compute",label:"Lambda"},
  EC2:{color:CAT_COLORS.Compute,category:"Compute",label:"EC2"},
  ECS:{color:CAT_COLORS.Compute,category:"Compute",label:"ECS"},
  EKS:{color:CAT_COLORS.Compute,category:"Compute",label:"EKS"},
  Fargate:{color:CAT_COLORS.Compute,category:"Compute",label:"Fargate"},
  AutoScaling:{color:CAT_COLORS.Compute,category:"Compute",label:"Auto Scaling"},
  AppRunner:{color:CAT_COLORS.Compute,category:"Compute",label:"App Runner"},
  Batch:{color:CAT_COLORS.Compute,category:"Compute",label:"Batch"},
  ElasticBeanstalk:{color:CAT_COLORS.Compute,category:"Compute",label:"Elastic Beanstalk"},
  
  Bedrock:{color:CAT_COLORS.AI,category:"AI",label:"Bedrock"},
  SageMaker:{color:CAT_COLORS.AI,category:"AI",label:"SageMaker"},
  
  SQS:{color:CAT_COLORS.Messaging,category:"Messaging",label:"SQS"},
  SNS:{color:CAT_COLORS.Messaging,category:"Messaging",label:"SNS"},
  EventBridge:{color:CAT_COLORS.Messaging,category:"Messaging",label:"EventBridge"},
  MQ:{color:CAT_COLORS.Messaging,category:"Messaging",label:"MQ"},
  SES:{color:CAT_COLORS.Messaging,category:"Messaging",label:"SES"},
  
  DynamoDB:{color:CAT_COLORS.Database,category:"Database",label:"DynamoDB"},
  RDS:{color:CAT_COLORS.Database,category:"Database",label:"RDS"},
  Aurora:{color:CAT_COLORS.Database,category:"Database",label:"Aurora"},
  ElastiCache:{color:CAT_COLORS.Database,category:"Database",label:"ElastiCache"},
  Neptune:{color:CAT_COLORS.Database,category:"Database",label:"Neptune"},
  Redshift:{color:CAT_COLORS.Database,category:"Database",label:"Redshift"},
  DocumentDB:{color:CAT_COLORS.Database,category:"Database",label:"DocumentDB"},
  
  S3:{color:CAT_COLORS.Storage,category:"Storage",label:"S3"},
  EBS:{color:CAT_COLORS.Storage,category:"Storage",label:"EBS"},
  EFS:{color:CAT_COLORS.Storage,category:"Storage",label:"EFS"},
  Backup:{color:CAT_COLORS.Storage,category:"Storage",label:"Backup"},
  
  CloudWatch:{color:CAT_COLORS.Monitoring,category:"Monitoring",label:"CloudWatch"},
  CloudTrail:{color:CAT_COLORS.Monitoring,category:"Monitoring",label:"CloudTrail"},
  Config:{color:CAT_COLORS.Monitoring,category:"Monitoring",label:"Config"},
  XRay:{color:CAT_COLORS.Monitoring,category:"Monitoring",label:"X-Ray"},
  
  IAM:{color:CAT_COLORS.Security,category:"Security",label:"IAM"},
  Cognito:{color:CAT_COLORS.Security,category:"Security",label:"Cognito"},
  SecretsManager:{color:CAT_COLORS.Security,category:"Security",label:"Secrets Manager"},
  KMS:{color:CAT_COLORS.Security,category:"Security",label:"KMS"},
  Shield:{color:CAT_COLORS.Security,category:"Security",label:"Shield"},
  ACM:{color:CAT_COLORS.Security,category:"Security",label:"ACM"},
  
  Athena:{color:CAT_COLORS.Analytics,category:"Analytics",label:"Athena"},
  Kinesis:{color:CAT_COLORS.Analytics,category:"Analytics",label:"Kinesis"},
  Glue:{color:CAT_COLORS.Analytics,category:"Analytics",label:"Glue"},
  OpenSearch:{color:CAT_COLORS.Analytics,category:"Analytics",label:"OpenSearch"},
  
  CodeCommit:{color:CAT_COLORS.DeveloperTools,category:"DeveloperTools",label:"CodeCommit"},
  CodeBuild:{color:CAT_COLORS.DeveloperTools,category:"DeveloperTools",label:"CodeBuild"},
  CodeTest:{color:CAT_COLORS.DeveloperTools,category:"DeveloperTools",label:"CodeTest"},
  CodeDeploy:{color:CAT_COLORS.DeveloperTools,category:"DeveloperTools",label:"CodeDeploy"},
  CodePipeline:{color:CAT_COLORS.DeveloperTools,category:"DeveloperTools",label:"CodePipeline"},
  
  EC2Blue:{color:"#295f8a",category:"Compute",label:"EC2 (Blue)"},
  EC2Green:{color:"#285e3b",category:"Compute",label:"EC2 (Green)"},
  StaticAnalysis:{color:CAT_COLORS.Security,category:"Security",label:"Static Analysis"},
  SAST:{color:CAT_COLORS.Security,category:"Security",label:"SAST"},
  DependencyScan:{color:CAT_COLORS.Security,category:"Security",label:"Dependency Scan"},
  SecretsScan:{color:CAT_COLORS.Security,category:"Security",label:"Secrets Scan"}
};

const ALIASES={
  "user":"User","developer":"User","client":"User","customer":"User",
  "internet":"Internet","web":"Internet","public":"Internet",
  "waf":"WAF","firewall":"WAF",
  "cloudfront":"CloudFront","cdn":"CloudFront",
  "route 53":"Route53","route53":"Route53","dns":"Route53",
  "alb":"ALB","load balancing":"ALB","load balancer":"ALB","elb":"ELB",
  "vpc":"VPC","network":"VPC","subnet":"VPC",
  "direct connect":"DirectConnect","dx":"DirectConnect",
  "transit gateway":"TransitGateway","tgw":"TransitGateway",
  "vpc lattice":"VPCLattice","lattice":"VPCLattice",
  "api gateway":"APIGateway","api":"APIGateway","gateway":"APIGateway",
  "step functions":"StepFunctions","stepfunctions":"StepFunctions","state machine":"StepFunctions",
  "appsync":"AppSync","graphql":"AppSync",
  "lambda":"Lambda","function":"Lambda","serverless":"Lambda",
  "ec2 (blue)":"EC2Blue","blue environment":"EC2Blue","blue":"EC2Blue",
  "ec2 (green)":"EC2Green","green environment":"EC2Green","green":"EC2Green",
  "ec2":"EC2","server":"EC2","vm":"EC2",
  "ecs":"ECS","container":"ECS","docker":"ECS",
  "eks":"EKS","kubernetes":"EKS","k8s":"EKS",
  "fargate":"Fargate","serverless container":"Fargate",
  "auto scaling":"AutoScaling","autoscaling":"AutoScaling","scale":"AutoScaling",
  "app runner":"AppRunner","apprunner":"AppRunner",
  "batch":"Batch",
  "elastic beanstalk":"ElasticBeanstalk","beanstalk":"ElasticBeanstalk",
  "bedrock":"Bedrock","llm":"Bedrock","claude":"Bedrock","ai model":"Bedrock",
  "sagemaker":"SageMaker","ml":"SageMaker","machine learning":"SageMaker",
  "sqs":"SQS","queue":"SQS","simple queue":"SQS",
  "sns":"SNS","notification":"SNS","pubsub":"SNS",
  "eventbridge":"EventBridge","events":"EventBridge","bus":"EventBridge",
  "mq":"MQ","activemq":"MQ","rabbitmq":"MQ",
  "ses":"SES","email":"SES",
  "dynamodb":"DynamoDB","dynamo":"DynamoDB","nosql":"DynamoDB",
  "rds":"RDS","database":"RDS","sql":"RDS",
  "aurora":"Aurora","serverless database":"Aurora",
  "elasticache":"ElastiCache","redis":"ElastiCache","cache":"ElastiCache","valkey":"ElastiCache",
  "neptune":"Neptune","graph database":"Neptune",
  "redshift":"Redshift","data warehouse":"Redshift",
  "documentdb":"DocumentDB","mongodb":"DocumentDB",
  "s3":"S3","bucket":"S3","storage":"S3","blob":"S3",
  "ebs":"EBS","block storage":"EBS","volume":"EBS",
  "efs":"EFS","file storage":"EFS","nfs":"EFS",
  "backup":"Backup",
  "cloudwatch":"CloudWatch","monitor":"CloudWatch","metrics":"CloudWatch","logs":"CloudWatch",
  "cloudtrail":"CloudTrail","trail":"CloudTrail","audit":"CloudTrail",
  "config":"Config",
  "xray":"XRay","x-ray":"XRay","tracing":"XRay",
  "iam":"IAM","permissions":"IAM","policy":"IAM",
  "cognito":"Cognito","auth":"Cognito","login":"Cognito","user pool":"Cognito",
  "secrets manager":"SecretsManager","secretsmanager":"SecretsManager","credentials":"SecretsManager",
  "kms":"KMS","key management":"KMS","encryption":"KMS",
  "shield":"Shield","ddos":"Shield",
  "acm":"ACM","certificate":"ACM","ssl":"ACM",
  "athena":"Athena","sql query":"Athena",
  "kinesis":"Kinesis","streaming":"Kinesis","data firehose":"Kinesis",
  "glue":"Glue","etl":"Glue","catalog":"Glue",
  "opensearch":"OpenSearch","search":"OpenSearch","elasticsearch":"OpenSearch",
  "codecommit":"CodeCommit","github":"CodeCommit","git":"CodeCommit",
  "codebuild":"CodeBuild","build":"CodeBuild",
  "codetest":"CodeTest","test":"CodeTest","validate":"CodeTest",
  "codedeploy":"CodeDeploy","deploy":"CodeDeploy",
  "codepipeline":"CodePipeline","pipeline":"CodePipeline","ci/cd":"CodePipeline",
  "static analysis":"StaticAnalysis","sast":"SAST","dependency scan":"DependencyScan","secrets scan":"SecretsScan"
};

const ICONS = {
  User: ResourceAuthenticatedUser, Internet: ResourceInternet, WAF: ArchitectureServiceAWSWAF, CloudFront: ArchitectureServiceAmazonCloudFront, Route53: ArchitectureServiceAmazonRoute53, ALB: ResourceElasticLoadBalancingApplicationLoadBalancer, ELB: ArchitectureServiceElasticLoadBalancing, VPC: ArchitectureServiceAmazonVirtualPrivateCloud, APIGateway: ArchitectureServiceAmazonAPIGateway, Lambda: ArchitectureServiceAWSLambda, EC2: ArchitectureServiceAmazonEC2, ECS: ArchitectureServiceAmazonElasticContainerService, EKS: ArchitectureServiceAmazonElasticKubernetesService, Fargate: ArchitectureServiceAWSFargate, Bedrock: ArchitectureServiceAmazonBedrock, SageMaker: ArchitectureServiceAmazonSageMaker, SQS: ArchitectureServiceAmazonSimpleQueueService, SNS: ArchitectureServiceAmazonSimpleNotificationService, EventBridge: ArchitectureServiceAmazonEventBridge, DynamoDB: ArchitectureServiceAmazonDynamoDB, RDS: ArchitectureServiceAmazonRDS, Aurora: ArchitectureServiceAmazonAurora, ElastiCache: ArchitectureServiceAmazonElastiCache, S3: ArchitectureServiceAmazonSimpleStorageService, EBS: ArchitectureServiceAmazonElasticBlockStore, EFS: ArchitectureServiceAmazonEFS, CloudWatch: ArchitectureServiceAmazonCloudWatch, IAM: ArchitectureServiceAWSIdentityandAccessManagement, Athena: ArchitectureServiceAmazonAthena, Cognito: ArchitectureServiceAmazonCognito, Kinesis: ArchitectureServiceAmazonKinesis, Redshift: ArchitectureServiceAmazonRedshift, SecretsManager: ArchitectureServiceAWSSecretsManager, StepFunctions: ArchitectureServiceAWSStepFunctions, AutoScaling: ArchitectureServiceAmazonEC2AutoScaling, CodeCommit: ArchitectureServiceAWSCodeCommit, CodeBuild: ArchitectureServiceAWSCodeBuild, CodeTest: ArchitectureServiceAWSCodeBuild, CodeDeploy: ArchitectureServiceAWSCodeDeploy, CodePipeline: ArchitectureServiceAWSCodePipeline, EC2Blue: ArchitectureServiceAmazonEC2, EC2Green: ArchitectureServiceAmazonEC2, StaticAnalysis: ArchitectureServiceAWSCodeBuild, SAST: ArchitectureServiceAWSCodeBuild, DependencyScan: ArchitectureServiceAWSCodeBuild, SecretsScan: ArchitectureServiceAWSSecretsManager,
  AppRunner: ArchitectureServiceAWSAppRunner, Batch: ArchitectureServiceAWSBatch, ElasticBeanstalk: ArchitectureServiceAWSElasticBeanstalk, Neptune: ArchitectureServiceAmazonNeptune, DocumentDB: ArchitectureServiceAmazonDocumentDB, Backup: ArchitectureServiceAWSBackup, DirectConnect: ArchitectureServiceAWSDirectConnect, TransitGateway: ArchitectureServiceAWSTransitGateway, VPCLattice: ArchitectureServiceAmazonVPCLattice, KMS: ArchitectureServiceAWSKeyManagementService, Shield: ArchitectureServiceAWSShield, ACM: ArchitectureServiceAWSCertificateManager, AppSync: ArchitectureServiceAWSAppSync, MQ: ArchitectureServiceAmazonMQ, Glue: ArchitectureServiceAWSGlue, OpenSearch: ArchitectureServiceAmazonOpenSearchService, CloudTrail: ArchitectureServiceAWSCloudTrail, Config: ArchitectureServiceAWSConfig, XRay: ArchitectureServiceAWSXRay, SES: ArchitectureServiceAmazonSimpleEmailService
};

const EX=[
  {l:"Serverless API",t:"User → WAF → CloudFront → API Gateway → Lambda → DynamoDB"},
  {l:"Three-Tier Web",t:"Internet → Route53 → ALB → EC2 → Aurora → ElastiCache"},
  {l:"Modern Event Pipeline",t:"User → API Gateway → Lambda → EventBridge → DynamoDB → S3"},
  {l:"Event-Driven API",t:"API Gateway → Lambda → SQS → ECS → DynamoDB → CloudWatch"},
  {l:"Data Inference",t:"User → CloudFront → API Gateway → Lambda → SageMaker → S3"},
];

const APP_NAME="Matrix Slate";

// ── LANDING PAGE ──────────────────────────────────────────────────
const FEATURES=[
  {icon:"✏️",title:"Simple Text Input",desc:"Describe your AWS architecture in plain, readable text notation — no manual drawing required."},
  {icon:"⚡",title:"Instant Sketch Rendering",desc:"Watch your diagrams come to life in milliseconds with automatic structural layout calculation."},
  {icon:"🎨",title:"Handdrawn Aesthetic",desc:"Features official AWS Architecture icons styled on a beautiful, minimalist canvas."},
  {icon:"🔒",title:"100% Client-Side",desc:"Your layouts stay in your browser. Fully private, secure, and works offline."},
];

const PREVIEW_NODES=[
  {label:"User",color:CAT_COLORS.External,icon:ICONS.User,x:0,y:0},
  {label:"WAF",color:CAT_COLORS.Network,icon:ICONS.WAF,x:180,y:0},
  {label:"CloudFront",color:CAT_COLORS.Network,icon:ICONS.CloudFront,x:360,y:0},
  {label:"Lambda",color:CAT_COLORS.Compute,icon:ICONS.Lambda,x:540,y:0},
  {label:"DynamoDB",color:CAT_COLORS.Database,icon:ICONS.DynamoDB,x:720,y:0},
];

function LandingPage({onEnter, setPage}){
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
      {/* Watercolor blobs */}
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>

      {/* NAV */}
      <nav className="lp-nav">
        <div className="lp-logo" onClick={()=>setPage("landing")} style={{cursor:"pointer"}}>
          <svg width="30" height="30" viewBox="0 0 34 34">
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="#2a2724" strokeWidth="2.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2a2724" fontFamily="'Outfit', sans-serif">M</text>
          </svg>
          <span className="lp-logo-text">Matrix Slate</span>
        </div>
        <div className="lp-nav-links">
          <span className="lp-nav-link" onClick={()=>setPage("features")}>Features</span>
          <span className="lp-nav-link" onClick={()=>setPage("examples")}>Examples</span>
          <span className="lp-nav-link" onClick={()=>setPage("docs")}>Docs</span>
        </div>
        <button className="lp-nav-cta" onClick={onEnter}>Launch App →</button>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-badge">✦ AWS Architecture Sketchpad</div>
        <h1 className="lp-hero-title">
          Draft Cloud Architecture<br/>
          <span className="lp-hero-accent">with Simple Text</span>
        </h1>
        <p className="lp-hero-sub">
          Matrix Slate drafts text descriptions into professional AWS<br/>
          architecture diagrams — instantly, offline, and beautifully.
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
                <div key={i} className="lp-preview-node" style={{animationDelay:`${i*0.12}s`}}>
                  <span className="lp-pn-icon" style={{display:"flex",alignItems:"center",justifyContent:"center",color:n.color}}><n.icon size={28}/></span>
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
            <span>✦ Launch Slate</span>
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
        <div className="lp-section-tag">Why Matrix Slate</div>
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
            <div key={i} className="lp-ex-card" onClick={() => onEnter(ex.t)}>
              <div className="lp-ex-label">{ex.l}</div>
              <div className="lp-ex-text">{ex.t}</div>
              <div className="lp-ex-cta">Draft Diagram →</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="lp-footer-cta">
        <h2 className="lp-fc-title">Ready to draft your cloud?</h2>
        <p className="lp-fc-sub">No login. No setup. Just describe and visualize.</p>
        <button className="lp-btn-primary lg" onClick={onEnter}>
          <span>✦ Launch Matrix Slate for Free</span>
          <span className="lp-btn-arrow">→</span>
        </button>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <span className="lp-logo-text" style={{fontSize:13}}>Matrix Slate</span>
          <span style={{color:"var(--border)",margin:"0 8px"}}>·</span>
          <span style={{color:"var(--dim)",fontSize:11}}>AWS Architecture Sketchpad</span>
        </div>
        <div style={{fontSize:10,color:"var(--dim)"}}>Built with React + Vite · Fully Offline</div>
      </footer>
    </div>
  );
}

function InfoPage({ title, children, setPage, onEnter }) {
  return (
    <div className="lp-root" style={{display:"flex", flexDirection:"column", minHeight:"100vh", overflowY:"auto"}}>
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>
      
      <nav className="lp-nav" style={{flexShrink:0}}>
        <div className="lp-logo" onClick={()=>setPage("landing")} style={{cursor:"pointer"}}>
          <svg width="30" height="30" viewBox="0 0 34 34">
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="#2a2724" strokeWidth="2.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2a2724" fontFamily="'Outfit', sans-serif">M</text>
          </svg>
          <span className="lp-logo-text">Matrix Slate</span>
        </div>
        <div className="lp-nav-links">
          <span className="lp-nav-link" onClick={()=>setPage("features")}>Features</span>
          <span className="lp-nav-link" onClick={()=>setPage("examples")}>Examples</span>
          <span className="lp-nav-link" onClick={()=>setPage("docs")}>Docs</span>
        </div>
        <button className="lp-nav-cta" onClick={onEnter}>Launch App →</button>
      </nav>

      <div style={{flex:1, padding:"60px 40px", maxWidth:"1200px", margin:"0 auto", width:"100%", position:"relative", zIndex:10}}>
        <h1 style={{fontSize:"48px", color:"var(--text)", marginBottom:"40px", fontFamily:"Outfit, sans-serif", fontWeight:900}}>{title}</h1>
        {children}
      </div>

      <footer className="lp-footer" style={{flexShrink:0, position:"relative", zIndex:10}}>
        <div className="lp-footer-brand">
          <span className="lp-logo-text" style={{fontSize:13}}>Matrix Slate</span>
          <span style={{color:"var(--border)",margin:"0 8px"}}>·</span>
          <span style={{color:"var(--dim)",fontSize:11}}>AWS Architecture Sketchpad</span>
        </div>
        <div style={{fontSize:10,color:"var(--dim)"}}>Built with React + Vite · Fully Offline</div>
      </footer>
    </div>
  );
}

function FeaturesPage({ setPage, onEnter }) {
  return (
    <InfoPage title="Features" setPage={setPage} onEnter={onEnter}>
      <div className="lp-features-grid">
        {FEATURES.map((f,i)=>(
          <div key={i} className="lp-feat-card" style={{animationDelay:`${i*0.05}s`}}>
            <div className="lp-feat-icon" style={{marginBottom:"16px", color:"var(--orange)", fontSize:"24px"}}>{f.icon}</div>
            <div className="lp-feat-title" style={{fontSize:"18px", color:"var(--text)", marginBottom:"8px", fontWeight:800}}>{f.title}</div>
            <div className="lp-feat-desc" style={{color:"var(--dim)", fontSize:"14px", lineHeight:1.5}}>{f.desc}</div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}

function ExamplesPage({ setPage, onEnter }) {
  return (
    <InfoPage title="Examples" setPage={setPage} onEnter={onEnter}>
      <div className="lp-ex-grid">
        {EX.map((ex,i)=>(
          <div key={i} className="lp-ex-card" onClick={() => onEnter(ex.t)}>
            <div className="lp-ex-label" style={{color:"var(--green)", fontSize:"14px", fontWeight:800, marginBottom:"8px"}}>{ex.l}</div>
            <div className="lp-ex-text" style={{color:"var(--dim)", fontSize:"13px", fontFamily:"monospace", marginBottom:"16px"}}>{ex.t}</div>
            <div className="lp-ex-cta" style={{color:"var(--orange)", fontSize:"13px", fontWeight:700}}>Draft Diagram →</div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}

function DocsPage({ setPage, onEnter }) {
  return (
    <InfoPage title="Documentation" setPage={setPage} onEnter={onEnter}>
      <div style={{color:"var(--dim)", fontSize:"15px", lineHeight:1.8, background:"#ffffff", padding:"40px", borderRadius:"16px", border:"2.5px solid var(--border)", boxShadow:"4px 4px 0 var(--border)"}}>
        <p style={{marginBottom:"20px", color:"var(--text)", fontWeight: 500}}>Matrix Slate relies on a text-parsing engine to understand AWS services and their connections. There is no complex drag-and-drop required.</p>
        <h2 style={{color:"var(--text)", fontSize:"22px", marginTop:"40px", marginBottom:"20px", fontFamily:"Outfit, sans-serif", fontWeight: 800}}>How it Works</h2>
        <ul style={{marginLeft:"20px", listStyle:"disc", display:"flex", flexDirection:"column", gap:"12px", color: "var(--text)"}}>
          <li>Simply type a sequence of AWS services. E.g., <code>User -&#62; API Gateway -&#62; Lambda</code></li>
          <li>The app uses an alias map to detect keywords like <i>"Load Balancer"</i> (maps to ALB) or <i>"Database"</i> (maps to RDS).</li>
          <li>Use arrows (<code>-&#62;</code>) or just list them sequentially; the parser builds a linear connection path automatically.</li>
        </ul>
        <h2 style={{color:"var(--text)", fontSize:"22px", marginTop:"40px", marginBottom:"20px", fontFamily:"Outfit, sans-serif", fontWeight: 800}}>Supported Services</h2>
        <p>Matrix Slate currently supports 27+ AWS services including Compute (EC2, Lambda, ECS), Databases (DynamoDB, RDS, Aurora), Storage (S3, EBS), and developer tools.</p>
      </div>
    </InfoPage>
  );
}

function parse(text){
  const lines = text.split("\n");
  const nodes = [];
  const edges = [];
  const definedNodes = new Map(); // id -> { id, s, l }

  const sortedAliases = Object.entries(ALIASES).sort((a,b)=>b[0].length-a[0].length);
  
  // Helper to extract service type from a string
  const findSvc = (str) => {
    let s = str.toLowerCase().trim();
    // Try exact service match first
    for (const [key, svc] of Object.entries(SERVICES)) {
      if (s === key.toLowerCase() || s === svc.label.toLowerCase()) return key;
    }
    // Try aliases
    for(const [alias, svc] of sortedAliases){
      if(s.includes(alias)) return svc;
    }
    return null;
  };

  let hasExplicitNodeDeclarations = false;
  let hasExplicitArrows = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("//")) continue;

    // Check if it's a node declaration: e.g. client [icon: user, label: "Web Client"]
    if (line.includes("[") && line.includes("]")) {
      hasExplicitNodeDeclarations = true;
      const bracketIdx = line.indexOf("[");
      const nodeId = line.substring(0, bracketIdx).trim();
      const content = line.substring(bracketIdx + 1, line.lastIndexOf("]"));
      
      // Parse properties like: icon: user, label: "Web Client"
      const props = {};
      const pairs = content.split(",");
      for (const pair of pairs) {
        const colonIdx = pair.indexOf(":");
        if (colonIdx !== -1) {
          const key = pair.substring(0, colonIdx).trim().toLowerCase();
          let val = pair.substring(colonIdx + 1).trim();
          // Remove wrapping quotes if present
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1);
          }
          props[key] = val;
        }
      }
      
      // Determine service type
      const svcType = findSvc(props.icon || nodeId) || "EC2";
      definedNodes.set(nodeId, {
        id: nodeId,
        s: svcType,
        l: props.label || ""
      });
      continue;
    }

    // Check if it's a connection line: e.g. client -> api : "HTTP Request"
    if (line.includes("->")) {
      hasExplicitArrows = true;
      let connectionPart = line;
      let labelPart = "";
      
      const colonIdx = line.indexOf(":");
      if (colonIdx !== -1) {
        connectionPart = line.substring(0, colonIdx).trim();
        let rawLabel = line.substring(colonIdx + 1).trim();
        if ((rawLabel.startsWith('"') && rawLabel.endsWith('"')) || (rawLabel.startsWith("'") && rawLabel.endsWith("'"))) {
          rawLabel = rawLabel.substring(1, rawLabel.length - 1);
        }
        labelPart = rawLabel;
      }
      
      const parts = connectionPart.split("->").map(p => p.trim()).filter(Boolean);
      for (let i = 0; i < parts.length - 1; i++) {
        edges.push({ f: parts[i], t: parts[i+1], l: labelPart });
      }
    }
  }

  // If there are explicit node declarations or connection arrows, resolve everything
  if (hasExplicitNodeDeclarations || hasExplicitArrows) {
    // 1. Find all referenced node IDs from the connections
    const referencedIds = new Set();
    for (const e of edges) {
      referencedIds.add(e.f);
      referencedIds.add(e.t);
    }
    
    // 2. Add defined nodes to our output list
    for (const [id, node] of definedNodes.entries()) {
      nodes.push(node);
    }
    
    // 3. For any referenced IDs that were not explicitly declared, auto-instantiate them
    for (const refId of referencedIds) {
      if (!definedNodes.has(refId)) {
        const svcType = findSvc(refId) || "EC2";
        const node = { id: refId, s: svcType, l: "" };
        definedNodes.set(refId, node);
        nodes.push(node);
      }
    }

    // If edges are empty but we have nodes, let's keep the nodes
    if (nodes.length > 0) {
      // Filter edges to ensure both endpoints exist
      const validEdges = edges.filter(e => definedNodes.has(e.f) && definedNodes.has(e.t));
      // Deduplicate edges
      const uniqueEdges = [];
      const seen = new Set();
      for (const e of validEdges) {
        const k = `${e.f}-${e.t}`;
        if (!seen.has(k) && e.f !== e.t) {
          seen.add(k);
          uniqueEdges.push(e);
        }
      }
      return { nodes, edges: uniqueEdges };
    }
  }

  // Fallback to simple linear list parsing if no explicit notation was found
  const sorted = Object.entries(ALIASES).sort((a,b)=>b[0].length-a[0].length);
  const lower = text.toLowerCase();
  const matches = [];
  for (const [alias, svc] of sorted) {
    let i = lower.indexOf(alias);
    while (i !== -1) {
      matches.push({ i, end: i + alias.length, svc });
      i = lower.indexOf(alias, i + 1);
    }
  }
  matches.sort((a,b) => a.i - b.i || (b.end - b.i) - (a.end - a.i));
  
  const filtered = [];
  let last = -1;
  for (const m of matches) {
    if (m.i >= last) {
      filtered.push(m);
      last = m.end;
    }
  }

  if (!filtered.length) {
    throw new Error("No AWS services recognized. Please mention valid services (e.g. API Gateway, Lambda, S3).");
  }

  const outNodes = [];
  let prevSvc = null;
  let counter = 0;
  for (const m of filtered) {
    if (m.svc !== prevSvc) {
      const id = "n" + counter++;
      outNodes.push({ id, s: m.svc, l: "" });
      prevSvc = m.svc;
    }
  }
  
  const outEdges = outNodes.slice(0, -1).map((_, i) => ({
    f: outNodes[i].id,
    t: outNodes[i+1].id,
    l: "HTTPS"
  }));
  
  return { nodes: outNodes, edges: outEdges };
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
  const[page,setPage]=useState("landing"); // "landing", "app", "features", "examples", "docs"
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
  const[promptPos,setPromptPos]=useState({x:0,y:0});
  const[error,setError]=useState("");
  const[apiKey,setApiKey]=useState(()=>localStorage.getItem("matrix_ai_key")||"");
  const[apiBase,setApiBase]=useState(()=>localStorage.getItem("matrix_ai_base")||"https://api.openai.com/v1/chat/completions");
  const[apiModel,setApiModel]=useState(()=>localStorage.getItem("matrix_ai_model")||"gpt-3.5-turbo");
  const[showSettings,setShowSettings]=useState(false);
  const canvasRef=useRef(null);
  const dragRef=useRef(null); // {type:"pan"|"node", startX, startY, nodeId?, startPos?, scrollX?, scrollY?}

  const[activeTab,setActiveTab]=useState("editor");
  const[searchQuery,setSearchQuery]=useState("");

  const graphToText = useCallback((nodesList, edgesList) => {
    const nodeLines = nodesList.map(n => {
      const properties = [];
      properties.push(`icon: ${n.s.toLowerCase()}`);
      if (n.l) {
        properties.push(`label: "${n.l}"`);
      }
      return `${n.id} [${properties.join(", ")}]`;
    });
    
    const edgeLines = edgesList.map(e => {
      const labelPart = e.l ? ` : "${e.l}"` : "";
      return `${e.f} -> ${e.t}${labelPart}`;
    });
    
    return [...nodeLines, "", ...edgeLines].join("\n");
  }, []);

  const isGraphEqual = (g1, g2) => {
    if (!g1 || !g2) return false;
    if (g1.nodes.length !== g2.nodes.length || g1.edges.length !== g2.edges.length) return false;
    const nodesMatch = g1.nodes.every((n, i) => {
      const other = g2.nodes[i];
      return other && other.id === n.id && other.s === n.s && (other.l || "") === (n.l || "");
    });
    if (!nodesMatch) return false;
    const edgesMatch = g1.edges.every((e, i) => {
      const other = g2.edges[i];
      return other && other.f === e.f && other.t === e.t && (other.l || "") === (e.l || "");
    });
    return edgesMatch;
  };

  useEffect(() => {
    if (!prompt.trim() || page !== "app") return;
    const t = setTimeout(() => {
      try {
        const parsed = parse(prompt);
        setDiagram(prev => {
          if (isGraphEqual(prev, parsed)) return prev;
          const { pos: oldPos } = prev || {};
          const { pos: newPos, W: newW, H: newH } = layout(parsed.nodes, parsed.edges);
          const mergedPos = {};
          parsed.nodes.forEach(n => {
            mergedPos[n.id] = (oldPos && oldPos[n.id]) ? oldPos[n.id] : newPos[n.id];
          });
          return { nodes: parsed.nodes, edges: parsed.edges, pos: mergedPos, W: Math.max(newW, 900), H: Math.max(newH, 400) };
        });
      } catch (err) {
        // Silently ignore while typing
      }
    }, 250);
    return () => clearTimeout(t);
  }, [prompt, page]);


  // All hooks must be declared before any conditional returns
  const generate=useCallback(async(p)=>{
    const txt=p??prompt;if(!txt.trim())return;
    setLoading(true);setError("");
    let parsedText = txt;
    let aiError = false;

    if (apiKey) {
      try {
        const res = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: apiModel,
            messages: [
              {
                role: "system", 
                content: `You are an AWS architecture expert. Extract or infer the AWS architecture from the user's prompt. 
You MUST use ONLY the following exact service names: ${Object.keys(SERVICES).join(", ")}.

CRITICAL ARCHITECTURE RULES:
1. Minimalism: Do NOT over-engineer. Remove unnecessary things. Keep the diagram as clean and simple as possible. Only include services that are strictly required.
2. Runtime vs CI/CD: NEVER mix runtime web architecture with CI/CD architecture. They are completely separate.
3. Runtime Flow: If asked for a web/runtime system, the flow MUST be: User -> Route53 -> CloudFront -> WAF -> ALB -> AutoScaling -> Compute. DO NOT include CI/CD tools here.
4. Database Design: Never chain databases. Use one as primary. Databases NEVER send traffic back to compute.
5. Cache Placement: Compute accesses cache directly (e.g. EC2 -> ElastiCache), NOT after the database.
6. Compute Simplicity: Choose ONE primary compute model (EC2, ECS, or Lambda). Do NOT mix EC2, ECS, Fargate, and Lambda.
7. Storage & Event Loops: Flow must be one-directional to prevent infinite loops. CloudWatch is for monitoring, do NOT put it in the data flow path.
8. CI/CD DevOps Lifecycle: If asked for a pipeline/CI/CD, you MUST NOT include User, Route53, CloudFront, WAF, or ALB. The flow MUST be exactly: CodeCommit -> CodePipeline -> CodeBuild -> CodeTest -> CodeDeploy -> Compute. For the feedback loop: Compute -> CloudWatch -> SNS -> CodePipeline.
9. Blue/Green Deployments: If asked for Blue/Green, branch the load balancer explicitly: ALB -> EC2Blue and ALB -> EC2Green.

EXAMPLES OF CORRECT BEHAVIOR:

User: "Three tier web app"
Output:
User -> Route53
Route53 -> CloudFront
CloudFront -> WAF
WAF -> ALB
ALB -> AutoScaling
AutoScaling -> EC2
EC2 -> RDS
EC2 -> ElastiCache

User: "Serverless backend"
Output:
User -> APIGateway
APIGateway -> Lambda
Lambda -> DynamoDB

User: "Full CI/CD Pipeline"
Output:
CodeCommit -> CodePipeline
CodePipeline -> CodeBuild
CodeBuild -> StaticAnalysis
CodeBuild -> SAST
CodeBuild -> DependencyScan
CodeBuild -> SecretsScan
StaticAnalysis -> CodeTest
SAST -> CodeTest
DependencyScan -> CodeTest
SecretsScan -> CodeTest
CodeTest -> CodeDeploy
CodeDeploy -> EC2
EC2 -> CloudWatch
CloudWatch -> SNS
SNS -> CodePipeline

User: "Blue/green deployment"
Output:
User -> ALB
ALB -> EC2Blue
ALB -> EC2Green
CodeDeploy -> EC2Green

ONLY output the architecture using '->' arrows. Do not use any other service names or text. If the prompt is invalid, reply EXACTLY with the word 'INVALID'.`
              },
              {role: "user", content: txt}
            ],
            temperature: 0.1
          })
        });
        const data = await res.json();
        if (data.choices && data.choices.length > 0) {
          parsedText = data.choices[0].message.content.trim();
          if (parsedText.toUpperCase().includes("INVALID") || !parsedText.includes("->")) {
            throw new Error("The AI could not determine an AWS architecture from your prompt. Please be more specific.");
          }
        } else if (data.error) {
          throw new Error("API Error: " + data.error.message);
        }
      } catch (err) {
        console.error("AI Error:", err);
        aiError = true;
        if (err.message.includes("could not determine")) {
          // AI evaluated the prompt and found it invalid. Do not fall back.
          setError("⚠ " + err.message);
          setLoading(false);
          return;
        } else {
          // Network or API key error. Fall back to offline parser.
          setError(`⚠ AI Error: ${err.message}. Falling back to offline parser...`);
          parsedText = txt;
        }
      }
    } else {
      await new Promise(r=>setTimeout(r,500));
    }

    try{
      const{nodes,edges}=parse(parsedText);
      const{pos,W,H}=layout(nodes,edges);
      setDiagram({nodes,edges,pos,W:Math.max(W,900),H:Math.max(H,400)});setTitle("Architecture Diagram");setSel(null);
      setHistory(h=>[{prompt:txt,diagram:{nodes,edges,pos,W:Math.max(W,900),H:Math.max(H,400)},ts:Date.now()},...h].slice(0,8));
    }catch(e){
      console.error(e);
      if(!aiError) setError(e.message || "Failed to generate architecture.");
    }
    finally{setLoading(false);}
  },[prompt, apiKey, apiBase, apiModel]);

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
    } else if(dr.type==="prompt"){
      setPromptPos({
        x: dr.startPosX + (e.clientX - dr.startX),
        y: dr.startPosY + (e.clientY - dr.startY)
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
  const handleEnter = (t) => {
    setPage("app");
    if(typeof t === "string" && t.trim()){
      setPrompt(t);
      setTimeout(()=>generate(t), 10);
    }
  };

  if(page === "landing") return <LandingPage onEnter={handleEnter} setPage={setPage}/>;
  if(page === "features") return <FeaturesPage setPage={setPage} onEnter={handleEnter}/>;
  if(page === "examples") return <ExamplesPage setPage={setPage} onEnter={handleEnter}/>;
  if(page === "docs") return <DocsPage setPage={setPage} onEnter={handleEnter}/>;

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
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="#2a2724" strokeWidth="2.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2a2724" fontFamily="'Outfit', sans-serif">M</text>
          </svg>
          <div><div className="brand-name">Matrix Slate</div><div className="brand-tag">AWS Sketchpad</div></div>
        </div>
        <div className="breadcrumb"><span className="bc-ws">Workspace</span><span className="bc-sep">/</span><span className="bc-title">{title}</span></div>
        <div className="topbar-actions">
          <div className="chip"><span className="chip-dot"/>Cloud Architecture</div>
          {diagram&&<span className="stat-chip">{nodes.length} nodes · {edges.length} edges</span>}
          <button className="btn-ghost" onClick={()=>setShowSettings(true)}>⚙️ Settings</button>
          <button className="btn-ghost" onClick={handleShare}>{shareText}</button>
          <button className="btn-primary" onClick={exportSVG}>Export SVG</button>
        </div>
      </header>

      <div className="body" style={{display:"flex", height:"calc(100vh - 60px)", overflow:"hidden"}}>
        <div className="editor-panel">
          <div className="panel-tabs">
            <button className={`panel-tab ${activeTab === "editor" ? "active" : ""}`} onClick={() => setActiveTab("editor")}>✏️ Editor</button>
            <button className={`panel-tab ${activeTab === "library" ? "active" : ""}`} onClick={() => setActiveTab("library")}>📚 AWS Library</button>
          </div>
          
          {activeTab === "editor" && (
            <div className="editor-tab" style={{flex:1, display:"flex", flexDirection:"column", overflowY:"auto", padding:"16px", gap:"16px"}}>
              <div style={{flex:1, display:"flex", flexDirection:"column"}}>
                <textarea 
                  className="prompt-area" 
                  value={prompt} 
                  onChange={e=>setPrompt(e.target.value)}
                  placeholder={"Describe your AWS architecture...\n\ne.g. User -> WAF -> CloudFront -> API Gateway -> Lambda -> DynamoDB"}
                  style={{flex:1, minHeight:"200px", width:"100%", resize:"none", fontFamily:"monospace", fontSize:"13px", lineHeight:"1.6", border:"2.5px solid var(--border)", borderRadius:"8px", padding:"12px", outline:"none", background:"#faf8f5", color:"var(--text)", fontWeight:"600", boxShadow:"4px 4px 0px rgba(42,39,36,0.1)"}}
                />
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"8px"}}>
                  <div className="hint" style={{fontSize:10, color:"var(--dim)", fontWeight:"700"}}>Use {"->"} to connect services</div>
                  {loading && <span className="spinner" style={{width:14, height:14, border:"2px solid var(--orange)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1.5s linear infinite"}} />}
                </div>
              </div>
              
              {/* Examples inside Editor Tab */}
              <div className="panel-section">
                <h4 style={{fontSize:"12px", textTransform:"uppercase", letterSpacing:".06em", color:"var(--dim)", margin:"0 0 10px 0", fontWeight:800}}>Examples</h4>
                <div style={{display:"flex", flexDirection:"column", gap:"6px"}}>
                  {EX.map((ex,i)=>(
                    <button key={i} className="example-btn" onClick={()=>{
                      setPrompt(ex.t);
                      setTimeout(() => generate(ex.t), 50);
                    }} style={{textAlign:"left", width:"100%", padding:"8px 12px", border:"1.5px solid var(--border)", borderRadius:"6px", background:"#ffffff", cursor:"pointer", transition:"transform 0.1s ease", boxShadow:"2px 2px 0px var(--border)", display:"flex", flexDirection:"column"}}>
                      <span style={{fontSize:"11px", fontWeight:"800", color:"var(--text)"}}>{ex.l}</span>
                      <span style={{fontSize:"9.5px", color:"var(--dim)", fontFamily:"monospace", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", width:"100%", marginTop:"2px"}}>{ex.t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* History inside Editor Tab */}
              {history.length > 0 && (
                <div className="panel-section">
                  <h4 style={{fontSize:"12px", textTransform:"uppercase", letterSpacing:".06em", color:"var(--dim)", margin:"0 0 10px 0", fontWeight:800}}>History</h4>
                  <div style={{display:"flex", flexDirection:"column", gap:"6px"}}>
                    {history.map(h=>(
                      <button key={h.ts} className="example-btn" onClick={()=>{
                        setDiagram(h.diagram);
                        setPrompt(h.prompt);
                      }} style={{textAlign:"left", width:"100%", padding:"8px 12px", border:"1.5px solid var(--border)", borderRadius:"6px", background:"#ffffff", cursor:"pointer", transition:"transform 0.1s ease", boxShadow:"2px 2px 0px var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <span style={{fontSize:"11px", fontWeight:"800", color:"var(--text)"}}>Architecture Sketch</span>
                        <span style={{fontSize:"9.5px", color:"var(--dim)"}}>{new Date(h.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "library" && (
            <div className="library-tab" style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden", padding:"16px"}}>
              <input 
                type="text" 
                className="library-search" 
                placeholder="Search 60+ AWS services..." 
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                style={{width:"100%", padding:"10px 12px", border:"2.5px solid var(--border)", borderRadius:"8px", outline:"none", marginBottom:"14px", fontSize:"13px", fontWeight:"700", background:"#faf8f5", color:"var(--text)", boxShadow:"3px 3px 0px rgba(42,39,36,0.1)"}}
              />
              <div className="library-groups" style={{flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:"16px", paddingRight:"4px"}}>
                {Object.entries(
                  Object.entries(SERVICES)
                    .filter(([k,v]) => {
                      if (k === "EC2Blue" || k === "EC2Green" || k === "StaticAnalysis" || k === "SAST" || k === "DependencyScan" || k === "SecretsScan" || k === "CodeTest") return false;
                      const q = searchQuery.toLowerCase();
                      return v.label.toLowerCase().includes(q) || v.category.toLowerCase().includes(q);
                    })
                    .reduce((acc, [k, v]) => {
                      if (!acc[v.category]) acc[v.category] = [];
                      acc[v.category].push({k, ...v});
                      return acc;
                    }, {})
                ).map(([cat, svcs]) => (
                  <div key={cat} className="library-group">
                    <div style={{fontSize:"10px", fontWeight:"800", textTransform:"uppercase", letterSpacing:".08em", color:CAT_COLORS[cat]||"var(--dim)", marginBottom:"6px"}}>{cat}</div>
                    <div style={{display:"flex", flexDirection:"column", gap:"6px"}}>
                      {svcs.map(s => {
                        const Icon = ICONS[s.k];
                        return (
                          <div key={s.k} className="library-item" style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", border:"1.5px solid var(--border)", borderRadius:"6px", background:"#ffffff", boxShadow:"2px 2px 0px rgba(42,39,36,0.08)"}}>
                            <div style={{display:"flex", alignItems:"center", gap:"8px", minWidth:0}}>
                              <span style={{color:s.color, display:"flex", flexShrink:0}}>{Icon ? React.createElement(Icon, {size:18}) : "●"}</span>
                              <span style={{fontSize:"11.5px", fontWeight:"700", color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{s.label}</span>
                            </div>
                            <div style={{display:"flex", gap:"4px", flexShrink:0}}>
                              <button 
                                className="lib-action-btn" 
                                title="Insert at cursor"
                                onClick={() => {
                                  setPrompt(p => p ? `${p} -> ${s.label}` : s.label);
                                }}
                                style={{padding:"3px 8px", fontSize:"10px", fontWeight:"800", border:"1.5px solid var(--border)", borderRadius:"4px", background:"#ffffff", cursor:"pointer", boxShadow:"1px 1px 0px var(--border)"}}
                              >
                                ✍️ Insert
                              </button>
                              <button 
                                className="lib-action-btn" 
                                title="Add directly to canvas"
                                onClick={() => {
                                  const newId = "n" + Date.now();
                                  const currentPos = diagram?.pos || {};
                                  const px = Object.values(currentPos);
                                  const maxX = px.length ? Math.max(...px.map(p => p.x)) : 0;
                                  const newPos = { ...currentPos, [newId]: { x: maxX + NW + HG, y: PAD } };
                                  const currentNodes = diagram?.nodes || [];
                                  const newNodes = [...currentNodes, { id: newId, s: s.k }];
                                  const currentEdges = diagram?.edges || [];
                                  const newW = Math.max(diagram?.W || 800, maxX + NW + HG + NW + PAD, 900);
                                  const newDiagram = { nodes: newNodes, edges: currentEdges, pos: newPos, W: newW, H: diagram?.H || 400 };
                                  setDiagram(newDiagram);
                                  setPrompt(graphToText(newNodes, currentEdges));
                                  setSel(newId);
                                }}
                                style={{padding:"3px 8px", fontSize:"10px", fontWeight:"800", border:"1.5px solid var(--border)", borderRadius:"4px", background:"var(--green)", color:"#ffffff", cursor:"pointer", boxShadow:"1px 1px 0px var(--border)"}}
                              >
                                ➕ Canvas
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="workspace" style={{position:"relative", flex:1, height:"100%", display:"flex", background:"transparent", overflow:"hidden"}}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        >
          <main className="canvas-wrap" ref={canvasRef}
            style={{cursor:tool==="pan"?"grab":"default", flex:1}}
            onClick={()=>tool==="select"&&setSel(null)}
            onMouseDown={handleCanvasMouseDown}
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
              <div style={{width:2,height:20,background:"var(--border)",margin:"0 6px"}}/>
              <button className="zoom-btn" onClick={()=>setZoom(z=>Math.max(.2,+(z-.1).toFixed(1)))}>−</button>
              <span className="zoom-display">{Math.round(zoom*100)}%</span>
              <button className="zoom-btn" onClick={()=>setZoom(z=>Math.min(3,+(z+.1).toFixed(1)))}>+</button>
              <button className="zoom-btn" style={{fontSize:9,padding:"0 8px",width:"auto"}} onClick={()=>setZoom(1)}>Fit</button>
              <div style={{width:2,height:20,background:"var(--border)",margin:"0 6px"}}/>
              {diagram&&(
                <button className="zoom-btn" style={{fontSize:10,padding:"0 10px",width:"auto",color:"var(--green)",borderColor:"var(--border)",fontWeight:"700"}} onClick={()=>setAddingNode(true)}>+ Node</button>
              )}
              {sel&&diagram&&(
                <button className="zoom-btn" style={{fontSize:10,padding:"0 10px",width:"auto",color:"#ef4444",borderColor:"var(--border)",fontWeight:"700"}} onClick={()=>{
                  const newNodes=nodes.filter(x=>x.id!==sel);
                  const newEdges=edges.filter(e=>e.f!==sel&&e.t!==sel);
                  const newPos={...pos};delete newPos[sel];
                  const px=Object.values(newPos);
                  const W2=px.length?Math.max(...px.map(p=>p.x+NW))+PAD:800;
                  const H2=px.length?Math.max(...px.map(p=>p.y+NH))+PAD:500;
                  setDiagram({nodes:newNodes,edges:newEdges,pos:newPos,W:Math.max(W2,900),H:Math.max(H2,400)});
                  setPrompt(graphToText(newNodes, newEdges));
                  setSel(null);
                }}>🗑 Delete</button>
              )}
              <div className="toolbar-spacer"/>
              {diagram&&<span className="stat-pill">{nodes.length} nodes · {edges.length} connections</span>}
            </div>

            {!diagram&&!loading&&!error&&(
              <div className="empty-state">
                <div className="empty-3d-scene">
                  <div className="float-card fc-1"><span className="fc-icon" style={{color:CAT_COLORS.Compute,display:"flex"}}>{React.createElement(ICONS.Lambda,{size:24})}</span><span className="fc-label" style={{color:"var(--text)"}}>Lambda</span></div>
                  <div className="float-card fc-2"><span className="fc-icon" style={{color:CAT_COLORS.AI,display:"flex"}}>{React.createElement(ICONS.Bedrock,{size:24})}</span><span className="fc-label" style={{color:"var(--text)"}}>Bedrock</span></div>
                  <div className="float-card fc-3"><span className="fc-icon" style={{color:CAT_COLORS.Database,display:"flex"}}>{React.createElement(ICONS.DynamoDB,{size:24})}</span><span className="fc-label" style={{color:"var(--text)"}}>DynamoDB</span></div>
                  <div className="float-card fc-bottom"><span style={{fontSize:10,color:"var(--text)",fontFamily:"JetBrains Mono,monospace",fontWeight:"700"}}>User → Route53 → ALB → …</span></div>
                </div>
                <div className="empty-title">Matrix Slate</div>
                <div className="empty-sub">Draft plain-text descriptions into professional AWS architecture diagrams.</div>
              </div>
            )}

            {error&&(
              <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", zIndex:50, background:"#ffffff", border:"2.5px solid var(--border)", borderRadius:"16px", padding:"30px", width:"80%", maxWidth:"500px", textAlign:"center", boxShadow:"8px 8px 0px rgba(42,39,36,0.15)"}}>
                <div style={{fontSize:"40px", marginBottom:"16px"}}>⚠️</div>
                <h3 style={{color:"var(--text)", fontSize:"20px", marginBottom:"12px", fontFamily:"Outfit, sans-serif", fontWeight:"800"}}>Draft Failed</h3>
                <p style={{color:"#ef4444", fontSize:"14px", lineHeight:"1.6", fontWeight:"600"}}>{error}</p>
                <button className="btn-ghost" style={{marginTop:"24px"}} onClick={()=>setError("")}>Dismiss</button>
              </div>
            )}

            {loading&&(
              <div className="loading-state">
                <div className="loading-orb">
                  <div className="orb-ring orb-r1" style={{borderTopColor:"var(--orange)"}}/><div className="orb-ring orb-r2" style={{borderRightColor:"var(--green)"}}/>
                  <div className="orb-ring orb-r3" style={{borderBottomColor:"var(--cyan)"}}/><div className="orb-core" style={{background:"radial-gradient(circle, var(--orange) 80%, transparent)"}}/>
                </div>
                <div className="loading-label">Drafting Architecture…</div>
                <div className="loading-sub">Parsing services · Building layout · Drawing stencils</div>
              </div>
            )}

            {diagram&&!loading&&(
              <div className="diagram-wrap" style={{transform:`scale(${zoom})`,transformOrigin:"top left",padding:"40px"}}>
                <svg width={W} height={H} style={{display:"block",overflow:"visible",fontFamily:"Inter,sans-serif"}}>
                  <defs>
                    <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,1 L8,4 L0,7 z" fill="#2a2724"/>
                    </marker>
                  </defs>

                  {edges.map((e,i)=>{
                    if(!pos[e.f]||!pos[e.t])return null;
                    const{d,lx,ly}=bezier(e.f,e.t,pos);
                    const col="#2a2724";
                    const label = e.l || "HTTPS";
                    const labelWidth = Math.max(48, label.length * 6 + 12);
                    return(
                      <g key={i}>
                        <path d={d} stroke="rgba(42, 39, 36, 0.06)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                        <path d={d} stroke={col} strokeWidth="1.8" fill="none" strokeLinecap="round" markerEnd="url(#arr)"/>
                        <rect x={lx-labelWidth/2} y={ly-9} width={labelWidth} height={17} rx="4" fill="#ffffff" stroke="#2a2724" strokeWidth="1.5"/>
                        <text x={lx} y={ly+3} fontSize="8.5" fill="#2a2724" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontWeight="700">{label}</text>
                      </g>
                    );
                  })}

                  {nodes.map(n=>{
                    const svc=SERVICES[n.s]||{color:"#2a2724",label:n.s,category:"Other"};
                    const p=pos[n.id];if(!p)return null;
                    const isS=sel===n.id&&tool==="select";
                    const Icon=ICONS[n.s];
                    const nodeCursor=tool==="pan"?"move":"pointer";
                    const displayName = n.l || svc.label;
                    return(
                      <g key={n.id} data-nodeid={n.id}
                        style={{cursor:nodeCursor}}
                        onClick={ev=>{
                          if(tool!=="select")return;
                          ev.stopPropagation();
                          setSel(n.id);
                        }}>
                        {/* Flat block shadow */}
                        <rect x={p.x+4} y={p.y+4} width={NW} height={NH} rx="12" fill="#2a2724"/>
                        {/* Main Card */}
                        <rect x={p.x} y={p.y} width={NW} height={NH} rx="12" fill="#ffffff" stroke={isS?svc.color:"#2a2724"} strokeWidth={isS?2.5:1.5}/>
                        {/* Top Accent Line */}
                        <rect x={p.x+8} y={p.y} width={NW-16} height={4} rx="2" fill={svc.color} opacity="0.95"/>
                        {Icon ? (
                          <svg x={p.x+NW/2-22} y={p.y+22} width={44} height={44}>
                            <Icon size={44} />
                          </svg>
                        ) : (
                          <text x={p.x+NW/2} y={p.y+46} fontSize="26" textAnchor="middle" dominantBaseline="middle" fill="#2a2724">●</text>
                        )}
                        <text x={p.x+NW/2} y={p.y+NH-22} fontSize="10.5" fontWeight="700" fill="#2a2724" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif">{displayName}</text>
                        <rect x={p.x+(NW-svc.category.length*5.5-12)/2} y={p.y+NH-14} width={svc.category.length*5.5+12} height={11} rx="3.5" fill={`${svc.color}15`} stroke={`${svc.color}35`} strokeWidth="0.5"/>
                        <text x={p.x+NW/2} y={p.y+NH-6} fontSize="7" fill={svc.color} textAnchor="middle" fontWeight="700" letterSpacing=".06em">{svc.category.toUpperCase()}</text>
                        {isS&&<rect x={p.x-4} y={p.y-4} width={NW+8} height={NH+8} rx="15" fill="none" stroke={svc.color} strokeWidth="1.5" strokeDasharray="3 3"/>}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </main>
        </div>
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
          setPrompt(graphToText(newNodes, newEdges));
          setSel(null);
        };

        const changeService=(newSvc)=>{
          const newNodes=curNodes.map(x=>x.id===sel?{...x,s:newSvc}:x);
          setDiagram(d=>({...d,nodes:newNodes}));
          setPrompt(graphToText(newNodes, curEdges));
        };

        const changeLabel=(newVal)=>{
          const newNodes=curNodes.map(x=>x.id===sel?{...x,l:newVal}:x);
          setDiagram(d=>({...d,nodes:newNodes}));
          setPrompt(graphToText(newNodes, curEdges));
        };

        const changeEdgeLabel=(eIdx, newEdgeLabel)=>{
          const newEdges=curEdges.map((e,idx)=>idx===eIdx?{...e,l:newEdgeLabel}:e);
          setDiagram(d=>({...d,edges:newEdges}));
          setPrompt(graphToText(curNodes, newEdges));
        };

        const connectTo=(targetId)=>{
          if(targetId===sel)return;
          const already=curEdges.find(e=>(e.f===sel&&e.t===targetId)||(e.f===targetId&&e.t===sel));
          if(already)return;
          const newEdges=[...curEdges,{f:sel,t:targetId}];
          setDiagram(d=>({...d,edges:newEdges}));
          setPrompt(graphToText(curNodes, newEdges));
        };

        const deleteEdge=(eIdx)=>{
          const newEdges=curEdges.filter((_,i)=>i!==eIdx);
          setDiagram(d=>({...d,edges:newEdges}));
          setPrompt(graphToText(curNodes, newEdges));
        };

        const connectedEdges=curEdges.map((e,i)=>({...e,i})).filter(e=>e.f===sel||e.t===sel);
        const otherNodes=curNodes.filter(x=>x.id!==sel);

        return(
          <div className="edit-panel">
            {/* Header */}
            <div className="ep-header">
              <div className="ep-title" style={{color:s.color,display:"flex",alignItems:"center",gap:6}}>
                <span style={{display:"flex",color:s.color}}>{ICONS[n.s] ? React.createElement(ICONS[n.s],{size:20}) : "●"}</span>
                {s.label}
              </div>
              <button className="info-close" onClick={()=>setSel(null)}>✕</button>
            </div>

            {/* Custom Label */}
            <div className="ep-section">
              <div className="ep-section-label">Custom Label</div>
              <input type="text" className="ep-select" style={{background:"#faf8f5", border:"1.5px solid var(--border)", borderRadius:"6px", padding:"6px 10px", fontSize:"12.5px", fontWeight:"600", outline:"none", color:"var(--text)", width:"100%"}}
                value={n.l || ""}
                placeholder={s.label}
                onChange={e=>changeLabel(e.target.value)}
              />
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
                  <div key={e.i} className="ep-edge-row" style={{display:"flex", flexDirection:"column", gap:"6px", borderBottom:"1.5px dashed #e1dfda", paddingBottom:"8px", marginBottom:"8px"}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                      <div style={{display:"flex", alignItems:"center", gap:6}}>
                        <span style={{color:otherSvc?.color||"#888",display:"flex"}}>{ICONS[other?.s] ? React.createElement(ICONS[other?.s],{size:14}) : "●"}</span>
                        <span className="ep-edge-label" style={{display:"flex",alignItems:"center",gap:4}}>{dir} {other?.l || otherSvc?.label || otherId}</span>
                      </div>
                      <button className="ep-del-edge" onClick={()=>deleteEdge(e.i)} title="Remove connection">✕</button>
                    </div>
                    <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                      <span style={{fontSize:"10px", fontWeight:"700", color:"var(--dim)"}}>Label:</span>
                      <input type="text" className="ep-select" style={{flex:1, height:"24px", padding:"2px 8px", fontSize:"11px", fontWeight:"600", background:"#faf8f5", border:"1.5px solid var(--border)", borderRadius:"4px", outline:"none"}}
                        value={e.l || ""}
                        placeholder="e.g. HTTPS, write"
                        onChange={ev=>changeEdgeLabel(e.i, ev.target.value)}
                      />
                    </div>
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
                        style={{color:sv?.color||"#2a2724",borderColor:"var(--border)",background:"#ffffff",opacity:alreadyConn?0.4:1,display:"inline-flex",alignItems:"center",gap:6}}
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
                    style={{borderColor:"var(--border)",background:"#ffffff"}}
                    onClick={()=>{
                      // Add node to diagram with a new position
                      const newId="n"+Date.now();
                      const px=Object.values(pos);
                      const maxX=px.length?Math.max(...px.map(p=>p.x)):0;
                      const newPos={...pos,[newId]:{x:maxX+NW+HG,y:PAD}};
                      const newNodes=[...nodes,{id:newId,s:k}];
                      const newW=Math.max(W,maxX+NW+HG+NW+PAD,900);
                      setDiagram(d=>({...d,nodes:newNodes,pos:newPos,W:newW}));
                      setPrompt(graphToText(newNodes, edges));
                      setAddingNode(false);setAddSearch("");setSel(newId);
                    }}>
                    <span style={{display:"flex",marginBottom:4,color:v.color}}>{ICONS[k] ? React.createElement(ICONS[k],{size:28}) : "●"}</span>
                    <span style={{color:"var(--text)",fontSize:10,fontWeight:800}}>{v.label}</span>
                    <span style={{color:"var(--dim)",fontSize:8,textTransform:"uppercase",letterSpacing:".06em",fontWeight:700}}>{v.category}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes dash{to{stroke-dashoffset:-20}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      
      {showSettings && (
        <div className="modal-overlay" onClick={()=>setShowSettings(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()} style={{width:"460px", padding:"30px"}}>
            <h3 className="section-title" style={{fontSize:18, border:"none", padding:0, margin:0, color:"var(--text)"}}>Generator Settings</h3>
            <p style={{fontSize:13, color:"var(--dim)", marginTop:12, marginBottom:20, lineHeight:1.5}}>
              Configure API details to enable smart diagram layout suggestions.
            </p>
            
            <div style={{display:"flex", flexDirection:"column", gap:12}}>
              <div>
                <label style={{fontSize:11, color:"var(--dim)", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:".05em", fontWeight:700}}>API Endpoint</label>
                <input type="text" value={apiBase} onChange={e=>setApiBase(e.target.value)} 
                  style={{width:"100%", padding:"10px 12px", background:"#faf8f5", border:"2px solid var(--border)", borderRadius:"8px", color:"var(--text)", fontSize:"13px", outline:"none", fontFamily:"monospace", fontWeight:"600"}}/>
              </div>
              <div>
                <label style={{fontSize:11, color:"var(--dim)", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:".05em", fontWeight:700}}>Model ID</label>
                <input type="text" value={apiModel} onChange={e=>setApiModel(e.target.value)} 
                  style={{width:"100%", padding:"10px 12px", background:"#faf8f5", border:"2px solid var(--border)", borderRadius:"8px", color:"var(--text)", fontSize:"13px", outline:"none", fontFamily:"monospace", fontWeight:"600"}}/>
              </div>
              <div>
                <label style={{fontSize:11, color:"var(--dim)", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:".05em", fontWeight:700}}>API Key</label>
                <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} 
                  placeholder="Optional API key..." 
                  style={{width:"100%", padding:"10px 12px", background:"#faf8f5", border:"2px solid var(--border)", borderRadius:"8px", color:"var(--text)", fontFamily:"monospace", fontSize:"13px", outline:"none", fontWeight:"600"}}/>
              </div>
            </div>

            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:28}}>
              <button className="btn-ghost" style={{color:"var(--orange)", fontSize:"12px", padding:"6px 12px"}} onClick={()=>{
                setApiBase("https://api.groq.com/openai/v1/chat/completions");
                setApiModel("llama-3.3-70b-versatile");
              }}>Use Free Groq Preset</button>

              <div style={{display:"flex", gap:10}}>
                <button className="btn-ghost" onClick={()=>setShowSettings(false)}>Cancel</button>
                <button className="btn-primary" onClick={()=>{
                  localStorage.setItem("matrix_ai_key", apiKey);
                  localStorage.setItem("matrix_ai_base", apiBase);
                  localStorage.setItem("matrix_ai_model", apiModel);
                  setShowSettings(false);
                }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
