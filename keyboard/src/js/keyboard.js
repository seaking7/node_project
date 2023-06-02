export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
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
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      console.log(event.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가=힣]/.test(event.key));
      this.#inputGroupEl.classList.toggle(
        "error",
        /[ㄱ-ㅎ|ㅏ-ㅣ|가=힣]/.test(event.key)
      );
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active");
    });
    document.addEventListener("keyup", (event) => {
      console.log(event.code);
      if (this.#keyboardEl.querySelector(`[data-code=${event.code}]`)) {
        this.#keyboardEl
          .querySelector(`[data-code=${event.code}]`)
          .classList.remove("active");
      }
    });
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
