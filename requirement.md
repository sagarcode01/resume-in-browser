


# 📄 Resume Editor — Prompt Spec for Cursor

## 🎯 Objective

Build a **zero-auth, zero-backend** resume editor in **Next.js** that:

* Runs entirely on the **frontend** (no DB, no auth).
* Supports multiple **resume templates** (currently just **one**).
* Allows real-time editing of resume content with a live preview.
* Outputs a **PDF-ready** version for export.
* Is **modular** enough to support future enhancements (like templates, custom styles, themes).

---

## ⚙️ Tech Stack

* **Framework:** Next.js (Pages or App Router, both work fine)
* **Styling:** TailwindCSS and Shadcn for fast, utility-first styling
* **State Management:** React local state (`useState`, `useReducer`, or `useContext`)
* **PDF Generation:** `html2pdf.js` or `react-to-print` (client-side only)
* **Storage:** Browser `localStorage` (for persistence between reloads)
* **Editor:** `contenteditable` divs or a simple textarea-based JSON schema editor

## 🛠 Feature Breakdown

### ✅ 1. **Live Editing**

* Implement a form or JSON input to capture user data like:

  * Name
  * Summary
  * Work Experience (Company, Role, Duration, Description)
  * Education
  * Skills
  * Projects

* All stored in `useState` or `useReducer`.

* Changes reflect instantly on the resume preview component.

---

### ✅ 2. **Template Rendering **

* Simple Harvard Resume layout:

* Accepts `resumeData` props and renders cleanly.

* Ability to add new templates in the future.

---

### ✅ 3. **PDF Export**

* Add a "Download as PDF" button.
* One button. One action. One shiny PDF.

---

### ✅ 4. **No Auth / No Backend**

* No login.

* No API calls.

* Store edited resume in `localStorage` as a single JSON object:

  ```ts
  localStorage.setItem('resumeData', JSON.stringify(currentData));
  ```

* Load on page load using `useEffect`.

> `Build a simple resume editor in Next.js with one template, no authentication, no database. Use Tailwind, store data in localStorage, and allow PDF export. Keep everything client-side.`
