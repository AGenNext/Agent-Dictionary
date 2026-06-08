# Agent Dictionary

**Agent Dictionary** is the canonical vocabulary of an agentic operating system.

It defines the words, meanings, boundaries, and relationships that agents, humans, tools, policies, and systems must use consistently.

It is not just a glossary. It is a **governed semantic contract**.

```txt
Agent Dictionary =
  Terms
+ Definitions
+ Aliases
+ Boundaries
+ Relationships
+ Examples
+ Schemas
+ Conformance Rules
```

## Definition

An **Agent Dictionary** defines the canonical language of the operator fabric.

It tells the system:

1. what each term means
2. what each term does not mean
3. which terms are aliases or deprecated names
4. how terms relate to each other
5. which objects have machine-readable schemas
6. which terms are normative and must be used consistently
7. how ambiguity is resolved
8. how new terms are introduced, reviewed, and retired

## Canonical Terms

| Term | Meaning |
|---|---|
| Agent Constitution | Invariant governing layer defining what may never be violated. |
| Agent Mission | Purpose layer defining why an agent system exists. |
| Agent Contract | Authority layer defining who may do what, for whom, under which obligations. |
| Agent Policy | Executable governance rule that permits, denies, holds, escalates, or reconciles action. |
| Agent Intent | Directional expression before it becomes a bounded command. |
| Agent Command | Governed executable request that binds intent to action. |
| Agent Decision | Audit-ready record of why an action was approved, rejected, held, escalated, or reconciled. |
| Agent Event | Observable state transition emitted by the system. |
| Agent Evidence | Verifiable proof object supporting a claim, event, decision, or state. |
| Agent State | Evidence-backed representation of what currently exists. |
| Agent Reconciliation | Control loop that resolves drift between desired and actual state. |
| Agent Ontology | Relationship model connecting all canonical agent concepts. |
| Agent Dictionary | Canonical vocabulary governing names, meanings, aliases, and usage. |

## Canonical Relationship

```txt
Agent Dictionary
        ↓ defines terms for
Agent Ontology
        ↓ relates
Agent Constitution
        ↓ governs
Agent Mission
        ↓ gives purpose to
Agent Contract
        ↓ grants authority to
Agent Policy
        ↓ evaluates
Agent Intent
        ↓ becomes
Agent Command
        ↓ produces
Agent Decision
        ↓ permits or blocks
Agent Event
        ↓ requires
Agent Evidence
        ↓ supports
Agent State
        ↓ feeds
Agent Reconciliation
        ↓ restores
Trusted State
```

## Canonical Shape

```json
{
  "kind": "AgentDictionary",
  "version": "0.1.0",
  "id": "dictionary_001",
  "name": "Agent Operator Dictionary",
  "terms": [
    {
      "term": "Agent Command",
      "canonical_name": "AgentCommand",
      "definition": "The governed executable request that binds intent to action.",
      "role": "request",
      "aliases": ["command", "operator command"],
      "not": ["free-form prompt", "unbounded instruction"],
      "related_terms": ["AgentIntent", "AgentDecision", "AgentPolicy"],
      "status": "active"
    },
    {
      "term": "Agent Evidence",
      "canonical_name": "AgentEvidence",
      "definition": "The governed proof object that turns claims, events, and decisions into verifiable operational facts.",
      "role": "proof",
      "aliases": ["proof object", "evidence record"],
      "not": ["plain attachment", "unsupported claim"],
      "related_terms": ["AgentEvent", "AgentDecision", "AgentState"],
      "status": "active"
    }
  ]
}
```

## Term Lifecycle

```txt
draft       = proposed term, not yet normative
active      = canonical term in current use
deprecated  = term should not be used for new artifacts
retired     = term is no longer part of the model
reserved    = term is protected for future use
disputed    = term requires governance review
```

## Naming Rules

1. Canonical object names use PascalCase in schemas: `AgentCommand`.
2. Human-readable names use title case: `Agent Command`.
3. Repository names use kebab case: `Agent-Command`.
4. File names use kebab case: `agent-command.md`.
5. Machine event names use dot notation: `agent.command.accepted`.
6. Deprecated aliases must point to an active canonical term.
7. No term may be trusted without a definition, boundary, and relationship.

## Conformance Rules

A conformant dictionary must satisfy these rules:

1. Every canonical term must have a definition.
2. Every canonical term must declare its role.
3. Every canonical term must declare at least one relationship.
4. Every deprecated term must point to a replacement.
5. Every machine-readable concept must have a canonical name.
6. No two active terms may define the same meaning without alias relationship.
7. No term may conflict with the Agent Constitution.
8. No term may be used in policy without being defined.
9. No schema kind may exist without a dictionary entry.
10. No public artifact may introduce a new canonical term without dictionary update.

## Final Definition

**Agent Dictionary is the governed semantic contract that keeps agent systems, humans, tools, policies, and repositories speaking the same operational language.**
