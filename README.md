# Justcord
A JC3MP server package to bridge your text chat and Discord chat! This should just about function but will be updated when the server is released.

## Installation
1. Make sure you have the chat package installed. It should have come with your server, or from [the Nanos GitLab](https://gitlab.nanos.io/jc3mp-packages/chat).
2. Go to your server `packages` folder and do `git clone https://github.com/md678685/justcord-3`.
3. Go to the new `justcord-3` folder and then run `yarn install` or `npm install`.
4. Create a new app on the [Discord Developers site](https://discordapp.com/developers/applications/me).
5. Create a **bot user** after creating the app.
6. Use [this site](http://scarsz.me/authorize/) to generate a link to add your bot to your guild, pasting your client ID from the previous step.
7. Paste the *token* from step 3 into the `config.json`.
8. In Discord, turn on Developer Mode in *User Settings > Appearance*.
9. Right-click on the channel you want to link and click *Copy ID*.
10. Paste this ID into the `config.json`.
11. Launch the server and chat should now sync between Discord and your server!

## Dependencies
* [Eris](https://github.com/abalabahaha/eris), a Discord library for Node.js.
* [JC3MP Chat](https://gitlab.nanos.io/jc3mp-packages/chat).

## Feedback and Contributing
Please submit issues and pull requests on the [GitHub repo](https://github.com/md678685/justcord-3).

If you want to contribute (feel free, there's a lot I want to add!):

1. Fork the repo.
2. Make your changes and commit them.
3. Submit a PR on the GitHub repo.

If you want to report a bug or suggest a feature, just open a new issue on GitHub.

## License
Justcord is released under the MIT license.
