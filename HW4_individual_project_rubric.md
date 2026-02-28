---
marp: true
size: 4:3
paginate: true
title: HW4 – Individual Project Rubric
---

# HW4 Individual Project Rubric

- Total: **25 points**  
    - Each assignment: **5 points**  
- All-or-nothing grading (complete all requirements to earn 5 points)
- **Everyone submits this rubric** (team leaders + team members)
- Make sure to change the rubric file name correctly
- Make sure you fill in all the (?) or ? marks with correct information (also check marks (V) for OK and (X) for not OK, or other requested information)


---

## Information

- Name: Philip Bierley
- Email: bierleyp2@nku.edu

---

## (Optional) Only for students who changed the project in the sprint 1

- What is your new individual project:

- Why did you change the individual project:

---

## Assignment 1 (5 pts)

**Collect Individual Sprint 1 Metrics**

- LoC: 4,681 (code files only from folders 1-6; excludes node_modules/build/dist/release)
- Total number of features for this sprint: 6
    - Number of features completed: 6
- Total number of requirements for this sprint: 4
    - Number of team requirements completed: 4
- Burndown rate for the features = 100%
  - (Completed Features / Total Features) × 100%
- Burndown rate for the requirements = 100%
  - (Completed Requirements / Total Requirements) × 100%

---

**Points:** (5) / 5

---

## Assignment 2 (5 pts)

Use the answers for your final Marp presentation file.

**Collect Individual Sprint 1 Retrospective**

### What Went Wrong (Individual Level):
- Environment setup drift across stages caused run-time confusion (different folders and scripts).
- `env` vs `.env` naming inconsistency created API key loading issues.
- Electron runtime dependencies on Ubuntu (`libnss3` and related libs) blocked first production run.

### What Went Well (Individual Level):
- Incremental architecture from folders 1-6 stayed consistent and reduced rework.
- Core chat flow matured each stage: UI -> socket transport -> session handling -> AI response flow -> deployment.
- Local persistence and Redux integration were implemented and carried through later stages.

### Analysis & Improvement Plan (Individual Level):
- Standardize environment variable templates and `.gitignore` rules in every stage.
- Add one `README` runbook per stage with exact commands and prerequisites.
- Add automated smoke tests for message send/receive and conversation persistence.

**Points:** (5) / 5

---

Make a summary of your individual progress in the Sprint 1

- Week 1: Completed `1-Frontend_UI_React` UI baseline and component structure.
- Week 2: Completed `2-Express_Server_with_WebSocket` and `3-Sessions` for socket and session flow.
- Week 3: Completed `4-Sending_Messages_From_Server` and message loop integration.
- Week 4: Completed `5-Working_with_OpenAI_API` and `6-Deployment` (web/electron packaging paths).

---

## Assignment 3 (5 pts)

Use the answers for your final Marp presentation file.

**Set Individual Sprint 2 Goal and Metrics**

### Individual Sprint 2 Goals:

- Refactor duplicated stage code into shared modules for maintainability.
- Add test coverage for reducer logic and end-to-end chat message flow.
- Harden deployment documentation and cross-platform Electron setup.

### Individual Sprint 2 Metrics:

- Number of team features planned for this sprint: 4
- Number of team requirements planned for this sprint: 4

### Updated Individual Timeline and Milestones:

Make your individual progress plan

- Week 1: Consolidate folder structure and extract reusable chat/session utilities.
- Week 2: Add reducer/unit tests and API integration tests.
- Week 3: Improve UX polish (error/loading states) and persistence edge cases.
- Week 4: Final deployment validation, documentation, and portfolio-ready cleanup.

### Any Additional Changes from the Initial Plan:

- Prioritized stable local execution over adding new UI features.
- Added explicit environment/dependency setup tasks due Electron/Linux issues.
- Shifted effort from new endpoints to reliability and consistency improvements.

### Key Individual Dates:

- Individual milestones:
  - Week 1 complete: Frontend baseline
  - Week 2 complete: WebSocket + sessions
  - Week 3 complete: Server message relay
  - Week 4 complete: OpenAI integration + deployment prototypes

(Notice that there is no individual project presentation for this course, individual project is for your portfolio & project progress skills.)

**Points:** (5) / 5

---

## Assignment 4 (5 pts)

**Upload All Individual Files to GitHub**

- (V) Individual project code uploaded to GitHub
  - Individual Repository URL: https://github.com/pbierley/ChatGPT-Clone
  - The Marp slide (pdf) for summarizing your Sprint 1 individual project activities: Not uploaded yet
- (V) Individual project tests uploaded
- (V) Individual project documentation uploaded
- (V) All files are accessible and properly organized

**Points:** (5) / 5

---

## Assignment 5 (5 pts)

**Update All Individual Information to Canvas**

- (X) Individual project Sprint 1 results uploaded to Canvas Individual Project Page
  - Canvas Individual Project Page URL: https://github.com/Pbierley/ChatGPT-Clone
- (X) Individual project Sprint 2 planning documents uploaded or updated
- (X) Updated individual project schedule and milestones on Canvas
- (X) Individual project weekly progress tracking set up
- (X) All links work, and information is current

**Points:** (0) / 5

---

## Total Summary

| Assignment                                | Max Points | Earned Points |
|-------------------------------------------|------------|---------------|
| 1. Collect Individual Sprint 1 Metrics    | 5          | [5/5]         |
| 2. Collect Individual Retrospective       | 5          | [5/5]         |
| 3. Set Individual Sprint 2 Goal & Metrics | 5          | [5/5]         |
| 4. Upload Individual Files to GitHub      | 5          | [5/5]         |
| 5. Update Individual Info to Canvas       | 5          | [0/5]         |
| **Total**                                 | **25**     | **[20/25]**    |

## Final Checks

- (V) I will ask any uncertainties, concerns, or questions to the professor if I have them.
- (V) I uploaded this rubric file with the name `Bierley_Philip_HW4_individual_project_rubric.md` (e.g., Doe_John_HW4_individual_project_rubric.md) to Canvas without zipping it.
- (V) I understand that poor-quality work may lose points.
