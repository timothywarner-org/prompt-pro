# Demo: Subagent Orchestration in Claude Code

**Law 24 -- Subagent Orchestration**

When a workflow has independent tasks, running them sequentially wastes time. Claude Code's subagent system lets you delegate parallel work streams that execute simultaneously.

## Scenario

Contoso Robotics has a pull request open on their `warehousebot-firmware` repository. The team needs to:

1. Review the PR for security vulnerabilities
2. Generate test cases for the changed modules
3. Update the API documentation to reflect the new endpoints

These three tasks are independent -- none depends on the output of another. Running them in parallel cuts the wall-clock time roughly to that of the longest single task.

## Prerequisites

- Claude Code installed and authenticated
- A local Git repository (use any project you have access to, or clone a sample repo)
- Familiarity with basic Claude Code commands

## Sequential Approach (The Slow Way)

Without subagents, you would run each task one after another:

```bash
# Task 1: Security review (~3 minutes)
claude "Review the open PR for security issues. Check for:
- SQL injection vulnerabilities
- Hardcoded secrets or API keys
- Missing input validation
- Insecure dependency versions
Produce a findings report."

# Task 2: Test generation (~4 minutes)
claude "Generate unit tests for all changed files in the current PR.
Follow existing test patterns. Aim for 80% branch coverage."

# Task 3: Documentation update (~2 minutes)
claude "Update the API documentation in docs/api.md to reflect
the new endpoints added in the current PR. Match the existing format."
```

**Total sequential time: ~9 minutes**

## Parallel Approach with Subagents (The Fast Way)

Claude Code can launch subagents that work in parallel. There are two patterns: the Task tool (from within a Claude Code session) and git worktrees for filesystem isolation.

### Pattern 1: Parallel Task Delegation

From within a Claude Code session, ask Claude to use parallel subagents:

```bash
claude "I need three things done in parallel on the current codebase:

1. SECURITY REVIEW: Audit all changed files in the current branch for
   security vulnerabilities. Check for injection flaws, hardcoded
   secrets, missing validation, and insecure dependencies. Write
   findings to security-report.md.

2. TEST GENERATION: Generate unit tests for every changed module.
   Follow existing test patterns in the __tests__ directory. Target
   80% branch coverage. Write tests to the appropriate test files.

3. DOC UPDATE: Update docs/api.md with the new endpoints introduced
   in this branch. Match the existing documentation style and format.

Run all three tasks simultaneously using subagents."
```

Claude Code will spawn three subagents, each working on its own task. You will see interleaved progress output as they work.

### Pattern 2: Git Worktrees for Filesystem Isolation

When subagents need to modify the same files, use git worktrees to give each agent its own working directory. This prevents merge conflicts during parallel execution.

#### What Are Git Worktrees?

A git worktree lets you check out the same branch (or different branches) into multiple directories simultaneously, all sharing the same `.git` history.

```bash
# Create worktrees for each task
git worktree add ../contoso-security-review HEAD
git worktree add ../contoso-test-generation HEAD
git worktree add ../contoso-doc-update HEAD
```

Each directory is a full checkout. Subagents can work in separate worktrees without stepping on each other.

#### Running Subagents Across Worktrees

```bash
claude "Execute these three tasks in parallel, each in its own git worktree:

1. In ../contoso-security-review: Run a full security audit of the
   changed files. Write findings to security-report.md.

2. In ../contoso-test-generation: Generate unit tests for all changed
   modules. Commit the new test files.

3. In ../contoso-doc-update: Update docs/api.md with new endpoint
   documentation. Commit the changes.

After all three complete, I will merge the results back into the
main worktree."
```

#### Merging Results Back

```bash
# Pull changes from each worktree
cd /path/to/main/repo
git merge --no-ff ../contoso-security-review
git merge --no-ff ../contoso-test-generation
git merge --no-ff ../contoso-doc-update

# Clean up worktrees
git worktree remove ../contoso-security-review
git worktree remove ../contoso-test-generation
git worktree remove ../contoso-doc-update
```

## Timing Comparison

| Approach | Task 1 | Task 2 | Task 3 | Wall Clock |
|----------|--------|--------|--------|------------|
| Sequential | 3 min | 4 min | 2 min | **9 min** |
| Parallel (subagents) | 3 min | 4 min | 2 min | **~4 min** |

The parallel approach finishes in approximately the time of the longest single task, plus a small overhead for subagent coordination.

**Speedup: ~2.25x** in this example. The more independent tasks you have, the greater the benefit.

## When to Use Subagents vs. Sequential

| Use Subagents When | Stay Sequential When |
|--------------------|----------------------|
| Tasks are independent | Task B needs output from Task A |
| Each task takes more than 30 seconds | Tasks are trivial (seconds each) |
| You have 3+ tasks to complete | You have only 1-2 small tasks |
| Tasks touch different files or directories | Tasks modify the same files |
| You want faster wall-clock completion | Order of operations matters for correctness |

## Discussion Questions

1. What happens if two subagents try to edit the same file? How do worktrees solve this?
2. In what real-world development workflows would you apply this pattern?
3. What is the maximum practical number of subagents before coordination overhead outweighs the benefit?
4. How does this pattern relate to CI/CD pipelines that already run jobs in parallel?
