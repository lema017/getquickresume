# Resume State Documentation

**Resume ID:** `resume_1769232368370_hz9u7grfk`  
**Captured:** January 23, 2026  
**Page:** Step 8 Preview

---

## Contact Information
- **Name:** David Salas Vargas
- **Email:** salasvargas85@gmail.com
- **Phone:** (506) 8468 - 7768
- **Location:** USA

---

## Professional Summary
> A creative organizational Software Developer/Programmer with experience in diverse workplace environments like technical support, software development and implementation process.

---

## Work Experience (6 entries)

### Experience 1: Java Senior Backend Developer
- **Company:** Creative One
- **Duration:** 2021-02 - Present
- **Location:** USA
- **Description:** I have been responsible for creating and modifying the financial microservice using Java 8, Spring Boot, and PostgreSQL. I have applied standard best practices, patterns, and security measures to ensure the quality and reliability of the application.
- **Key Achievements:**
  - Responsible for creating and modifying the financial microservice.
  - All this with spring projects using the standard best practices, patterns and security offered in the market.
- **Skills:** Java 8, Spring Boot, PostgreSQL

---

### Experience 2: Java Senior Backend Developer
- **Company:** Mutual Alajuela
- **Duration:** 2021-01 - 2021-02
- **Location:** USA
- **Description:** I was responsible for creating and modifying microservices to handle different financial processes for communication between the core and third-party providers. I applied standard best practices, patterns, and security measures to ensure the quality and reliability of the application.
- **Key Achievements:**
  - Responsible for creating and modifying microservices to handle different financial processes for the communication between the core and third party providers.
  - All this with spring projects using the standard best practices, patterns and security offered in the market.
- **Skills:** Java 8, Spring Boot, PostgreSQL

---

### Experience 3: Java Senior Backend Developer
- **Company:** Cafsa
- **Duration:** 2020-08 - 2020-12
- **Location:** USA
- **Description:** I was responsible for creating and modifying a financial application to analyze possible applicants to get approved or denied. I also integrated with different providers like Abanks and Credinet for credit analysis risk. Additionally, I created Jenkins instances, managed security groups, and EC2 with AWS.
- **Key Achievements:**
  - Responsible for creating and modifying a financial application to analyze possible applicants in order to get approved or denied.
  - Also in charge of integrating with different providers like Abanks and credinet for credit analysis risk.
  - Also in charge of creation of Jenkins instances, managing security groups and EC2 with AWS.
- **Skills:** Java 8, Spring Boot, Liquibase, PostgreSQL, Spring WebFlux, Jasper Reports

---

### Experience 4: Java Developer/Application Support/Team Lead
- **Company:** Snap Technology
- **Duration:** 2015-10 - 2020-07
- **Location:** USA
- **Description:** I was in charge of implementing improvements and assisting in problem resolution using technologies like Java 7+, Primefaces, Hibernate, MongoDB, and PostgreSQL PL/pgSQL. I also created new enhancements that helped business automation and migrated the current financial application from US to UK, dealing with different kinds of problems like date formats and creating new funding or payment file formats.
- **Key Achievements:**
  - In charge of implementing improvements and assisting in problem resolution using technologies like Java 7+, Primefaces, Hibernate, MongoDB and PostgreSQL PL/pgSQL or creating queries that are directly impacting the business.
  - I am also in charge of creating new enhancements that help the business automation.
  - I helped my team to migrate from Jboss server to Wildfly dealing with several issues like lazy initialization exception where we have been creating Vos to fetch the information and store it in memory so it can be accessible from the client's side.
  - I worked in a huge project to migrate the current financial application from US to UK dealing with different kinds of problems like date formats, not having SSN to identify people, creating new funding or payment file formats for our merchants and customers and also creating new microservices using Spring-Boot to communicate with third party providers.
- **Skills:** Java 7+, Primefaces, Hibernate, MongoDB, PostgreSQL PL/pgSQL

---

### Experience 5: Java Developer/Application Support
- **Company:** IBM Costa Rica
- **Duration:** 2015-05 - 2015-10
- **Location:** USA
- **Description:** I was charged with updating charts and reports of the GBS Role-Based Dashboard and modifying ETLs using the Oracle Clover tool, which used Java as a script language. I also modified the Delivery Excellence dashboard charts in the Endeca tool using JSON configuration files and the MDEX Engine to edit the queries.
- **Key Achievements:**
  - Charged of updating the charts and reports of the GBS Role Based Dashboard.
  - Modify ETLs using the Oracle Clover tool, which used Java as script language.
  - Modify Delivery Excellence dashboard charts in the Endeca tool using json configuration files and the MDEX Engine to edit the queries.
- **Skills:** Java, Oracle Clover, Endeca

---

### Experience 6: Software Packager (Programming)/ OS Imager
- **Company:** IBM Costa Rica
- **Duration:** 2012-09 - 2015-05
- **Location:** USA
- **Description:** I was responsible for packaging and modifying software packages and bundles customized according to client needs for every Windows OS. I also created and customized OS images to be deployed on client networks.
- **Key Achievements:**
  - Packaging: Responsible for creating and modifying software packages and bundles customized in accordance of client's needs for every window's OS;
  - Imaging: Responsible for creating and customizing OS images to be deployed on the client's networks;
- **Skills:** Windows OS, Software packaging, OS imaging

---

## Skills

### Technical Skills
Spring Boot, PostgreSQL, Oracle 11g/12c, DB2, DBVisualizer, MSSQL Server, MySQL, JavaServer Faces, Hibernate, C#, JavaScript, InstallScript, PrimeFaces, HTML5, Objective-C, Node.js, MongoDB, Endeca EQL, REST Web Services, UML, Dia, MS Visio, Active Directory, Authentication servers, Batching, Citrix XenApp, DHCP, DNS, Domain controller, File server, Linux, MSI installations, Microsoft Application Virtualization, Power Shell scripting, Red Hat, Scrum agile methodology, VMware ThinApp, VMware Workstation, Windows 2008, Windows 2012 Server, Windows 7, Windows XP, Windows process and services, Windows registry administration

### Tools
Eclipse, IntelliJ, NetBeans, Visual Studio 2010, Bamboo, Jenkins, Rancher

---

## Education

1. **Bachelor Degree** - Metropolitana Castro Carazo University (Computer Science) - 2016-01 to 2020-01
2. **Honors Degree** - ULACIT (Computer Science major in Software Development) - 2016-01 to 2020-01
3. **CCNA** - Latina University (Networking) - 2024 to 2026

---

## Certifications

1. **ITIL Foundation v3 Certification** - New Horizons (2026)
   - Skills: IT Service Management, Service Desk, Incident Management

2. **Flexera InstallShield Admin Studio 11.5 Certification** - Flexera (2025)
   - Skills: Software Packaging, Installation, Configuration

3. **Microsoft System Center Configuration Manager 2012 (SCCM)** - Grupo Asesor (2024)
   - Skills: System Center Configuration Manager, Client Management, Software Deployment

---

## Languages

- **Spanish:** Native
- **English:** Advanced

---

## Notes

- Total work experiences: **6 separate entries**
- Each experience has its own description, achievements, and skills
- This document captures the state BEFORE any ATS enhancement fixes are applied

---

## Bug Fix Applied (January 23, 2026)

**Issue:** ATS "Strong Action Verbs" enhancement merged all 6 experiences into the first experience's description.

**Root Cause:** `updateResumeSection` in `resumeStore.ts` had a fallback path that put the entire enhanced text into `experience[0].description` instead of parsing and distributing to each experience.

**Fix:** Modified the fallback path to parse the enhanced text by `\n\n` delimiters and distribute each entry to its corresponding experience.
