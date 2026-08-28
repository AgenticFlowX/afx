---
name: security-audit
description: Conduct read-only security architecture audits and threat models for application features, APIs, data flows, infrastructure, dependencies, and agent/tooling integrations. Use for security review, secure design review, threat modeling, hardening plans, dependency/supply-chain risk, privacy/data-protection checks, or prioritized remediation reports tied to AFX specs and code evidence.
license: MIT
metadata:
  afx-owner: "@rix"
  afx-tags: "security,audit,threat-modeling,vulnerability,remediation,architecture"
---

# AFX Security Audit

Read-only security architecture audit workflow with AFX traceability. Use it to find credible risks, tie them to evidence, and produce a remediation plan the implementation workflow can execute.

## Execution Contract

### Allowed

- Read, list, and search workspace files.
- Inspect specs, designs, tasks, journals, code, configs, manifests, lockfiles, CI, IaC, and dependency metadata.
- Run read-only discovery commands when permitted by the host.
- Produce findings, threat models, hardening recommendations, and verification plans.

### Forbidden

- Create, modify, or delete files.
- Apply patches, add annotations, update journals, install packages, run migrations, deploy, or run mutating commands.
- Claim a finding is exploitable without evidence. Use confidence levels when evidence is partial.

If the user asks for fixes, respond:

```text
Out of scope for afx-security-audit (read-only audit mode). Use /afx:task code to apply fixes.
```

You may still provide a copy-ready remediation plan or journal entry, but do not write it.

## Audit Workflow

1. **Scope the target**
   - Identify feature, repository, service, API, or component under review.
   - Prefer `docs/specs/{feature}/spec.md`, `design.md`, `tasks.md`, and implementation `@see` anchors when present.
   - State what is in scope and what is explicitly not checked.

2. **Model the system**
   - Identify actors, assets, entry points, data flows, trust boundaries, privileged operations, third-party dependencies, secrets, and persistence layers.
   - Classify sensitive data: credentials, tokens, PII, payment data, tenant data, business-confidential data, logs, telemetry.
   - Record assumptions that need human confirmation.

3. **Threat model**
   - Use the four questions: What are we working on? What can go wrong? What will we do? Did we do enough?
   - Use STRIDE as prompts, not as a rigid taxonomy: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.
   - Include abuse cases and business-logic failure modes, not only code-level bugs.

4. **Review controls**
   - Authentication and session lifecycle.
   - Authorization, object ownership, tenant isolation, deny-by-default behavior.
   - Input validation, output encoding, injection, deserialization, file upload, path traversal.
   - Data protection, cryptography, key management, secret handling, privacy minimization.
   - SSRF/outbound calls, webhooks, redirects, CORS, CSP, browser boundaries.
   - Business logic, replay, race conditions, idempotency, quota/rate limits, abuse prevention.
   - Dependencies, supply chain, lockfiles, build scripts, CI/CD, artifact integrity.
   - Cloud/IaC configuration, IAM, storage buckets, network boundaries, service accounts.
   - Logging, monitoring, audit trails, incident detection, safe error handling.
   - Agent/tooling risks: command execution boundaries, prompt injection, workspace trust, tool allow/deny lists, secret leakage to model context.

5. **Prioritize risk**
   - Score severity from impact plus likelihood, adjusted by exploitability, blast radius, exposure, privileges required, and compensating controls.
   - Use **Critical** only for plausible RCE, auth bypass, credential compromise, broad data exfiltration, or destructive cross-tenant impact.
   - Use **High** for privilege escalation, exploitable injection, stored XSS with account impact, tenant isolation failure, or sensitive data exposure.
   - Use **Medium** for meaningful information disclosure, CSRF/state confusion, weak defaults, missing rate limits, or partial control gaps.
   - Use **Low** for hardening gaps with limited exploitability.

6. **Report with evidence**
   - Every finding needs a path/line, config key, spec reference, or explicit evidence note.
   - If evidence is inferred, label it as inference and include confidence.
   - Prefer fewer high-signal findings over broad generic checklists.

## Finding Format

```markdown
### SEC-{n}: {title}

- **Severity**: Critical / High / Medium / Low
- **Category**: Threat model / OWASP A01-A10 / ASVS / Supply chain / Privacy / Agent tooling
- **Asset / boundary**: {asset, actor, trust boundary, or data flow}
- **Location**: `path/to/file.ts:line` or `path/to/config`
- **Spec reference**: @see docs/specs/{feature}/spec.md [NFR-{n}] or `Not found`
- **Evidence**: {specific observed code/config/spec behavior}
- **Impact**: {what an attacker or failure can cause}
- **Exploit path**: {credible attack path, or "not proven"}
- **Remediation**: {minimal safe change and owner}
- **Verification**: {test/review/check to prove the fix}
- **Confidence**: High / Medium / Low
```

## Report Structure

Use this structure unless the user asks for another format:

```markdown
## Security Audit Summary

- **Scope checked**:
- **Not checked**:
- **Overall risk**: Critical / High / Medium / Low
- **Top risks**:
- **Assumptions / open questions**:

## Architecture and Trust Boundaries

## Findings

| ID | Severity | Area | Location | Summary | Confidence |
| -- | -------- | ---- | -------- | ------- | ---------- |

## Detailed Findings

## Verification Plan

## Residual Risk / Human Decisions
```

## AFX Integration

- Use `@see` references to connect findings to `spec.md`, `design.md`, or `tasks.md` anchors when available.
- If a security requirement is missing, propose the requirement text instead of editing the file.
- Use `/afx:check path` only as a suggested next command for data-flow/traceability investigation; do not run mutating workflows.
- Recommend writing the audit recap to `docs/specs/{feature}/journal.md`, but do not write it in this read-only skill.
- End with a clear handoff: which findings should become tasks, which need human security review, and which are accepted residual risks.

## Output

Always end your response with:

> AFX skill: `afx-security-audit`
