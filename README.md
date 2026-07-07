# SettleMate Workspace

Merchant settlement and reconciliation service.

Repos:
- `settlemate-workspace`: parent workspace and submodule root.
- `settlemate-fe`: Expo app, `ky` API client.
- `settlemate-be`: Kotlin Spring REST API.

Architecture:
- MySQL: settlement ledger.
- Redis: merchant payout cache.
- RabbitMQ: payout/reconcile events.
- GitHub Actions + ArgoCD: CI and GitOps deployment.
- Datadog, Grafana, Sentry: logs, metrics, errors.

Resume bullets:
- Built settlement reconciliation API that holds anomalous refund spikes.
- Modeled payout workflow with event-driven settlement boundaries.
- Maintained public multi-repo Git submodule workspace with org origin and personal mirror.

Run:
- `docker compose up -d`
- `cd settlemate-be && ./gradlew test`
- `cd settlemate-fe && npm install && npm run typecheck`
SettleMate git submodule workspace
