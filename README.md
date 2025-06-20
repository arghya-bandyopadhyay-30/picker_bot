# 🌀 PickerBot ![Made with Google Apps Script](https://img.shields.io/badge/Made%20with-Google%20Apps%20Script-blue?logo=google)

### A simple Google Apps Script that **automates team rotation** by picking a random team member and sending a daily update to a Google Chat space.

To make the experience more enjoyable, the message also includes:

* 💡 A **"Joke of the Day"** (safe for work, programming-themed)
* 🎯 A shortcut to [Refactoring.Guru](https://refactoring.guru) to explore clean code principles

---

![PickerBot in action](https://github.com/arghya-bandyopadhyay-30/team_turn/blob/main/demo-screenshot.png)

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

## 🔄 How to Reset the Cycle

If you'd like to **manually reset** the cycle (e.g., after a break or a team change), run the following function from the Apps Script editor:

```js
resetCycle();
```

This will:

* Clear all previously picked names
* Reset the cycle count back to `1`

You can also:

* Set up a **manual menu item** in the Apps Script UI
* Or create a **trigger to auto-reset** every month/quarter if desired

> 🔔 Tip: You can run this from the `Run` menu in the script editor or call it from another function as needed.

---

## 🚫 Skip Specific Dates (Optional)

Sometimes you may want to **skip execution on certain days**, such as holidays, planned downtimes, or exceptional situations.

This script supports skipping **multiple dates** and will notify the team in Google Chat with a custom message card explaining why the pick was skipped.

### ✅ How It Works

* Inside the script, there's a function `shouldSkipToday()` that checks if today matches any of the **predefined dates to skip**.
* If today is a skip day, the bot will **not pick a name**.
* Instead, it will **send a Chat message** like:

> “📌 We are currently lagging with the previous cycle. To maintain fairness and consistency, today’s pick is skipped!”

### 🧩 Example

```javascript
/**
 * Checks whether today should be skipped from execution.
 * Allows skipping on multiple specific dates.
 */
function shouldSkipToday() {
  const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const skipDates = [
    '2025-06-11',
    '2025-06-13'
    // Add more dates as needed
  ];

  return skipDates.includes(todayStr);
}
```

* You can easily maintain the list of skip dates by adding or removing entries from the `skipDates` array.
* The date format used is: `yyyy-MM-dd` (ISO format).

---

## 📝 Customization Notes

* The **card title** is set as: `Code Refactoring - Cycle {n}`
* The **subtitle**: `Next day's pick: {Name}`
* The **button** text: `"Refactor Like a Pro"` links to [refactoring.guru](https://refactoring.guru)

> You can change the text, image, and links in `buildChatCard()` to match your team’s culture or purpose.

---

## 🛠 Tech Stack

* Google Apps Script
* Google Chat Webhooks
* Joke API ([JokeAPI.dev](https://jokeapi.dev))
* Refactoring.Guru (for educational link)

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome!

If you'd like to:

* Add features (like holiday skipping, analytics, Slack support, etc.)
* Improve the UI card design
* Add alternate joke sources
* Make the script more configurable

Feel free to fork the repo, open an issue, or submit a PR 🙌

> *Maintained with ❤️ by [Arghya Banerjee](https://github.com/arghya-bandyopadhyay-30)*

---
