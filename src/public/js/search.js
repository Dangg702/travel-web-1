let departure = '';
let dateGo = '';
let searchName = '';
// handel input name
let searchInput = document.querySelector('.search-input');
searchInput.addEventListener('change', function () {
    searchName = searchInput.value;
});
// handle for search form (Date input field)
// Calculate tomorrow's date
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
// Format tomorrow's date as "d-m-Y" and Set the default value
dateGo = tomorrow
    .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    .split('/')
    .join('/');
let defaultSelection = luxon.DateTime.fromFormat(dateGo, 'dd/MM/yyyy');
let defaultSelectionDateOfWeek = defaultSelection.setLocale('vi').toFormat('EEEE');
document.getElementById('DateOfWeekCheckinStr').textContent = defaultSelectionDateOfWeek;
document.getElementById('DateCheckinStr').textContent = dateGo;

// onClose callback để lắng nghe sự kiện khi người dùng chọn một ngày và datepicker đã được đóng.
// Các tham số selectedDates, dateStr và instance được truyền vào hàm callback.
flatpickr('#dateInput', {
    dateFormat: 'd/m/Y',
    minDate: tomorrow,
    defaultDate: tomorrow,
    onClose: function (selectedDates, dateStr, instance) {
        // Luxon's DateTime class to parse the selected date from the dateStr
        // and set the locale to Vietnamese ('vi') and use the toFormat method to obtain the weekday in Vietnamese format ('EEEE').
        let selectedDate = luxon.DateTime.fromFormat(dateStr, 'dd/MM/yyyy');
        let dayOfWeekVietnamese = selectedDate.setLocale('vi').toFormat('EEEE');

        dateGo = dateStr;
        document.getElementById('DateOfWeekCheckinStr').textContent = dayOfWeekVietnamese;
        document.getElementById('DateCheckinStr').textContent = dateGo;
    },
});
// ===============================================================
// hadle for search form (departure field)
let cities = [
    'Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Hải Phòng',
    'Nha Trang',
    'Đà Lạt',
    'Hội An',
    'Huế',
    'Phú Yên',
    'Quy Nhơn',
    'Quảng Bình',
    'Bình Thuận',
    'Ninh Thuận',
];
let sortCities = cities.sort();
// Set the default value
departure = 'Hồ Chí Minh';
document.getElementById('selectedCity').textContent = departure;
// Create the popover content
let popoverContent = '';
sortCities.forEach(function (city) {
    popoverContent += '<div class="departure-popover__item">' + city + '</div>';
});
// Set the popover content
document.getElementById('departure-popover').innerHTML = popoverContent;
// Handle the city selection
let cityOptions = document.getElementsByClassName('departure-popover__item');
Array.from(cityOptions).forEach(function (option) {
    option.addEventListener('click', function () {
        departure = option.textContent;
        document.getElementById('selectedCity').textContent = departure;
    });
});
// show/hide the popover from departure
document.getElementById('departure-field').addEventListener('click', function () {
    document.querySelector('.departure-popover').classList.toggle('show');
});
// =============================================
// Make API call using formData
let searchButton = document.getElementById('home-search');
let searchForm = document.getElementById('search-form');
searchButton.addEventListener('click', function (e) {
    if(searchName==null){
        alert('Vui lòng nhập điểm cần đến');
    }
    e.preventDefault();
    const url = `https://travel-web-ks0z.onrender.com/api/tour/search-tours/${searchName}?departure=${departure}&dateGo=${dateGo}`;
    searchForm.action = url;
    searchForm.submit();
    window.location.href = url;
});
