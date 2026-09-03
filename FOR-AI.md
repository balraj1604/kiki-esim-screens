# Kiki eSIM — context for an AI assistant

You are helping Balraj review the Kiki eSIM app screen by screen, by voice.

## This page is only the 78 app screens — there is much more

The full body of work is 4,605 further files: the Emirates illustration library,
wallpapers, boarding-pass art, destination city assets, globe and widget assets,
the app screen library export, animation sources, generation specs, route
timetables and the session transcripts.

    EVERYTHING, indexed : https://balraj1604.github.io/kiki-esim-screens/ALL-CONTENT.md

Those carry **D numbers** (D0001-D4605); the screens below carry **S numbers**
(S001-S078). "screen 7" is S007. "drop 412" is D0412. If a bare number could
mean either, ask which he means.

## How to use this page

Every screen has a PERMANENT id: S001 to S078.
When Balraj says "image 7", "screen 7", "S007" or "number 7", he means item 7 below.
Open that item's ORIGINAL url to see exactly what he is looking at.

Each screen also has four coordinate bands you can refer to:

    S007-A = top region / header
    S007-B = upper content
    S007-C = lower content
    S007-D = bottom region / navigation

These are coordinate bands, NOT verified component names.
Do not assume what a widget does just because it sits in a band.

Coordinates are LOGICAL POINTS. Every screen is 402 x 874 pt
(1206 x 2622 native pixels, 3x). So "change Y 220 to Y 340" means that
vertical band measured on the original screenshot.

## Read these before advising on anything

    Product + supplier + backend baseline : https://balraj1604.github.io/kiki-esim-screens/KIKI_ESIM_SHARED_HANDOVER.md
    What the supplier can actually do     : https://balraj1604.github.io/kiki-esim-screens/docs/ZETEXA_CAPABILITY_MATRIX.md
    Backend, intended vs real             : https://balraj1604.github.io/kiki-esim-screens/docs/BACKEND_JOURNEY.md
    Unresolved decisions                  : https://balraj1604.github.io/kiki-esim-screens/docs/OPEN_QUESTIONS.md

## Ground rules

- Never suggest putting API keys, passwords, bank details or supplier
  pricing into a public repository.
- Do not claim a Zetexa capability is confirmed unless the capability
  matrix says so. Nothing has been verified in production.
- Every price in the app is a PLACEHOLDER set against staging dummy packs.
- The canonical app and backend repositories are private and stay private.

## The 78 screens


### Core

1. S001 — Home  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S001-home.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S001-home-annotated.png
2. S002 — Plans  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S002-plans.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S002-plans-annotated.png
3. S003 — My eSIM  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S003-my-esim.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S003-my-esim-annotated.png
4. S004 — Profile  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S004-profile.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S004-profile-annotated.png
5. S005 — Welcome  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S005-welcome.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S005-welcome-annotated.png
6. S006 — Crew Verification  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S006-crew-verification.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S006-crew-verification-annotated.png
7. S007 — Onboarding  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S007-onboarding.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S007-onboarding-annotated.png
8. S008 — Account  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S008-account.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S008-account-annotated.png
9. S009 — Settings  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S009-settings.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S009-settings-annotated.png
10. S010 — Home Story Pay As You Go  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S010-home-story-pay-as-you-go.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S010-home-story-pay-as-you-go-annotated.png
11. S011 — Home Story Crew Plan  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S011-home-story-crew-plan.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S011-home-story-crew-plan-annotated.png
12. S012 — Home Story Verify Crew  [Tier 1 → 2 transition · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S012-home-story-verify-crew.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S012-home-story-verify-crew-annotated.png
13. S013 — Home Story Vacation  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S013-home-story-vacation.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S013-home-story-vacation-annotated.png
14. S014 — Home Scrolled Destinations  [Any tier · Scrolled]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S014-home-scrolled-destinations.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S014-home-scrolled-destinations-annotated.png
15. S015 — Home Scrolled Browse By Type  [Any tier · Scrolled]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S015-home-scrolled-browse-by-type.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S015-home-scrolled-browse-by-type-annotated.png

### Plans

16. S016 — Landing Empty  [Any tier · Empty state]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S016-landing-empty.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S016-landing-empty-annotated.png
17. S017 — Search France Results  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S017-search-france-results.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S017-search-france-results-annotated.png
18. S018 — France All Plans  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S018-france-all-plans.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S018-france-all-plans-annotated.png
19. S019 — France Filtered 3gb 3days  [Any tier · Filtered]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S019-france-filtered-3gb-3days.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S019-france-filtered-3gb-3days-annotated.png
20. S020 — United States Standard  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S020-united-states-standard.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S020-united-states-standard-annotated.png
21. S021 — United States Unlimited  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S021-united-states-unlimited.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S021-united-states-unlimited-annotated.png
22. S022 — Unlimited Filtered 10days  [Any tier · Filtered]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S022-unlimited-filtered-10days.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S022-unlimited-filtered-10days-annotated.png
23. S023 — No Results  [Any tier · No results]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S023-no-results.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S023-no-results-annotated.png

### My eSIM

24. S024 — Tier 1 Traveller  [Tier 1 — standard user · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S024-tier-1-traveller.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S024-tier-1-traveller-annotated.png
25. S025 — Tier 2 Verified Crew  [Tier 2 — verified crew · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S025-tier-2-verified-crew.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S025-tier-2-verified-crew-annotated.png
26. S026 — Tier 3 Crew Bundle  [Tier 3 — crew with roster · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S026-tier-3-crew-bundle.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S026-tier-3-crew-bundle-annotated.png
27. S027 — Tier 1 Cycle Complete  [Tier 1 — standard user · Complete]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S027-tier-1-cycle-complete.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S027-tier-1-cycle-complete-annotated.png

### Roster

28. S028 — Upload  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S028-upload.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S028-upload-annotated.png
29. S029 — Manual Entry  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S029-manual-entry.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S029-manual-entry-annotated.png
30. S030 — Confirm No Draft  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S030-confirm-no-draft.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S030-confirm-no-draft-annotated.png
31. S031 — Trips  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S031-trips.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S031-trips-annotated.png
32. S032 — Schedule  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S032-schedule.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S032-schedule-annotated.png

### Profile

33. S033 — Invite Crew  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S033-invite-crew.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S033-invite-crew-annotated.png
34. S034 — Days Abroad  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S034-days-abroad.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S034-days-abroad-annotated.png
35. S035 — Layover Planner  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S035-layover-planner.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S035-layover-planner-annotated.png
36. S036 — Layover Intel  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S036-layover-intel.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S036-layover-intel-annotated.png
37. S037 — Rewards Wallet  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S037-rewards-wallet.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S037-rewards-wallet-annotated.png
38. S038 — Widgets  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S038-widgets.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S038-widgets-annotated.png
39. S039 — Support  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S039-support.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S039-support-annotated.png
40. S040 — Savings  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S040-savings.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S040-savings-annotated.png
41. S041 — Gift Data  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S041-gift-data.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S041-gift-data-annotated.png
42. S042 — Data Wallet  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S042-data-wallet.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S042-data-wallet-annotated.png
43. S043 — Crew Mode Legacy  [Any tier · Legacy screen]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S043-crew-mode-legacy.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S043-crew-mode-legacy-annotated.png
44. S044 — Crew Recommendations  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S044-crew-recommendations.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S044-crew-recommendations-annotated.png
45. S045 — Hotels  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S045-hotels.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S045-hotels-annotated.png
46. S046 — Hotel Detail  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S046-hotel-detail.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S046-hotel-detail-annotated.png
47. S047 — Rewards Card Expanded  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S047-rewards-card-expanded.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S047-rewards-card-expanded-annotated.png

### Purchase

48. S048 — Destination France  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S048-destination-france.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S048-destination-france-annotated.png
49. S049 — Plan Detail France  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S049-plan-detail-france.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S049-plan-detail-france-annotated.png
50. S050 — Checkout France  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S050-checkout-france.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S050-checkout-france-annotated.png
51. S051 — Purchase Success  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S051-purchase-success.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S051-purchase-success-annotated.png
52. S052 — eSIM Install  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S052-esim-install.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S052-esim-install-annotated.png
53. S053 — eSIM Detail  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S053-esim-detail.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S053-esim-detail-annotated.png
54. S054 — Top Up  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S054-top-up.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S054-top-up-annotated.png
55. S055 — Bundle Tiers  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S055-bundle-tiers.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S055-bundle-tiers-annotated.png
56. S056 — Smart Plan  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S056-smart-plan.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S056-smart-plan-annotated.png
57. S057 — How It Works  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S057-how-it-works.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S057-how-it-works-annotated.png
58. S058 — Checkout Card Selected  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S058-checkout-card-selected.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S058-checkout-card-selected-annotated.png
59. S059 — Checkout Apple Pay Selected  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S059-checkout-apple-pay-selected.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S059-checkout-apple-pay-selected-annotated.png

### Other

60. S060 — Flight Detail  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S060-flight-detail.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S060-flight-detail-annotated.png
61. S061 — Live Flight  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S061-live-flight.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S061-live-flight-annotated.png
62. S062 — Experience  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S062-experience.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S062-experience-annotated.png
63. S063 — Akito Legacy  [Any tier · Legacy screen]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S063-akito-legacy.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S063-akito-legacy-annotated.png
64. S064 — V2 Workspace  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S064-v2-workspace.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S064-v2-workspace-annotated.png
65. S065 — Folder Demo  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S065-folder-demo.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S065-folder-demo-annotated.png
66. S066 — Folder Motion  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S066-folder-motion.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S066-folder-motion-annotated.png
67. S067 — Dev Stickers  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S067-dev-stickers.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S067-dev-stickers-annotated.png
68. S068 — Flight Log Proof  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S068-flight-log-proof.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S068-flight-log-proof-annotated.png
69. S069 — Codex Onboarding  [Any tier · Default]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S069-codex-onboarding.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S069-codex-onboarding-annotated.png
70. S070 — Flight Journey Animation  [Any tier · Animation frame]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S070-flight-journey-animation.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S070-flight-journey-animation-annotated.png
71. S071 — Flight Journey Paused  [Any tier · Paused]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S071-flight-journey-paused.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S071-flight-journey-paused-annotated.png
72. S072 — Flight Journey Complete  [Any tier · Complete]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S072-flight-journey-complete.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S072-flight-journey-complete-annotated.png

### Popups & sheets

73. S073 — Greeting Language Sheet  [Any tier · Bottom sheet]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S073-greeting-language-sheet.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S073-greeting-language-sheet-annotated.png
74. S074 — Location Permission Prompt  [Any tier · System prompt]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S074-location-permission-prompt.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S074-location-permission-prompt-annotated.png
75. S075 — Verify Crew Email Sheet  [Tier 1 → 2 transition · Bottom sheet]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S075-verify-crew-email-sheet.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S075-verify-crew-email-sheet-annotated.png
76. S076 — Verify Crew Email Filled  [Tier 1 → 2 transition · Filled state]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S076-verify-crew-email-filled.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S076-verify-crew-email-filled-annotated.png
77. S077 — Delete Account Confirmation  [Any tier · Confirmation]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S077-delete-account-confirmation.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S077-delete-account-confirmation-annotated.png
78. S078 — Manual Roster Date Sheet  [Any tier · Bottom sheet]
    original:  https://balraj1604.github.io/kiki-esim-screens/screens/original/S078-manual-roster-date-sheet.png
    annotated: https://balraj1604.github.io/kiki-esim-screens/screens/annotated/S078-manual-roster-date-sheet-annotated.png
