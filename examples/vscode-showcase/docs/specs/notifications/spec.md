---
afx: true
type: SPEC
status: Draft
owner: '@rix'
priority: Low
version: 1.0
created: 2026-03-10T14:00:00.000Z
tags: [notifications, mvp]
---

# Notifications Specification

## Overview

In-app notification system for task updates, mentions, and system alerts. Notifications appear in a bell icon dropdown and are persisted for later review. Push notifications are out of scope for MVP.

## User Stories

### US-1: View Notifications

**As a** user
**I want to** see a list of recent notifications
**So that** I stay informed about task updates and mentions

**Acceptance Criteria:**
- [ ] Bell icon shows unread count badge
- [ ] Dropdown lists last 20 notifications
- [ ] Each notification shows type icon, message, and timestamp
- [ ] Clicking a notification navigates to the related item

### US-2: Mark as Read

**As a** user
**I want to** mark notifications as read (individually or all)
**So that** I can track what I've already seen

**Acceptance Criteria:**
- [ ] Click marks individual notification as read
- [ ] "Mark all as read" button available
- [ ] Unread count updates in real-time

## Functional Requirements

### FR-1: Notification Types

| Type          | Trigger                        | Example Message                    |
| ------------- | ------------------------------ | ---------------------------------- |
| task_assigned | Task assigned to user          | "You were assigned to: Fix login"  |
| task_complete | Task you own was completed     | "Task completed: Setup DB schema"  |
| mention       | Mentioned in a journal entry   | "@rix mentioned you in UA-D002"    |
| system        | System alert (maintenance etc) | "Scheduled maintenance at 2am UTC" |

### FR-2: Notification Endpoint

The system shall provide `GET /api/notifications` with pagination and `PATCH /api/notifications/:id/read` for marking as read.

## Out of Scope

- Push notifications (browser/mobile)
- Email notification digest
- Notification preferences/settings
- Custom notification rules
