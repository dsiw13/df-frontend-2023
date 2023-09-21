// Your JS code goes here

let currentSelected = null;

function loadTable(data) {     
         
    // Sample JSON data
    let dataBook = data || JSON.parse(window.localStorage.getItem('bookStores')) || {
        items: []
    };;
    document.getElementById('deleteConfirm').style.display='none';

    $table = "<table id='myTable'><tr><th>ID</th><th>Name</th><th>Author</th><th>Topic</th><th>Action</th></tr>";

    for (var i = 0; i < dataBook.items.length; i++) {
        $table += "<tr >";
        var it = dataBook.items[i];
        it.id = i;
        $table += `<td>${it.id}</td>`
        $table += "<td>" + it.name + "</td>";
        $table += "<td>" + it.author + "</td>";
        $table += "<td>" + it.topic + "</td>";
        $table += `<td><a onclick='deleteConfirm(${it.id})'>Delete</a></td>`;
        $table += "</tr>";
    }

    $table += "</table>";
    document.getElementById("tablecontent").innerHTML = $table;
}
loadTable();

function createNew(){
    
    let id = document.getElementById("myTable").rows.length - 1;
    let name = document.getElementById("addName").value;
    let author = document.getElementById("addAuthor").value;
    let topic = document.getElementById("addTopic").value;

   
    let dataBook = JSON.parse(window.localStorage.getItem('bookStores')) || {
        items: []
    };
    //console.log(dataBook)

    dataBook.items.push({
        id,
        name,
        author,
        topic
    })

    window.localStorage.setItem('bookStores', JSON.stringify(dataBook));

    document.getElementById("addName").innerHTML = "";
    document.getElementById("addAuthor").innerHTML = "";
    document.getElementById("addTopic").innerHTML = "";

    document.getElementById('addBook').style.display='none';

    loadTable(dataBook);
}

function deleteConfirm(id){
    currentSelected = id;
    //alert(currentSelected);
    document.getElementById('deleteConfirm').style.display='block';

}

function deleteBook() {
    
    alert(currentSelected);

    document.getElementById("myTable").deleteRow(currentSelected+1);

    let dataBook = JSON.parse(window.localStorage.getItem('bookStores')) || {
        items: []
    }

    //console.log(dataBook);

    dataBook.items = dataBook.items.filter(function(returnableObjects){
        return returnableObjects.id != (currentSelected)
    });

    console.log(dataBook);
    
    window.localStorage.setItem('bookStores', JSON.stringify(dataBook));
    
    document.getElementById('deleteConfirm').style.display='none';

}

function searchBook() {
    var query = document.getElementById("searchbox").value || null;
    alert(query);

    let dataBook = JSON.parse(window.localStorage.getItem('bookStores')) || {
        items: []
    }

    dataBook.items = dataBook.items.filter(function(returnableObjects){
        if (query != null) {
            return returnableObjects.id === query || returnableObjects.name === query || returnableObjects.author === query || returnableObjects.topic === query
        }
        
        return dataBook;
    });

    loadTable(dataBook);    
    

}