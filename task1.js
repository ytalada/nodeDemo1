const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let aryToSort;
let order, i, j, temp;
rl.on('line', (input) => {
    aryToSort = input.split(' ');
    order = aryToSort.pop();

    if(order === 'ASC' || order === 'DESC') {
        console.log('******Before Sort:', aryToSort);
        for(i=0; i < aryToSort.length;i++) {
            for(j=i; j < aryToSort.length;j++) {
                if(order === 'ASC') {
                    if(parseInt(aryToSort[i]) > parseInt(aryToSort[j])) {
                        temp = aryToSort[i];
                        aryToSort[i] = aryToSort[j];
                        aryToSort[j] = temp;
                    }
                } else if(order === 'DESC') {
                    if(parseInt(aryToSort[i]) < parseInt(aryToSort[j])) {
                        temp = aryToSort[i];
                        aryToSort[i] = aryToSort[j];
                        aryToSort[j] = temp;
                    }
                }
            }
        }
        console.log('******After Sort:', aryToSort);
    } else {
        console.log('Sorry wrong argument passed as order !!');
    }
});