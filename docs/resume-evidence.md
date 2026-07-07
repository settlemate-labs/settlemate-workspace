# settlemate Resume Evidence

Service summary:
- Kotlin Spring settlement reconciliation.

Repository evidence:
- Origin workspace: https://github.com/settlemate-labs/settlemate-workspace
- Frontend repo: https://github.com/settlemate-labs/settlemate-fe
- Backend repo: https://github.com/settlemate-labs/settlemate-be
- Personal mirror: https://github.com/cyjoon68/settlemate-workspace

Implementation evidence:
- Frontend: Expo Router, feature-layer API via `ky`, Unistyles UI.
- Backend: domain API contract in `settlemate-be/openapi.yaml`.
- Data: `settlement_runs` MySQL migration plus Redis merchant-risk cache.
- Infra: Dockerfile, GitHub Actions, ArgoCD, Kubernetes, Grafana dashboard stub.
- Ops: MySQL, Redis, RabbitMQ, Datadog-style logging/telemetry, Sentry env boundary.

Interview proof:
- API: `POST /api/settlements`, `GET /api/dashboard`.
- Domain rule: high refund-rate settlement runs are held for manual review.
- Async boundary: settlement results publish to RabbitMQ and merchant risk is cached in Redis.
- Production angle: separate FE/BE repos, workspace submodules, GitOps manifest, CI rule gates.

Resume bullets:
- Implemented Kotlin Spring settlement reconciliation with explicit API contract and data schema.
- Built public multi-repo Git submodule workspace with org origin and personal mirror.
- Added CI, Docker, GitOps, observability, and dependency-light self-check gates.

Verification:
- `node scripts/self-check.mjs`
- `cd settlemate-fe && npm run self-check`
- backend self-check in `settlemate-be/scripts`
