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

        this.initSelectedDate();
        this.setDateInput();
        this.addEvent();
    }

    initSelectedDate(){
        this.selectedDate = {...this.#calenderDate };
    }

    setDateInput() {
        this.dateInputEl.textContent = this.formatDate(this.selectedDate.data);
        this.dateInputEl.dataset.value = this.selectedDate.data;
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
        this.nextBtnEl.addEventListener("click", this.moveToNextMonth.bind(this));
        this.prevBtnEl.addEventListener("click", this.moveToPrevMonth.bind(this));
        this.calenderDatesEl.addEventListener("click", this.onClickSelectDate.bind(this));
    }

    onClickSelectDate(event){
        const eventTarget = event.target;
        if( eventTarget.dataset.date) {
            console.log(eventTarget);
            this.calenderDatesEl.querySelector(".selected")?.classList.remove('selected');
            eventTarget.classList.add('selected');
            this.selectedDate = {
                data: new Date(this.#calenderDate.year, this.#calenderDate.month, eventTarget.dataset.date),
                year: this.#calenderDate.year,
                month: this.#calenderDate.month,
                date: eventTarget.dataset.date
            };
            this.setDateInput();
            this.calenderEl.classList.remove('active');
        }

    }

    formatDate(selectedDate) {
        let date = selectedDate.getDate();
        if( date < 10 ) date = `0${date}`

        let month = selectedDate.getMonth() + 1;
        if(month < 10) month = `0${month}`;

        let year = selectedDate.getFullYear();

        return `${year}/${month}/${date}`
    }



    moveToPrevMonth() {
        this.#calenderDate.month--;
        if(this.#calenderDate.month < 0){
            this.#calenderDate.month = 11;
            this.#calenderDate.year--;
        }
        this.updateMonth();
        this.updateDates();
    }


    moveToNextMonth() {
        this.#calenderDate.month++;
        if(this.#calenderDate.month > 11){
            this.#calenderDate.month = 0;
            this.#calenderDate.year++;
        }
        this.updateMonth();
        this.updateDates();
    }

    toggleCalender() {
        if(this.calenderEl.classList.contains('active')){
            this.#calenderDate = { ...this.selectedDate };
        }
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
        this.markToday();
        this.markSelectedDate();
    }

    markSelectedDate() {
        if(this.selectedDate.year === this.#calenderDate.year &&
            this.selectedDate.month === this.#calenderDate.month ){
                this.calenderDatesEl.querySelector(`[data-date='${this.selectedDate.date}']`).classList.add("selected");
            }
    }

    markToday(){
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const today = currentDate.getDate();
        if(currentYear === this.#calenderDate.year && currentMonth === this.#calenderDate.month) {
            this.calenderDatesEl.querySelector(`[data-date='${today}']`).classList.add('today');
        }
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