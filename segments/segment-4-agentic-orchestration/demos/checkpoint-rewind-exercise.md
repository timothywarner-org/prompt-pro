# Demo: Checkpoint and Rewind Exercise

**Law 25 -- Checkpoint Before Consequence**

Before any operation that could break your codebase, create a rewind point. Claude Code checkpoints automatically before changes, and you can roll back instantly when something goes wrong.

## Scenario

Contoso Robotics has a Node.js API service (`warehousebot-api`) that powers the WarehouseBot Pro dashboard. The service has a monolithic `routes.js` file with 1,200 lines covering all endpoints. Maria Chen's engineering lead wants to refactor it into modular route files -- but the refactor is risky because the file handles authentication middleware, error handling, and database connections in tightly coupled ways.

You will use Claude Code to attempt the refactor, observe it break something, and rewind to the checkpoint.

## Prerequisites

- Claude Code installed and authenticated
- A local Git repository with at least a few source files (any project works; the commands below use a representative example)

## Step 1: Understand the Starting State

Open Claude Code in your project directory and examine the current state:

```
$ claude
> What is the current structure of this project? List all source files and their line counts.
```

Expected output (representative):

```
Project structure:
  src/
    routes.js        (1,247 lines)
    database.js      (89 lines)
    middleware.js     (134 lines)
    server.js         (42 lines)
  tests/
    routes.test.js   (312 lines)
  package.json
```

## Step 2: Confirm Checkpoints Are Working

Claude Code creates checkpoints automatically before making changes. You can verify this:

```
> Show me the current checkpoint status.
```

You should see confirmation that checkpoint tracking is active. Every file modification Claude makes will have a restore point.

## Step 3: Attempt the Risky Refactor

Now ask Claude Code to perform the large refactor:

```
> Refactor src/routes.js into separate route modules:
> - src/routes/auth.js (authentication endpoints)
> - src/routes/inventory.js (inventory management endpoints)
> - src/routes/telemetry.js (robot telemetry endpoints)
> - src/routes/health.js (health check endpoints)
>
> Update src/server.js to import and mount each route module.
> Preserve all existing middleware and error handling behavior.
> Delete the original src/routes.js when done.
```

Claude Code will begin making changes across multiple files. Watch the output as it:

1. Creates the new route modules
2. Moves endpoint handlers into each module
3. Updates imports in `server.js`
4. Deletes the original `routes.js`

## Step 4: Discover the Problem

After the refactor completes, run the test suite:

```
> Run the test suite and show me the results.
```

Expected output (representative):

```
FAIL tests/routes.test.js
  - Authentication middleware not applied to inventory routes (FAILED)
  - Database connection pool shared incorrectly across modules (FAILED)
  - Error handler middleware order changed (FAILED)

Tests: 8 failed, 14 passed, 22 total
```

The refactor broke the middleware chain. The original monolithic file had implicit ordering guarantees that the split modules lost.

## Step 5: Rewind to the Checkpoint

Rather than trying to debug the broken refactor, rewind to the last known good state:

**Option A -- Keyboard shortcut:**

Press `Esc` twice quickly (`Esc Esc`). Claude Code will show you the available checkpoints and let you pick one to restore.

**Option B -- The /rewind command:**

```
> /rewind
```

Claude Code will display a list of recent checkpoints:

```
Available checkpoints:
  [1] Before refactoring src/routes.js (3 minutes ago)
  [2] Before editing src/server.js (2 minutes ago)
  [3] Before deleting src/routes.js (1 minute ago)

Rewind to checkpoint [1/2/3]:
```

Select checkpoint 1 to restore the codebase to its state before any refactoring began.

## Step 6: Verify the Rewind

Confirm the codebase is back to its original state:

```
> Run the test suite again to confirm everything passes.
```

Expected output:

```
PASS tests/routes.test.js

Tests: 22 passed, 22 total
```

The codebase is exactly where it was before the refactor attempt. No work was lost, no manual `git reset` was needed.

## Step 7: Retry with a Safer Approach

Now try the refactor again, but this time ask Claude Code to preserve the middleware chain:

```
> Let's try the refactor again, but this time:
> 1. Keep the middleware registration in server.js (do not move it into route modules)
> 2. Extract only the route handler functions into separate modules
> 3. Run tests after each file change, not just at the end
> 4. Stop immediately if any test fails
>
> This is an incremental refactor -- move one route group at a time.
```

This approach uses checkpoints as a safety net while making smaller, testable changes.

## Key Takeaways

| Principle | Application |
|-----------|-------------|
| Checkpoint before consequence | Claude Code auto-checkpoints, but you can also manually mark safe points |
| Fail fast, rewind faster | A broken refactor costs seconds to undo, not hours |
| Incremental over monolithic | Smaller changes with intermediate tests catch problems earlier |
| Safety enables ambition | Knowing you can rewind makes you willing to try bolder refactors |

## Discussion Questions

1. How does checkpoint/rewind compare to using `git stash` or `git reset --hard`? What are the advantages?
2. In what scenarios would you prefer a manual checkpoint over relying on auto-checkpoints?
3. Law 25 says "checkpoint before consequence." What other development tools provide similar safety nets (database migrations, infrastructure-as-code, etc.)?
4. How would you explain this workflow to a developer who is hesitant to let an AI agent modify their code?
