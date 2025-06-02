# 🌀 Team Turn

### A simple Google Apps Script that **automates team rotation** by picking a random team member and sending a daily update to a Google Chat space.

To make the experience more enjoyable, the message also includes:

* 💡 A **"Joke of the Day"** (safe for work, programming-themed)
* 🎯 A shortcut to [Refactoring.Guru](https://refactoring.guru) to explore clean code principles

---

## 📌 What It Does

This script helps automate recurring team duties—like code reviews, deployment ownership, or daily standup anchors—by:

* Randomly picking one person from your team in a **non-repeating cycle**
* Sending the result to a **Google Chat space** via webhook
* Adding a **programming joke** to lighten the mood
* Providing a **learning resource button** (linked to Refactoring Guru)

---

## ⚙️ Setup Instructions

### 1. 📥 Add Your Webhook URL

Follow these steps to create a Google Chat webhook URL:

* Open [Google Chat](https://chat.google.com/)
* Select your space → Click the **integrations gear icon**
* Choose **"Manage Webhooks"**
* Click **Add Webhook**, name it something like `team_turn_notifier`
* Copy the **Webhook URL** and replace the empty string in the code:

```js
const WEBHOOK_URL = 'https://chat.googleapis.com/....'; // your webhook here
```

---

### 2. 👥 Add Team Members

In the `NAMES` array, add all team members' names (make sure they're unique):

```js
const NAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana"
];
```

---

### 3. ⏰ Schedule the App

To run it automatically:

1. Open the Apps Script editor
2. Click on `Triggers` from the sidebar
3. Create a new trigger:

   * Choose function: `pickName`
   * Choose deployment: `Head`
   * Select event source: **Time-driven**
   * Select type: **Day timer → e.g., Monday at 11:45 AM**

That's it!

---

## ▶️ How to Run the App

You can run it manually to test it or wait for the scheduled time:

```js
pickName(); // executes the full message flow
```

---

## 📝 Customization Notes

* The **card title** is set as: `Code Refactoring - Cycle {n}`
* The **subtitle**: `Next day's pick: {Name}`
* The **button** text: `"FEELING GEEKY 🤓"` links to [refactoring.guru](https://refactoring.guru)

> You can change the text, image, and links in `buildChatCard()` to match your team’s culture or purpose.

---

## 🛠 Tech Stack

* Google Apps Script
* Google Chat Webhooks
* Joke API ([JokeAPI.dev](https://jokeapi.dev))
* Refactoring.Guru (for educational link)
