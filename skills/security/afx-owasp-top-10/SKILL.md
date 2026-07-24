---
name: afx-owasp-top-10
description: Perform a read-only OWASP Top 10 security review of application code, APIs, routes, forms, auth flows, data access, configs, dependencies, and browser/server boundaries. Use for focused vulnerability review, endpoint security checks, OWASP category classification, severity triage, and remediation guidance tied to code/spec evidence.
license: MIT
metadata:
  afx-owner: "@rix"
  afx-tags: "security,owasp,vulnerability,code-review,appsec"
---

# AFX OWASP Top 10

Focused read-only application security review using OWASP Top 10 categories. This is an awareness and triage pass, not a full penetration test or complete ASVS verification.

## Execution Contract

### Allowed

- Read, list, and search workspace files.
- Inspect routes, handlers, UI forms, schemas, auth/session code, data access, configs, dependency manifests, lockfiles, and tests.
- Classify credible findings by OWASP category, severity, evidence, remediation, and verification.

### Forbidden

- Create, modify, or delete files.
- Add `FIXME`, change code, update journals, install packages, run migrations, deploy, or run mutating commands.
- Report generic checklist items as findings without evidence from this codebase.

If the user asks for fixes, respond:

```text
Out of scope for afx-owasp-top-10 (read-only audit mode). Use /afx-task code to apply fixes.
```

You may still provide copy-ready patch guidance or test cases, but do not write them.

## Review Workflow

1. **Scope**
   - Identify target files, endpoints, packages, and data flows.
   - Prefer code tied to AFX spec/design/task anchors when present.
   - State any missing evidence, uninspected runtime behavior, or unavailable dependency scan.

2. **Map attack surface**
   - Entry points: HTTP routes, RPC, CLI commands, webviews, webhooks, background jobs, file import/export, model/tool calls.
   - Trust boundaries: browser/server, user/admin, tenant/workspace, local/external provider, model/tool, public/private network.
   - Sensitive data: credentials, tokens, PII, tenant data, secrets, logs, telemetry.

3. **Check each OWASP category**
   - Review all categories below. If a category is not applicable, say why.
   - Produce findings only when evidence supports them.

4. **Prioritize**
   - Severity = impact + likelihood + exploitability + blast radius - compensating controls.
   - Include confidence: High, Medium, Low.

5. **Report**
   - Lead with top risks and exact locations.
   - Include remediation and verification for every finding.

## OWASP Top 10 Review Lenses

Use OWASP Top 10:2021 category names unless the user asks for another release.

1. **A01 Broken Access Control**
   - Missing authorization on routes/actions.
   - IDOR/object ownership gaps.
   - Tenant/workspace boundary bypass.
   - Client-side-only access checks.
   - Unsafe direct file/path access.

2. **A02 Cryptographic Failures**
   - Secrets committed or logged.
   - Tokens stored unsafely or sent to model/tool context.
   - Missing TLS assumptions, weak randomness, homegrown crypto.
   - Sensitive data stored without appropriate protection.

3. **A03 Injection**
   - SQL/NoSQL/ORM query construction from untrusted input.
   - OS command, shell, template, LDAP, XPath, prompt/tool injection.
   - Unsafe deserialization or dynamic evaluation.
   - Missing contextual output encoding.

4. **A04 Insecure Design**
   - Missing threat model for sensitive flows.
   - Business-logic abuse: skipped steps, replay, negative amounts, race conditions, quota bypass.
   - No rate limit/abuse control on expensive or sensitive operations.
   - Unsafe trust of model output, webhooks, or third-party callbacks.

5. **A05 Security Misconfiguration**
   - Debug/verbose errors in production paths.
   - Overbroad CORS/CSP, missing security headers, unsafe defaults.
   - Excessive permissions in configs, IAM, service accounts, containers, CI.
   - Public storage or admin surfaces exposed by default.

6. **A06 Vulnerable and Outdated Components**
   - Known-vulnerable dependencies, stale lockfiles, unpinned critical tooling.
   - Risky install/build scripts.
   - Abandoned libraries in auth, crypto, parsing, markdown/HTML, file handling.
   - Missing update or vulnerability-response path.

7. **A07 Identification and Authentication Failures**
   - Weak session/token lifecycle, no expiry/rotation/revocation.
   - Auth bypass on alternate routes or providers.
   - Missing MFA/step-up for high-risk actions when required.
   - Password reset, OAuth, device-code, or callback weaknesses.

8. **A08 Software and Data Integrity Failures**
   - Unsigned/unverified updates, plugins, packages, or generated artifacts.
   - CI/CD trust gaps, unreviewed workflow permissions, unsafe artifact promotion.
   - Trusting unvalidated serialized data, model output, or external skill/tool manifests.

9. **A09 Security Logging and Monitoring Failures**
   - Missing audit logs for sensitive operations.
   - Credentials/PII in logs.
   - No alertable signal for auth failures, privilege changes, destructive actions, or suspicious automation.
   - Logs can be tampered with or lack correlation IDs.

10. **A10 Server-Side Request Forgery (SSRF)**
    - User-controlled URLs fetched server-side.
    - Missing allowlist for webhooks, previewers, importers, image fetches, proxies, or model/tool connectors.
    - Internal network, metadata service, localhost, file, or private IP access not blocked.
    - Redirect chains not revalidated.

## Finding Format

```markdown
### OWASP-{n}: {title}

- **Category**: A01-A10 {name}
- **Severity**: Critical / High / Medium / Low
- **Location**: `path/to/file.ts:line`
- **Spec reference**: @see docs/specs/{feature}/spec.md [NFR-{n}] or `Not found`
- **Evidence**: {specific code/config behavior}
- **Impact**: {security consequence}
- **Remediation**: {minimal safe fix}
- **Verification**: {unit/e2e/security test or review step}
- **Confidence**: High / Medium / Low
```

## Output Structure

Use this structure unless the user asks for another format:

```markdown
## OWASP Top 10 Review Summary

- **Scope checked**:
- **Not checked**:
- **Overall risk**:
- **Top findings**:

## Category Coverage

| Category | Status | Evidence / reason |
| -------- | ------ | ----------------- |

## Findings

## Remediation Plan

## Verification Plan
```

## AFX Integration

- Link findings to `spec.md`, `design.md`, or `tasks.md` with `@see` anchors where available.
- If a missing requirement caused the issue, propose the NFR/security requirement text instead of editing the spec.
- Use `/afx-security-audit` for broader architecture, privacy, dependency, cloud, or agent/tool threat modeling.
- Use `/afx-check path` only as a suggested next command for traceability/data-flow inspection; do not run mutating workflows.

## Output

Always end your response with:

> AFX skill: `afx-owasp-top-10`
