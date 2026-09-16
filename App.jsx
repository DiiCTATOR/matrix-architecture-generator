import React, { useState, useRef, useCallback, useEffect } from "react";
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

const CAT_COLORS = {
  External: "#3d5a80",      // Slate Blue
  Network: "#7e5a9b",       // Muted Plum
  API: "#ca6f43",           // Terracotta Orange
  Compute: "#d3a243",       // Mustard Gold
  AI: "#4e7c5e",            // Sage Green
  Analytics: "#2f4f4f",     // Dark Slate Gray
  Messaging: "#b84a39",     // Brick Red
  Database: "#2c5d4d",      // Forest Green
  Storage: "#4e7c5e",       // Sage Green
  Monitoring: "#8a5a5c",    // Dusty Rose
  DeveloperTools: "#3d5a80", // Slate Blue
  Security: "#8a5a5c"       // Dusty Rose
};

const SERVICES = {
  User: { color: CAT_COLORS.External, category: "External", label: "User / Client" },
  Internet: { color: CAT_COLORS.External, category: "External", label: "Internet" },
  
  WAF: { color: CAT_COLORS.Network, category: "Network", label: "AWS WAF" },
  CloudFront: { color: CAT_COLORS.Network, category: "Network", label: "CloudFront" },
  Route53: { color: CAT_COLORS.Network, category: "Network", label: "Route 53" },
  ALB: { color: CAT_COLORS.Network, category: "Network", label: "Elastic Load Balancing" },
  ELB: { color: CAT_COLORS.Network, category: "Network", label: "Elastic Load Balancing" },
  VPC: { color: CAT_COLORS.Network, category: "Network", label: "VPC" },
  DirectConnect: { color: CAT_COLORS.Network, category: "Network", label: "Direct Connect" },
  TransitGateway: { color: CAT_COLORS.Network, category: "Network", label: "Transit Gateway" },
  VPCLattice: { color: CAT_COLORS.Network, category: "Network", label: "VPC Lattice" },
  
  APIGateway: { color: CAT_COLORS.API, category: "API", label: "API Gateway" },
  StepFunctions: { color: CAT_COLORS.API, category: "API", label: "Step Functions" },
  AppSync: { color: CAT_COLORS.API, category: "API", label: "AppSync" },
  
  Lambda: { color: CAT_COLORS.Compute, category: "Compute", label: "AWS Lambda" },
  EC2: { color: CAT_COLORS.Compute, category: "Compute", label: "EC2 instance" },
  ECS: { color: CAT_COLORS.Compute, category: "Compute", label: "ECS Container" },
  EKS: { color: CAT_COLORS.Compute, category: "Compute", label: "EKS Kubernetes" },
  Fargate: { color: CAT_COLORS.Compute, category: "Compute", label: "AWS Fargate" },
  AutoScaling: { color: CAT_COLORS.Compute, category: "Compute", label: "Auto Scaling" },
  AppRunner: { color: CAT_COLORS.Compute, category: "Compute", label: "App Runner" },
  Batch: { color: CAT_COLORS.Compute, category: "Compute", label: "AWS Batch" },
  ElasticBeanstalk: { color: CAT_COLORS.Compute, category: "Compute", label: "Elastic Beanstalk" },
  
  Bedrock: { color: CAT_COLORS.AI, category: "AI", label: "Amazon Bedrock" },
  SageMaker: { color: CAT_COLORS.AI, category: "AI", label: "SageMaker" },
  
  SQS: { color: CAT_COLORS.Messaging, category: "Messaging", label: "Amazon SQS" },
  SNS: { color: CAT_COLORS.Messaging, category: "Messaging", label: "Amazon SNS" },
  EventBridge: { color: CAT_COLORS.Messaging, category: "Messaging", label: "EventBridge" },
  MQ: { color: CAT_COLORS.Messaging, category: "Messaging", label: "Amazon MQ" },
  SES: { color: CAT_COLORS.Messaging, category: "Messaging", label: "Amazon SES" },
  
  DynamoDB: { color: CAT_COLORS.Database, category: "Database", label: "Amazon DynamoDB" },
  RDS: { color: CAT_COLORS.Database, category: "Database", label: "Amazon RDS" },
  Aurora: { color: CAT_COLORS.Database, category: "Database", label: "Amazon Aurora" },
  ElastiCache: { color: CAT_COLORS.Database, category: "Database", label: "ElastiCache Redis" },
  Neptune: { color: CAT_COLORS.Database, category: "Database", label: "Amazon Neptune" },
  Redshift: { color: CAT_COLORS.Database, category: "Database", label: "Amazon Redshift" },
  DocumentDB: { color: CAT_COLORS.Database, category: "Database", label: "DocumentDB" },
  
  S3: { color: CAT_COLORS.Storage, category: "Storage", label: "Amazon S3" },
  EBS: { color: CAT_COLORS.Storage, category: "Storage", label: "Amazon EBS" },
  EFS: { color: CAT_COLORS.Storage, category: "Storage", label: "Amazon EFS" },
  Backup: { color: CAT_COLORS.Storage, category: "Storage", label: "AWS Backup" },
  
  CloudWatch: { color: CAT_COLORS.Monitoring, category: "Monitoring", label: "CloudWatch" },
  CloudTrail: { color: CAT_COLORS.Monitoring, category: "Monitoring", label: "CloudTrail" },
  Config: { color: CAT_COLORS.Monitoring, category: "Monitoring", label: "AWS Config" },
  XRay: { color: CAT_COLORS.Monitoring, category: "Monitoring", label: "AWS X-Ray" },
  
  IAM: { color: CAT_COLORS.Security, category: "Security", label: "AWS IAM" },
  Cognito: { color: CAT_COLORS.Security, category: "Security", label: "Amazon Cognito" },
  SecretsManager: { color: CAT_COLORS.Security, category: "Security", label: "Secrets Manager" },
  KMS: { color: CAT_COLORS.Security, category: "Security", label: "AWS KMS" },
  Shield: { color: CAT_COLORS.Security, category: "Security", label: "AWS Shield" },
  ACM: { color: CAT_COLORS.Security, category: "Security", label: "Certificate Mgr" },
  
  Athena: { color: CAT_COLORS.Analytics, category: "Analytics", label: "Amazon Athena" },
  Kinesis: { color: CAT_COLORS.Analytics, category: "Analytics", label: "Amazon Kinesis" },
  Glue: { color: CAT_COLORS.Analytics, category: "Analytics", label: "AWS Glue" },
  OpenSearch: { color: CAT_COLORS.Analytics, category: "Analytics", label: "OpenSearch" },
  
  CodeCommit: { color: CAT_COLORS.DeveloperTools, category: "DeveloperTools", label: "CodeCommit" },
  CodeBuild: { color: CAT_COLORS.DeveloperTools, category: "DeveloperTools", label: "CodeBuild" },
  CodeTest: { color: CAT_COLORS.DeveloperTools, category: "DeveloperTools", label: "CodeTest" },
  CodeDeploy: { color: CAT_COLORS.DeveloperTools, category: "DeveloperTools", label: "CodeDeploy" },
  CodePipeline: { color: CAT_COLORS.DeveloperTools, category: "DeveloperTools", label: "CodePipeline" }
};

const ALIASES = {
  "user": "User", "developer": "User", "client": "User", "customer": "User", "clients": "User",
  "internet": "Internet", "public web": "Internet", "web users": "User", "mobile users": "User",
  "waf": "WAF", "firewall": "WAF",
  "cloudfront": "CloudFront", "cdn": "CloudFront",
  "route 53": "Route53", "route53": "Route53", "dns": "Route53",
  "alb": "ALB", "load balancing": "ALB", "load balancer": "ALB", "application load balancer": "ALB", "elb": "ELB", "elastic load balancing": "ALB",
  "vpc": "VPC", "virtual private cloud": "VPC", "subnet": "VPC",
  "direct connect": "DirectConnect", "dx": "DirectConnect",
  "transit gateway": "TransitGateway", "tgw": "TransitGateway",
  "vpc lattice": "VPCLattice", "lattice": "VPCLattice",
  "api gateway": "APIGateway", "apigateway": "APIGateway", "rest api": "APIGateway", "gateway": "APIGateway",
  "step functions": "StepFunctions", "stepfunctions": "StepFunctions", "state machine": "StepFunctions",
  "appsync": "AppSync", "graphql": "AppSync",
  "lambda": "Lambda", "serverless function": "Lambda", "lambda function": "Lambda",
  "ec2": "EC2", "virtual machine": "EC2", "vm": "EC2", "instances": "EC2", "instance": "EC2",
  "ecs": "ECS", "elastic container service": "ECS", "docker": "ECS",
  "eks": "EKS", "kubernetes": "EKS", "k8s": "EKS",
  "fargate": "Fargate", "serverless container": "Fargate",
  "auto scaling": "AutoScaling", "autoscaling": "AutoScaling", "asg": "AutoScaling", "auto scaling group": "AutoScaling",
  "app runner": "AppRunner", "apprunner": "AppRunner",
  "batch": "Batch", "aws batch": "Batch",
  "elastic beanstalk": "ElasticBeanstalk", "beanstalk": "ElasticBeanstalk",
  "bedrock": "Bedrock", "llm": "Bedrock", "claude": "Bedrock", "foundation model": "Bedrock",
  "sagemaker": "SageMaker", "machine learning": "SageMaker", "ml model": "SageMaker",
  "sqs": "SQS", "simple queue service": "SQS", "message queue": "SQS",
  "sns": "SNS", "simple notification service": "SNS", "pubsub": "SNS",
  "eventbridge": "EventBridge", "event bus": "EventBridge", "cloudwatch events": "EventBridge",
  "mq": "MQ", "activemq": "MQ", "rabbitmq": "MQ", "amazon mq": "MQ",
  "ses": "SES", "simple email service": "SES", "email service": "SES",
  "dynamodb": "DynamoDB", "dynamo": "DynamoDB", "nosql database": "DynamoDB",
  "rds": "RDS", "relational database": "RDS", "sql database": "RDS", "postgres": "RDS", "mysql": "RDS", "amazon rds": "RDS",
  "aurora": "Aurora", "aurora serverless": "Aurora",
  "elasticache": "ElastiCache", "redis": "ElastiCache", "memcached": "ElastiCache", "elasticache for redis": "ElastiCache",
  "neptune": "Neptune", "graph database": "Neptune",
  "redshift": "Redshift", "data warehouse": "Redshift",
  "documentdb": "DocumentDB", "mongodb": "DocumentDB",
  "s3": "S3", "s3 bucket": "S3", "object storage": "S3", "blob storage": "S3", "amazon s3": "S3",
  "ebs": "EBS", "elastic block store": "EBS", "block volume": "EBS",
  "efs": "EFS", "elastic file system": "EFS", "nfs": "EFS",
  "backup": "Backup", "aws backup": "Backup",
  "cloudwatch": "CloudWatch", "cloudwatch metrics": "CloudWatch", "cloudwatch logs": "CloudWatch", "metrics": "CloudWatch", "logs": "CloudWatch",
  "cloudtrail": "CloudTrail", "audit log": "CloudTrail", "aws cloudtrail": "CloudTrail",
  "config": "Config", "aws config": "Config",
  "xray": "XRay", "x-ray": "XRay", "distributed tracing": "XRay",
  "iam": "IAM", "iam role": "IAM", "iam policy": "IAM", "identity and access": "IAM",
  "cognito": "Cognito", "user pool": "Cognito", "auth service": "Cognito",
  "secrets manager": "SecretsManager", "secretsmanager": "SecretsManager", "secrets": "SecretsManager",
  "kms": "KMS", "key management service": "KMS", "encryption key": "KMS",
  "shield": "Shield", "aws shield": "Shield", "ddos protection": "Shield",
  "acm": "ACM", "certificate manager": "ACM", "ssl certificate": "ACM",
  "athena": "Athena", "aws athena": "Athena", "sql query": "Athena",
  "kinesis": "Kinesis", "kinesis streams": "Kinesis", "data firehose": "Kinesis",
  "glue": "Glue", "aws glue": "Glue", "etl": "Glue", "data catalog": "Glue",
  "opensearch": "OpenSearch", "elasticsearch": "OpenSearch", "opensearch service": "OpenSearch",
  "codecommit": "CodeCommit", "git repository": "CodeCommit",
  "codebuild": "CodeBuild", "build stage": "CodeBuild", "build pipeline": "CodeBuild",
  "codetest": "CodeTest", "unit test": "CodeTest", "automated test": "CodeTest", "testing stage": "CodeTest",
  "codedeploy": "CodeDeploy", "deployment stage": "CodeDeploy", "deploy stage": "CodeDeploy",
  "codepipeline": "CodePipeline", "cicd pipeline": "CodePipeline", "ci/cd pipeline": "CodePipeline"
};

const ICONS = {
  User: ResourceAuthenticatedUser, Internet: ResourceInternet, WAF: ArchitectureServiceAWSWAF, CloudFront: ArchitectureServiceAmazonCloudFront, Route53: ArchitectureServiceAmazonRoute53, ALB: ResourceElasticLoadBalancingApplicationLoadBalancer, ELB: ArchitectureServiceElasticLoadBalancing, VPC: ArchitectureServiceAmazonVirtualPrivateCloud, APIGateway: ArchitectureServiceAmazonAPIGateway, Lambda: ArchitectureServiceAWSLambda, EC2: ArchitectureServiceAmazonEC2, ECS: ArchitectureServiceAmazonElasticContainerService, EKS: ArchitectureServiceAmazonElasticKubernetesService, Fargate: ArchitectureServiceAWSFargate, Bedrock: ArchitectureServiceAmazonBedrock, SageMaker: ArchitectureServiceAmazonSageMaker, SQS: ArchitectureServiceAmazonSimpleQueueService, SNS: ArchitectureServiceAmazonSimpleNotificationService, EventBridge: ArchitectureServiceAmazonEventBridge, DynamoDB: ArchitectureServiceAmazonDynamoDB, RDS: ArchitectureServiceAmazonRDS, Aurora: ArchitectureServiceAmazonAurora, ElastiCache: ArchitectureServiceAmazonElastiCache, S3: ArchitectureServiceAmazonSimpleStorageService, EBS: ArchitectureServiceAmazonElasticBlockStore, EFS: ArchitectureServiceAmazonEFS, CloudWatch: ArchitectureServiceAmazonCloudWatch, IAM: ArchitectureServiceAWSIdentityandAccessManagement, Athena: ArchitectureServiceAmazonAthena, Cognito: ArchitectureServiceAmazonCognito, Kinesis: ArchitectureServiceAmazonKinesis, Redshift: ArchitectureServiceAmazonRedshift, SecretsManager: ArchitectureServiceAWSSecretsManager, StepFunctions: ArchitectureServiceAWSStepFunctions, AutoScaling: ArchitectureServiceAmazonEC2AutoScaling, CodeCommit: ArchitectureServiceAWSCodeCommit, CodeBuild: ArchitectureServiceAWSCodeBuild, CodeTest: ArchitectureServiceAWSCodeBuild, CodeDeploy: ArchitectureServiceAWSCodeDeploy, CodePipeline: ArchitectureServiceAWSCodePipeline,
  AppRunner: ArchitectureServiceAWSAppRunner, Batch: ArchitectureServiceAWSBatch, ElasticBeanstalk: ArchitectureServiceAWSElasticBeanstalk, Neptune: ArchitectureServiceAmazonNeptune, DocumentDB: ArchitectureServiceAmazonDocumentDB, Backup: ArchitectureServiceAWSBackup, DirectConnect: ArchitectureServiceAWSDirectConnect, TransitGateway: ArchitectureServiceAWSTransitGateway, VPCLattice: ArchitectureServiceAmazonVPCLattice, KMS: ArchitectureServiceAWSKeyManagementService, Shield: ArchitectureServiceAWSShield, ACM: ArchitectureServiceAWSCertificateManager, AppSync: ArchitectureServiceAWSAppSync, MQ: ArchitectureServiceAmazonMQ, Glue: ArchitectureServiceAWSGlue, OpenSearch: ArchitectureServiceAmazonOpenSearchService, CloudTrail: ArchitectureServiceAWSCloudTrail, Config: ArchitectureServiceAWSConfig, XRay: ArchitectureServiceAWSXRay, SES: ArchitectureServiceAmazonSimpleEmailService
};

const EX = [
  { l: "🏛 Multi-AZ Enterprise Web", t: `User -> ALB : "HTTPS Traffic"\nALB -> EC2_AZ_A : "Forward AZ-A"\nALB -> EC2_AZ_B : "Forward AZ-B"\nEC2_AZ_A <-> ElastiCache_AZ_A : "Cache Read/Write"\nEC2_AZ_A <-> ElastiCache_AZ_B : "Cross-AZ Cache"\nEC2_AZ_B <-> ElastiCache_AZ_A : "Cross-AZ Cache"\nEC2_AZ_B <-> ElastiCache_AZ_B : "Cache Read/Write"\nEC2_AZ_A -> RDS_Primary : "SQL Read/Write"\nEC2_AZ_B -> RDS_Primary : "Cross-AZ Write"\nRDS_Primary -> RDS_Secondary : "Sync Replication"` },
  { l: "⚡ Serverless REST API", t: `User -> Route53 : "DNS"\nRoute53 -> CloudFront : "CDN Edge"\nCloudFront -> WAF : "Shield"\nWAF -> APIGateway : "API Gateway"\nAPIGateway -> Lambda : "Execute"\nLambda -> DynamoDB : "State"\nLambda -> S3 : "Assets"` },
  { l: "🤖 Generative AI / RAG Bedrock", t: `User -> CloudFront : "HTTPS"\nCloudFront -> APIGateway : "API Request"\nAPIGateway -> Lambda : "Orchestrator"\nLambda -> Bedrock : "LLM Inference"\nBedrock -> OpenSearch : "Vector Embeddings"\nLambda -> DynamoDB : "Chat Memory"\nLambda -> S3 : "Knowledge Base"` },
  { l: "📬 Modern Event-Driven System", t: `User -> APIGateway : "Submit Event"\nAPIGateway -> Lambda : "Ingest"\nLambda -> EventBridge : "Publish"\nEventBridge -> SQS : "Buffer Tasks"\nSQS -> ECS : "Worker Tasks"\nECS -> DynamoDB : "Save Result"\nECS -> CloudWatch : "Metrics"` },
  { l: "📊 Data Lake & Streaming", t: `Internet -> Kinesis : "Ingest Stream"\nKinesis -> Glue : "ETL"\nGlue -> S3 : "Data Lake"\nS3 -> Athena : "SQL Query"\nAthena -> OpenSearch : "Visual Dashboard"` }
];

// ── LANDING PAGE ──────────────────────────────────────────────────
const FEATURES = [
  { icon: "🏛️", title: "Real Cloud Architecture", desc: "Generates multi-AZ VPC boundaries, Auto Scaling groups, and replication topologies matching production AWS patterns." },
  { icon: "⚡", title: "Instant Visual Synthesis", desc: "Transforms natural language descriptions and DSL arrows into publication-ready cloud architecture diagrams." },
  { icon: "🎨", title: "Official AWS Iconography", desc: "Rendered with high-resolution AWS official architecture service icons and clean container boxes." },
  { icon: "🔒", title: "100% Client-Side & Offline", desc: "All diagrams and calculations run locally in your browser. Fully private and instant." }
];

const PREVIEW_NODES = [
  { label: "User", color: CAT_COLORS.External, icon: ICONS.User },
  { label: "ALB", color: CAT_COLORS.Network, icon: ICONS.ALB },
  { label: "EC2 (ASG)", color: CAT_COLORS.Compute, icon: ICONS.EC2 },
  { label: "ElastiCache", color: CAT_COLORS.Database, icon: ICONS.ElastiCache },
  { label: "RDS Multi-AZ", color: CAT_COLORS.Database, icon: ICONS.RDS }
];

function LandingPage({ onEnter, setPage }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0);
  const full = "User → ALB → EC2 (Auto Scaling) → Redis & RDS Multi-AZ";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) {
        clearInterval(t);
        setTimeout(() => setPhase(1), 600);
      }
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="lp-root">
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>

      <nav className="lp-nav">
        <div className="lp-logo" onClick={() => setPage("landing")} style={{ cursor: "pointer" }}>
          <svg width="30" height="30" viewBox="0 0 34 34">
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="#2a2724" strokeWidth="2.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2a2724" fontFamily="'Outfit', sans-serif">M</text>
          </svg>
          <span className="lp-logo-text">Matrix Slate</span>
        </div>
        <div className="lp-nav-links">
          <span className="lp-nav-link" onClick={() => setPage("features")}>Features</span>
          <span className="lp-nav-link" onClick={() => setPage("examples")}>Examples</span>
          <span className="lp-nav-link" onClick={() => setPage("docs")}>Docs</span>
        </div>
        <button className="lp-nav-cta" onClick={onEnter}>Launch App →</button>
      </nav>

      <section className="lp-hero">
        <div className="lp-hero-badge">✦ AWS Cloud Architecture Generator</div>
        <h1 className="lp-hero-title">
          Draft Production AWS Architecture<br/>
          <span className="lp-hero-accent">with Tiered Cloud Containers</span>
        </h1>
        <p className="lp-hero-sub">
          Generate structured Multi-AZ Availability Zones, Auto Scaling fleets, and cross-tier data topologies<br/>
          from natural language or simple arrow notation.
        </p>

        <div className="lp-demo-box">
          <div className="lp-demo-label">Describe your system:</div>
          <div className="lp-demo-input">
            <span className="lp-demo-text">{typed}</span>
            <span className="lp-cursor">|</span>
          </div>
          {phase === 1 && (
            <div className="lp-demo-nodes">
              {PREVIEW_NODES.map((n, i) => (
                <div key={i} className="lp-preview-node" style={{ animationDelay: `${i * 0.12}s` }}>
                  <span className="lp-pn-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: n.color }}>
                    <n.icon size={26} />
                  </span>
                  <span className="lp-pn-label" style={{ color: n.color }}>{n.label}</span>
                  {i < PREVIEW_NODES.length - 1 && <span className="lp-pn-arrow">→</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lp-cta-row">
          <button className="lp-btn-primary" onClick={onEnter}>
            <span>✦ Launch Matrix Architecture Studio</span>
            <span className="lp-btn-arrow">→</span>
          </button>
        </div>

        <div className="lp-stats">
          {[["60+", "AWS Services"], ["Multi-AZ", "VPC & Subnets"], ["0ms", "Cloud Latency"], ["100%", "Private & Offline"]].map(([n, l]) => (
            <div key={l} className="lp-stat">
              <div className="lp-stat-num">{n}</div>
              <div className="lp-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-features">
        <div className="lp-section-tag">Core Capabilities</div>
        <h2 className="lp-section-title">Engineered for real cloud architects</h2>
        <div className="lp-features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="lp-feat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="lp-feat-icon">{f.icon}</div>
              <div className="lp-feat-title">{f.title}</div>
              <div className="lp-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-examples">
        <div className="lp-section-tag">Instant Templates</div>
        <h2 className="lp-section-title">Explore Production Cloud Blueprints</h2>
        <div className="lp-ex-grid">
          {EX.map((ex, i) => (
            <div key={i} className="lp-ex-card" onClick={() => onEnter(ex.t)}>
              <div className="lp-ex-label">{ex.l}</div>
              <div className="lp-ex-text">{ex.t.replace(/\n/g, " · ")}</div>
              <div className="lp-ex-cta">Draft Architecture →</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <span className="lp-logo-text" style={{ fontSize: 13 }}>Matrix Slate</span>
          <span style={{ color: "var(--border)", margin: "0 8px" }}>·</span>
          <span style={{ color: "var(--dim)", fontSize: 11 }}>AWS Architecture Generator</span>
        </div>
        <div style={{ fontSize: 10, color: "var(--dim)" }}>Built with React + Vite · Fully Offline & Interactive</div>
      </footer>
    </div>
  );
}

function InfoPage({ title, children, setPage, onEnter }) {
  return (
    <div className="lp-root" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowY: "auto" }}>
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>
      
      <nav className="lp-nav" style={{ flexShrink: 0 }}>
        <div className="lp-logo" onClick={() => setPage("landing")} style={{ cursor: "pointer" }}>
          <svg width="30" height="30" viewBox="0 0 34 34">
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="#2a2724" strokeWidth="2.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2a2724" fontFamily="'Outfit', sans-serif">M</text>
          </svg>
          <span className="lp-logo-text">Matrix Slate</span>
        </div>
        <div className="lp-nav-links">
          <span className="lp-nav-link" onClick={() => setPage("features")}>Features</span>
          <span className="lp-nav-link" onClick={() => setPage("examples")}>Examples</span>
          <span className="lp-nav-link" onClick={() => setPage("docs")}>Docs</span>
        </div>
        <button className="lp-nav-cta" onClick={onEnter}>Launch App →</button>
      </nav>

      <div style={{ flex: 1, padding: "60px 40px", maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 10 }}>
        <h1 style={{ fontSize: "48px", color: "var(--text)", marginBottom: "40px", fontFamily: "Outfit, sans-serif", fontWeight: 900 }}>{title}</h1>
        {children}
      </div>

      <footer className="lp-footer" style={{ flexShrink: 0, position: "relative", zIndex: 10 }}>
        <div className="lp-footer-brand">
          <span className="lp-logo-text" style={{ fontSize: 13 }}>Matrix Slate</span>
          <span style={{ color: "var(--border)", margin: "0 8px" }}>·</span>
          <span style={{ color: "var(--dim)", fontSize: 11 }}>AWS Architecture Generator</span>
        </div>
        <div style={{ fontSize: 10, color: "var(--dim)" }}>Built with React + Vite · Fully Offline</div>
      </footer>
    </div>
  );
}

function FeaturesPage({ setPage, onEnter }) {
  return (
    <InfoPage title="Features" setPage={setPage} onEnter={onEnter}>
      <div className="lp-features-grid">
        {FEATURES.map((f, i) => (
          <div key={i} className="lp-feat-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="lp-feat-icon" style={{ marginBottom: "16px", color: "var(--orange)", fontSize: "24px" }}>{f.icon}</div>
            <div className="lp-feat-title" style={{ fontSize: "18px", color: "var(--text)", marginBottom: "8px", fontWeight: 800 }}>{f.title}</div>
            <div className="lp-feat-desc" style={{ color: "var(--dim)", fontSize: "14px", lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}

function ExamplesPage({ setPage, onEnter }) {
  return (
    <InfoPage title="Architecture Presets" setPage={setPage} onEnter={onEnter}>
      <div className="lp-ex-grid">
        {EX.map((ex, i) => (
          <div key={i} className="lp-ex-card" onClick={() => onEnter(ex.t)}>
            <div className="lp-ex-label" style={{ color: "var(--green)", fontSize: "14px", fontWeight: 800, marginBottom: "8px" }}>{ex.l}</div>
            <div className="lp-ex-text" style={{ color: "var(--dim)", fontSize: "13px", fontFamily: "monospace", marginBottom: "16px" }}>{ex.t.replace(/\n/g, " · ")}</div>
            <div className="lp-ex-cta" style={{ color: "var(--orange)", fontSize: "13px", fontWeight: 700 }}>Open Architecture →</div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}

function DocsPage({ setPage, onEnter }) {
  return (
    <InfoPage title="Documentation" setPage={setPage} onEnter={onEnter}>
      <div style={{ color: "var(--dim)", fontSize: "15px", lineHeight: 1.8, background: "#ffffff", padding: "40px", borderRadius: "16px", border: "2.5px solid var(--border)", boxShadow: "4px 4px 0 var(--border)" }}>
        <p style={{ marginBottom: "20px", color: "var(--text)", fontWeight: 500 }}>Matrix Slate converts text requirements into structured, multi-AZ cloud architecture topologies.</p>
        <h2 style={{ color: "var(--text)", fontSize: "22px", marginTop: "40px", marginBottom: "20px", fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>DSL Arrow Syntax</h2>
        <ul style={{ marginLeft: "20px", listStyle: "disc", display: "flex", flexDirection: "column", gap: "12px", color: "var(--text)" }}>
          <li>Forward connections: <code>User -&gt; ALB : "HTTPS Traffic"</code></li>
          <li>Bidirectional sync / cache: <code>EC2_AZ_A &lt;-&gt; ElastiCache_AZ_A : "Read/Write"</code></li>
          <li>Custom labels &amp; icons: <code>client [icon: user, label: "Web Users"] -&gt; api [icon: apigateway]</code></li>
        </ul>
      </div>
    </InfoPage>
  );
}

// ── PARSER ENGINE ────────────────────────────────────────────────
function parse(text) {
  const lines = text.split("\n");
  const nodes = [];
  const edges = [];
  const definedNodes = new Map();

  const sortedAliases = Object.entries(ALIASES).sort((a, b) => b[0].length - a[0].length);
  
  const findSvc = (str) => {
    if (!str) return null;
    let s = str.toLowerCase().trim();
    if (s.includes("ec2")) return "EC2";
    if (s.includes("elasticache") || s.includes("redis") || s.includes("memcached")) return "ElastiCache";
    if (s.includes("rds") || s.includes("postgres") || s.includes("mysql") || s.includes("database")) return "RDS";
    if (s.includes("aurora")) return "Aurora";
    if (s.includes("alb") || s.includes("elb") || s.includes("load balancing") || s.includes("load balancer")) return "ALB";
    if (s.includes("autoscaling") || s.includes("auto scaling") || s.includes("asg")) return "AutoScaling";

    for (const [key, svc] of Object.entries(SERVICES)) {
      if (s === key.toLowerCase() || s === svc.label.toLowerCase()) return key;
    }
    for (const [alias, svc] of sortedAliases) {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
      if (regex.test(s)) return svc;
    }
    return null;
  };

  let hasExplicitArrows = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("//")) continue;

    if (line.includes("->") || line.includes("<->") || line.includes("<=>")) {
      hasExplicitArrows = true;
      const isBi = line.includes("<->") || line.includes("<=>");
      const arrowSplitter = isBi ? (line.includes("<->") ? "<->" : "<=>") : "->";
      
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
      
      const parts = connectionPart.split(arrowSplitter).map(p => p.trim()).filter(Boolean);
      for (let i = 0; i < parts.length - 1; i++) {
        const fromRaw = parts[i];
        const toRaw = parts[i + 1];
        
        const parseInline = (token) => {
          let id = token;
          let label = "";
          let icon = "";
          if (token.includes("[") && token.includes("]")) {
            const bIdx = token.indexOf("[");
            id = token.substring(0, bIdx).trim();
            const content = token.substring(bIdx + 1, token.lastIndexOf("]"));
            content.split(",").forEach(pair => {
              const [k, v] = pair.split(":").map(s => s?.trim());
              if (k && v) {
                const cleanV = v.replace(/^['"]|['"]$/g, "");
                if (k.toLowerCase() === "label") label = cleanV;
                if (k.toLowerCase() === "icon") icon = cleanV;
              }
            });
          }
          return { id, label, icon };
        };

        const fInfo = parseInline(fromRaw);
        const tInfo = parseInline(toRaw);

        if (!definedNodes.has(fInfo.id)) {
          const s = findSvc(fInfo.icon || fInfo.id) || "EC2";
          definedNodes.set(fInfo.id, { id: fInfo.id, s, l: fInfo.label || "" });
        }
        if (!definedNodes.has(tInfo.id)) {
          const s = findSvc(tInfo.icon || tInfo.id) || "EC2";
          definedNodes.set(tInfo.id, { id: tInfo.id, s, l: tInfo.label || "" });
        }

        edges.push({ f: fInfo.id, t: tInfo.id, l: labelPart, isBi });
      }
      continue;
    }

    if (line.includes("[") && line.includes("]")) {
      const bracketIdx = line.indexOf("[");
      const nodeId = line.substring(0, bracketIdx).trim();
      const content = line.substring(bracketIdx + 1, line.lastIndexOf("]"));
      const props = {};
      content.split(",").forEach(pair => {
        const [k, v] = pair.split(":").map(s => s?.trim());
        if (k && v) props[k.toLowerCase()] = v.replace(/^['"]|['"]$/g, "");
      });
      const svcType = findSvc(props.icon || nodeId) || "EC2";
      definedNodes.set(nodeId, {
        id: nodeId,
        s: svcType,
        l: props.label || ""
      });
    }
  }

  if (hasExplicitArrows || definedNodes.size > 0) {
    for (const [id, node] of definedNodes.entries()) {
      let label = node.l;
      if (!label) {
        if (id === "EC2_AZ_A") label = "EC2 instance (AZ-A)";
        else if (id === "EC2_AZ_B") label = "EC2 instance (AZ-B)";
        else if (id === "ElastiCache_AZ_A") label = "ElastiCache Redis (AZ-A)";
        else if (id === "ElastiCache_AZ_B") label = "ElastiCache Redis (AZ-B)";
        else if (id === "RDS_Primary") label = "Amazon RDS Primary";
        else if (id === "RDS_Secondary") label = "Amazon RDS Standby";
        else label = SERVICES[node.s]?.label || id;
      }
      nodes.push({ ...node, l: label });
    }

    const uniqueEdges = [];
    const seen = new Set();
    for (const e of edges) {
      const k = `${e.f}-${e.t}`;
      if (!seen.has(k) && e.f !== e.t) {
        seen.add(k);
        uniqueEdges.push(e);
      }
    }
    return { nodes, edges: uniqueEdges };
  }

  // ── NATURAL LANGUAGE INTENT ARCHETYPES ──────────────────────────
  const lower = text.toLowerCase().trim();

  if (/\b(three[- ]?tier|3[- ]?tier|multi[- ]?az|web\s*app|ecommerce|full\s*stack|scalable|highly\s*available|elastic\s*load\s*balancing|asg)\b/i.test(lower) && !lower.includes("serverless") && !lower.includes("pipeline")) {
    return parse(`// Multi-AZ Scalable Web Application
User [icon: user, label: "Web / Mobile Users"] -> ALB [icon: alb, label: "Elastic Load Balancing"] : "HTTPS Traffic"
ALB -> EC2_AZ_A [icon: ec2, label: "EC2 instance"] : "Forward AZ-A"
ALB -> EC2_AZ_B [icon: ec2, label: "EC2 instance"] : "Forward AZ-B"
EC2_AZ_A <-> ElastiCache_AZ_A [icon: elasticache, label: "ElastiCache for Redis (Cluster 1)"] : "Cache Read/Write"
EC2_AZ_A <-> ElastiCache_AZ_B [icon: elasticache, label: "ElastiCache for Redis (Cluster 2)"] : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_A : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_B : "Cache Read/Write"
EC2_AZ_A -> RDS_Primary [icon: rds, label: "Amazon RDS primary"] : "SQL Read/Write"
EC2_AZ_B -> RDS_Primary : "Cross-AZ Write"
RDS_Primary -> RDS_Secondary [icon: rds, label: "Amazon RDS secondary"] : "Sync Replication"`);
  }

  if (/\b(serverless|rest\s*api|crud\s*api|backend\s*api|lambda\s*api|serverless\s*backend|microservice)\b/i.test(lower) && !lower.includes("pipeline")) {
    return parse(`User [icon: user, label: "Client App"] -> Route53 [icon: route53, label: "Route 53 DNS"] : "DNS Resolve"
Route53 -> CloudFront [icon: cloudfront, label: "CloudFront CDN"] : "Edge HTTPS"
CloudFront -> WAF [icon: waf, label: "AWS WAF"] : "Filter Attacks"
WAF -> APIGateway [icon: apigateway, label: "API Gateway"] : "Route Requests"
APIGateway -> Lambda [icon: lambda, label: "Lambda Functions"] : "Execute Serverless"
Lambda -> DynamoDB [icon: dynamodb, label: "DynamoDB (State)"] : "Read/Write"
Lambda -> S3 [icon: s3, label: "Amazon S3 (Assets)"] : "Store Objects"`);
  }

  if (/\b(ci[\s/-]?cd|devops|pipeline|build\s*pipeline|deployment\s*pipeline|continuous\s*integration)\b/i.test(lower)) {
    return parse(`CodeCommit [icon: codecommit, label: "Source Repo"] -> CodePipeline [icon: codepipeline, label: "Release Pipeline"] : "Trigger"
CodePipeline -> CodeBuild [icon: codebuild, label: "Build & Lint"] : "Artifacts"
CodeBuild -> CodeTest [icon: codetest, label: "Unit & Security Tests"] : "Verify"
CodeTest -> CodeDeploy [icon: codedeploy, label: "Deploy Fleet"] : "Release"
CodeDeploy -> EC2 [icon: ec2, label: "EC2 Production Fleet"] : "Rolling Update"
EC2 -> CloudWatch [icon: cloudwatch, label: "CloudWatch Alarms"] : "Monitor"
CloudWatch -> SNS [icon: sns, label: "SNS Notification"] : "Alert Devs"`);
  }

  if (/\b(ai|llm|rag|bedrock|generative\s*ai|genai|chatbot|sagemaker|machine\s*learning)\b/i.test(lower)) {
    return parse(`User [icon: user, label: "Web Client"] -> CloudFront [icon: cloudfront, label: "CloudFront CDN"] : "HTTPS"
CloudFront -> APIGateway [icon: apigateway, label: "API Gateway"] : "API Requests"
APIGateway -> Lambda [icon: lambda, label: "Orchestrator Lambda"] : "Invoke"
Lambda -> Bedrock [icon: bedrock, label: "Amazon Bedrock"] : "LLM Inference"
Bedrock -> OpenSearch [icon: opensearch, label: "OpenSearch Vector DB"] : "Embeddings / RAG"
Lambda -> DynamoDB [icon: dynamodb, label: "DynamoDB"] : "Session Memory"
Lambda -> S3 [icon: s3, label: "Amazon S3"] : "Knowledge Base"`);
  }

  if (/\b(event[\s-]?driven|message\s*queue|pub[\s-]?sub|async\s*processing|eventbridge|sqs|sns)\b/i.test(lower)) {
    return parse(`User [icon: user, label: "Client App"] -> APIGateway [icon: apigateway, label: "API Gateway"] : "Submit Event"
APIGateway -> Lambda [icon: lambda, label: "Producer Lambda"] : "Ingest"
Lambda -> EventBridge [icon: eventbridge, label: "EventBridge Bus"] : "Publish Event"
EventBridge -> SQS [icon: sqs, label: "Amazon SQS Queue"] : "Buffer Tasks"
SQS -> ECS [icon: ecs, label: "ECS Worker Tasks"] : "Process Async"
ECS -> DynamoDB [icon: dynamodb, label: "DynamoDB"] : "Save Result"
ECS -> CloudWatch [icon: cloudwatch, label: "CloudWatch"] : "Metrics & Logs"`);
  }

  if (/\b(analytics|data\s*lake|data\s*pipeline|streaming|kinesis|etl|big\s*data|athena|glue)\b/i.test(lower)) {
    return parse(`Internet [icon: internet, label: "IoT & Telemetry"] -> Kinesis [icon: kinesis, label: "Kinesis Stream"] : "Ingest"
Kinesis -> Glue [icon: glue, label: "AWS Glue (ETL)"] : "Transform"
Glue -> S3 [icon: s3, label: "Amazon S3 (Data Lake)"] : "Parquet Storage"
S3 -> Athena [icon: athena, label: "Amazon Athena"] : "SQL Analytics"
Athena -> OpenSearch [icon: opensearch, label: "OpenSearch Dashboard"] : "Visualize"`);
  }

  // Fallback service keyword extraction
  const matches = [];
  for (const [alias, svc] of sortedAliases) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      const idx = match.index + match[1].length;
      matches.push({ i: idx, end: idx + alias.length, svc });
      regex.lastIndex = idx + alias.length;
    }
  }
  matches.sort((a, b) => a.i - b.i || (b.end - b.i) - (a.end - a.i));
  
  const filtered = [];
  let last = -1;
  for (const m of matches) {
    if (m.i >= last) {
      filtered.push(m);
      last = m.end;
    }
  }

  if (!filtered.length) {
    return parse(`// Multi-AZ Scalable Web Application
User -> ALB : "HTTPS Traffic"
ALB -> EC2_AZ_A : "Forward AZ-A"
ALB -> EC2_AZ_B : "Forward AZ-B"
EC2_AZ_A <-> ElastiCache_AZ_A : "Cache Read/Write"
EC2_AZ_A <-> ElastiCache_AZ_B : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_A : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_B : "Cache Read/Write"
EC2_AZ_A -> RDS_Primary : "SQL Read/Write"
EC2_AZ_B -> RDS_Primary : "Cross-AZ Write"
RDS_Primary -> RDS_Secondary : "Sync Replication"`);
  }

  const hasUser = filtered.some(m => m.svc === "User" || m.svc === "Internet");
  const hasCompute = filtered.some(m => ["EC2", "Lambda", "ECS", "EKS", "Fargate"].includes(m.svc));
  const hasDB = filtered.some(m => ["RDS", "Aurora", "DynamoDB", "ElastiCache"].includes(m.svc));

  const outNodes = [];
  const outEdges = [];
  
  if (hasCompute && hasDB) {
    const entry = hasUser ? "User" : "Client";
    const lb = filtered.find(m => ["ALB", "ELB", "APIGateway"].includes(m.svc))?.svc || "ALB";
    const comp = filtered.find(m => ["EC2", "Lambda", "ECS", "EKS"].includes(m.svc))?.svc || "EC2";
    const db = filtered.find(m => ["RDS", "Aurora", "DynamoDB"].includes(m.svc))?.svc || "RDS";
    const cache = filtered.find(m => m.svc === "ElastiCache")?.svc;

    outNodes.push({ id: entry, s: "User", l: "Web & Mobile Users" });
    outNodes.push({ id: lb, s: lb, l: SERVICES[lb]?.label || lb });
    outEdges.push({ f: entry, t: lb, l: "HTTPS" });

    outNodes.push({ id: `${comp}_AZ_A`, s: comp, l: `${comp} instance (AZ-A)` });
    outNodes.push({ id: `${comp}_AZ_B`, s: comp, l: `${comp} instance (AZ-B)` });
    outEdges.push({ f: lb, t: `${comp}_AZ_A`, l: "Forward" });
    outEdges.push({ f: lb, t: `${comp}_AZ_B`, l: "Forward" });

    if (cache) {
      outNodes.push({ id: "ElastiCache_AZ_A", s: "ElastiCache", l: "ElastiCache Redis (AZ-A)" });
      outNodes.push({ id: "ElastiCache_AZ_B", s: "ElastiCache", l: "ElastiCache Redis (AZ-B)" });
      outEdges.push({ f: `${comp}_AZ_A`, t: "ElastiCache_AZ_A", l: "Cache R/W", isBi: true });
      outEdges.push({ f: `${comp}_AZ_A`, t: "ElastiCache_AZ_B", l: "Cross-AZ", isBi: true });
      outEdges.push({ f: `${comp}_AZ_B`, t: "ElastiCache_AZ_A", l: "Cross-AZ", isBi: true });
      outEdges.push({ f: `${comp}_AZ_B`, t: "ElastiCache_AZ_B", l: "Cache R/W", isBi: true });
    }

    outNodes.push({ id: `${db}_Primary`, s: db, l: `${db} Primary (AZ-A)` });
    outNodes.push({ id: `${db}_Secondary`, s: db, l: `${db} Standby (AZ-B)` });
    outEdges.push({ f: `${comp}_AZ_A`, t: `${db}_Primary`, l: "Write" });
    outEdges.push({ f: `${comp}_AZ_B`, t: `${db}_Primary`, l: "Cross-AZ Write" });
    outEdges.push({ f: `${db}_Primary`, t: `${db}_Secondary`, l: "Replication" });

    return { nodes: outNodes, edges: outEdges };
  }

  let prevSvc = null;
  let counter = 0;
  for (const m of filtered) {
    if (m.svc !== prevSvc) {
      const id = "n" + counter++;
      outNodes.push({ id, s: m.svc, l: SERVICES[m.svc]?.label || m.svc });
      prevSvc = m.svc;
    }
  }
  
  const edgesFallback = outNodes.slice(0, -1).map((_, i) => ({
    f: outNodes[i].id,
    t: outNodes[i+1].id,
    l: "HTTPS"
  }));
  
  return { nodes: outNodes, edges: edgesFallback };
}

// ── DYNAMIC TIERED ARCHITECTURE LAYOUT ENGINE ────────────────────
const NW = 140;
const NH = 104;
const PAD_X = 60;
const PAD_Y = 50;

function layout(nodes, edges) {
  const pos = {};
  const containers = [];

  const isMultiAZ = nodes.some(n => 
    n.id.includes("AZ_A") || n.id.includes("AZ_B") || 
    n.id.includes("Primary") || n.id.includes("Secondary") ||
    n.l?.includes("AZ-A") || n.l?.includes("AZ-B") ||
    n.l?.includes("AZ A") || n.l?.includes("AZ B")
  );

  if (isMultiAZ) {
    const clientNodes = nodes.filter(n => ["User", "Internet", "Route53", "CloudFront", "WAF"].includes(n.s) && !n.id.includes("AZ_"));
    const ingressNodes = nodes.filter(n => ["ALB", "ELB", "APIGateway", "VPC"].includes(n.s) && !n.id.includes("AZ_"));
    const compA = nodes.filter(n => (n.id.includes("AZ_A") || n.l?.includes("AZ-A") || n.l?.includes("AZ A")) && ["EC2", "Lambda", "ECS", "EKS", "Fargate"].includes(n.s));
    const compB = nodes.filter(n => (n.id.includes("AZ_B") || n.l?.includes("AZ-B") || n.l?.includes("AZ B")) && ["EC2", "Lambda", "ECS", "EKS", "Fargate"].includes(n.s));
    const cacheA = nodes.filter(n => (n.id.includes("AZ_A") || n.l?.includes("AZ-A") || n.l?.includes("AZ A")) && n.s === "ElastiCache");
    const cacheB = nodes.filter(n => (n.id.includes("AZ_B") || n.l?.includes("AZ-B") || n.l?.includes("AZ B")) && n.s === "ElastiCache");
    const dbA = nodes.filter(n => (n.id.includes("Primary") || n.id.includes("AZ_A") || n.l?.includes("Primary") || n.l?.includes("AZ-A")) && ["RDS", "Aurora", "DynamoDB", "DocumentDB", "Neptune"].includes(n.s));
    const dbB = nodes.filter(n => (n.id.includes("Secondary") || n.id.includes("Standby") || n.id.includes("AZ_B") || n.l?.includes("Secondary") || n.l?.includes("AZ-B")) && ["RDS", "Aurora", "DynamoDB", "DocumentDB", "Neptune"].includes(n.s));
    const sideNodes = nodes.filter(n => !clientNodes.includes(n) && !ingressNodes.includes(n) && !compA.includes(n) && !compB.includes(n) && !cacheA.includes(n) && !cacheB.includes(n) && !dbA.includes(n) && !dbB.includes(n));

    const centerX = 500;
    const colLeftX = 260;
    const colRightX = 640;

    let currentY = 50;
    if (clientNodes.length > 0) {
      const clientStartX = centerX - ((clientNodes.length - 1) * 180) / 2 - NW / 2;
      clientNodes.forEach((n, idx) => {
        pos[n.id] = { x: Math.round(clientStartX + idx * 180), y: currentY };
      });
      currentY += NH + 60;
    } else {
      currentY += 20;
    }

    const regionTopY = currentY;
    if (ingressNodes.length > 0) {
      const ingressStartX = centerX - ((ingressNodes.length - 1) * 180) / 2 - NW / 2;
      ingressNodes.forEach((n, idx) => {
        pos[n.id] = { x: Math.round(ingressStartX + idx * 180), y: currentY + 30 };
      });
      currentY += NH + 90;
    } else {
      currentY += 60;
    }

    const asgTopY = currentY;
    compA.forEach((n, idx) => { pos[n.id] = { x: colLeftX, y: currentY + 40 + idx * (NH + 30) }; });
    compB.forEach((n, idx) => { pos[n.id] = { x: colRightX, y: currentY + 40 + idx * (NH + 30) }; });
    const maxCompRows = Math.max(compA.length, compB.length, 1);
    const asgBottomY = currentY + 40 + maxCompRows * NH + 25;
    currentY = asgBottomY + 45;

    if (cacheA.length > 0 || cacheB.length > 0) {
      cacheA.forEach((n, idx) => { pos[n.id] = { x: colLeftX, y: currentY + idx * (NH + 30) }; });
      cacheB.forEach((n, idx) => { pos[n.id] = { x: colRightX, y: currentY + idx * (NH + 30) }; });
      const maxCacheRows = Math.max(cacheA.length, cacheB.length, 1);
      currentY += maxCacheRows * NH + 50;
    }

    dbA.forEach((n, idx) => { pos[n.id] = { x: colLeftX, y: currentY + idx * (NH + 30) }; });
    dbB.forEach((n, idx) => { pos[n.id] = { x: colRightX, y: currentY + idx * (NH + 30) }; });
    const maxDbRows = Math.max(dbA.length, dbB.length, 1);
    currentY += maxDbRows * NH + 40;

    if (sideNodes.length > 0) {
      sideNodes.forEach((n, idx) => {
        pos[n.id] = { x: 920, y: asgTopY + idx * (NH + 40) };
      });
    }

    const regionBottomY = Math.max(currentY + 20, asgTopY + sideNodes.length * (NH + 40) + 40);
    const regionW = sideNodes.length > 0 ? 1040 : 860;
    const azW = 340;
    const azH = regionBottomY - asgTopY + 20;

    containers.push({
      type: "region",
      id: "region-box",
      x: 140,
      y: regionTopY,
      w: regionW,
      h: regionBottomY - regionTopY + 20,
      title: "AWS Region (e.g., ap-south-1)",
      badge: "Region",
      borderColor: "#0284c7",
      fillColor: "#f8fafc",
      dash: "6 4"
    });

    containers.push({
      type: "az",
      id: "az-a-box",
      x: 180,
      y: asgTopY - 10,
      w: azW,
      h: azH,
      title: "Availability Zone A",
      badge: "AZ-A",
      borderColor: "#94a3b8",
      fillColor: "#ffffff",
      dash: "5 4"
    });

    containers.push({
      type: "az",
      id: "az-b-box",
      x: 560,
      y: asgTopY - 10,
      w: azW,
      h: azH,
      title: "Availability Zone B",
      badge: "AZ-B",
      borderColor: "#94a3b8",
      fillColor: "#ffffff",
      dash: "5 4"
    });

    if (compA.length > 0 || compB.length > 0) {
      containers.push({
        type: "asg",
        id: "asg-box",
        x: 210,
        y: asgTopY + 15,
        w: 660,
        h: asgBottomY - asgTopY - 15,
        title: "Auto Scaling group",
        badge: "Auto Scaling group",
        borderColor: "#ea580c",
        fillColor: "#fff7ed",
        dash: "5 3",
        icon: "AutoScaling"
      });
    }

    const allPositions = Object.values(pos);
    const maxW = Math.max(...allPositions.map(p => p.x + NW)) + PAD_X + 100;
    const maxH = Math.max(...allPositions.map(p => p.y + NH), regionBottomY) + PAD_Y + 40;

    return { pos, containers, W: Math.max(maxW, 1180), H: Math.max(maxH, 880) };
  }

  // ── STANDARD TOPOLOGICAL CLOUD TIERING ──
  const inE = {};
  nodes.forEach(n => (inE[n.id] = []));
  edges.forEach(e => {
    if (inE[e.t]) inE[e.t].push(e.f);
  });

  const layer = {};
  nodes.forEach(n => {
    if (!inE[n.id].length) layer[n.id] = 0;
  });

  let ch = true;
  let it = 0;
  while (ch && it++ < 50) {
    ch = false;
    edges.forEach(e => {
      if (layer[e.f] !== undefined) {
        const nx = layer[e.f] + 1;
        if (layer[e.t] === undefined || layer[e.t] < nx) {
          layer[e.t] = nx;
          ch = true;
        }
      }
    });
  }
  nodes.forEach(n => {
    if (layer[n.id] === undefined) layer[n.id] = 0;
  });

  const cols = {};
  nodes.forEach(n => {
    const l = layer[n.id];
    if (!cols[l]) cols[l] = [];
    cols[l].push(n.id);
  });

  const colKeys = Object.keys(cols).map(Number).sort((a, b) => a - b);
  const maxRows = Math.max(...colKeys.map(k => cols[k].length), 1);
  const maxColH = (maxRows - 1) * (NH + 70);

  colKeys.forEach((ck, ci) => {
    const colNodes = cols[ck];
    const colH = (colNodes.length - 1) * (NH + 70);
    const startY = 80 + (maxColH - colH) / 2;
    colNodes.forEach((id, ri) => {
      pos[id] = {
        x: 80 + ci * (NW + 100),
        y: Math.round(startY + ri * (NH + 70))
      };
    });
  });

  const px = Object.values(pos);
  const internalNodes = nodes.filter(n => !["User", "Internet", "Route53", "CloudFront"].includes(n.s));
  if (internalNodes.length > 1) {
    const intPos = internalNodes.map(n => pos[n.id]).filter(Boolean);
    if (intPos.length > 0) {
      const intMinX = Math.min(...intPos.map(p => p.x));
      const intMaxX = Math.max(...intPos.map(p => p.x));
      const intMinY = Math.min(...intPos.map(p => p.y));
      const intMaxY = Math.max(...intPos.map(p => p.y));

      containers.push({
        type: "region",
        id: "cloud-region-box",
        x: intMinX - 30,
        y: intMinY - 45,
        w: intMaxX - intMinX + NW + 60,
        h: intMaxY - intMinY + NH + 70,
        title: "AWS Region (Managed Cloud Services)",
        badge: "AWS Cloud",
        borderColor: "#0284c7",
        fillColor: "#f8fafc",
        dash: "6 4"
      });
    }
  }

  return {
    pos,
    containers,
    W: Math.max(...px.map(p => p.x + NW)) + PAD_X + 80,
    H: Math.max(...px.map(p => p.y + NH)) + PAD_Y + 80
  };
}

function bezier(f, t, pos, isBi = false) {
  if (!pos[f] || !pos[t]) return { d: "", lx: 0, ly: 0 };
  const p1 = pos[f];
  const p2 = pos[t];

  if (p2.y > p1.y + NH / 2 + 20) {
    if (Math.abs(p2.x - p1.x) < 40) {
      const fx = p1.x + NW / 2;
      const fy = p1.y + NH + 2;
      const tx = p2.x + NW / 2;
      const ty = p2.y - 2;
      return { d: `M${fx},${fy} L${tx},${ty}`, lx: fx, ly: (fy + ty) / 2 };
    }
    const fx = p1.x + NW / 2;
    const fy = p1.y + NH + 2;
    const tx = p2.x + NW / 2;
    const ty = p2.y - 2;
    const midY = (fy + ty) / 2;
    return {
      d: `M${fx},${fy} L${fx},${midY} L${tx},${midY} L${tx},${ty}`,
      lx: (fx + tx) / 2,
      ly: midY
    };
  }

  if (p2.x > p1.x + NW / 2 && Math.abs(p2.y - p1.y) < 50) {
    const fx = p1.x + NW + 2;
    const fy = p1.y + NH / 2;
    const tx = p2.x - 2;
    const ty = p2.y + NH / 2;
    return { d: `M${fx},${fy} L${tx},${ty}`, lx: (fx + tx) / 2, ly: (fy + ty) / 2 - 12 };
  }

  const fx = p1.x + NW / 2;
  const fy = p1.y + NH / 2;
  const tx = p2.x + NW / 2;
  const ty = p2.y + NH / 2;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2;
  return {
    d: `M${fx},${fy + NH / 2} C${fx},${my} ${tx},${my} ${tx},${ty - NH / 2}`,
    lx: mx,
    ly: my
  };
}

const DEFAULT_PROMPT = `// Multi-AZ Scalable Web Application
User -> ALB : "HTTPS Traffic"
ALB -> EC2_AZ_A : "Forward AZ-A"
ALB -> EC2_AZ_B : "Forward AZ-B"
EC2_AZ_A <-> ElastiCache_AZ_A : "Cache Read/Write"
EC2_AZ_A <-> ElastiCache_AZ_B : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_A : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_B : "Cache Read/Write"
EC2_AZ_A -> RDS_Primary : "SQL Read/Write"
EC2_AZ_B -> RDS_Primary : "Cross-AZ Write"
RDS_Primary -> RDS_Secondary : "Sync Replication"`;

export default function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  
  const [diagram, setDiagram] = useState(() => {
    try {
      const parsed = parse(DEFAULT_PROMPT);
      const { pos, containers, W, H } = layout(parsed.nodes, parsed.edges);
      return { nodes: parsed.nodes, edges: parsed.edges, pos, containers, W: Math.max(W, 1000), H: Math.max(H, 700) };
    } catch (e) {
      return null;
    }
  });

  const [viewMode, setViewMode] = useState("blueprint");
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(null);
  const [zoom, setZoom] = useState(0.9);
  const [tool, setTool] = useState("select");
  const [history, setHistory] = useState([]);
  const [shareText, setShare] = useState("Share");
  const [title, setTitle] = useState("Multi-AZ Enterprise Architecture");
  const [addingNode, setAddingNode] = useState(false);
  const [addSearch, setAddSearch] = useState("");
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("matrix_ai_key") || "");
  const [apiBase, setApiBase] = useState(() => localStorage.getItem("matrix_ai_base") || "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions");
  const [apiModel, setApiModel] = useState(() => localStorage.getItem("matrix_ai_model") || "gemini-2.0-flash");
  const [showSettings, setShowSettings] = useState(false);
  const canvasRef = useRef(null);
  const dragRef = useRef(null);

  const [activeTab, setActiveTab] = useState("editor");
  const [searchQuery, setSearchQuery] = useState("");

  const graphToText = useCallback((nodesList, edgesList) => {
    const nodeLines = nodesList.map(n => {
      const properties = [];
      properties.push(`icon: ${n.s.toLowerCase()}`);
      if (n.l) properties.push(`label: "${n.l}"`);
      return `${n.id} [${properties.join(", ")}]`;
    });
    
    const edgeLines = edgesList.map(e => {
      const labelPart = e.l ? ` : "${e.l}"` : "";
      const arrow = e.isBi ? "<->" : "->";
      return `${e.f} ${arrow} ${e.t}${labelPart}`;
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
    if (!prompt.trim()) return;
    const t = setTimeout(() => {
      try {
        const parsed = parse(prompt);
        setDiagram(prev => {
          if (isGraphEqual(prev, parsed)) return prev;
          const { pos: oldPos } = prev || {};
          const { pos: newPos, containers, W: newW, H: newH } = layout(parsed.nodes, parsed.edges);
          const mergedPos = {};
          parsed.nodes.forEach(n => {
            mergedPos[n.id] = (oldPos && oldPos[n.id]) ? oldPos[n.id] : newPos[n.id];
          });
          return { nodes: parsed.nodes, edges: parsed.edges, pos: mergedPos, containers, W: Math.max(newW, 900), H: Math.max(newH, 600) };
        });
      } catch (err) {
        // Silently ignore while typing
      }
    }, 300);
    return () => clearTimeout(t);
  }, [prompt]);

  const generate = useCallback(async (p) => {
    const txt = p ?? prompt;
    if (!txt.trim()) return;
    setLoading(true);
    setError("");
    let parsedText = txt;

    const isDirectSyntax = txt.includes("->") || txt.includes("<->") || (txt.includes("[") && txt.includes("]"));

    if (apiKey.trim() && !isDirectSyntax) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const sysPrompt = `You are a Principal AWS Solutions Architect. Convert the user's requirements into an exact AWS Architecture DSL using node declarations and arrows.
Output ONLY standard AWS service connections using '->' or '<->' with labels.
Example for Multi-AZ Web App:
User -> ALB : "HTTPS Traffic"
ALB -> EC2_AZ_A : "Forward AZ-A"
ALB -> EC2_AZ_B : "Forward AZ-B"
EC2_AZ_A <-> ElastiCache_AZ_A : "Cache Read/Write"
EC2_AZ_A <-> ElastiCache_AZ_B : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_A : "Cross-AZ Cache"
EC2_AZ_B <-> ElastiCache_AZ_B : "Cache Read/Write"
EC2_AZ_A -> RDS_Primary : "SQL Read/Write"
EC2_AZ_B -> RDS_Primary : "Cross-AZ Write"
RDS_Primary -> RDS_Secondary : "Sync Replication"

Example for Serverless REST API:
User -> Route53 : "DNS"
Route53 -> CloudFront : "CDN"
CloudFront -> WAF : "Shield"
WAF -> APIGateway : "API"
APIGateway -> Lambda : "Execute"
Lambda -> DynamoDB : "Read/Write"
Lambda -> S3 : "Storage"

Output ONLY arrow connections. No explanatory text.`;

        const res = await fetch(apiBase, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${apiKey.trim()}` 
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: apiModel,
            messages: [
              { role: "system", content: sysPrompt },
              { role: "user", content: txt }
            ],
            temperature: 0.1
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.choices && data.choices.length > 0) {
            const aiContent = data.choices[0].message?.content?.trim() || "";
            if (aiContent.includes("->")) parsedText = aiContent;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          const errMsg = errData.error?.message || `API Error HTTP ${res.status}`;
          setError(`AI Service Notice: ${errMsg}. Using intelligent offline generator.`);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === "AbortError") {
          setError("API request timed out (12s). Generated using offline architecture engine.");
        } else {
          console.warn("AI Generation fallback to offline parser:", err);
        }
      }
    }

    try {
      const { nodes, edges } = parse(parsedText);
      const { pos, containers, W, H } = layout(nodes, edges);
      setDiagram({ nodes, edges, pos, containers, W: Math.max(W, 1000), H: Math.max(H, 700) });
      setTitle("AWS Architecture Diagram");
      setSel(null);
      if (!isDirectSyntax) {
        setPrompt(graphToText(nodes, edges));
      }
      setHistory(h => [{ prompt: txt, diagram: { nodes, edges, pos, containers, W, H }, ts: Date.now() }, ...h].slice(0, 8));
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to draft architecture from description.");
    } finally {
      setLoading(false);
    }
  }, [prompt, apiKey, apiBase, apiModel, graphToText]);

  const handleShare = useCallback(() => {
    if (!diagram) return;
    const b64 = btoa(encodeURIComponent(JSON.stringify({ diagram, title, prompt })));
    navigator.clipboard.writeText(`${location.origin}${location.pathname}#share=${b64}`);
    setShare("Copied!");
    setTimeout(() => setShare("Share"), 2000);
  }, [diagram, title, prompt]);

  const handleCanvasMouseDown = useCallback((e) => {
    if (!diagram) return;
    const wrap = canvasRef.current;
    if (!wrap) return;
    
    if (tool === "pan") {
      e.preventDefault();
      dragRef.current = { type: "pan", startX: e.clientX, startY: e.clientY, scrollX: wrap.scrollLeft, scrollY: wrap.scrollTop };
      return;
    }

    const targetNode = e.target.closest("[data-nodeid]");
    if (targetNode) {
      const nodeId = targetNode.getAttribute("data-nodeid");
      const startPos = diagram.pos[nodeId];
      if (startPos) {
        dragRef.current = { type: "node", nodeId, startX: e.clientX, startY: e.clientY, startPos: { ...startPos }, scale: zoom };
      }
    }
  }, [tool, diagram, zoom]);

  const handleCanvasMouseMove = useCallback((e) => {
    const dr = dragRef.current;
    if (!dr) return;
    if (dr.type === "pan") {
      const wrap = canvasRef.current;
      wrap.scrollLeft = dr.scrollX - (e.clientX - dr.startX);
      wrap.scrollTop = dr.scrollY - (e.clientY - dr.startY);
    } else if (dr.type === "node") {
      const dx = (e.clientX - dr.startX) / dr.scale;
      const dy = (e.clientY - dr.startY) / dr.scale;
      const newX = Math.max(20, Math.round(dr.startPos.x + dx));
      const newY = Math.max(20, Math.round(dr.startPos.y + dy));
      setDiagram(d => {
        const newPos = { ...d.pos, [dr.nodeId]: { x: newX, y: newY } };
        return { ...d, pos: newPos };
      });
    }
  }, []);

  const handleCanvasMouseUp = useCallback(() => { dragRef.current = null; }, []);

  const exportSVG = useCallback(() => {
    const svg = canvasRef.current?.querySelector("svg");
    if (!svg) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" }));
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.svg`;
    a.click();
  }, [title]);

  const handleEnter = (t) => {
    setPage("app");
    if (typeof t === "string" && t.trim()) {
      setPrompt(t);
      setTimeout(() => generate(t), 10);
    } else {
      setTimeout(() => generate(prompt), 10);
    }
  };

  if (page === "landing") return <LandingPage onEnter={handleEnter} setPage={setPage} />;
  if (page === "features") return <FeaturesPage setPage={setPage} onEnter={handleEnter} />;
  if (page === "examples") return <ExamplesPage setPage={setPage} onEnter={handleEnter} />;
  if (page === "docs") return <DocsPage setPage={setPage} onEnter={handleEnter} />;

  const nodes = diagram?.nodes || [];
  const edges = diagram?.edges || [];
  const pos = diagram?.pos || {};
  const containers = diagram?.containers || [];
  const W = diagram?.W || 1200;
  const H = diagram?.H || 850;

  return (
    <div className="app-root">
      <div className="bg-canvas"><div className="bg-blob blob-1"/><div className="bg-blob blob-2"/><div className="bg-blob blob-3"/></div>
      <div className="grid-overlay"/><div className="dot-overlay"/>

      <header className="topbar">
        <div className="brand" onClick={() => { setPrompt(DEFAULT_PROMPT); generate(DEFAULT_PROMPT); }} style={{ cursor: "pointer" }} title="Reset to default architecture">
          <svg width="34" height="34" viewBox="0 0 34 34">
            <polygon points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5" fill="none" stroke="#2a2724" strokeWidth="2.5"/>
            <text x="17" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2a2724" fontFamily="'Outfit', sans-serif">M</text>
          </svg>
          <div>
            <div className="brand-name">Matrix Slate</div>
            <div className="brand-tag">AWS Architecture Generator</div>
          </div>
        </div>
        <div className="breadcrumb"><span className="bc-ws">Workspace</span><span className="bc-sep">/</span><span className="bc-title">{title}</span></div>
        <div className="topbar-actions">
          <div className="chip"><span className="chip-dot"/>Tiered Cloud Architecture</div>
          {diagram && <span className="stat-chip">{nodes.length} nodes · {edges.length} connections</span>}
          <button className="btn-ghost" onClick={() => setShowSettings(true)}>⚙️ AI Settings</button>
          <button className="btn-ghost" onClick={handleShare}>{shareText}</button>
          <button className="btn-primary" onClick={exportSVG}>Export SVG</button>
        </div>
      </header>

      <div className="body" style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden" }}>
        <div className="editor-panel">
          <div className="panel-tabs">
            <button className={`panel-tab ${activeTab === "editor" ? "active" : ""}`} onClick={() => setActiveTab("editor")}>✏️ Architecture DSL</button>
            <button className={`panel-tab ${activeTab === "library" ? "active" : ""}`} onClick={() => setActiveTab("library")}>📚 AWS Library</button>
          </div>
          
          {activeTab === "editor" && (
            <div className="editor-tab" style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: "16px", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <textarea 
                  className="prompt-area" 
                  value={prompt} 
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => {
                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                      e.preventDefault();
                      generate(prompt);
                    }
                  }}
                  placeholder={"Describe your architecture or enter DSL...\n\ne.g. 'Three tier web app with caching' or 'User -> ALB -> EC2_AZ_A'"}
                  style={{ minHeight: "180px", width: "100%", resize: "none", fontFamily: "monospace", fontSize: "12.5px", lineHeight: "1.6", border: "2.5px solid var(--border)", borderRadius: "8px", padding: "12px", outline: "none", background: "#faf8f5", color: "var(--text)", fontWeight: "600", boxShadow: "4px 4px 0px rgba(42,39,36,0.1)" }}
                />
                
                {error && (
                  <div style={{ marginTop: 8, padding: "8px 12px", background: "#fff5f5", border: "1.5px solid #feb2b2", borderRadius: "6px", color: "#c53030", fontSize: "11px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span>⚠️ {error}</span>
                    <button onClick={() => setError("")} style={{ background: "none", border: "none", color: "#c53030", cursor: "pointer", fontWeight: "800", fontSize: "12px" }}>✕</button>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: 8 }}>
                  <div className="hint" style={{ fontSize: 10, color: "var(--dim)", fontWeight: "700" }}>Ctrl+Enter to build</div>
                  <button 
                    className="btn-primary" 
                    style={{ padding: "8px 16px", fontSize: "12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} 
                    onClick={() => generate(prompt)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" style={{ width: 12, height: 12, border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1.5s linear infinite" }} />
                        <span>Synthesizing…</span>
                      </>
                    ) : (
                      <>✨ Generate Architecture</>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="panel-section">
                <h4 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--dim)", margin: "0 0 10px 0", fontWeight: 800 }}>Reference Architectures</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {[
                    { l: "🏛 Multi-AZ Scalable Web App", t: `User -> ALB : "HTTPS Traffic"\nALB -> EC2_AZ_A : "Forward AZ-A"\nALB -> EC2_AZ_B : "Forward AZ-B"\nEC2_AZ_A <-> ElastiCache_AZ_A : "Cache R/W"\nEC2_AZ_A <-> ElastiCache_AZ_B : "Cross-AZ"\nEC2_AZ_B <-> ElastiCache_AZ_A : "Cross-AZ"\nEC2_AZ_B <-> ElastiCache_AZ_B : "Cache R/W"\nEC2_AZ_A -> RDS_Primary : "SQL Read/Write"\nEC2_AZ_B -> RDS_Primary : "Cross-AZ Write"\nRDS_Primary -> RDS_Secondary : "Sync Replication"` },
                    { l: "⚡ Serverless REST API", t: `User -> Route53 : "DNS"\nRoute53 -> CloudFront : "CDN Edge"\nCloudFront -> WAF : "Shield"\nWAF -> APIGateway : "API Gateway"\nAPIGateway -> Lambda : "Execute"\nLambda -> DynamoDB : "State"\nLambda -> S3 : "Assets"` },
                    { l: "🤖 Generative AI / RAG Bedrock", t: `User -> CloudFront : "HTTPS"\nCloudFront -> APIGateway : "API Request"\nAPIGateway -> Lambda : "Orchestrator"\nLambda -> Bedrock : "LLM Inference"\nBedrock -> OpenSearch : "Vector Embeddings"\nLambda -> DynamoDB : "Chat Memory"\nLambda -> S3 : "Knowledge Base"` },
                    { l: "📬 Modern Event-Driven System", t: `User -> APIGateway : "Submit Event"\nAPIGateway -> Lambda : "Ingest"\nLambda -> EventBridge : "Publish"\nEventBridge -> SQS : "Buffer Tasks"\nSQS -> ECS : "Worker Tasks"\nECS -> DynamoDB : "Save Result"\nECS -> CloudWatch : "Metrics"` }
                  ].map((ex, i) => (
                    <button key={i} className="example-btn" onClick={() => {
                      setPrompt(ex.t);
                      setTimeout(() => generate(ex.t), 50);
                    }} style={{ textAlign: "left", width: "100%", padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: "6px", background: "#ffffff", cursor: "pointer", boxShadow: "2px 2px 0px var(--border)", display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "11.5px", fontWeight: "800", color: "var(--text)" }}>{ex.l}</span>
                      <span style={{ fontSize: "9.5px", color: "var(--dim)", fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginTop: "2px" }}>{ex.t.replace(/\n/g, " · ")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {history.length > 0 && (
                <div className="panel-section">
                  <h4 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--dim)", margin: "0 0 10px 0", fontWeight: 800 }}>History</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {history.map(h => (
                      <button key={h.ts} className="example-btn" onClick={() => {
                        setDiagram(h.diagram);
                        setPrompt(h.prompt);
                      }} style={{ textAlign: "left", width: "100%", padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: "6px", background: "#ffffff", cursor: "pointer", boxShadow: "2px 2px 0px var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--text)" }}>Cloud Architecture</span>
                        <span style={{ fontSize: "9.5px", color: "var(--dim)" }}>{new Date(h.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "library" && (
            <div className="library-tab" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "16px" }}>
              <input 
                type="text" 
                className="library-search" 
                placeholder="Search 60+ AWS services..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", border: "2.5px solid var(--border)", borderRadius: "8px", outline: "none", marginBottom: "14px", fontSize: "13px", fontWeight: "700", background: "#faf8f5", color: "var(--text)", boxShadow: "3px 3px 0px rgba(42,39,36,0.1)" }}
              />
              <div className="library-groups" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", paddingRight: "4px" }}>
                {Object.entries(
                  Object.entries(SERVICES)
                    .filter(([k, v]) => {
                      const q = searchQuery.toLowerCase();
                      return v.label.toLowerCase().includes(q) || v.category.toLowerCase().includes(q);
                    })
                    .reduce((acc, [k, v]) => {
                      if (!acc[v.category]) acc[v.category] = [];
                      acc[v.category].push({ k, ...v });
                      return acc;
                    }, {})
                ).map(([cat, svcs]) => (
                  <div key={cat} className="library-group">
                    <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: ".08em", color: CAT_COLORS[cat] || "var(--dim)", marginBottom: "6px" }}>{cat}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {svcs.map(s => {
                        const Icon = ICONS[s.k];
                        return (
                          <div key={s.k} className="library-item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: "6px", background: "#ffffff", boxShadow: "2px 2px 0px rgba(42,39,36,0.08)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                              <span style={{ color: s.color, display: "flex", flexShrink: 0 }}>{Icon ? React.createElement(Icon, { size: 18 }) : "●"}</span>
                              <span style={{ fontSize: "11.5px", fontWeight: "700", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                            </div>
                            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                              <button 
                                className="lib-action-btn" 
                                title="Insert at cursor"
                                onClick={() => {
                                  setPrompt(p => p ? `${p}\n-> ${s.k} : "Connect"` : s.k);
                                }}
                                style={{ padding: "3px 8px", fontSize: "10px", fontWeight: "800", border: "1.5px solid var(--border)", borderRadius: "4px", background: "#ffffff", cursor: "pointer", boxShadow: "1px 1px 0px var(--border)" }}
                              >
                                ✍️ Insert
                              </button>
                              <button 
                                className="lib-action-btn" 
                                title="Add directly to canvas"
                                onClick={() => {
                                  const newId = s.k + "_" + Date.now().toString().slice(-4);
                                  const currentNodes = diagram?.nodes || [];
                                  const currentEdges = diagram?.edges || [];
                                  const newNodes = [...currentNodes, { id: newId, s: s.k, l: s.label }];
                                  const { pos: newPos, containers: newContainers, W: newW, H: newH } = layout(newNodes, currentEdges);
                                  setDiagram({ nodes: newNodes, edges: currentEdges, pos: newPos, containers: newContainers, W: newW, H: newH });
                                  setPrompt(graphToText(newNodes, currentEdges));
                                  setSel(newId);
                                }}
                                style={{ padding: "3px 8px", fontSize: "10px", fontWeight: "800", border: "1.5px solid var(--border)", borderRadius: "4px", background: "var(--green)", color: "#ffffff", cursor: "pointer", boxShadow: "1px 1px 0px var(--border)" }}
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

        <div className="workspace" style={{ position: "relative", flex: 1, height: "100%", display: "flex", background: "transparent", overflow: "hidden" }}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        >
          <main className="canvas-wrap" ref={canvasRef}
            style={{ cursor: tool === "pan" ? "grab" : "default", flex: 1 }}
            onClick={() => tool === "select" && setSel(null)}
            onMouseDown={handleCanvasMouseDown}
          >
            <div className="canvas-toolbar">
              <div className="tool-group" style={{ background: "#f1f5f9", padding: "3px", borderRadius: "8px", display: "flex", gap: 4 }}>
                <button 
                  className={`tool-btn ${viewMode === "blueprint" ? "active" : ""}`}
                  style={{ fontSize: "11px", fontWeight: 800, padding: "6px 12px", background: viewMode === "blueprint" ? "#ffffff" : "transparent", color: "var(--text)" }}
                  onClick={() => setViewMode("blueprint")}
                >
                  🏛️ Cloud Containers
                </button>
                <button 
                  className={`tool-btn ${viewMode === "flowchart" ? "active" : ""}`}
                  style={{ fontSize: "11px", fontWeight: 800, padding: "6px 12px", background: viewMode === "flowchart" ? "#ffffff" : "transparent", color: "var(--text)" }}
                  onClick={() => setViewMode("flowchart")}
                >
                  🔀 Minimal Flow
                </button>
              </div>

              <div style={{ width: 2, height: 20, background: "var(--border)", margin: "0 6px" }}/>

              <div className="tool-group">
                {[["select", "↖ Select / Drag"], ["pan", "✋ Pan"]].map(([id, lbl]) => (
                  <button key={id} className={`tool-btn${tool === id ? " active" : ""}`}
                    onClick={() => { setTool(id); if (id === "pan") setSel(null); }}>
                    {lbl}
                  </button>
                ))}
              </div>
              <div style={{ width: 2, height: 20, background: "var(--border)", margin: "0 6px" }}/>
              <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.2, +(z - 0.1).toFixed(1)))}>−</button>
              <span className="zoom-display">{Math.round(zoom * 100)}%</span>
              <button className="zoom-btn" onClick={() => setZoom(z => Math.min(3, +(z + 0.1).toFixed(1)))}>+</button>
              <button className="zoom-btn" style={{ fontSize: 9, padding: "0 8px", width: "auto" }} onClick={() => setZoom(0.85)}>Fit</button>
              
              <div className="toolbar-spacer"/>
              <span className="stat-pill" style={{ background: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}>
                {nodes.length} AWS Services · {edges.length} Connections
              </span>
            </div>

            {error && (
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 50, background: "#ffffff", border: "2.5px solid var(--border)", borderRadius: "16px", padding: "30px", width: "80%", maxWidth: "500px", textAlign: "center", boxShadow: "8px 8px 0px rgba(42,39,36,0.15)" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚠️</div>
                <h3 style={{ color: "var(--text)", fontSize: "20px", marginBottom: "12px", fontFamily: "Outfit, sans-serif", fontWeight: "800" }}>Synthesis Error</h3>
                <p style={{ color: "#ef4444", fontSize: "14px", lineHeight: "1.6", fontWeight: "600" }}>{error}</p>
                <button className="btn-ghost" style={{ marginTop: "24px" }} onClick={() => setError("")}>Dismiss</button>
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="loading-orb">
                  <div className="orb-ring orb-r1" style={{ borderTopColor: "var(--orange)" }}/><div className="orb-ring orb-r2" style={{ borderRightColor: "var(--green)" }}/>
                  <div className="orb-ring orb-r3" style={{ borderBottomColor: "var(--cyan)" }}/><div className="orb-core" style={{ background: "radial-gradient(circle, var(--orange) 80%, transparent)" }}/>
                </div>
                <div className="loading-label">Synthesizing AWS Architecture…</div>
                <div className="loading-sub">Calculating Availability Zones · Auto Scaling groups · Cross-AZ Data Tier</div>
              </div>
            )}

            {diagram && !loading && (
              <div className="diagram-wrap" style={{ transform: `scale(${zoom})`, transformOrigin: "top left", padding: "30px 40px" }}>
                <svg width={W} height={H} style={{ display: "block", overflow: "visible", background: "#ffffff", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", fontFamily: "'Inter', sans-serif" }}>
                  <defs>
                    <marker id="arr-main" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 z" fill="#1e293b"/>
                    </marker>
                    <marker id="arr-bi" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#0284c7"/>
                    </marker>
                  </defs>

                  {/* 1. CLOUD CONTAINERS */}
                  {viewMode === "blueprint" && containers.map(c => (
                    <g key={c.id}>
                      <rect 
                        x={c.x} 
                        y={c.y} 
                        width={c.w} 
                        height={c.h} 
                        rx={12} 
                        fill={c.fillColor} 
                        stroke={c.borderColor} 
                        strokeWidth={c.type === "region" ? 2 : 1.5}
                        strokeDasharray={c.dash || "none"}
                      />

                      {c.type === "region" && (
                        <g transform={`translate(${c.x}, ${c.y})`}>
                          <rect x="0" y="0" width="28" height="28" rx="6" fill="#0284c7"/>
                          <text x="14" y="19" fontSize="14" fill="#ffffff" textAnchor="middle">🚩</text>
                          <text x="36" y="19" fontSize="13" fontWeight="900" fill="#0369a1">{c.title}</text>
                        </g>
                      )}

                      {c.type === "az" && (
                        <g transform={`translate(${c.x + 12}, ${c.y + 10})`}>
                          <rect x="0" y="0" width="140" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
                          <text x="10" y="16" fontSize="11" fill="#475569">🔒</text>
                          <text x="26" y="16" fontSize="10.5" fontWeight="800" fill="#334155">{c.title}</text>
                        </g>
                      )}

                      {c.type === "asg" && (
                        <g transform={`translate(${c.x + c.w / 2 - 80}, ${c.y - 12})`}>
                          <rect x="0" y="0" width="160" height="24" rx="6" fill="#ea580c"/>
                          <text x="80" y="16" fontSize="10.5" fontWeight="900" fill="#ffffff" textAnchor="middle">⤢ Auto Scaling group</text>
                        </g>
                      )}
                    </g>
                  ))}

                  {/* 2. EDGES */}
                  {edges.map((e, i) => {
                    if (!pos[e.f] || !pos[e.t]) return null;
                    const { d, lx, ly } = bezier(e.f, e.t, pos, e.isBi);
                    const col = e.isBi ? "#0284c7" : "#1e293b";
                    const label = e.l || "";
                    const labelWidth = Math.max(48, label.length * 6 + 14);

                    return (
                      <g key={i}>
                        <path d={d} stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" />
                        <path 
                          d={d} 
                          stroke={col} 
                          strokeWidth={e.isBi ? 1.75 : 2} 
                          fill="none" 
                          strokeLinecap="round" 
                          markerEnd={e.isBi ? "url(#arr-bi)" : "url(#arr-main)"}
                          markerStart={e.isBi ? "url(#arr-bi)" : "none"}
                        />
                        {label && (
                          <g transform={`translate(${lx}, ${ly})`}>
                            <rect x={-labelWidth / 2} y={-9} width={labelWidth} height={18} rx="4" fill="#ffffff" stroke={col} strokeWidth="1.2" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.06))" />
                            <text x={0} y={3.5} fontSize="8.5" fill="#1e293b" textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight="700">{label}</text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* 3. NODES */}
                  {nodes.map(n => {
                    const svc = SERVICES[n.s] || { color: "#2a2724", label: n.s, category: "Compute" };
                    const p = pos[n.id];
                    if (!p) return null;
                    const isS = sel === n.id && tool === "select";
                    const Icon = ICONS[n.s];
                    const nodeCursor = tool === "pan" ? "move" : "pointer";
                    const displayName = n.l || svc.label;
                    const badgeW = Math.min(svc.category.length * 6 + 12, NW - 16);

                    return (
                      <g key={n.id} data-nodeid={n.id}
                        style={{ cursor: nodeCursor }}
                        onClick={ev => {
                          if (tool !== "select") return;
                          ev.stopPropagation();
                          setSel(n.id);
                        }}>
                        <rect x={p.x + 3} y={p.y + 3} width={NW} height={NH} rx="12" fill="#0f172a" opacity="0.08" />
                        <rect x={p.x} y={p.y} width={NW} height={NH} rx="12" fill="#ffffff" stroke={isS ? svc.color : "#cbd5e1"} strokeWidth={isS ? 2.5 : 1.5} />
                        <rect x={p.x + 12} y={p.y} width={NW - 24} height={4} rx="2" fill={svc.color} />
                        {Icon ? (
                          <svg x={p.x + (NW - 44) / 2} y={p.y + 14} width={44} height={44}>
                            <Icon size={44} />
                          </svg>
                        ) : (
                          <text x={p.x + NW / 2} y={p.y + 38} fontSize="26" textAnchor="middle" dominantBaseline="middle" fill={svc.color}>●</text>
                        )}
                        <text x={p.x + NW / 2} y={p.y + NH - 24} fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="middle" fontFamily="'Inter', sans-serif">{displayName}</text>
                        <rect x={p.x + (NW - badgeW) / 2} y={p.y + NH - 16} width={badgeW} height={11} rx="3" fill={`${svc.color}18`} stroke={`${svc.color}40`} strokeWidth="0.75" />
                        <text x={p.x + NW / 2} y={p.y + NH - 8} fontSize="7" fill={svc.color} textAnchor="middle" fontWeight="800" letterSpacing=".05em">{svc.category.toUpperCase()}</text>
                        {isS && <rect x={p.x - 4} y={p.y - 4} width={NW + 8} height={NH + 8} rx="15" fill="none" stroke={svc.color} strokeWidth="2" strokeDasharray="4 4" />}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* INSPECTOR PANEL */}
      {sel && tool === "select" && diagram && (() => {
        const curNodes = diagram.nodes || [];
        const curEdges = diagram.edges || [];
        const n = curNodes.find(x => x.id === sel);
        const s = n ? SERVICES[n.s] : null;
        if (!n || !s) return null;

        const deleteNode = () => {
          const newNodes = curNodes.filter(x => x.id !== sel);
          const newEdges = curEdges.filter(e => e.f !== sel && e.t !== sel);
          const { pos: newPos, containers: newContainers, W: newW, H: newH } = layout(newNodes, newEdges);
          setDiagram({ nodes: newNodes, edges: newEdges, pos: newPos, containers: newContainers, W: newW, H: newH });
          setPrompt(graphToText(newNodes, newEdges));
          setSel(null);
        };

        const changeService = (newSvc) => {
          const newNodes = curNodes.map(x => x.id === sel ? { ...x, s: newSvc } : x);
          setDiagram(d => ({ ...d, nodes: newNodes }));
          setPrompt(graphToText(newNodes, curEdges));
        };

        const changeLabel = (newVal) => {
          const newNodes = curNodes.map(x => x.id === sel ? { ...x, l: newVal } : x);
          setDiagram(d => ({ ...d, nodes: newNodes }));
          setPrompt(graphToText(newNodes, curEdges));
        };

        const changeEdgeLabel = (eIdx, newEdgeLabel) => {
          const newEdges = curEdges.map((e, idx) => idx === eIdx ? { ...e, l: newEdgeLabel } : e);
          setDiagram(d => ({ ...d, edges: newEdges }));
          setPrompt(graphToText(curNodes, newEdges));
        };

        const connectTo = (targetId) => {
          if (targetId === sel) return;
          const already = curEdges.find(e => (e.f === sel && e.t === targetId) || (e.f === targetId && e.t === sel));
          if (already) return;
          const newEdges = [...curEdges, { f: sel, t: targetId, l: "Connect" }];
          setDiagram(d => ({ ...d, edges: newEdges }));
          setPrompt(graphToText(curNodes, newEdges));
        };

        const deleteEdge = (eIdx) => {
          const newEdges = curEdges.filter((_, i) => i !== eIdx);
          setDiagram(d => ({ ...d, edges: newEdges }));
          setPrompt(graphToText(curNodes, newEdges));
        };

        const connectedEdges = curEdges.map((e, i) => ({ ...e, i })).filter(e => e.f === sel || e.t === sel);
        const otherNodes = curNodes.filter(x => x.id !== sel);

        return (
          <div className="edit-panel">
            <div className="ep-header">
              <div className="ep-title" style={{ color: s.color, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "flex", color: s.color }}>{ICONS[n.s] ? React.createElement(ICONS[n.s], { size: 20 }) : "●"}</span>
                {s.label}
              </div>
              <button className="info-close" onClick={() => setSel(null)}>✕</button>
            </div>

            <div className="ep-section">
              <div className="ep-section-label">Custom Label</div>
              <input type="text" className="ep-select" style={{ background: "#faf8f5", border: "1.5px solid var(--border)", borderRadius: "6px", padding: "6px 10px", fontSize: "12.5px", fontWeight: "600", outline: "none", color: "var(--text)", width: "100%" }}
                value={n.l || ""}
                placeholder={s.label}
                onChange={e => changeLabel(e.target.value)}
              />
            </div>

            <div className="ep-section">
              <div className="ep-section-label">Service Type</div>
              <select className="ep-select"
                value={n.s}
                onChange={e => changeService(e.target.value)}>
                {Object.entries(SERVICES).map(([k, v]) => (
                  <option key={k} value={k}>{v.label} ({v.category})</option>
                ))}
              </select>
            </div>

            <div className="ep-section">
              <div className="ep-section-label">Connections ({connectedEdges.length})</div>
              {connectedEdges.length === 0 && <div className="ep-empty">No connections</div>}
              {connectedEdges.map(e => {
                const otherId = e.f === sel ? e.t : e.f;
                const other = curNodes.find(x => x.id === otherId);
                const otherSvc = other ? SERVICES[other.s] : null;
                const dir = e.isBi ? "↔" : (e.f === sel ? "→" : "←");
                return (
                  <div key={e.i} className="ep-edge-row" style={{ display: "flex", flexDirection: "column", gap: "6px", borderBottom: "1.5px dashed #e1dfda", paddingBottom: "8px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: otherSvc?.color || "#888", display: "flex" }}>{ICONS[other?.s] ? React.createElement(ICONS[other?.s], { size: 14 }) : "●"}</span>
                        <span className="ep-edge-label" style={{ display: "flex", alignItems: "center", gap: 4 }}>{dir} {other?.l || otherSvc?.label || otherId}</span>
                      </div>
                      <button className="ep-del-edge" onClick={() => deleteEdge(e.i)} title="Remove connection">✕</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--dim)" }}>Label:</span>
                      <input type="text" className="ep-select" style={{ flex: 1, height: "24px", padding: "2px 8px", fontSize: "11px", fontWeight: "600", background: "#faf8f5", border: "1.5px solid var(--border)", borderRadius: "4px", outline: "none" }}
                        value={e.l || ""}
                        placeholder="e.g. HTTPS, write"
                        onChange={ev => changeEdgeLabel(e.i, ev.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {otherNodes.length > 0 && (
              <div className="ep-section">
                <div className="ep-section-label">Connect To</div>
                <div className="ep-connect-chips">
                  {otherNodes.map(nd => {
                    const sv = SERVICES[nd.s];
                    const alreadyConn = curEdges.find(e => (e.f === sel && e.t === nd.id) || (e.f === nd.id && e.t === sel));
                    return (
                      <button key={nd.id}
                        className="ep-conn-chip"
                        disabled={!!alreadyConn}
                        style={{ color: sv?.color || "#2a2724", borderColor: "var(--border)", background: "#ffffff", opacity: alreadyConn ? 0.4 : 1, display: "inline-flex", alignItems: "center", gap: 6 }}
                        onClick={() => connectTo(nd.id)}>
                        {ICONS[nd.s] ? React.createElement(ICONS[nd.s], { size: 14 }) : "●"} {sv?.label || nd.s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button className="ep-delete-btn" onClick={deleteNode}>
              🗑 Delete Node
            </button>
          </div>
        );
      })()}

      <style>{`@keyframes dash{to{stroke-dashoffset:-20}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ width: "520px", padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 className="section-title" style={{ fontSize: 18, border: "none", padding: 0, margin: 0, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                ⚙️ AI Provider Settings
              </h3>
              <button className="info-close" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--dim)", marginBottom: 14, lineHeight: 1.5 }}>
              Choose a provider preset or configure a custom OpenAI-compatible endpoint. Leave API Key empty to use the <strong>Instant Offline Generator</strong>.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "var(--dim)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700 }}>Quick Presets</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button 
                  type="button"
                  onClick={() => {
                    setApiBase("https://api.groq.com/openai/v1/chat/completions");
                    setApiModel("llama-3.3-70b-versatile");
                  }}
                  style={{ padding: "8px 10px", fontSize: "11.5px", fontWeight: "700", border: "1.5px solid var(--border)", borderRadius: "6px", background: apiBase.includes("groq") ? "var(--accent)" : "#ffffff", color: apiBase.includes("groq") ? "#ffffff" : "var(--text)", cursor: "pointer", textAlign: "left", boxShadow: "2px 2px 0px var(--border)" }}
                >
                  ⚡ Groq (Fastest)
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setApiBase("https://api.openai.com/v1/chat/completions");
                    setApiModel("gpt-4o-mini");
                  }}
                  style={{ padding: "8px 10px", fontSize: "11.5px", fontWeight: "700", border: "1.5px solid var(--border)", borderRadius: "6px", background: apiBase.includes("openai.com") ? "var(--accent)" : "#ffffff", color: apiBase.includes("openai.com") ? "#ffffff" : "var(--text)", cursor: "pointer", textAlign: "left", boxShadow: "2px 2px 0px var(--border)" }}
                >
                  ✨ OpenAI (4o-mini)
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setApiBase("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions");
                    setApiModel("gemini-2.0-flash");
                  }}
                  style={{ padding: "8px 10px", fontSize: "11.5px", fontWeight: "700", border: "1.5px solid var(--border)", borderRadius: "6px", background: apiBase.includes("googleapis") ? "var(--accent)" : "#ffffff", color: apiBase.includes("googleapis") ? "#ffffff" : "var(--text)", cursor: "pointer", textAlign: "left", boxShadow: "2px 2px 0px var(--border)" }}
                >
                  🔮 Google Gemini
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setApiBase("http://localhost:11434/v1/chat/completions");
                    setApiModel("llama3.2");
                  }}
                  style={{ padding: "8px 10px", fontSize: "11.5px", fontWeight: "700", border: "1.5px solid var(--border)", borderRadius: "6px", background: apiBase.includes("localhost") ? "var(--accent)" : "#ffffff", color: apiBase.includes("localhost") ? "#ffffff" : "var(--text)", cursor: "pointer", textAlign: "left", boxShadow: "2px 2px 0px var(--border)" }}
                >
                  💻 Ollama (Local)
                </button>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, color: "var(--dim)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700 }}>API Endpoint</label>
                <input type="text" value={apiBase} onChange={e => setApiBase(e.target.value)} 
                  style={{ width: "100%", padding: "8px 10px", background: "#faf8f5", border: "2px solid var(--border)", borderRadius: "8px", color: "var(--text)", fontSize: "12px", outline: "none", fontFamily: "monospace", fontWeight: "600" }}/>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--dim)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700 }}>Model ID</label>
                <input type="text" value={apiModel} onChange={e => setApiModel(e.target.value)} 
                  style={{ width: "100%", padding: "8px 10px", background: "#faf8f5", border: "2px solid var(--border)", borderRadius: "8px", color: "var(--text)", fontSize: "12px", outline: "none", fontFamily: "monospace", fontWeight: "600" }}/>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--dim)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700 }}>API Key (Optional)</label>
                <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} 
                  placeholder="Paste your API key here (leave empty for offline instant mode)..." 
                  style={{ width: "100%", padding: "8px 10px", background: "#faf8f5", border: "2px solid var(--border)", borderRadius: "8px", color: "var(--text)", fontFamily: "monospace", fontSize: "12px", outline: "none", fontWeight: "600" }}/>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
              {apiKey.trim() ? (
                <button 
                  type="button"
                  className="btn-ghost" 
                  style={{ fontSize: "11px", color: "#e53e3e" }}
                  onClick={() => {
                    setApiKey("");
                    localStorage.removeItem("matrix_ai_key");
                  }}
                >
                  Clear Key (Use Offline)
                </button>
              ) : <div />}
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-ghost" onClick={() => setShowSettings(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => {
                  localStorage.setItem("matrix_ai_key", apiKey.trim());
                  localStorage.setItem("matrix_ai_base", apiBase.trim());
                  localStorage.setItem("matrix_ai_model", apiModel.trim());
                  setShowSettings(false);
                }}>Save Settings</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
