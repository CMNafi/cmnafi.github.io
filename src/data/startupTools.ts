/**
 * Open-source tools for a service startup, grouped by the job they do.
 * Every repository, star count and licence was read from the GitHub search API
 * on the date below. Archived repositories were left out.
 *
 * Licence values:
 *   an SPDX id         -> one open-source licence for the whole repository
 *   'Mixed'            -> more than one licence in the repo, usually an open
 *                         core plus a paid edition
 *   'Source-available' -> the code is public but the licence restricts use
 */
export const startupToolsCheckedOn = '2026-11-11';

export interface StartupTool {
  repo: string;
  name: string;
  kind: string;
  does: string;
  stars: number;
  licence: string;
  /** The paid product people usually reach for instead. */
  insteadOf?: string;
  /** Part of the lean starting set: one tool per job. */
  starter?: boolean;
}

export interface StartupStage {
  id: string;
  title: string;
  job: string;
  tools: StartupTool[];
}

type Row = [repo: string, name: string, kind: string, does: string, stars: number, licence: string, insteadOf?: string, starter?: boolean];

const stage = (id: string, title: string, job: string, rows: Row[]): StartupStage => ({
  id,
  title,
  job,
  tools: rows.map(([repo, name, kind, does, stars, licence, insteadOf, starter]) => ({
    repo, name, kind, does, stars, licence, insteadOf, starter
  }))
});

export const startupStages: StartupStage[] = [
  stage('validate', 'Test the idea', 'Ask people, book the calls, and write down what they say before building anything.', [
    ['calcom/cal.diy', 'Cal.diy', 'Scheduling', 'Booking pages for discovery calls, with calendar sync and round-robin for a team.', 49909, 'MIT', 'Calendly', true],
    ['formbricks/formbricks', 'Formbricks', 'Surveys', 'In-app and link surveys for asking users why they came and why they left.', 13232, 'Mixed', 'Qualtrics'],
    ['heyform/heyform', 'HeyForm', 'Forms', 'Conversational forms for waitlists, intake and lead capture.', 9071, 'AGPL-3.0', 'Typeform'],
    ['getfider/fider', 'Fider', 'Feedback', 'A public board where customers post and vote on what they want next.', 4620, 'AGPL-3.0', 'Canny'],
    ['slidevjs/slidev', 'Slidev', 'Pitch deck', 'Slides written in Markdown, for the pitch and the first sales deck.', 49430, 'MIT']
  ]),

  stage('brand', 'Brand and website', 'Look like a real company: a design file, a site, and somewhere to publish.', [
    ['penpot/penpot', 'Penpot', 'Design', 'Interface and brand design in the browser, with real CSS underneath.', 62266, 'MPL-2.0', 'Figma'],
    ['excalidraw/excalidraw', 'Excalidraw', 'Whiteboard', 'Hand-drawn diagrams for explaining a process to a client in five minutes.', 135469, 'MIT', 'Miro'],
    ['withastro/astro', 'Astro', 'Website', 'A framework for fast content sites: marketing pages, docs and a blog.', 63877, 'MIT', 'Webflow', true],
    ['TryGhost/Ghost', 'Ghost', 'Publishing', 'A blog and newsletter with paid memberships built in.', 55749, 'MIT', 'Substack'],
    ['payloadcms/payload', 'Payload', 'CMS', 'A content backend and admin panel that lives inside a Next.js app.', 45764, 'MIT', 'Contentful'],
    ['strapi/strapi', 'Strapi', 'CMS', 'A headless CMS with an editor that non-technical teammates can use.', 73460, 'Mixed'],
    ['Comfy-Org/ComfyUI', 'ComfyUI', 'Image generation', 'A node-based studio for generating and editing images with open models.', 146212, 'GPL-3.0'],
    ['CapSoftware/Cap', 'Cap', 'Screen recording', 'Record and share a walkthrough video instead of writing a long email.', 24813, 'Mixed', 'Loom']
  ]),

  stage('build', 'Build the product', 'The parts every product needs and nobody wants to write twice.', [
    ['supabase/supabase', 'Supabase', 'Backend', 'Postgres with sign-in, file storage, realtime and an instant API.', 114762, 'Apache-2.0', 'Firebase', true],
    ['appwrite/appwrite', 'Appwrite', 'Backend', 'Sign-in, databases, storage, functions and hosting in one self-hosted package.', 57932, 'BSD-3-Clause', 'Firebase'],
    ['directus/directus', 'Directus', 'Backend', 'Puts an API and an admin app on top of a SQL database you already have.', 38686, 'Source-available'],
    ['hasura/graphql-engine', 'Hasura', 'API', 'Instant GraphQL APIs over your data, with access rules.', 32128, 'Apache-2.0'],
    ['better-auth/better-auth', 'Better Auth', 'Sign-in', 'An authentication library for TypeScript apps that keeps users in your own database.', 30702, 'MIT', 'Auth0'],
    ['keycloak/keycloak', 'Keycloak', 'Sign-in', 'Single sign-on and identity management, for when enterprise clients ask for SSO.', 37810, 'Apache-2.0', 'Okta'],
    ['zitadel/zitadel', 'ZITADEL', 'Sign-in', 'Identity infrastructure with organisations and roles for B2B products.', 15557, 'AGPL-3.0', 'Auth0'],
    ['shadcn-ui/ui', 'shadcn/ui', 'Interface', 'Accessible interface components you copy into your own codebase.', 127854, 'MIT'],
    ['meilisearch/meilisearch', 'Meilisearch', 'Search', 'A fast search API, including hybrid keyword and semantic search.', 59837, 'Mixed', 'Algolia'],
    ['novuhq/novu', 'Novu', 'Notifications', 'One place to send email, SMS, push and in-app notifications.', 40319, 'Mixed'],
    ['Unleash/unleash', 'Unleash', 'Feature flags', 'Switch features on for one customer before everyone gets them.', 14298, 'AGPL-3.0', 'LaunchDarkly'],
    ['growthbook/growthbook', 'GrowthBook', 'Experiments', 'Feature flags and A/B tests that read results from your own warehouse.', 8580, 'Mixed'],
    ['usertour/usertour', 'Usertour', 'Onboarding', 'Product tours and checklists for new users.', 2336, 'Mixed', 'Appcues'],
    ['medusajs/medusa', 'Medusa', 'Commerce', 'A commerce backend for carts, orders and checkout if you sell products too.', 37170, 'Mixed', 'Shopify']
  ]),

  stage('ai', 'The AI layer', 'Run models, give them your documents, let them act, and check their work.', [
    ['ollama/ollama', 'Ollama', 'Run models', 'Run open models on a laptop or one server with a single command.', 186587, 'MIT', undefined, true],
    ['vllm-project/vllm', 'vLLM', 'Serve models', 'A high-throughput inference server for when one model serves many users.', 96694, 'Apache-2.0'],
    ['huggingface/transformers', 'Transformers', 'Model library', 'The standard library for loading and fine-tuning open models.', 168755, 'Apache-2.0'],
    ['BerriAI/litellm', 'LiteLLM', 'Gateway', 'One API in front of 100+ model providers, with keys, budgets and fallbacks.', 63072, 'Mixed'],
    ['open-webui/open-webui', 'Open WebUI', 'Chat interface', 'A private chat interface for your team on top of local or hosted models.', 158330, 'Source-available', 'ChatGPT Team'],
    ['lobehub/lobehub', 'LobeHub', 'Chat interface', 'A team chat workspace for agents across many model providers.', 84904, 'Mixed'],
    ['langgenius/dify', 'Dify', 'Agent builder', 'A visual workspace for building agent workflows and document Q&A.', 160908, 'Mixed'],
    ['langchain-ai/langgraph', 'LangGraph', 'Agent framework', 'Build agents as graphs that can pause, resume and recover.', 44770, 'MIT'],
    ['langchain-ai/langchain', 'LangChain', 'Agent framework', 'The widest set of connectors between models, tools and data.', 149332, 'MIT'],
    ['crewAIInc/crewAI', 'CrewAI', 'Agent framework', 'Give several agents roles and have them work a task together.', 60746, 'MIT'],
    ['microsoft/autogen', 'AutoGen', 'Agent framework', 'Microsoft’s framework for multi-agent applications.', 61777, 'MIT'],
    ['pydantic/pydantic-ai', 'Pydantic AI', 'Agent framework', 'Typed Python agents with structured, validated outputs.', 21130, 'MIT'],
    ['mastra-ai/mastra', 'Mastra', 'Agent framework', 'A TypeScript framework for agents and AI features in a web product.', 29454, 'Mixed'],
    ['modelcontextprotocol/servers', 'MCP servers', 'Tool connections', 'Reference servers that let agents reach files, databases and APIs.', 91917, 'Mixed'],
    ['browser-use/browser-use', 'Browser Use', 'Browser agents', 'Agents that click through websites that have no API.', 120626, 'MIT'],
    ['livekit/agents', 'LiveKit Agents', 'Voice agents', 'Realtime voice agents for phone lines and calls.', 15166, 'Apache-2.0'],
    ['openai/whisper', 'Whisper', 'Speech to text', 'Transcribe calls and meetings.', 112377, 'MIT'],
    ['run-llama/llama_index', 'LlamaIndex', 'Document Q&A', 'Connect your documents to a model so it answers from them.', 52868, 'MIT'],
    ['infiniflow/ragflow', 'RAGFlow', 'Document Q&A', 'A retrieval engine that handles messy PDFs and scanned documents.', 93986, 'Apache-2.0'],
    ['docling-project/docling', 'Docling', 'Document parsing', 'Turn PDFs, Word files and slides into clean text a model can read.', 70404, 'MIT'],
    ['microsoft/markitdown', 'MarkItDown', 'Document parsing', 'Convert office files to Markdown.', 194837, 'MIT'],
    ['firecrawl/firecrawl', 'Firecrawl', 'Web data', 'Turn websites into clean data for agents.', 200576, 'AGPL-3.0'],
    ['unclecode/crawl4ai', 'Crawl4AI', 'Web data', 'A crawler that outputs model-ready Markdown.', 87196, 'Apache-2.0'],
    ['qdrant/qdrant', 'Qdrant', 'Vector search', 'A vector database for semantic search at scale.', 35505, 'Apache-2.0', 'Pinecone'],
    ['chroma-core/chroma', 'Chroma', 'Vector search', 'An embedded vector store that is quick to start with.', 29671, 'Apache-2.0'],
    ['pgvector/pgvector', 'pgvector', 'Vector search', 'Vector search inside the Postgres you already run.', 23646, 'PostgreSQL'],
    ['mem0ai/mem0', 'Mem0', 'Agent memory', 'Lets an agent remember a customer between conversations.', 68775, 'Apache-2.0'],
    ['langfuse/langfuse', 'Langfuse', 'Tracing and evals', 'See every model call, what it cost, and whether the answer was good.', 37271, 'Mixed'],
    ['promptfoo/promptfoo', 'Promptfoo', 'Testing', 'Test prompts and agents before a change ships, including red-team checks.', 27039, 'MIT'],
    ['LibreTranslate/LibreTranslate', 'LibreTranslate', 'Translation', 'A self-hosted machine translation API that works offline.', 17477, 'AGPL-3.0', 'Google Translate API']
  ]),

  stage('automate', 'Automation', 'Connect the tools so the repeat work runs without anyone remembering to do it.', [
    ['n8n-io/n8n', 'n8n', 'Workflows', 'Visual workflows across hundreds of apps, with code and AI steps when you need them.', 210030, 'Source-available', 'Zapier', true],
    ['activepieces/activepieces', 'Activepieces', 'Workflows', 'No-code automation with a large library of connectors, usable by agents too.', 25470, 'Mixed', 'Zapier'],
    ['automatisch/automatisch', 'Automatisch', 'Workflows', 'A simple self-hosted connector between everyday business apps.', 14019, 'Mixed', 'Zapier'],
    ['huginn/huginn', 'Huginn', 'Monitoring agents', 'Agents that watch the web and act when something changes.', 50491, 'MIT', 'IFTTT'],
    ['windmill-labs/windmill', 'Windmill', 'Scripts to workflows', 'Turn scripts into scheduled jobs, workflows and small internal apps.', 18513, 'Mixed'],
    ['kestra-io/kestra', 'Kestra', 'Orchestration', 'Declarative workflows across data, infrastructure and business processes.', 30197, 'Apache-2.0'],
    ['temporalio/temporal', 'Temporal', 'Durable workflows', 'Long-running processes that survive crashes and retries.', 24314, 'MIT'],
    ['triggerdotdev/trigger.dev', 'Trigger.dev', 'Background jobs', 'Durable background jobs and agents written in TypeScript.', 16743, 'Apache-2.0'],
    ['inngest/inngest', 'Inngest', 'Background jobs', 'Event-driven step functions that run on serverless.', 6033, 'Source-available'],
    ['apache/airflow', 'Airflow', 'Data pipelines', 'Schedule and monitor data pipelines written in Python.', 47442, 'Apache-2.0'],
    ['PrefectHQ/prefect', 'Prefect', 'Data pipelines', 'A lighter Python way to build pipelines that recover from failure.', 24148, 'Apache-2.0']
  ]),

  stage('sell', 'Win customers', 'Find people, keep track of them, and see which effort actually worked.', [
    ['twentyhq/twenty', 'Twenty', 'CRM', 'A modern CRM for contacts, companies and deals.', 60754, 'Mixed', 'Salesforce', true],
    ['SuiteCRM/SuiteCRM', 'SuiteCRM', 'CRM', 'A long-established full CRM with sales, marketing and service modules.', 5857, 'AGPL-3.0', 'Salesforce'],
    ['espocrm/espocrm', 'EspoCRM', 'CRM', 'A lightweight CRM that is easy to customise.', 3573, 'AGPL-3.0'],
    ['frappe/crm', 'Frappe CRM', 'CRM', 'A sales pipeline that plugs into ERPNext.', 3947, 'AGPL-3.0'],
    ['monicahq/monica', 'Monica', 'Relationships', 'A personal CRM for remembering the people you meet.', 25761, 'AGPL-3.0'],
    ['mautic/mautic', 'Mautic', 'Marketing automation', 'Email sequences, lead scoring and landing pages.', 10964, 'GPL-3.0', 'HubSpot'],
    ['knadh/listmonk', 'listmonk', 'Newsletter', 'A fast newsletter and mailing list manager in a single binary.', 24247, 'AGPL-3.0', 'Mailchimp'],
    ['useplunk/plunk', 'Plunk', 'Email', 'Transactional and marketing email from one platform.', 5597, 'AGPL-3.0'],
    ['usesend/useSend', 'useSend', 'Email sending', 'A self-hosted email sending service with an API.', 4796, 'AGPL-3.0', 'SendGrid'],
    ['postalserver/postal', 'Postal', 'Mail delivery', 'A mail delivery platform for incoming and outgoing email.', 16947, 'MIT', 'Mailgun'],
    ['resend/react-email', 'React Email', 'Email templates', 'Build email templates as components.', 19922, 'MIT'],
    ['gitroomhq/postiz-app', 'Postiz', 'Social', 'Schedule posts across social networks.', 41296, 'AGPL-3.0', 'Buffer'],
    ['dubinc/dub.link', 'Dub', 'Links', 'Short links with attribution, so you know which post brought the lead.', 25151, 'Mixed', 'Bitly'],
    ['PostHog/posthog', 'PostHog', 'Product analytics', 'Product analytics, session replay, feature flags and surveys.', 40734, 'Mixed', 'Mixpanel'],
    ['plausible/analytics', 'Plausible', 'Web analytics', 'Simple, cookie-free website analytics.', 29815, 'AGPL-3.0', 'Google Analytics'],
    ['umami-software/umami', 'Umami', 'Web analytics', 'Privacy-first web and product analytics.', 40045, 'MIT', 'Google Analytics'],
    ['matomo-org/matomo', 'Matomo', 'Web analytics', 'Full web analytics with your data kept on your own server.', 22023, 'GPL-3.0', 'Google Analytics']
  ]),

  stage('serve', 'Serve customers', 'Answer them, sign the paperwork, and fix their problem without a site visit.', [
    ['chatwoot/chatwoot', 'Chatwoot', 'Support inbox', 'Live chat, email and social messages in one shared inbox.', 39591, 'Mixed', 'Intercom', true],
    ['zammad/zammad', 'Zammad', 'Helpdesk', 'A ticketing helpdesk for email, phone and chat.', 6101, 'AGPL-3.0', 'Zendesk'],
    ['freescout-help-desk/freescout', 'FreeScout', 'Shared mailbox', 'A lightweight shared mailbox and helpdesk.', 4656, 'AGPL-3.0', 'Help Scout'],
    ['baptisteArno/typebot.io', 'Typebot', 'Chatbots', 'Build chatbots and conversational flows visually.', 10618, 'Source-available'],
    ['botpress/botpress', 'Botpress', 'Chatbots', 'Build and deploy AI support agents.', 14992, 'MIT'],
    ['docusealco/docuseal', 'DocuSeal', 'E-signature', 'Create, fill and sign contracts and statements of work.', 19038, 'AGPL-3.0', 'DocuSign'],
    ['documenso/documenso', 'Documenso', 'E-signature', 'Document signing with a clean signer experience.', 15717, 'AGPL-3.0', 'DocuSign'],
    ['rustdesk/rustdesk', 'RustDesk', 'Remote support', 'Remote desktop for fixing a client’s machine from yours.', 128948, 'AGPL-3.0', 'TeamViewer'],
    ['openstatusHQ/openstatus', 'OpenStatus', 'Status page', 'A public status page with uptime checks and incident updates.', 9260, 'AGPL-3.0', 'Statuspage']
  ]),

  stage('deliver', 'Run the work', 'For a service business, delivery is the product: tasks, notes, time and conversation.', [
    ['makeplane/plane', 'Plane', 'Projects', 'Issues, sprints and roadmaps for client and internal work.', 62274, 'AGPL-3.0', 'Jira', true],
    ['opf/openproject', 'OpenProject', 'Projects', 'Classic project management with Gantt charts and budgets.', 17241, 'GPL-3.0', 'MS Project'],
    ['kimai/kimai', 'Kimai', 'Time tracking', 'Track billable hours by client and project.', 5148, 'AGPL-3.0', 'Harvest'],
    ['AppFlowy-IO/AppFlowy', 'AppFlowy', 'Workspace', 'Docs, wikis and task boards in one workspace.', 78671, 'AGPL-3.0', 'Notion'],
    ['toeverything/AFFiNE', 'AFFiNE', 'Workspace', 'Docs and whiteboards on one canvas.', 74430, 'Mixed', 'Notion'],
    ['outline/outline', 'Outline', 'Knowledge base', 'A fast team wiki for playbooks and runbooks.', 41224, 'Source-available', 'Confluence'],
    ['docmost/docmost', 'Docmost', 'Knowledge base', 'A collaborative wiki and documentation tool.', 22295, 'AGPL-3.0', 'Confluence'],
    ['nocodb/nocodb', 'NocoDB', 'Tables', 'Spreadsheet-style views on top of a real database.', 65490, 'Mixed', 'Airtable'],
    ['baserow/baserow', 'Baserow', 'Tables', 'No-code databases, with automations and small apps.', 6313, 'Mixed', 'Airtable'],
    ['mattermost/mattermost', 'Mattermost', 'Team chat', 'Team messaging you can host yourself.', 39575, 'Mixed', 'Slack'],
    ['zulip/zulip', 'Zulip', 'Team chat', 'Chat organised by topic, which suits teams that are not online at the same time.', 26204, 'Apache-2.0', 'Slack'],
    ['RocketChat/Rocket.Chat', 'Rocket.Chat', 'Team chat', 'Team and customer messaging on one platform.', 46387, 'Mixed', 'Slack'],
    ['jitsi/jitsi-meet', 'Jitsi Meet', 'Video calls', 'Video meetings that need no account to join.', 30217, 'Apache-2.0', 'Zoom'],
    ['nextcloud/server', 'Nextcloud', 'Files', 'File sharing, calendars and office documents on your own server.', 37473, 'AGPL-3.0', 'Google Drive'],
    ['paperless-ngx/paperless-ngx', 'Paperless-ngx', 'Documents', 'Scan, index and search every contract and receipt.', 47991, 'GPL-3.0'],
    ['stalwartlabs/stalwart', 'Stalwart', 'Mail server', 'An all-in-one mail and calendar server.', 15844, 'Mixed', 'Google Workspace']
  ]),

  stage('money', 'Money', 'Send the invoice, collect the payment, close the books.', [
    ['invoiceninja/invoiceninja', 'Invoice Ninja', 'Invoicing', 'Quotes, invoices, payments and time tracking for client work.', 10562, 'Source-available', 'FreshBooks', true],
    ['getlago/lago', 'Lago', 'Usage billing', 'Metering and usage-based billing for subscription and AI products.', 10794, 'AGPL-3.0', 'Chargebee'],
    ['killbill/killbill', 'Kill Bill', 'Subscriptions', 'A subscription billing and payments platform.', 5851, 'Apache-2.0'],
    ['polarsource/polar', 'Polar', 'Payments', 'Billing and checkout for software products.', 10468, 'Apache-2.0'],
    ['bigcapitalhq/bigcapital', 'Bigcapital', 'Accounting', 'Double-entry accounting with financial reports.', 4106, 'AGPL-3.0', 'QuickBooks'],
    ['akaunting/akaunting', 'Akaunting', 'Accounting', 'Online accounting for small businesses.', 10299, 'Source-available', 'Xero'],
    ['frappe/erpnext', 'ERPNext', 'ERP', 'Accounting, inventory, projects and payroll in one system.', 41166, 'GPL-3.0', 'NetSuite'],
    ['odoo/odoo', 'Odoo', 'ERP', 'A suite of business apps, from CRM to accounting.', 55703, 'LGPL-3.0'],
    ['captableinc/captable', 'Captable', 'Cap table', 'Track who owns what. Its last update was in June 2025.', 830, 'AGPL-3.0', 'Carta']
  ]),

  stage('people', 'People', 'Hire the next person and pay everyone correctly.', [
    ['frappe/hrms', 'Frappe HR', 'HR and payroll', 'Leave, attendance, expenses and payroll.', 9039, 'GPL-3.0', 'BambooHR'],
    ['orangehrm/orangehrm', 'OrangeHRM', 'HR', 'Employee records, leave and performance reviews.', 1161, 'GPL-3.0'],
    ['opencats/OpenCATS', 'OpenCATS', 'Hiring', 'An applicant tracking system for hiring teams and staffing agencies.', 781, 'Mixed', 'Greenhouse']
  ]),

  stage('data', 'Data and internal tools', 'Answer your own questions and build the back-office screens.', [
    ['metabase/metabase', 'Metabase', 'Dashboards', 'Dashboards that people who do not write SQL can build.', 50269, 'Mixed', 'Tableau', true],
    ['apache/superset', 'Superset', 'Dashboards', 'Data exploration and visualisation at scale.', 75469, 'Apache-2.0', 'Tableau'],
    ['evidence-dev/evidence', 'Evidence', 'Reports', 'Reports written in SQL and Markdown.', 7103, 'MIT'],
    ['grafana/grafana', 'Grafana', 'Dashboards', 'Dashboards for metrics, logs and traces.', 77824, 'AGPL-3.0'],
    ['duckdb/duckdb', 'DuckDB', 'Analytics database', 'An analytical database that runs inside a file, with no server.', 42976, 'MIT'],
    ['airbytehq/airbyte', 'Airbyte', 'Data movement', 'Copy data from apps and databases into one place.', 22354, 'Source-available', 'Fivetran'],
    ['dbt-labs/dbt', 'dbt', 'Data modelling', 'Turn raw tables into tested, documented models.', 14142, 'Apache-2.0'],
    ['appsmithorg/appsmith', 'Appsmith', 'Internal tools', 'Build admin panels and internal dashboards.', 41218, 'Apache-2.0', 'Retool'],
    ['ToolJet/ToolJet', 'ToolJet', 'Internal tools', 'Low-code internal apps on top of your data.', 41218, 'AGPL-3.0', 'Retool'],
    ['Budibase/budibase', 'Budibase', 'Internal tools', 'Forms, approval flows and small operations apps.', 28398, 'Mixed', 'Retool']
  ]),

  stage('ship', 'Ship and run it', 'Put it on a server, keep it up, and know when it breaks.', [
    ['coollabsio/coolify', 'Coolify', 'Hosting', 'Deploy apps and databases to your own server with a click.', 65911, 'Apache-2.0', 'Heroku', true],
    ['Dokploy/dokploy', 'Dokploy', 'Hosting', 'A self-hosted deployment platform for apps and databases.', 38403, 'Mixed', 'Vercel'],
    ['dokku/dokku', 'Dokku', 'Hosting', 'A small platform-as-a-service on a single server.', 32223, 'MIT', 'Heroku'],
    ['caddyserver/caddy', 'Caddy', 'Web server', 'A web server that sets up HTTPS on its own.', 78953, 'Apache-2.0'],
    ['traefik/traefik', 'Traefik', 'Proxy', 'A reverse proxy that discovers your containers.', 65516, 'MIT'],
    ['opentofu/opentofu', 'OpenTofu', 'Infrastructure', 'Describe cloud infrastructure as code.', 30789, 'MPL-2.0', 'Terraform'],
    ['go-gitea/gitea', 'Gitea', 'Code hosting', 'Self-hosted Git with code review and CI.', 59016, 'MIT', 'GitHub'],
    ['woodpecker-ci/woodpecker', 'Woodpecker', 'CI/CD', 'A simple build and deploy engine.', 8157, 'Apache-2.0'],
    ['louislam/uptime-kuma', 'Uptime Kuma', 'Uptime', 'Uptime monitoring with alerts.', 93473, 'MIT', 'Pingdom'],
    ['getsentry/sentry', 'Sentry', 'Errors', 'Error tracking and performance monitoring.', 45747, 'Source-available'],
    ['SigNoz/signoz', 'SigNoz', 'Observability', 'Logs, metrics and traces in one place.', 32578, 'Mixed', 'Datadog'],
    ['prometheus/prometheus', 'Prometheus', 'Metrics', 'Metrics collection and alerting.', 67624, 'Apache-2.0'],
    ['seaweedfs/seaweedfs', 'SeaweedFS', 'File storage', 'S3-compatible object and file storage.', 36012, 'Apache-2.0', 'Amazon S3'],
    ['rustfs/rustfs', 'RustFS', 'File storage', 'S3-compatible object storage.', 35945, 'Apache-2.0', 'Amazon S3'],
    ['restic/restic', 'restic', 'Backups', 'Fast, encrypted backups.', 37140, 'BSD-2-Clause']
  ]),

  stage('secure', 'Security and compliance', 'The questions a client’s security team will ask before they sign.', [
    ['dani-garcia/vaultwarden', 'Vaultwarden', 'Passwords', 'A Bitwarden-compatible password server for the team.', 70545, 'AGPL-3.0', '1Password', true],
    ['Infisical/infisical', 'Infisical', 'Secrets', 'Keep API keys and certificates out of code and chat.', 30406, 'Mixed'],
    ['openbao/openbao', 'OpenBao', 'Secrets', 'Store and distribute secrets and certificates.', 8973, 'MPL-2.0', 'HashiCorp Vault'],
    ['authelia/authelia', 'Authelia', 'Access', 'Single sign-on and two-factor in front of internal apps.', 29621, 'Apache-2.0'],
    ['netbirdio/netbird', 'NetBird', 'Private network', 'A zero-trust private network between people and machines.', 30878, 'Mixed'],
    ['juanfont/headscale', 'Headscale', 'Private network', 'A self-hosted control server for Tailscale clients.', 45565, 'BSD-3-Clause'],
    ['aquasecurity/trivy', 'Trivy', 'Scanning', 'Find vulnerabilities and misconfigurations in containers and code.', 39215, 'Apache-2.0'],
    ['gitleaks/gitleaks', 'Gitleaks', 'Scanning', 'Catch secrets before they reach a repository.', 30886, 'MIT'],
    ['wazuh/wazuh', 'Wazuh', 'Threat detection', 'Security monitoring for endpoints and cloud workloads.', 17660, 'GPL-2.0'],
    ['trycompai/comp', 'Comp AI', 'Compliance', 'Work toward SOC 2 and ISO 27001 with tracked controls and evidence.', 2089, 'AGPL-3.0', 'Vanta']
  ])
];

export type LicenceClass = 'open' | 'mixed' | 'restricted';

export const licenceClass = (licence: string): LicenceClass =>
  licence === 'Mixed' ? 'mixed' : licence === 'Source-available' ? 'restricted' : 'open';
