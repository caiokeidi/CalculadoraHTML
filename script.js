
var tela_numbers;
var last_number;
var commands = ["x", "/", "+", "-"];
var max_qtd_numbers = 20;


function getClick(button){
    
    if(commands.includes(button)){
        if (!commands.includes(last_number) && tela_numbers != undefined){
            if(tela_numbers.length != 0)
                addTelaNumbers(button);
        }
    }
    else if(button == "C"){
        clean_screen()
    }
    else if(button == "back"){
        backspace()
    }
    else{
        addTelaNumbers(button);
    }
    

}

function clean_screen(){
    tela_numbers = undefined;
    updateTela();
}

function addTelaNumbers(n){
    if (tela_numbers == undefined){
        tela_numbers = n
    }
    else{
        tela_numbers += String(n)
        last_number = String(n)
    }

    updateTela();
}

function updateTela(){
    let tela = document.getElementById("tela");

    checkFontSize();

    if(tela_numbers == undefined){
        tela.innerHTML = 0
    }
    else {
        tela.innerHTML = tela_numbers;
    }
}

function backspace(){
    tela_numbers = tela_numbers.slice(0, -1)
    updateTela();
}

function organizar_dados(){
    
    tela_numbers += "="
    var l = tela_numbers.length;
    var i, n;
    var elements = [];

    for(i = 0; i < l; i++){
        if(commands.includes(tela_numbers[i])){
            elements.push(parseFloat(n, 10));
            n = undefined;
            elements.push(tela_numbers[i]);
        }
        else if(tela_numbers[i] == "="){
            if(!commands.includes(tela_numbers[i])){
                elements.push(parseFloat(n))
            }
            return elements;
        }

        else{
            if (n == undefined){
                n = tela_numbers[i];
            }
            else{
                n += tela_numbers[i];
            }
            
        }
    } 
}


function calcularResultado(){
    var dados = organizar_dados();
   
    var pos_op;


    
    while(find_multidivide(dados) != 0){
        pos_op = find_multidivide(dados);
        switch(dados[pos_op]){
            case "x":
                dados[pos_op-1] *= dados[pos_op+1];
                dados.splice(pos_op, 2);
                break;
            case "/":
                dados[pos_op-1] /= dados[pos_op+1];
                dados.splice(pos_op, 2);
                break;
        }
    }


    while(dados.length != 1){
        var op = dados[1];
        switch(op){
            case "+":
                dados[0] += dados[2];
                dados.splice(1, 2);
                break;
            case "-":
                dados[0] -= dados[2];
                dados.splice(1, 2);
                break;
        }
    }
    
    if(isNaN(dados[0])){
        dados[0] = 0;
    }

    let tela = document.getElementById("tela");
    tela.innerHTML = dados[0]
    tela_numbers = undefined;
}

function find_multidivide(info){
    var n = 0;
    var pos_multidivide = 0;

    for(n; n < info.length; n++){
        if(commands.includes(info[n])){
            if(pos_multidivide == 0){
                switch(info[n]){
                    case "x":
                        pos_multidivide = n;
                        break;
                    case "/":
                        pos_multidivide = n;
                        break;
                }
            }
        }
    }
    return pos_multidivide;
}

function checkFontSize(){
    let tela = document.getElementById("tela");
    if(tela_numbers != undefined){
        if(tela_numbers.length < 15){
            tela.style = "font-size: 30px";
        }
        else if(tela_numbers.length < 20){
            tela.style = "font-size: 25px";
        }
        else if(tela_numbers.length < 25){
            tela.style = "font-size: 20px";
        }
        else if(tela_numbers.length < 30){
            tela.style = "font-size: 15px";
        }
        
    }
    
}