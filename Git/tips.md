

git config --global user.email "bhusalhari89@gmail.com"
git config --global user.name "haribhusal"



Here’s a list of **basic Git commands**, each explained with **examples** and **real-world use cases**. This is essential for any developer to manage code effectively in projects.

---

## 🔧 1. `git init`

### ➤ **What it does:**

Initializes a new Git repository in the current directory.

### 🔹 Example:

```bash
git init
```

### ✅ Use Case:

You just started a new project folder and want to track its changes with Git.

---

## 🔧 2. `git clone`

### ➤ **What it does:**

Copies (clones) an existing Git repository from a remote server (e.g., GitHub).

### 🔹 Example:

```bash
git clone https://github.com/user/repo.git
```

### ✅ Use Case:

You want to contribute to an existing project or start working on it locally.

---

## 🔧 3. `git status`

### ➤ **What it does:**

Shows the current state of the working directory and staging area.

### 🔹 Example:

```bash
git status
```

### ✅ Use Case:

Check which files are modified, added, or deleted before committing.

---

## 🔧 4. `git add`

### ➤ **What it does:**

Adds file changes to the **staging area** to be committed.

### 🔹 Example:

```bash
git add index.html
```

```bash
git add .         # Adds all changed files
```

### ✅ Use Case:

After editing files, use this to prepare them for the next commit.

---

## 🔧 5. `git commit`

### ➤ **What it does:**

Records a snapshot of the staged changes in the repo’s history.

### 🔹 Example:

```bash
git commit -m "Add login form UI"
```

### ✅ Use Case:

Save your work and give a message to describe what was done.

---

## 🔧 6. `git log`

### ➤ **What it does:**

Displays the history of commits in the repository.

### 🔹 Example:

```bash
git log
```

### ✅ Use Case:

Track who made what changes and when.

---

## 🔧 7. `git branch`

### ➤ **What it does:**

Lists, creates, or deletes branches.

### 🔹 Examples:

```bash
git branch                # List all branches
git branch new-feature    # Create a new branch
```

### ✅ Use Case:

Use separate branches for new features, bug fixes, or experiments.

---

## 🔧 8. `git checkout`

### ➤ **What it does:**

Switches between branches or restores files.

### 🔹 Examples:

```bash
git checkout main
git checkout -b login-feature  # Create and switch to new branch
```

### ✅ Use Case:

Move between different versions or features of your codebase.

---

## 🔧 9. `git merge`

### ➤ **What it does:**

Merges changes from one branch into another.

### 🔹 Example:

```bash
git checkout main
git merge login-feature
```

### ✅ Use Case:

After completing a feature in a separate branch, merge it back to main.

---

## 🔧 10. `git pull`

### ➤ **What it does:**

Fetches and integrates changes from a remote repo to your local branch.

### 🔹 Example:

```bash
git pull origin main
```

### ✅ Use Case:

Update your local project with the latest changes from teammates.

---

## 🔧 11. `git push`

### ➤ **What it does:**

Sends your local commits to the remote repository.

### 🔹 Example:

```bash
git push origin main
```

### ✅ Use Case:

Upload your local work to GitHub or other Git remote servers.

---

## 🔧 12. `git remote -v`

### ➤ **What it does:**

Shows the URLs of the remote repositories.

### 🔹 Example:

```bash
git remote -v
```

### ✅ Use Case:

Confirm where your code is being pushed/pulled from (e.g., GitHub).

---

## 🔧 13. `git reset`

### ➤ **What it does:**

Unstages files or resets commits.

### 🔹 Example:

```bash
git reset index.html       # Unstage file
git reset --hard HEAD~1    # Remove last commit
```

### ✅ Use Case:

Undo mistakes in staging or remove unwanted commits.

---

## 🔧 14. `git stash`

### ➤ **What it does:**

Temporarily saves uncommitted changes for later use.

### 🔹 Example:

```bash
git stash
git stash pop
```

### ✅ Use Case:

You need to switch branches but don’t want to commit unfinished work.

---

## 🔧 15. `git diff`

### ➤ **What it does:**

Shows differences between commits, branches, or working directory.

### 🔹 Example:

```bash
git diff              # Show unstaged changes
git diff --staged     # Show staged changes
```

### ✅ Use Case:

Check what exactly has changed before committing or pushing.

---

## 🔧 Bonus: Git Workflow Example

```bash
git init
git add .
git commit -m "Initial commit"
git branch feature/login
git checkout feature/login
# work and commit...
git checkout main
git merge feature/login
git push origin main
```

---

Let me know if you want this as a printable **cheat sheet** PDF or formatted **Markdown** file.
