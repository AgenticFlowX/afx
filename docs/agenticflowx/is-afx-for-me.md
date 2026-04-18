---
afx: true
type: GUIDE
status: Living
tags: [afx, onboarding, fit-check]
---

# Is AFX for me?

A 30-second fit check. Read the two lists below and see where you land.

---

## AFX fits well if…

- Your features run **days or weeks**, not hours — context handoffs between sessions or agents matter
- You use an **AI coding assistant** (Claude Code, Codex, Copilot, Gemini) as your primary implementation tool
- You want **specs and code to stay linked** — you care about knowing what requirement produced each function
- Multiple people or agents **touch the same feature** over time
- You want to know **why a decision was made**, not just what it is
- You want a governance trail that **grows with the project**, not a one-time ceremony upfront

---

## AFX may not fit if…

- You're building a **throwaway script** or one-off prototype with no reuse intent — though `/afx-sprint` reduces overhead significantly for this case
- Your team **changes requirements so fast** that any spec becomes stale before implementation starts
- You're **not using AI coding assistants** at all — AFX is designed around agent handoffs and agent context
- **Zero documentation** is a hard constraint on your team

---

## Not sure? Start with sprint mode

`/afx-sprint` is AFX's lightweight entry point — one document, per-section approvals, same traceability discipline. If the feature stays small, you ship from the sprint doc. If it grows, you graduate to four files.

```bash
/afx-sprint new my-feature        # scaffold single-doc
/afx-sprint spec my-feature       # refine spec section
/afx-sprint spec my-feature --approve
/afx-sprint design my-feature --approve
/afx-sprint task my-feature --approve
/afx-sprint code my-feature
```

Sprint mode is the lowest-friction entry point. It does not require upfront commitment to the full four-file workflow.

---

## Next steps

- Ready to start → [quickstart.md](quickstart.md)
- Want to understand the philosophy first → [why-afx.md](why-afx.md)
- Full reference → [agenticflowx.md](agenticflowx.md)
