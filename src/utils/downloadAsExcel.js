import * as XLSX from 'xlsx';

const downloadAsExcel = (data, name) => {
    if (data) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        //------ if data as array ------//
        // const ws = XLSX.utils.aoa_to_sheet(arrayData);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, name);
    }
}

export default downloadAsExcel;




// // Membuat json baru dengan atribut yang lebih sedikit dari data asli 

// const jsonData = [
//   {
//     "nama": "John Doe",
//     "umur": 25,
//     "alamat": "Jalan Contoh No. 123",
//     "hobi": ["membaca", "berenang"]
//   },
//   {
//     "nama": "Jane Smith",
//     "umur": 30,
//     "alamat": "Jalan Lain No. 456",
//     "hobi": ["bersepeda", "memasak"]
//   },
//   {
//     "nama": "Alice Johnson",
//     "umur": 22,
//     "alamat": "Jalan Saja No. 789",
//     "hobi": ["mendengarkan musik", "menulis"]
//   }
// ];


// // Membuat data JSON baru hanya dengan sejumlah tertentu dari atribut pertama (misalnya, 3 atribut pertama)

// const numberOfAttributes = 3;
// const newData = jsonData.map((item) => {
//   const selectedAttributes = Object.keys(item).slice(0, numberOfAttributes);
//   const newObj = {};
//   selectedAttributes.forEach((attribute) => {
//     newObj[attribute] = item[attribute];
//   });
//   return newObj;
// });

// console.log(newData);