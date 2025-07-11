export function uploadRallyQuestions(event: any): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Event: ', event);
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return reject('No file selected');
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      console.log('Rally...');
      const csvText = reader.result as string;
      let jsonData = csvToJson(csvText);
      console.log('JSON Data:', jsonData);

      localStorage.setItem('rallyQuestions', JSON.stringify(jsonData));
      input.value = '';
      resolve();
    };

    reader.onerror = (error) => {
      reject('FileReader Error: ' + error);
    };

    reader.readAsText(file);
  });
}

export function csvToJson(csv: string): any[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
}

export function convertToCSV(fileName:string,convertToCsvArray:any[]):string {
    var array: any = [];
    for (let i = 0; i < convertToCsvArray.length; i++) {
      var o;
      var newArry: any = [];
      for (o in convertToCsvArray[i]) {
        newArry.push(o);
      }
      break;
    }
    array.push(newArry);
    for (let i = 0; i < convertToCsvArray.length; i++) {
      array.push(Object.values(convertToCsvArray[i]));
    }
    var CsvString = "";
    array.forEach((RowItem: any) => {
      RowItem.forEach((colItem: any) => {
        const removednullItem = colItem === null ? "" : colItem;
        const replacedCommaItem = removednullItem.toString().replace(/,/g, "");
        CsvString += replacedCommaItem + ",";
      });
      CsvString += "\r\n";
    });
    CsvString = "data:application/csv, " + encodeURIComponent(CsvString);
    var x = document.createElement("a");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", fileName);
    document.body.appendChild(x);
    x.click();
    array = [];
    return CsvString;
  }
