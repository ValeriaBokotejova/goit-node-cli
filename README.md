# 📇 Node CLI
Simple CLI app for managing contacts

### Install

Clone the repo and install dependencies:

```bash
npm install
```

### Run

**Use Node.js to run commands:**
- 📃 List all contacts:

```bash
node index.js -a list
```
- 🔍 Get contact by id:

```bash
node index.js -a get -i YOUR_ID
```
- ➕ Add a new contact:

```bash
node index.js -a add -n "Mango" -e "mango@gmail.com" -p "322-22-22"
```
- ❌ Remove contact:

```bash
node index.js -a remove -i YOUR_ID
```
