// ==UserScript==
// @name         Source Code Tools
// @namespace    https://toolkitwebsites.co.uk
// @version      0.8
// @updateURL    https://github.com/Will-Toolkit/Editor-Scripts/raw/main/source-code-tools.js
// @downloadURL  https://github.com/Will-Toolkit/Editor-Scripts/raw/main/source-code-tools.js
// @description  Adds some extra functionality to the Source Code editor.
// @author       Will Thrussell
// @match        https://www.toolkit.uk/pages/source/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=toolkitoffice.co.uk
// @require      https://github.com/Will-Toolkit/Editor-Scripts/raw/main/utils.js
// @require      https://github.com/Will-Toolkit/Editor-Scripts/raw/main/templates.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  /* CODE MIRROR CHANGES */
  let cm = document.querySelector(".CodeMirror")?.CodeMirror;
  window.addEventListener("load", () => {
    scrubSpaces();
    addPagesButton();
    addToolbar();
  });
  // On load, adds button to editor - not necessary
  /*
    window.addEventListener('load', () => {
        let parentElement = document.querySelector(".bootstrapeditor-el.bootstrapeditor-save-and-cancel-buttons");
        addButton('Scrub', scrubSpaces, parentElement);
    });*/

  function cmReplace(filter, replaceStr) {
    const returnCursor = cm.doc.getCursor();
    cm.execCommand("selectAll");
    cm.doc.replaceSelection(cm.doc.getSelection().replace(filter, replaceStr));
    cm.doc.setCursor(returnCursor);
  }

  // Edits the DOM through CodeMirror to remove trailing spaces via Regex filters.
  function scrubSpaces() {
    // console.log("Scrubbing!");

    // Scrubs spaces
    cmReplace(/( )+(?=(\\n|$))/gm, '');

    // Turns thumbnail images into hires images
    cmReplace(/(\/143x93\/)/gm, '/hires/');
  }

  function addButton(text, action, parentElement) {
    let newButton = document.createElement("a");
    newButton.innerHTML = text;
    newButton.setAttribute("id", text);
    newButton.setAttribute("style", "");
    newButton.classList.add(
      "bootstrapeditor-btn",
      "bootstrapeditor-btn-cancel"
    );
    parentElement.prepend(newButton);
    document.getElementById(text).addEventListener("click", action, false);
    return newButton;
  }

  function addPagesButton() {
    const parent = document.querySelector(
      ".bootstrapeditor-el.bootstrapeditor-save-and-cancel-buttons"
    );
    const pagesButton = `<a style="display: inline-block; position: absolute; left: 0; top: 0; z-index: -1;" href="https://www.toolkit.uk/pages" target="_blank">
        <img src="https://toolkit5.blob.core.windows.net/toolkit/toolkit.jpg" style="height: 50px; object-fit: cover; width: 170px; object-position: 0%;">
        </a>`;
    parent.insertAdjacentHTML("afterbegin", pagesButton);
  }

  function addToolbar() {
    const parent = document.querySelector(
      ".bootstrapeditor-el.bootstrapeditor-save-and-cancel-buttons"
    );
    let toolbar = document.createElement("span");
    toolbar.setAttribute("id", "expandToolbar");

    addExpandButton();

    parent.prepend(toolbar);
    addCodeInput();
    addUtilityList();
  }

  function addExpandButton() {
    const parent = document.querySelector(
      ".bootstrapeditor-el.bootstrapeditor-save-and-cancel-buttons"
    );
    const toolbar = document.querySelector("#expandToolbar");
    const newButton = document.createElement("a");

    newButton.innerHTML = "+";
    newButton.setAttribute("id", "expandBtn");
    newButton.classList.add(
      "bootstrapeditor-btn",
      "bootstrapeditor-btn-cancel"
    );
    parent.prepend(newButton);
    newButton.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        const toolbar = document.querySelector("#expandToolbar");
        newButton.innerHTML = newButton.innerHTML == "+" ? "-" : "+";
        toolbar.classList.toggle("active");
      },
      false
    );
  }

  function addCodeInput() {
    let toolbar = document.querySelector("#expandToolbar");
    const exeText = document.createElement("textarea");
    exeText.style =
      "background: transparent; height: 20px;position: relative;top: 7px;border: 1px solid #ccc; resize:none;";
    exeText.setAttribute("id", "codeInput");
    toolbar.prepend(exeText);

    const exeButton = addButton("Execute", executeInput, toolbar);
  }

  function executeInput() {
    // Get the current cursor location, to return to later
    const returnCursor = cm.doc.getCursor();

    if (cm.doc.getSelections()[0].length == 0) {
      cm.execCommand("selectAll");
    }

    const oldText = cm.getSelections()[0];

    var stringToHTML = function (str) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, "text/html");
      return doc.body;
    };

    var globalScript = new Function(
      `
            let cm = document.querySelector(".CodeMirror").CodeMirror;
            const oldText = cm.getSelection();
            var stringToHTML = function (str) {
              var parser = new DOMParser();
              var doc = parser.parseFromString(str, 'text/html');
              return(doc.body);
            };

            window.doc = document.implementation.createHTMLDocument("SpoofDoc");
            window.doc.body = stringToHTML(oldText);
            const functionString = document.querySelector("#codeInput").value;
            const filteredString = functionString.replace(/(document.)/gm, "window.doc.");

            var F = new Function(filteredString);

            F();


            cm.replaceSelection(window.doc.body.innerHTML);
        `
    );

    globalScript();

    // Return the cursor to where it was before the edit
    cm.doc.setCursor(returnCursor);
  }

  function addUtilityList() {
    let toolbar = document.querySelector("#expandToolbar");
    const utilityButton = addButton("Utils", toggleUtils, toolbar);

    // Adds Utility buttons
    window.document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="util-container"><div class="move"></div><b>Utilities</b><a class="util-close bootstrapeditor-btn bootstrapeditor-btn-cancel" href="javascript:;">x</a><div class="util-grid"></div><b>Templates</b><div class="template-grid">
      </div></div>`
    );
    document.querySelectorAll(".util-close").forEach((el) => {
      el.addEventListener("click", () => {
        toggleUtils();
      });
    });

    const utilContainer = document.querySelector(".util-container");
    utilContainer.style.display = "none";

      dragElement(document.querySelector(".util-container"));

      function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt.querySelector(".move")) {
    /* if present, the "move" container is where you move the DIV from:*/
    elmnt.querySelector(".move").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

    utils.forEach((util) => {
      const utilTitle = util[0];
      const utilDesc = util[1];
      const utilString = util[2];

      const button = document.createElement("a");
      utilContainer.querySelector(".util-grid").appendChild(button);
      button.innerHTML = utilTitle;
      button.title = utilDesc;

      button.addEventListener("click", () => {
        const returnCursor = cm.doc.getCursor();

        if (cm.doc.getSelections()[0].length == 0) {
          cm.execCommand("selectAll");
        }

        const oldText = cm.getSelections()[0];

        var stringToHTML = function (str) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(str, "text/html");
          return doc.body;
        };

        // Set the global variable to the command to execute
        const scriptToRun = document.createElement("textarea");
        scriptToRun.id = "script-to-run";
        scriptToRun.value = utilString;
        document.body.prepend(scriptToRun);

        // Declare the global script to run on a spoof document, and then return it into the CodeMirror editor
        const globalScript = new Function(
          `
            let cm = document.querySelector(".CodeMirror").CodeMirror;
            const oldText = cm.getSelection();
            var stringToHTML = function (str) {
              var parser = new DOMParser();
              var doc = parser.parseFromString(str, 'text/html');
              return(doc.body);
            };

            window.doc = document.implementation.createHTMLDocument("SpoofDoc");
            window.doc.body = stringToHTML(oldText);
            const functionString = document.querySelector("#script-to-run").value;
            const filteredString = functionString.replace(/(document.)/gm, "window.doc.");

            var F = new Function(filteredString);

            F();


            cm.replaceSelection(window.doc.body.innerHTML);
        `
        );

        globalScript();
        scriptToRun.remove();
      });
    });


    templates.forEach((template) => {
      const templateTitle = template[0];
      const templateString = template[1];
       const button = document.createElement("a");
      utilContainer.querySelector(".template-grid").appendChild(button);
      button.innerHTML = templateTitle;
      button.addEventListener("click", () => {
        cm.replaceSelection(templateString + `\n`);
      });
    });
  }

  function toggleUtils() {
    const utilContainer = document.querySelector(".util-container");
    if (utilContainer) {
      if (utilContainer.style.display == "flex") {
        utilContainer.style.display = "none";
      } else {
        utilContainer.style.display = "flex";
      }
    }
  }



  GM_addStyle(
    `
#expandToolbar {
  display: none;
  margin-right: 15px;
}

#expandToolbar.active {
  display: inline;
}

#expandBtn {
  width: 32px;
  text-decoration: none;
  text-align: center;
  padding: 4px 0px;
}

#expandBtn:hover {
  background-color: #d8d8d8;
}

.util-container {
  position: absolute;
  top: 70px;
  left: 50px;
  z-index: 9999;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  padding-top: 20px;
  gap: 15px;
  max-width: min(500px, calc(100vw - 115px));
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.15);
}

.util-container .move {
  position:absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 15px;
  background: #960909;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: move;
}

.util-container a {
  text-decoration: none;
  padding: 5px 10px;
}

.util-close {
  width: fit-content;
  float: right;
  margin: 0;
}

.util-grid, .template-grid {
  display: flex;
  width: 100%;
  gap: 5px;
  padding-top: 5px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.util-grid a, .template-grid a {
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #3a3a3a;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}

.util-grid a:hover, .template-grid a:hover {
  background-color: #d8d8d8;
  border-color: #aaa;
  color: #000;
}
`
  );
})();
