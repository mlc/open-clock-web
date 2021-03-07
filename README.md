# open-clock-web

A web renderer for the [OpenClockStandard][].

**WIP, very early stages, doesn't do much yet**

## Hacking

To get the dependencies:

1. Install `node.js` and [yarn][] if you don't already have them.
1. Clone the repo.
1. do `yarn install`
1. install [jtd-codegen][] if you will be modifying any schemas

Now, the following commands are available to you:

- `yarn dev` to spin up a dev server for making changes
- `yarn build` to build for production
- `yarn gen-schema` to rebuild the relevant typescript files if you touch the clock JTD schema

## Further info

Contact [mlc][].

[openclockstandard]: https://github.com/orff/OpenClockStandard/
[yarn]: https://yarnpkg.com/
[jtd-codegen]: https://jsontypedef.com/docs/jtd-codegen/#installing-jtd-codegen
[mlc]: https://github.com/mlc/
