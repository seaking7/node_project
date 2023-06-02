export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    // this.#swichEl = document.getElementById("switch");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
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
