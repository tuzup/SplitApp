
// ----------------------------------------------------------------------


export function convertToCurrency(number) {
  number = Math.abs(Math.round((number  + Number.EPSILON) * 100) / 100)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function currencyFind(currencyType){
  switch (currencyType) {
      case "INR":
          return '₹'
      case "USD":
          return '$'
      case "EUR":
          return "€"
      default:
          return '₹'
  }
}


export function categoryIcon(groupCategory){
  switch (groupCategory) {
      case "Home":
          return 'ant-design:home-filled'
      case "Trip":
          return 'ic:outline-flight'
      case "Office":
          return 'mdi:office-building-marker'
      case "Sports":
          return 'material-symbols:sports-cricket'
      case "Others":
          return 'foundation:page-edit'
      default:
          return 'ic:baseline-insert-page-break'
  }
}

export const monthNamesMMM = ["JAN", "FRB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
export function getMonthMMM(expDate) {
  const date = new Date(expDate)
  return monthNamesMMM[date.getMonth()];
}

Number.prototype.zeroPad = function() {
  return ('0'+this).slice(-2);
};