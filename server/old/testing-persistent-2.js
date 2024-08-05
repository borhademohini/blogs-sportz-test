// function getSpottingMetric(results) {
//     // Write your code here
//     let allMeasurements = {
//         all: 0,
//         passed: 0
//     };
//     //let passedMeaurements = [];

//     for (let i = 0; i < results.length; i++) {
//         console.log("i :: ", i, results.length - 1);
//         if (results[i] > 0) continue;
//         if (results[i] > 0 && i == results.length - 1) allMeasurements['passed'] = allMeasurements['passed'] + 1;
//         if (results[i] == 0 && results[i - 1] > 0) {
//             allMeasurements['all'] = allMeasurements['all'] + 2;
//             allMeasurements['passed'] = allMeasurements['passed'] + 1;
//         } else if (results[i] == 0) {
//             allMeasurements['all'] = allMeasurements['all'] + 1;
//         }

//     }
//     console.log("allMeasurements :: ", allMeasurements.all, " ", allMeasurements.passed);
// }

//console.log(getSpottingMetric([2, 1, 3, 0, 1, 5, 0, 0, 6, 7]));

function transformDateFormat(dates) {
    // Write the code that goes here
    let formattedDates = [];
    
    for (let i=0; i< dates.length; i++) {
      //Check allowed types
      let date = dates[i];
      if (checkAllowedDate(date)) {
        // Rectify invalid date
        date = getRectifiedDate(date);
        let formatted = new Date(date).toISOString().split('T')[0];
        let splitDate = formatted.split("-");
        formatted = splitDate[0] + splitDate[2] + splitDate[1];
        formattedDates.push(formatted);
      }
      
    }
    
    return formattedDates;
  }
  
  function getRectifiedDate(date) {
    let validDate = [];
    if (date.includes("p")) {
          let split = date.split("p ");
          for (let j=0; j < split.length; j++) {
            split[j] = split[j].replace(" ", "");
          }          
          
          for (let j=split.length-1; j >= 0; j--) {
            validDate.push(split[j]);
          }
          validDate = validDate.join("-");
          
         } else {
           return date;
         }
    
    return validDate;
  }
  
  function checkAllowedDate(date){
    let allowed = false;
    let allowedTypes = ["p", '/', "-"]
    for (let i=0; i< allowedTypes.length; i++) {
      if (date.includes(allowedTypes[i])) {
        allowed = true;
        break;
      } 
    }
    
    return allowed;
  }
  
  const dates = transformDateFormat(["2010/02/20", "2 016p 19p 12", "11-18-2012", "2018 12 24", "20130720"]);
  console.log(dates)