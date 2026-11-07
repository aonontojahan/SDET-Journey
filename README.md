# 🚀 SDET Journey — Software Development Engineer in Test

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Postman](https://img.shields.io/badge/Postman-v10+-FF6C37?style=flat&logo=postman&logoColor=white)](https://www.postman.com/)
[![Newman](https://img.shields.io/badge/Newman-CLI_Runner-orange?style=flat)](https://www.npmjs.com/package/newman)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tests Passed](https://img.shields.io/badge/Tests-100%25%20Passing-brightgreen?style=flat)]()

Welcome to my **SDET Journey** repository. This repository documents a structured, end-to-end pathway toward mastering **Software Quality Assurance (SQA)** and **Software Development Engineering in Test (SDET)**. It demonstrates practical competency across manual test engineering, business requirement analysis, defect reporting, and automated REST API testing using industry-standard tools and frameworks.

---

## 📑 Table of Contents

- [🎯 Core Competencies](#-core-competencies)
- [📂 Repository Structure](#-repository-structure)
- [📌 Projects & Assignments Breakdown](#-projects--assignments-breakdown)
  - [Assignment 1: Manual Testing & SQA Documentation](#assignment-1-manual-testing--sqa-documentation)
  - [Assignment 2: Complete REST API Test Automation](#assignment-2-complete-rest-api-test-automation)
  - [Practice 1: API Automation Fundamentals](#practice-1-api-automation-fundamentals)
  - [Theoretical Topics: SQA Foundations](#theoretical-topics-sqa-foundations)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start & How to Run](#-quick-start--how-to-run)
- [🛡️ Security & Git Hygiene](#️-security--git-hygiene)
- [👤 Author & Connect](#-author--connect)

---

## 🎯 Core Competencies

- **Manual Testing & Test Design**: Equivalence Partitioning (EP), Boundary Value Analysis (BVA), Decision Table testing, and Exploratory testing.
- **Requirements Engineering**: Formulating Agile User Stories, Definition of Done (DoD), and Gherkin-style Acceptance Criteria.
- **Defect Management**: Documenting detailed bug reports with severity, priority, preconditions, reproduction steps, and expected vs. actual outcomes.
- **API Automation & Scripting**: Designing chained REST API test suites in Postman using JavaScript (ES6+), dynamic environment variables, pre-request data generation, and Chai BDD assertion libraries.
- **Headless Execution & Reporting**: Running automated test collections via Newman CLI and generating interactive HTML dashboards using `newman-reporter-htmlextra`.
- **Security & Data Safety**: Managing sensitive tokens, credentials, and test run reports securely through Git exclusions (`.gitignore`) and repository directory guards (`.gitkeep`).

---

## 📂 Repository Structure

```text
SDET-Journey/
├── Assignments/
│   ├── Assignment 1/                                   # Manual Testing & Documentation
│   │   ├── Task 1. acceptance critera on dmoney.docx  # Feature Acceptance Criteria
│   │   ├── Task 2. test cases with priority.xlsx       # Prioritized Test Cases
│   │   ├── Task 3. test cases for cash in feature.xlsx # BVA/EP Cash-In Test Scenarios
│   │   ├── Task 4. agent commission structure.docx    # Business Rules & Commission Specs
│   │   ├── Task 5. bugs from dmoney application.xlsx   # Bug Tracking & Defect Reports
│   │   └── Task 6. theoritical questions.docx          # SQA & STLC Theoretical Concepts
│   │
│   └── Assignment 2/                                   # Advanced API Test Automation
│       ├── collection/                                 # 30-Request Postman Test Suite
│       │   └── DMoney - Complete API Automation.postman_collection.json
│       ├── Reports/                                    # Newman HTML Dashboard Reports
│       │   └── .gitkeep                                # Preserves folder structure in Git
│       ├── .gitignore                                  # Excludes reports, node_modules, secrets
│       ├── package.json                                # Project dependencies & npm scripts
│       ├── report.js                                   # Newman execution runner
│       └── README.md                                   # Comprehensive Assignment 2 Guide
│
├── practice1-dmoney-batch-20/                          # API Automation Practice Lab
│   ├── collection/                                     # User Lifecycle Postman Collection
│   │   └── dmoney-collection-b20.json
│   ├── Reports/                                        # HTML Output Directory
│   │   └── .gitkeep
│   ├── .gitignore
│   ├── package.json
│   ├── report.js
│   └── README.md
│
├── Theoritical Topics/                                 # Core SQA Study Material
│   ├── Chapter 1.pdf                                   # Fundamentals of Testing
│   ├── Chapter 2.pdf                                   # Testing throughout SDLC
│   ├── Chapter 3.pdf                                   # Static Testing & Reviews
│   ├── Chapter 4.pdf                                   # Test Analysis & Design Techniques
│   └── Chapter 5.pdf                                   # Managing the Test Activities
│
├── LICENSE                                             # Apache 2.0 License
└── README.md                                           # Repository Index & Portfolio Guide
```

---

## 📌 Projects & Assignments Breakdown

### Assignment 1: Manual Testing & SQA Documentation
📁 **Path**: [`Assignments/Assignment 1/`](Assignments/Assignment%201)

A full manual testing suite and software quality documentation focused on the **dMoney** Mobile Financial Service platform:
- **Task 1: Acceptance Criteria Definition**: Detailed acceptance criteria for core financial modules, user interactions, and edge cases.
- **Task 2: Prioritized Test Case Design**: Structured spreadsheet mapping end-to-end positive and negative test cases with assigned execution priorities (P1/P2/P3).
- **Task 3: Test Design for Cash-In Feature**: Application of black-box test design techniques—Boundary Value Analysis (BVA) and Equivalence Partitioning (EP)—for balance top-ups and cash-in operations.
- **Task 4: Agent Commission Structure**: Deep-dive business documentation detailing agent tier commissions, revenue shares, and deduction logic.
- **Task 5: Defect Tracking & Bug Reporting**: Formal bug reports detailing reproduction steps, severity, priority, expected vs. actual behaviors, and defect classifications.
- **Task 6: Theoretical SQA Principles**: Answers and practical demonstrations of key SDLC, STLC, and quality assurance principles.

---

### Assignment 2: Complete REST API Test Automation
📁 **Path**: [`Assignments/Assignment 2/`](Assignments/Assignment%202)  
📖 **Interactive API Documentation**: [Postman Documenter](https://documenter.getpostman.com/view/43453967/2sBYHYuHrB)

A production-grade, 30-scenario automated REST API test suite for the **dMoney** financial service platform:
- **Actor Role Coverage**: End-to-end orchestration across 5 distinct roles: `Admin`, `SYSTEM`, `Agent`, `Customer 1`, `Customer 2`, and `Merchant`.
- **Security & Multi-Factor Auth (MFA)**: Verification of password login, 2FA OTP verification, token generation, and bearer token propagation.
- **Multi-Tier Financial Flows**:
  - `SYSTEM` → `Agent` float funding (৳5,000 deposit).
  - `Agent` → `Customer 1` cash deposit (৳2,000 deposit).
  - `Customer 1` → `Customer 2` peer-to-peer transfer (৳1,000 Send Money).
  - `Customer 2` → `Agent` cash withdrawal (৳500 Cash-Out).
  - `Customer 1` → `Merchant` commercial payment (৳400 Payment).
- **Negative & Boundary Validations**: Self-transfer rejection, negative amount protection, invalid phone numbers, wrong OTP rejection, and invalid ID handling.
- **Metrics**: **30 Requests | 100 Assertions | 100% Pass Rate**.
- **Automated Reporting**: Newman runner integrated with `newman-reporter-htmlextra` delivering visual dashboards.

---

### Practice 1: API Automation Fundamentals
📁 **Path**: [`practice1-dmoney-batch-20/`](practice1-dmoney-batch-20)

Hands-on foundational API testing lab covering:
- Admin authentication and JWT token handling.
- User management lifecycle: Create User, Search User, Status Updates (Suspend/Activate), and User Deletion.
- Chaining environment variables and automated report generation via Newman.

---

### Theoretical Topics: SQA Foundations
📁 **Path**: [`Theoritical Topics/`](Theoritical%20Topics)

A collection of foundational study resources covering ISTQB-aligned software testing chapters:
- **Chapter 1**: What is Testing, Test Objectives, Seven Testing Principles, Test Process.
- **Chapter 2**: Testing throughout the Software Development Life Cycle (SDLC, STLC, Agile Testing).
- **Chapter 3**: Static Testing, Review Techniques, and Static Analysis.
- **Chapter 4**: Black-box, White-box, and Experience-based Test Design Techniques.
- **Chapter 5**: Test Management, Risk Management, Defect Management, and Test Tooling.

---

## 🛠️ Technology Stack

| Domain | Technology / Tool | Purpose |
|:---|:---|:---|
| **API Testing & Automation** | [Postman](https://www.postman.com/) | API request authoring, dynamic scripts, collection variables |
| **Test Runner** | [Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) | Headless CLI execution for Postman collections |
| **HTML Reporting** | [newman-reporter-htmlextra](https://www.npmjs.com/package/newman-reporter-htmlextra) | Dashboard-style HTML test execution reports |
| **Runtime & Package Management**| [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/) | Script execution runtime and dependency manager |
| **Scripting Language** | [JavaScript (ES6+)](https://developer.mozilla.org/) | Pre-request logic, Chai assertion scripts, custom runners |
| **Test Design & Documentation** | MS Excel, MS Word | Test case design, BVA/EP matrices, defect tracking, AC |
| **Version Control** | [Git](https://git-scm.com/) & [GitHub](https://github.com/) | Source code management, repository hygiene, and safety |

---

## 🚀 Quick Start & How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/aonontojahan/SDET-Journey.git
cd SDET-Journey
```

### 2. Run Assignment 2 (Complete 30-Scenario Automation)
```bash
cd "Assignments/Assignment 2"
npm install
node report.js
# Or run with npm script:
npm test
```
*After the execution completes, open `Reports/report.html` in your browser to view the interactive test report.*

### 3. Run Practice 1 Suite
```bash
cd "../../practice1-dmoney-batch-20"
npm install
node report.js
```

---

## 🛡️ Security & Git Hygiene

This repository strictly enforces best practices for sensitive data protection:
- **Git Exclusions (`.gitignore`)**: Runtime test reports (`Reports/*.html`) containing generated passwords, phone numbers, and bearer tokens are ignored from version control to prevent data leakage.
- **Folder Preservation (`.gitkeep`)**: Empty `Reports/` folders are safely tracked without committing personal test artifacts.
- **Package Management**: `node_modules/` is excluded across all modules to maintain a clean, lightweight repository footprint.

---

## 👤 Author & Connect

**Aononto Jahan Junnurain**
- 🐙 **GitHub**: [@aonontojahan](https://github.com/aonontojahan)
- 📧 **Email**: [aonontojahan@gmail.com](mailto:aonontojahan@gmail.com)
- 📌 **Postman Documentation**: [dMoney Complete API Automation](https://documenter.getpostman.com/view/43453967/2sBYHYuHrB)

---

## 📄 License

This repository is licensed under the [Apache License 2.0](LICENSE).
