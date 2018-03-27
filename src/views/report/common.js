export const authField=(reportList,matchName,field) => {
    var reportAuth 
    for(var i=0;i<reportList.length;i++) {
        if(reportList[i].name === matchName) {
              reportAuth = reportList[i].fields;
              break;
        }
    }
    if(reportAuth.indexOf(field) > -1) {
        return true
    } else {
        return false
    }
}