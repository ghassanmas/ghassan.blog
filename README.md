# Ghassan.blog

This the source code and the content of https://ghassan.blog site. 

It uses [Eleventy](https://github.com/11ty/eleventy), and particularly bootsrapped from [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog/)

## development

This config `.elevnty.js` relies on exprimental feature of Node 22, of which CommonJS can load module.

To run server locally `node --experimental-require-module node_modules/@11ty/eleventy/cmd.cjs --serve`

ref: [Node 22 Doc](https://nodejs.org/en/blog/announcements/v22-release-announce#support-requireing-synchronous-esm-graphs)

## License

All code of this project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

All content of this project is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/), **except content inside `faraj`** folder which is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
