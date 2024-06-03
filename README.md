# eml-generator

Web-based eml generator :feather:

## Preview

![screen_view_1](assets/screen_view_1.png)
![screen_view_2](assets/screen_view_2.png)

## -Tech Stack-

- MongoDB
- Express
- React
- Node

## Development

Install dependencies:

`npm install`

ENV setup:
`export DATABASE_URI`

Or put DATABASE_URI into '.env' file.

Run in Dev mode:

`npm run dev`

Build:

`npm run build`

Run in Prod mode:

`npm run start`

## Structure

```

├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── public
│   ├── fonts
│   │   └── Symbols.ttf
│   └── PugTemplate.eml
├── README.md
├── src
│   ├── client
│   │   ├── App.jsx
│   │   ├── Content.jsx
│   │   ├── EditorBlocks
│   │   │   ├── ComponentEditor.jsx
│   │   │   ├── EditorButtonPanel.jsx
│   │   │   ├── EditorComponent.jsx
│   │   │   ├── EditorComponentsPanel.jsx
│   │   │   ├── EditorHeader.jsx
│   │   │   ├── EditorView.jsx
│   │   │   └── EditToolbar.jsx
│   │   ├── Editor.jsx
│   │   ├── Header.jsx
│   │   ├── main.jsx
│   │   ├── Preview.jsx
│   │   ├── styles
│   │   │   ├── ComponentEditor.css
│   │   │   ├── Content.css
│   │   │   ├── Editor.css
│   │   │   ├── Header.css
│   │   │   ├── index.css
│   │   │   └── Templates.css
│   │   └── Templates.jsx
│   └── server
│       ├── configs
│       │   └── dbConn.js
│       ├── controllers
│       │   ├── mailController.js
│       │   └── toEmlController.js
│       ├── main.js
│       ├── middleware
│       ├── model
│       │   ├── Mail.js
│       │   └── TemplateName.js
│       └── routes
│           └── api
│               ├── emlExport.js
│               └── mailTemplate.js
└── vite.config.js

14 directories, 36 files

```

## TODO;

- Add iframe preview
- Add separate template table for selection
- Check validation
