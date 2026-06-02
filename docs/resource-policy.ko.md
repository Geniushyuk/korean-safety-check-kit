# Official resource metadata policy

This repository may mention public Korean emergency or counseling resources, but it must avoid unverified or private contact information.

## Allowed

- National emergency numbers such as 112 and 119.
- Well-known official public-resource labels, when they are already part of the maintained scenario data.
- Generic guidance such as “contact your bank customer center for payment stop requests.”

## Not allowed without review

- New phone numbers copied from random web pages.
- Private organization contacts.
- Legal, medical, psychological, or emergency claims that imply guaranteed outcomes.
- Region-specific instructions that may become outdated quickly.

## Update process

1. Open an issue describing the resource update.
2. Include source context, but do not include private personal information.
3. Update scenario data and tests together.
4. Run `npm test`.
5. Maintainer performs final review before merge.
