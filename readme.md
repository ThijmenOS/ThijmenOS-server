# ThijmenOS server

The server module is sort of the harddrive of the operating system. Data is stored via the server and that also is the only purpouse of the this module. I want ThijmenOS to be an browser based operating system which as little as possible server use. But in order to save settings, files and applications I couldn't avoid it.

## Module structure

The typescript code is contained in the src folder. In this folder are three more folders.

- Controllers
- Routes
- Types

The Controllers folder contains the business logic of the server module where actual things happen like, writing and reading to and from files. In the routes folder there are definitions for route endpoints and the types folder contains types that are used within this module.

## UML class diagram

![1669906018305](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/thijm/OneDrive%20-%20Office%20365%20Fontys/Personal/javascriptOS/javascriptOS-server/image/readme/1669906018305.png)
