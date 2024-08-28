var keywordsHandler = (e) => {
    e.preventDefault();
    
    let array = document.getElementById("fieldOne").value.toString().trim().split(",");
    if(localStorage.getItem("keywordHighliter") != ""){
       var map1 = new Map(JSON.parse(localStorage.getItem("keywordHighliter")));
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
    localStorage.setItem("keywordHighliter", JSON.stringify([...map1]));
    localStorageSpace();
    dynamicTable(map1);
    document.getElementById("fieldOne").value = null;
}
var localStorageSpace = function(){
    var allStrings = '';
    for(var key in window.localStorage){
        allStrings += key;
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    document.getElementById("memory").innerHTML = ( allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB used out of 4MB.' : 'Memory full clear space.');
};
var clearCount = (e) => {
    document.getElementById('confirmBox').style.display = 'none';
    localStorage.setItem("keywordHighliter",null);
    $("#submit").click();
    document.getElementById("memory").innerHTML = 0;
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