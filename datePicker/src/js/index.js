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

        this.assignElement();
        this.initCalenderDate();
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
    }
}

const datePicker = new DatePicker;