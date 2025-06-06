/**
 * team_turn - A simple Google Apps Script to auto-pick team members in cycles
 * and post it in Google Chat with a fun programming joke and a link to good
 * code refactoring practices.
 * 
 * Author: Arghya Banerjee
 */

// === CONFIGURATION ===
// 👉 Add your Google Chat webhook URL below
const WEBHOOK_URL = ''; // e.g., 'https://chat.googleapis.com/v1/spaces/...'
const JOKE_URL = 'https://v2.jokeapi.dev/joke/Programming?safe-mode'; // Safe programming jokes only
const REFACTORING_BLOG_LINK = 'https://refactoring.guru/';
const IMAGE_URL = 'https://cdn-icons-png.flaticon.com/512/11826/11826855.png';

// 👉 List of team members to pick from
const NAMES = [
  // "Your Name",
  // "Another Teammate",
];

/**
 * Main entry point. Picks a random name and sends a message with a joke.
 */
function pickName() {
  if (!WEBHOOK_URL || NAMES.length === 0) {
    throw new Error("Please configure WEBHOOK_URL and NAMES array before running.");
  }

  const cycleInfo = getCycleInfo();
  const pick = selectRandomName(cycleInfo.selected);
  cycleInfo.selected.push(pick);

  updateCycleInfo(cycleInfo.selected, cycleInfo.cycle);

  const joke = fetchProgrammingJoke();
  const messageCard = buildChatCard(pick, cycleInfo.cycle, joke);

  postToChat(messageCard);
  logCycleInfo(pick, cycleInfo.cycle, joke);
}

/**
 * Resets the current cycle and clears picked names.
 */
function resetCycle() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty("selected", JSON.stringify([]));
  props.setProperty("cycle", "1");

  console.log("Cycle reset to 1 and all selections cleared.");
}

/**
 * Fetches the current cycle number and selected names.
 */
function getCycleInfo() {
  const props = PropertiesService.getScriptProperties();
  const selected = JSON.parse(props.getProperty("selected") || "[]");
  let cycle = parseInt(props.getProperty("cycle") || "1");

  if (selected.length >= NAMES.length) {
    return { selected: [], cycle: cycle + 1 };
  }

  return { selected, cycle };
}

/**
 * Updates stored cycle state.
 */
function updateCycleInfo(selected, cycle) {
  const props = PropertiesService.getScriptProperties();
  props.setProperty("selected", JSON.stringify(selected));
  props.setProperty("cycle", cycle.toString());
}

/**
 * Randomly selects a name not already picked in this cycle.
 */
function selectRandomName(selected) {
  const remaining = NAMES.filter(name => !selected.includes(name));
  return remaining[Math.floor(Math.random() * remaining.length)];
}

/**
 * Fetches a random programming joke (single-line or two-part).
 */
function fetchProgrammingJoke() {
  const response = UrlFetchApp.fetch(JOKE_URL);
  const data = JSON.parse(response.getContentText());

  if (data.type === "single") {
    return `💬 <b>Joke of the day:</b><br>"${data.joke}"`;
  } else {
    return `💬 <b>Joke of the day:</b><br>"${data.setup}"<br><i>${data.delivery}</i>`;
  }
}

/**
 * Builds the Google Chat card message payload.
 */
function buildChatCard(pick, cycle, joke) {
  return {
    cards: [
      {
        header: {
          title: `🎯 Code Refactoring - Cycle ${cycle}`,
          subtitle: `Next day's pick: ${pick}`,
          imageUrl: IMAGE_URL,
          imageStyle: "AVATAR"
        },
        sections: [
          {
            widgets: [
              { textParagraph: { text: joke } },
              {
                buttons: [
                  {
                    textButton: {
                      text: "Refactor Like a Pro",
                      onClick: { openLink: { url: REFACTORING_BLOG_LINK } }
                    }
                  }
                ]
              },
              {
                textParagraph: {
                  text: `<i><font size="1" color="#888888">Created by Arghya Banerjee</font></i>`
                }
              }
            ]
          }
        ]
      }
    ]
  };
}

/**
 * Sends the card message to Google Chat.
 */
function postToChat(messageCard) {
  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(messageCard)
  });
}

/**
 * Logs current pick details for debugging or auditing.
 */
function logCycleInfo(pick, cycle, joke) {
  console.log(`Cycle ${cycle} - Picked: ${pick}`);
  console.log(`Joke sent: ${joke}`);
}

/**
 * Create a Debug Function (Non-destructive).
 */
function debugPrintScriptProperties() {
  const props = PropertiesService.getScriptProperties();
  console.log("Selected:", props.getProperty("selected"));
  console.log("Cycle:", props.getProperty("cycle"));
}
