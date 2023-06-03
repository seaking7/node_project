class DatePicker{
    monthData = [
        'January',
         'February',
         'March',
         'April',
         'May',
         'June', 
         'July',
         'August', 
         'September', 
         'October', 
         'November', 
         'December',
    ];

    #calenderDate = {
        data: '',
        date: 0,
        month: 0,
        year: 0,
    };

    selectedDate = {
        data: '',
        date: 0,
        month: 0,
        year: 0,
    };

    datePickerEl;
    dateInputEl;
    calenderEl;
    calenderMonthEl;
    monthContentEl;
    nextBtnEl;
    prevBtnEl;
    calenderDatesEl;

    constructor(){
        this.initCalenderDate();
        this.assignElement();

        this.addEvent();
    }

    initCalenderDate(){
        const data = new Date();
        const date = data.getDate();
        const month = data.getMonth();
        const year = data.getFullYear();
        this.#calenderDate = {
            data,
            date,
            month,
            year,
        };
        console.log(this.#calenderDate);
    }

    assignElement(){
        this.datePickerEl = document.getElementById("date-picker");
        this.dateInputEl = this.datePickerEl.querySelector('#date-input')
        this.calenderEl = this.datePickerEl.querySelector('#calendar');
        this.calenderMonthEl = this.calenderEl.querySelector('#month');
        this.monthContentEl = this.calenderMonthEl.querySelector('#content');
        this.nextBtnEl = this.calenderMonthEl.querySelector('#next');
        this.prevBtnEl = this.calenderMonthEl.querySelector('#prev');

        this.calenderDatesEl = this.calenderEl.querySelector('#dates');


    }

    addEvent() {
        this.dateInputEl.addEventListener("click", this.toggleCalender.bind(this));
    }

    toggleCalender() {
        this.calenderEl.classList.toggle('active');
        this.updateMonth();
        this.updateDates();
    }

    updateMonth() {
        this.monthContentEl.textContent = `${this.#calenderDate.year} ${this.monthData[this.#calenderDate.month]}`
    }

    updateDates() {
        this.calenderDatesEl.innerHTML = '';
        const numberOfDates = new Date(this.#calenderDate.year, this.#calenderDate.month+1, 0).getDate();

        const fragment = new DocumentFragment();
        for(let i=0; i < numberOfDates; i++){
            const dateEl = document.createElement('div');
            dateEl.classList.add('date');
            dateEl.textContent = i + 1;
            dateEl.dataset.date= i + 1;
            fragment.appendChild(dateEl);
        }
        fragment.firstChild.style.gridColumnStart = new Date(this.#calenderDate.year, this.#calenderDate.month, 1).getDay() + 1;
        this.calenderDatesEl.appendChild(fragment);
        this.colorSaturday();
        this.colorSunday();
    
    }

    colorSaturday(){
        const saturdayEls = this.calenderDatesEl.querySelectorAll(
            `.date:nth-child(7n+${
            7 - new Date(this.#calenderDate.year, this.#calenderDate.month, 1).getDay()
        })`,
        );
        for( let i = 0; i < saturdayEls.length; i++){
            saturdayEls[i].style.color = 'blue';
        
        }
    }

    colorSunday() {
        const sundayEls = this.calenderDatesEl.querySelectorAll(
            `.date:nth-child(7n+${
            8 - new Date(this.#calenderDate.year, this.#calenderDate.month, 1).getDay()
        })`,
        );
        for( let i = 0; i < sundayEls.length; i++){
            sundayEls[i].style.color = 'red';
        }
    }
}

const datePicker = new DatePicker;