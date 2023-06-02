export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    // this.#swichEl = document.getElementById("switch");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    // console.log(event.code);
    // console.log(event.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가=힣]/.test(event.key));

    if (event.key === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    } else {
      this.#inputEl.value += event.key;
    }

    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가=힣]/.test(event.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    // console.log(event.code);
    if (this.#keyboardEl.querySelector(`[data-code=${event.code}]`)) {
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        .classList.remove("active");
    }
  }

  #onInput(event) {
    console.log(event.target.value);
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가=힣]/, "");
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
    console.log(event.target.checked);
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
    console.log(event.target.value);
  }
}
