:::mermaid
sequenceDiagram

    participant browser
    participant server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTML-file
        Note right of browser: HTML request for CSS-file
        deactivate server
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: CSS-file
        deactivate server
        Note right of browser: HTML request for JS-file
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: JS-file
        deactivate server
        Note right of browser: JS-file request for JSON-file
        server-->>browser:JSON-file        
:::