# Hi, I'm Craig Zifunzi 👋

**AI Systems Engineer | Autonomous Agents, Inference Infrastructure & Linux/Android Automation**  
📍 Harare, Zimbabwe (100% Global Remote) • ✉️ [kzodrax@gmail.com](mailto:kzodrax@gmail.com) • 🌐 [Portfolio](https://github.com/00000star/portfolio) • 🤗 [Hugging Face](https://huggingface.co/Starboy001)

---

### 🚀 Engineering Overview

I am an independent AI Systems Engineer specializing in autonomous agent execution runtimes, GPU inference infrastructure, and resilient software for resource-constrained environments. 

My engineering focus spans **observable execution, bounded retries, automated verification, deterministic safety guardrails, and low-level system recovery**. Over 50+ repositories, I bridge high-level model reasoning with robust Linux, Android, and cloud infrastructure.

---

### 🏛️ Core Showcase & Engineering Pillars

```
┌────────────────────────────────────────────────────────┐
│               Autonomous Agent Runtime                 │
│      [DAG Planner] ➔ [Tool Dispatch] ➔ [OAV Loop]      │
│     State Persistence • Bounded Retries • Supervisor   │
└──────────────────────────┬─────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
┌───────────────────────────────┐ ┌───────────────────────────────┐
│     Inference Infrastructure  │ │    Safety & Red-Teaming       │
│  FastAPI Proxy • A10G (sm_86) │ │  anti-rrsi: Blast-Radius Sand-│
│  ZeroGPU Dynamic Quota Alloc  │ │  boxing • Deterministic Evals │
└───────────────────────────────┘ └───────────────────────────────┘
```

#### 1. Autonomous Agent Execution Runtimes (`jonn` & `hermes-ascendant`)
* **Problem**: Standard LLM tool execution lacks state persistence and fails ungracefully when commands hang, crash, or hit resource exhaustion.
* **Architecture**: Modular agent loop with DAG task decomposition, structured tool dispatch, persistent disk-backed memory, and bounded retry handlers for recoverable errors.
* **Reliability & Supervision**: Background supervisor with POSIX signal handling (`SIGTERM`/`SIGHUP`), restart policies, and OOM-aware process management to recover from worker termination; automated CI testing in GitHub Actions.

#### 2. GPU Inference Proxy & Backend Routing (`zerogpu-flash` / STARBOY PRIME)
* **Problem**: Interactive agent loops require responsive token streaming without over-allocating costly dedicated GPU instances or exceeding shared quotas.
* **Architecture**: Asynchronous FastAPI proxy capable of routing requests across configurable backends—supporting dedicated NVIDIA A10G (`sm_86`) endpoints and Hugging Face ZeroGPU dynamic allocations.
* **Reliability**: Exponential backoff, quota-aware fallback routing, connection pooling, and payload parsing validated against 400+ serialized evaluation fixtures.

#### 3. AI Safety & Red-Teaming Framework ([`anti-rrsi`](https://github.com/00000star/anti-rrsi))
* **Problem**: Code-executing agents pose severe risks of unbounded tool calls, credential leakage, and unsafe self-modification.
* **Architecture**: Empirical safety harness intercepting, sandboxing, and auditing autonomous tool execution against strict blast-radius constraints.
* **Verification**: Reproducible red-teaming test suites simulating privilege escalation, secret leakage, and unauthorized system commands.

#### 4. Android UI Automation & Low-Level Systems ([`android-device-control`](https://github.com/00000star))
* **Problem**: Mobile automation on Android breaks from dynamic view hierarchies and containerized network sandbox failures.
* **Implementation**: Python-based automation engine parsing UI hierarchy trees into indexed coordinate targets with strict Observe-Act-Verify loops.
* **Systems Hack**: Authored a standard-library UDP DNS fallback to resolve network hosts where Android Bionic libc `getaddrinfo` fails inside Termux containers.

---

### 🛠️ Technical Arsenal

| Domain | Technologies & Tooling |
| :--- | :--- |
| **Languages** | Python (Advanced), Rust, TypeScript, Bash/POSIX Shell, Dart, Kotlin, SQL |
| **Agentic Systems** | Observe-Act-Verify Loops, DAG Task Planners, Bounded Retries, Tool Calling, Persistent Memory |
| **Cloud & Inference** | FastAPI, Hugging Face Spaces (A10G `sm_86` & ZeroGPU), WebSockets, GitHub Actions CI/CD |
| **Systems & Mobile** | Linux Daemon Management, Process Lifecycle & OOM Recovery, Android Internals, Termux |
| **Distributed / Offline** | Offline-First PWA, P2P Streaming Mesh ([moviebox-mesh](https://github.com/00000star/moviebox-mesh)), Traffic-Budget Controls |

---

### 📈 GitHub Highlights

* **55+ Public & Private Engineering Repositories**
* **Active Maintainer**: Modular agent skills, mobile automation toolkits, and offline resilience protocols.
* **Portfolio**: Explore interactive architecture diagrams and live demos at [github.com/00000star/portfolio](https://github.com/00000star/portfolio).

---

> *"Build for resilience under constraints; verify every execution path."*
