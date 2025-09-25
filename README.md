# TINQNEW
Role-Based Access Levels (full, feature-by-feature)
All features below preserve the areas you’ve requested (user & role mgmt, proctoring, analytics, course mgmt, forums, grading, notifications, API control).
Admin 🛡️ (full system control)
•	User Management
o	Create/Edit/Delete users, bulk operations, custom roles, impersonation (with audit log).
o	Reset password (temp pwd) and set forcePasswordChange.
o	Suspend/reactivate accounts; deactivate entire organizations (if multi-tenant).
o	Audit trails and logs for all user actions.
•	Security & Governance
o	Configure lockout thresholds, password strength, MFA policies.
o	Configure platform maintenance mode (force logout; disable UI).
o	Define role permissions, system settings, branding, and compliance configs.
•	Password Reset & Notifications
o	Approve/deny reset requests from password_reset_requests.
o	View admin_notifications for lockouts, flagged users, policy violations.
•	Proctoring & Exams (system-level defaults)
o	Configure global proctoring settings (camera capture, screen capture, browser lockdown).
o	View proctoring logs and violation summaries.
•	Content & Course Oversight
o	View/manage/override published courses, lessons, quizzes.
o	Force (un)publish, reassign instructors, audit content changes.
•	Analytics & Reporting
o	System and institution-wide analytics, exports (CSV, PDF), compliance dashboards.
o	Schedule recurring reports (calendar integration).
•	API & Integrations
o	Manage API keys, set scopes, monitor usage, revoke keys.
•	Payments & Billing
o	Manage payment providers, refunds, subscription tiers, invoices (if monetized).
•	Forum moderation
o	Moderate global forums (flag, remove content, ban users).
•	System logs & export
o	Export logs, set data retention, data deletion for GDPR.
Instructor 👩‍🏫
•	Course & Lesson Management
o	Create/Edit/Delete courses & lessons (multi-format materials: docx/ppt/pdf/image/audio/video/links).
o	Organize lessons into modules/sections, set lesson order, add prerequisites.
•	Assessments (Quizzes & Assignments)
o	Create unlimited questions (MCQ, FILL_IN, TRUE_FALSE, SHORT_ANSWER, ESSAY, LINK).
o	Configure hints, explanations, weights, rubrics, attempts, penalties.
o	Schedule auto publish/unpublish; reopen assessments with optional penalties and override notes.
o	Randomization of questions & answers; time limits; shuffle answers; configure attempts.
•	Grading & Feedback
o	Auto-grade where applicable (MCQ/TF/FILL_IN/SHORT_ANSWER if match patterns).
o	Manual grading for essay/file assignments; rubrics support; annotate and leave feedback.
o	Peer/self/double marking workflows.
•	Analytics & Reports
o	Course-level dashboards: per student metrics, class performance trends, top/bottom performers.
o	Export CSV/PDF of class reports and transcripts.
•	Communication & Forum
o	Create course forum, moderate posts, start polls & surveys, pin answers.
•	Proctoring
o	Initiate/monitor proctored sessions for own assessments (face detect, tab switch, noise detection, screenshots, video recording).
o	View violation logs for own assessments.
Student 🎓
•	Learning & Participation
o	Enrol in courses, view lessons, download materials.
o	Take quizzes (auto-gradeable types) and submit assignments (file or text).
o	Track progress, XP/streaks (gamification optional), certificates/transcripts.
•	Assessment Experience
o	Limited actions during proctored sessions; may be subject to auto-detection restrictions.
o	View rubric feedback, request regrade, and participate in peer assessments if enabled.
•	Communication
o	Participate in course forums (ask, answer, upvote, bookmark).
o	Receive announcements, calendar reminders, and in-app notifications.
________________________________________
Core Modules & Data Model (conceptual)
•	Users & Profiles — identity, role, contact, avatar, preferences.
•	User Security — failedAttempts, lockedUntil, lockouts, flagged.
•	Password Reset Requests — pending approvals with audit trail.
•	Courses — meta, instructor, published status, schedule.
•	Lessons & Materials — supports PDF, video, audio, docx, images, external links.
•	Quizzes — questions, timeLimit, randomization, shuffle, publish schedule.
•	Questions & Choices — typed questions, choices for MCQs, answer schema, hints & explanations.
•	Assignments — rubric (JSON), maxAttempts, attachments allowed.
•	Submissions & Attempts — store answers JSON, file references, timestamps, grades, feedback.
•	Enrollments — users ⇄ courses (with role: student/TA).
•	Forums — threads, posts, reactions, polls.
•	Notifications — in-app and email notifications to users/admins.
•	AdminNotifications — system lockout/flag/reset alerts.
•	AuditLogs & ActivityEvents — immutable records for compliance & analytics.
•	Files — metadata for storage (S3 keys, signed URL meta).
•	Certificates / Transcripts — course completion artifacts.
•	Payments / Billing — optional monetization tables (invoices, transactions).
•	Reporting / Analytics — aggregated event store & endpoints for export.
________________________________________
Advanced Features & Enhancements (recommended)
(keeps every previously requested feature, plus these enhancements)
1.	MFA & SSO: Add OAuth2 (Google, Microsoft) and TOTP-based MFA for admin/instructor security.
2.	Refresh Token Rotation & Revocation: Secure refresh implementation (hash tokens in DB).
3.	Honeypot & IP Throttle: Advanced anti-brute force with IP / user combination throttles.
4.	Video streaming & transcode: Use a media processing pipeline (AWS Elastic Transcoder, MediaConvert, or ffmpeg workers) and HLS streaming for large videos.
5.	Search: Full-text search with Postgres tsvector or ElasticSearch for courses/lessons/forums.
6.	Offline-first / PWA: Lesson caching, service workers, local submission queuing for intermittent connectivity.
7.	Background Jobs: BullMQ (Redis) to handle large exports, email delivery, scheduling publish/unpublish, analytics aggregation.
8.	Audit & Compliance: GDPR export/delete workflows; data retention policies; consent tracking.
9.	Observability: Structured logs, metrics (Prometheus), error tracking (Sentry) and tracing.
10.	CI/CD & IaC: GitHub Actions / GitLab CI for tests + deployments. Terraform or Cloudformation for infra.
11.	Testing: Unit, integration, E2E (Cypress), contract tests for APIs.
12.	Multi-tenant (optional): Add organization entity and scoping (tenants) with owner/admin per tenant.
13.	Role Customization UI: Admins can create custom roles and assign granular permissions from UI.
14.	Extensible Plugin System: Webhooks and plugin hooks for third-party integrations.
