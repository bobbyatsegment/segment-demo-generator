/**
 * This script:
 *  1. Identifies a mix of known and anonymous users with Segment's library
 *  2. Sends a variety of Track events following e-commerce/B2B naming conventions.
 *  3. Groups known users to an "Account" (via a Group call).
 *  4. Skips events that are only available to known users if user is anonymous.
 */
import { Analytics } from '@segment/analytics-node';
import { getRandomUser, eventCatalog } from './sampleData.js'; // Ensure sampleData.js exists

const analytics = new Analytics({ writeKey: '<YOUR_SEGMENT_WRITE_KEY>' });

/**
 * Shuffles an array using Fisher-Yates (Knuth) Shuffle
 */
function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Sends a random Track event from the shuffled event catalog.
 * Filters out events that require a userId if the user is anonymous.
 */
function sendRandomTrackEvents({ userId, anonymousId, index, eventCount }) {
  // Filter out events that require a userId if this user is anonymous
  const availableEvents = eventCatalog.filter(event => {
    return userId || !event.requiresUserId; // Allow all if userId exists, filter otherwise
  });

  if (availableEvents.length === 0) {
    console.log(`   [No valid events for ${userId || anonymousId}]`);
    return;
  }

  // Shuffle and pick only the required number of events
  const selectedEvents = shuffleArray(availableEvents).slice(0, eventCount);

  for (const event of selectedEvents) {
    const props = event.properties(index);

    analytics.track({
      userId: userId || undefined,
      anonymousId,
      event: event.name,
      properties: props
    });

    console.log(`→ Track: "${event.name}" (user: ${userId || anonymousId})`);
  }
}

/**
 * Main function to demonstrate:
 *  1. Identify calls (only for known users)
 *  2. Group calls (accounts) for known users
 *  3. Track calls, skipping events that are only for "known" users if user is anonymous
 */
async function runDemo({ numberOfUsers, numberOfAnonymous, maxEventsPerUser }, prefix = 'default') {
  if (numberOfUsers <= 0) {
    console.log('No users to process. Exiting early.');
    return;
  }

  for (let i = 1; i <= numberOfUsers; i++) {
    const isAnonymous = i <= numberOfAnonymous;
    const userId = isAnonymous ? null : `${prefix}-${i}`;
    const anonymousId = `anon-${prefix}-${i}`;
    const eventCount = Math.max(1, Math.floor(Math.random() * maxEventsPerUser)); // At least 1 event per user
    const traits = !isAnonymous ? getRandomUser(prefix) : undefined


    // 1. Identify call (only if known user)
    if (!isAnonymous) {
      analytics.identify({
        userId,
        anonymousId,
        traits
      });
      console.log(`→ Identify: userId = ${userId}`);
    }

    // 2. Group call to associate user with an "account" (only if known)
    if (!isAnonymous) {
      const accountId = `account-${userId}`;
      const plan = traits ? traits.plan : 'Free'; // Default plan if traits is undefined

      analytics.group({
        userId,
        groupId: accountId,
        traits: {
          name: `Demo Account ${prefix}-${i}`,
          plan
        }
      });
      console.log(`→ Group: userId = ${userId} linked to groupId = ${accountId}`);
    }

    // 3. Send multiple Track events for each user
    sendRandomTrackEvents({
      userId,
      anonymousId,
      index: i,
      eventCount
    });
  }

  // Flush all queued messages before exiting
  await analytics.flush();
  console.log('All messages have been flushed to Segment.');
}

// Configuration
const config = {
  numberOfUsers: 2,      // total user count
  numberOfAnonymous: 1,   // how many are anonymous
  maxEventsPerUser: 2     // Max number of track events to send per user
};

const prefix = 'run_three'; // Custom prefix to assign to users in a run

// Run the demo
runDemo(config, prefix).catch(err => {
  console.error('Error running Segment demo:', err);
});

// analytics.flush(function(err, batch) { 
//     console.log('Flushed, and now this program can exit!'); 
// });