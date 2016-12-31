# Justcord
A JC3MP server package to bridge your text chat and Discord chat! This should just about function but will be updated when the server is released.

## Installation
1. Put this inside a folder in your server package directory, along with the chat package, then run `yarn install` or `npm install`.
2. Create a new app on the [Discord Developers site](https://discordapp.com/developers/applications/me).
3. Create a **bot user** after creating the app.
4. Use [this site](http://scarsz.tech/authorize/) to generate a link to add your bot to your guild, pasting your client ID from the previous step.
5. Paste the *token* from step 3 into the `config.json`.
6. In Discord, turn on Developer Mode in *User Settings > Appearance*.
7. Right-click on the channel you want to link and click *Copy ID*.
8. Paste this ID into the `config.json`.
9. Launch the server and chat should now sync between Discord and your server!

## Dependencies
* [Eris](https://github.com/abalabahaha/eris), a Discord library for Node.js.
* [JC3MP Chat](https://gitlab.nanos.io/jc3mp-packages/chat), 

## Feedback and Contributing
Please submit issues and pull requests on the [GitHub repo](https://github.com/md678685/justcord-3).

If you want to contribute (feel free, there's a lot I want to add!):

1. Fork the repo
2. Make your changes
3. Submit a PR on the GitHub repo.

If you want to report a bug or suggest a feature, just open a new issue on GitHub.

## License
Justcord is released under the MIT license.
