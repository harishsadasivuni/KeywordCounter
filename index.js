var keywordsHandler = (e) => {
    e.preventDefault();
    
    let array = document.getElementById("fieldOne").value.toString().trim().split(",");
    if(getCookie("keywordHighliter") != ""){
       var map1 = new Map(JSON.parse(getCookie("keywordHighliter")));
    }else{
        var map1 = new Map();
    }
    for (let a =0;a<array.length;a++) {
        array[a] = array[a].trim().toUpperCase();
        if (map1.get(array[a]) > 0) {
            map1.set(array[a], map1.get(array[a]) + 1);
        } else {
            map1.set(array[a], 1);
        }
    }
    //console.log(map1);
    setCookie("keywordHighliter",JSON.stringify([...map1]),365);
    //console.log("cookie value is  -> "+getCookie("keywordHighliter"));
    
    dynamicTable(map1);
    document.getElementById("fieldOne").value = null;
}
var clearCount = (e) => {
    document.getElementById('confirmBox').style.display = 'none';
    setCookie("keywordHighliter",null,365);
    $("#submit").click();
}
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function dynamicTable(map1){
    const mapEntries = Array.from(map1.entries());
    mapEntries.sort((a, b) => b[1] - a[1]);
    const sortedMap = new Map(mapEntries);

    let demoTable = "<table><tr><th>Keyword</th><th>Count</th></tr>";
    var count = 0;
    for (const [key, value] of sortedMap) {
        if(key != ""){
            count++;
        demoTable = demoTable + "<tr> <td>"+key+"</td><td>"+value+"</td></tr>";
        }
        document.getElementById("counter").innerHTML = count;
      }
    var dynamictable = document.getElementById("dynamictable");
    dynamictable.innerHTML = demoTable + "</table>";
};

function clearCountchecker(e){
    e.preventDefault();
    document.getElementById("confirmBox").style.display = "block";
};
function test(){
    $(document).keydown(function(event){
    if(event.keyCode == 13){                
        $("#submit").click();
    }
})};
test();