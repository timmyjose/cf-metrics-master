Prove and verify `GitHUb` handle using https://www.npmjs.com/package/@reclaimprotocol/reactnative-sdk


# Setup

Expects an `.env.local` file in the project root:

```
EXPO_PUBLIC_RECLAIM_APP_ID=
EXPO_PUBLIC_RECLAIM_SECRET=
EXPO_PUBLIC_RECLAIM_DEEPLINK_URL=cfmm://demo
```

## Build

This uses `expo` CNG (Continuous Native Generation) using `expo prebuild`.

```
$ yarn setup --clean
```

## Run

```
$ yarn android --device
```

or

```
$ yarn ios --device
```

and select the Simulator/Emulator.

NOTE: The `Deep Link` part is not yet fully understood/implemented.
