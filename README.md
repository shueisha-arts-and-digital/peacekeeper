# Peacekeeper
- Peacekeeper will notify you for each website you specify.

## Install
- [Chrome Web Store : Peacekeeper](https://chrome.google.com/webstore/detail/peacekeeper/dfhhnlmecdgbidblhlidkgiagikjgfip)

## Screenshot
### Before
- Which one is LOCALHOST? You will have an accident someday.
![](before.png)

### After
- It's sooooo peaceful.
![](after.png)

## Configs

### url (required)
- Specify target URL with regular expression
```json
"url": "https://.*stage-admin.+"
```
### includeQueryParams
- Whether to include query parameters in URL matching (default: false)
```json
"includeQueryParams": true,
```

### includeHash
- Whether to include hash in URL matching (default: false)
```json
"includeHash": true,
```

### favicon
- Change the favicon
```json
"favicon": {
  "rel": "icon",
  "type": "image/svg+xml",
  "href": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23FFC107' stroke='%23F57F17' stroke-width='0.5'/%3E%3C/svg%3E"
},
```

### style
- Change style
```json
"style": "#selector { background-color: rgba(255,69,58,1) !important; }",
```
