---
afx: true
type: SPEC
status: Approved
owner: "@agenticflowx"
version: "1.2"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:30:17.000Z"
tags: [roomledger, check-out, example]
depends_on: [01-room-dashboard, 02-check-in]
---

# RoomLedger — Check-Out Comparison

## Problem Statement

At move-out, both parties need to compare the room's current condition against the approved check-in baseline. Without a structured comparison and bilateral sign-off, disputes about damage, wear, or deposit deductions become he-said-she-said. The check-out view provides side-by-side comparison with independent owner and renter sign-off.

## User Stories

| ID   | Story                                                                                                                                                 |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-1 | As an **owner**, I want to compare move-out photos against the approved baseline so I can identify any damage that occurred during the rental period. |
| US-2 | As a **renter**, I want to approve the exit comparison so there is a clear record that I agreed with the final room state.                            |
| US-3 | As either role, I want to raise a dispute if the comparison is unfair so the disagreement is formally recorded.                                       |
| US-4 | As either role, I want to see whether both parties have signed off so I know when the inspection is complete.                                         |

## Functional Requirements

| ID   | Requirement               | Description                                                                                                                                                                                                                                                                                                         |
| ---- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-1 | Three-column comparison   | Display 3 equal-width cards: (1) Approved baseline photos from check-in with "Approved" status chip (success); (2) Move-out retake photos with "Captured" status chip; (3) Review notes card with summary text and action buttons.                                                                                  |
| FR-2 | Dispute action            | A "Raise dispute" button in the review card. Clicking it changes the review status to "Dispute raised" (danger color), updates the current role's sign-off panel to "Disputed" state, and disables both action buttons. The dispute cannot be undone within the same session (refresh to reset).                    |
| FR-3 | Approve exit action       | An "Approve exit" button in the review card. Clicking it updates only the current role's sign-off panel to "Signed off" (success color) and disables both action buttons for the current role. The other role's panel remains unchanged. Switching roles allows the other role to independently approve or dispute. |
| FR-4 | Bilateral sign-off ledger | Below the comparison area, display 2 equal-width panels: "Owner sign-off" and "Renter sign-off". Each panel shows one of 3 states: "Not yet signed" (muted color, muted left border), "Signed off" (success color, success left border, checkmark), or "Disputed" (danger color, danger left border).               |
| FR-5 | Completion detection      | When both owner and renter sign-off panels show "Signed off", display a completion message: "Both parties have signed off. Rental inspection complete." The message uses success styling.                                                                                                                           |
| FR-6 | Responsive collapse       | 3-column comparison and 2-column sign-off collapse to 1 column on mobile.                                                                                                                                                                                                                                           |

## Non-Functional Requirements

| ID    | Requirement              | Description                                                                          |
| ----- | ------------------------ | ------------------------------------------------------------------------------------ |
| NFR-1 | No external dependencies | Plain HTML, CSS, and JavaScript only. No frameworks, no CDN imports, no build tools. |
| NFR-2 | Responsive range         | 320px to 1440px viewport width.                                                      |
| NFR-3 | Accessibility            | Semantic HTML, keyboard-navigable actions, sufficient contrast.                      |
| NFR-4 | In-memory state          | Sign-off states held in JS variables. No persistence.                                |

## Acceptance Criteria

- [ ] Three comparison cards render side by side on desktop
- [ ] "Raise dispute" changes review status to danger and updates the current role's sign-off to "Disputed"
- [ ] "Approve exit" updates only the sign-off panel for the active role to "Signed off"
- [ ] Action buttons disable after either is clicked for the current role
- [ ] Both owner and renter can sign off independently (switch role, click again)
- [ ] When both roles show "Signed off", the completion message appears
- [ ] Sign-off panels show correct visual state (muted, success, danger with left border)
- [ ] Layout collapses to single column on mobile

## Non-Goals (Out of Scope)

- Undo dispute or change sign-off after action — refresh to reset
- Deposit calculation or financial settlement
- Automated damage detection or image diff
- Generating a PDF report or printable summary
- Linking specific timeline events to comparison findings

## Dependencies

- **01-room-dashboard**: Provides the app shell (sidebar, navigation, role switching, theme system). The check-out view is rendered inside the dashboard's main content area and relies on the active role state for sign-off attribution.
- **02-check-in**: The "Approved baseline" card in FR-1 conceptually references the baseline approved during check-in. In this prototype, the baseline is a static placeholder (not dynamically linked to check-in state).

## Open Questions
