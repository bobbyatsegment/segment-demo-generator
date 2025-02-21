# Segment User Generator

This script is designed to generate and send dummy event data to a Segment source programmatically. It simulates user activity by:

1. Identifying a mix of known and anonymous users.
2. Sending a variety of Track events following e-commerce/B2B naming conventions.
3. Grouping known users to an "Account" using the Segment Group call.
4. Ensuring that anonymous users do not trigger events requiring a user ID.
5. Allowing for dynamic generation of users, including randomized first names, last names, and user traits.

## Prerequisites

Before running the script, ensure you have the following:
- Node.js installed on your machine.
- A Segment source write key.
- An existing GitHub repository (if you want to version-control your script).

## Setup

### 1. Clone the Repository

```
git clone git@github.com:bobbyatsegment/segment-demo-generator.git
cd segment-demo-generator
```

### 2. Install Dependencies
```
npm install
```

### 3. Add Segment Write Key

In index.js, update the following line with your Segment Node source's write key:
```
const analytics = new Analytics({ writeKey: '<YOUR_SEGMENT_WRITE_KEY>' });
```

## File Structure
```
segment-demo/
├── index.js          # Main script
├── sampleData.js     # Contains event catalog and user generation functions
├── package.json      # Node project metadata
└── README.md         # This documentation
```

## Configuration

Modify the following parameters in `index.js` before running:

```
const config = {
    numberOfUsers: 12,      // Total users to generate
    numberOfAnonymous: 3,   // Number of anonymous users
    maxEventsPerUser: 3     // Max track events per user
};

const prefix = 'example'; // Prefix for user and account names
```

🚀 Now you're ready to generate dynamic Segment data for testing!